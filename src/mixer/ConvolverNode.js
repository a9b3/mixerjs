import audioContext from './audioContext.js'
import UnitInterface from './UnitInterface.js'
import { getAudioBuffer } from './helpers'

export default class ConvolverNode extends UnitInterface {
  convolverNode = audioContext.createConvolver()

  constructor() {
    super(audioContext.createGain(), audioContext.createGain())
    this.inputNode.connect(this.outputNode)
  }

  connect(node) {
    return this.outputNode.connect(node)
  }

  disconnect(node) {
    return this.outputNode.disconnect(node)
  }

  async load(url) {
    this.convolverNode.buffer = await getAudioBuffer(url)
    this.inputNode.disconnect()
    this.inputNode.connect(this.convolverNode)
    this.convolverNode.connect(this.outputNode)
  }
}
