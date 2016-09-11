import audioContext from '../audioContext.js'
import IntervalWorker from 'worker!./interval-worker.js'

export default class Scheduler {
  worker = null
  lookAhead = 25 // ms
  scheduleAheadTime = .1  // in seconds

  tempo = 120
  nextNoteTime = 0
  current32ndNote = 0  // loop
  loopLength = 16

  // eventually replace nextNoteTime and current32ndNote with nextTickTime and
  // currentTick
  // Use tick, so resolution can be defined as a config, instead of hardcoding
  // to 32nd note resolution. Also do not reset based on a loop length so loop
  // length can be defined by each pattern instead of the scheduler.
  ticksPerBeat = 32 // resolution, ex. 8 would be 8 ticks per beat meaning each tick is a 32nd note
  nextTickTime = 0
  currentTick = 0

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

    // TODO use this
    this.nextTickTime += (1/this.ticksPerBeat) * secondsPerBeat
    this.currentTick++
  }

  _scheduleNote() {
    this.handlers.forEach(handler => handler(this.current32ndNote, this.nextNoteTime))

    // TODO use this
    this.handlers.forEach(handler => handler(this.currentTick, this.nextTickTime))
  }

  _schedule() {
    while(this.nextNoteTime < audioContext.currentTime + this.scheduleAheadTime) {
      this._scheduleNote()
      this._advanceNote()
    }

    // TODO use this
    while(this.nextTickTime < audioContext.currentTime + this.scheduleAheadTime) {
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

    // TODO use this
    this.currentTick = 0
    this.nextTickTime = audioContext.currentTime

    this.worker.postMessage({ type: 'start' })
  }

  stop() {
    this.worker.postMessage({ type: 'stop' })
  }
}
