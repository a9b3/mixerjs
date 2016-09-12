import audioContext from '../audioContext.js'
import IntervalWorker from 'worker!./interval-worker.js'

export default class Scheduler {
  worker = null
  lookAhead = 25 // ms
  scheduleAheadTime = .1  // in seconds
  tempo = 120
  ticksPerBeat = 64 // resolution, ex. 8 would be 8 ticks per beat meaning each tick is a 32nd note
  nextTickTime = 0
  currentTick = 0
  handlers = []

  constructor({ tempo } = {}) {
    if (tempo) this.setTempo(tempo)
  }

  setTempo(tempo) {
    this.tempo = tempo
  }

  _advanceNote() {
    const secondsPerBeat = 60.0 / this.tempo
    this.nextTickTime += (1/this.ticksPerBeat) * secondsPerBeat
    this.currentTick++
  }

  _scheduleNote() {
    this.handlers.forEach(handler => handler(this.currentTick, this.nextTickTime, { ticksPerBeat: this.ticksPerBeat }))
  }

  _schedule() {
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

    this.currentTick = 0
    this.nextTickTime = audioContext.currentTime

    this.worker.postMessage({ type: 'start' })
  }

  stop() {
    this.worker.postMessage({ type: 'stop' })
  }
}
