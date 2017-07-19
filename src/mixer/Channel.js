/*
 * ex.
 *
 * const channel = new Channel()
 * channel.outputNode.connect(audioContext.destination)
 *
 * fooUnitNode.connect(channel)
 *
 * // use fx nodes
 * const convolverNode = audioContext.createConvolverNode()
 * channel.addFxNode(convolverNode)
 */
import audioContext from './audioContext.js'
import UnitInterface from './UnitInterface.js'
import Analyser from './Analyser.js'
import { observable } from 'mobx'
import uuid from 'node-uuid'

export default class Channel extends UnitInterface {
  id = uuid.v4() // TODO (sam) mixer should store channel as a map instead of arr
  fx = []
  analyser = new Analyser()
  panner = audioContext.createPanner()
  @observable panPosition = 0
  @observable isMute = false // set by this.toggleMute()
  @observable label = undefined
  @observable gain = 1

  constructor({ label } = {}) {
    // set inputNode, outputNode
    super(audioContext.createGain(), audioContext.createGain())

    this.inputNode.connect(this.panner)
    this.panner.connect(this.outputNode)
    this.outputNode.connect(this.analyser.inputNode)

    this.label = label
    this.setPan(this.panPosition)
    this.setGain(this.gain)
  }

  setLabel(label) {
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
    this.gain = value
    return this.outputNode.setGain(value)
  }

  toggleMute() {
    this.outputNode.toggleMute()
    this.isMute = this.outputNode.isMute
  }

  addFxNode(node, index = this.fx.length) {
    this.fx.splice(index, 0, node)

    const beforeNode = index - 1 < 0 ? this.inputNode : this.fx[index - 1]
    const afterNode = index + 1 > this.fx.length - 1 ? this.panner : this.fx[index + 1]

    beforeNode.disconnect()
    // accept UnitInterface or raw AudioNode
    beforeNode.connect(this.fx[index].inputNode || this.fx[index])

    this.fx[index].connect(afterNode)
  }

  removeFxNode(node) {
    const index = this.fx.indexOf(node)
    this.fx.splice(index, 1)

    const beforeNode = index - 1 < 0 ? this.inputNode : this.fx[index - 1]
    const afterNode = index + 1 > this.fx.length - 1 ? this.panner : this.fx[index + 1]

    beforeNode.disconnect()
    beforeNode.connect(afterNode)
  }
}
