import audioContext from './audioContext.js'
import UnitInterface from './UnitInterface.js'

export default class ConvolverNode extends UnitInterface {
  convolverNode = audioContext.createConvolverNode()

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
}
