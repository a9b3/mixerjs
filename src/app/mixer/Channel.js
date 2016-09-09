import audioContext from './audioContext.js'
import UnitInterface from './UnitInterface.js'
import Analyser from './Analyser.js'
import { observable } from 'mobx'
import uuid from 'node-uuid'

export default class Channel extends UnitInterface {
  id = uuid.v4() // TODO (sam) mixer should store channel as a map instead of arr
  analyser = new Analyser()
  panner = audioContext.createPanner()
  @observable panPosition = 0
  @observable isMute = false // set by this.toggleMute()
  @observable label = undefined

  constructor({ label } = {}) {
    // set inputNode, outputNode
    super(audioContext.createGain(), audioContext.createGain())

    this.inputNode.connect(this.panner)
    this.panner.connect(this.outputNode)
    this.setPan(0)
    this.outputNode.connect(this.analyser.inputNode)

    this.label = label
  }

  /**
   * @param {Number} value - between -1 and 1, 0 is center
   */
  setPan(value) {
    const x = value
    const y = 0
    const z = 1 - Math.abs(x)
    this.panPosition = value
    this.panner.setPosition(x, y, z)
  }

  /**
   * @param {Number} value - between 0 - 1
   */
  setGain(value) {
    return this.outputNode.setGain(value)
  }

  toggleMute() {
    this.outputNode.toggleMute()
    this.isMute = this.outputNode.isMute
  }
}
