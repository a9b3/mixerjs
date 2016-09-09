import { observable } from 'mobx'
import Scheduler from './Scheduler/Scheduler.js'
import Metronome from './Metronome/Metronome.js'

export default class Controller {
  handlers = []
  scheduler = new Scheduler()
  metronome = new Metronome()
  @observable beat = 4
  @observable bar = 2
  @observable bpm = 0
  @observable isMetronomeActive = false
  @observable isPlaying = false

  constructor({ bpm = 120 } = {}) {
    this.setTempo(bpm)
    this.scheduler.setLoopLength((this.beat * 8) * this.bar)
  }

  setTempo(bpm) {
    this.bpm = bpm
    this.scheduler.setTempo(bpm)
  }

  setBeat(beat) {
    this.beat = beat
    this.scheduler.setLoopLength((this.beat * 8) * this.bar)
  }

  setBar(bar) {
    this.bar = bar
    this.scheduler.setLoopLength((this.beat * 8) * this.bar)
  }

  runHandlers = (...args) => {
    this.handlers.forEach(handler => handler(...args))
  }

  addHandler(fn) {
    this.handlers.push(fn)
  }

  removeHandler(fn) {
    const i = this.handlers.indexOf(fn)
    if (i !== -1) {
      this.handlers.splice(i, 1)
    }
  }

  start(...args) { this.play(...args) }
  play() {
    if (this.isPlaying) {
      this.stop()
    }
    this.scheduler.handlers.push(this.runHandlers)
    this.scheduler.schedule()
    this.isPlaying = true
  }

  stop() {
    this.scheduler.stop()
    const i = this.scheduler.handlers.indexOf(this.runHandlers)
    if (i !== -1) {
      this.scheduler.handlers.splice(i, 1)
    }
    this.isPlaying = false
  }

  toggleMetronome() {
    this.isMetronomeActive = !this.isMetronomeActive
    if (this.isMetronomeActive) {
      this.addHandler(this.metronome.handler)
    } else {
      this.removeHandler(this.metronome.handler)
    }
  }
}
