import audioContext from '../audioContext.js'
import IntervalWorker from 'worker!./interval-worker.js'

export default class Scheduler {
  tempo = 120
  nextNoteTime = 0  // kept by schedule
  lookAhead = 25 // ms
  scheduleAheadTime = .1  // in seconds
  current32ndNote = 0  // loop
  worker = null
  loopLength = 16
  handlers = []

  constructor({ tempo } = {}) {
    if (tempo) this.setTempo(tempo)
  }

  setTempo(tempo) {
    this.tempo = tempo
  }

  setLoopLength(loopLength) {
    this.loopLength = loopLength
  }

  _advanceNote() {
    const secondsPerBeat = 60.0 / this.tempo
    this.nextNoteTime += (1/8) * secondsPerBeat // 32nd notes

    this.current32ndNote++
    if (this.current32ndNote === this.loopLength) {
      this.current32ndNote = 0
    }
  }

  _scheduleNote() {
    this.handlers.forEach(handler => handler(this.current32ndNote, this.nextNoteTime))
  }

  _schedule() {
    while(this.nextNoteTime < audioContext.currentTime + this.scheduleAheadTime) {
      this._scheduleNote()
      this._advanceNote()
    }
  }

  schedule() {
    if (!this.worker) {
      this.worker = new IntervalWorker()

      this.worker.onmessage = ({ data }) => {
        if (data === 'tick') {
          this._schedule()
        }
      }
      this.worker.postMessage({ type: 'setInterval', args: this.lookAhead })
    }

    // reset counters
    this.current32ndNote = 0
    this.nextNoteTime = audioContext.currentTime

    this.worker.postMessage({ type: 'start' })
  }

  stop() {
    this.worker.postMessage({ type: 'stop' })
  }
}
