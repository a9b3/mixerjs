import audioContext from './audioContext.js'
import UnitInterface from './UnitInterface.js'
import uuid from 'node-uuid'
import { observable } from 'mobx'

import SoundSource from './SoundSource.js'
import Analyser from './Analyser.js'

export default class Track extends UnitInterface {
  label = undefined
  analyser = new Analyser()
  soundSource = new SoundSource()
  id = uuid.v4()
  @observable notes = {}

  constructor({ label } = {}) {
    super(null, audioContext.createGain())
    this.outputNode.connect(this.analyser.inputNode)
    this.soundSource.outputNode.connect(this.outputNode)

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

  handler = (current32ndNote, nextNoteTime) => {
    if (!this.soundSource.ready) {
      return
    }

    if (this.notes[current32ndNote]) {
      this.soundSource.play({ startTime: nextNoteTime })
    }
  }
}
