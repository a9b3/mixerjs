import audioContext from './audioContext.js'
import UnitInterface from './UnitInterface.js'
import uuid from 'node-uuid'
import { observable } from 'mobx'

import SoundSource from './SoundSource.js'
import Analyser from './Analyser.js'

export default class Track extends UnitInterface {
  @observable notes = {}
  @observable label = undefined

  @observable bar = 2
  @observable beat = 4

  analyser = new Analyser()
  soundSource = new SoundSource()
  id = uuid.v4()

  constructor({ label } = {}) {
    super(null, audioContext.createGain())
    this.outputNode.connect(this.analyser.inputNode)
    this.soundSource.outputNode.connect(this.outputNode)

    this.label = label
  }

  setBar(bar) {
    this.bar = bar
  }

  setBeat(beat) {
    this.beat = beat
  }

  setLabel(label) {
    this.label = label
  }

  async load(url) {
    await this.soundSource.load(url)
  }

  addNote(note, value) {
    this.notes[note] = value
  }

  removeNote(note) {
    delete this.notes[note]
  }

  handler = (currentTick, nextTickTime, { ticksPerBeat }) => {
    if (!this.soundSource.ready) {
      return
    }

    const loopLength = this.bar * 4 * ticksPerBeat
    const offsetTick = currentTick % loopLength

    if (this.notes[offsetTick]) {
      this.soundSource.play({ startTime: nextTickTime })
    }
  }
}
