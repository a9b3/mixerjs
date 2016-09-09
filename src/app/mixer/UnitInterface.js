import invariant from 'invariant'
import { observable } from 'mobx'

/*
 * o--in--> [ Unit ] o--out--->
 */
export default class Unit {
  _inputNode = undefined
  _outputNode = undefined
  @observable sends = []

  set inputNode(node) {
    invariant(node && node instanceof AudioNode, `inputNode must be set to type AudioNode`)
    this._inputNode = node
  }

  get inputNode() { return this._inputNode }

  set outputNode(node) {
    invariant(node && node instanceof AudioNode, `inputNode must be set to type AudioNode`)
    this._outputNode = node
  }

  get outputNode() { return this._outputNode }

  constructor(inputNode, outputNode) {
    if (inputNode) this.inputNode = inputNode
    if (outputNode) this.outputNode = outputNode
  }

  connect(unit) {
    invariant(unit instanceof Unit, `Type Unit can only connect to other type Unit`)
    if (this.sends.indexOf(unit) === -1) {
      this.sends.push(unit)
    }
    return this.outputNode.connect(unit.inputNode)
  }

  disconnect(unit) {
    if (!unit) {
      this.sends.length = 0
      return this.outputNode.disconnect()
    }
    invariant(unit instanceof Unit, `Type Unit can only connect to other type Unit`)
    const index = this.sends.indexOf(unit)
    this.sends.splice(index, 1)
    return this.outputNode.disconnect(unit.inputNode)
  }
}
