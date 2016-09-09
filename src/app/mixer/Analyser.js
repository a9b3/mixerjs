import audioContext from './audioContext.js'
import UnitInterface from './UnitInterface.js'

/*
 * This node does not output to anything. Connect to this node to get analyser
 * data from it.
 */
export default class Analyser extends UnitInterface {
  // stereo, analyser node for left and right
  _analysers = []

  constructor() {
    super(audioContext.createChannelSplitter(), null)

    // left and right analysers
    this._analysers.push(audioContext.createAnalyser())
    this._analysers.push(audioContext.createAnalyser())
    this._analysers.forEach(analyser => {
      // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/smoothingTimeConstant
      // value has to be 0 - 1 (0 meaning no time averaging) default is 0.8 if
      // not set
      analyser.smoothingTimeConstant = 0.8
      analyser.fftSize = 1024
    })

    this.inputNode.connect(this._analysers[0], 0, 0)
    this.inputNode.connect(this._analysers[1], 1, 0)
  }

  /**
   * Size of array is half of fftSize.
   * values range from 0 - 255
   *
   * @returns {Array<Number>} [left, right]
   */
  getByteFrequencyData() {
    return this._analysers.map(analyser => {
      const array = new Uint8Array(analyser.frequencyBinCount)
      analyser.getByteFrequencyData(array)
      return array
    })
  }

  getByteTimeDomainData() {
    return this._analysers.map(analyser => {
      const array = new Uint8Array(analyser.fftSize)
      analyser.getByteTimeDomainData(array)
      return array
    })
  }

  getFloatFrequencyData() {
    return this._analysers.map(analyser => {
      const array = new Float32Array(analyser.frequencyBinCount)
      analyser.getFloatFrequencyData(array)
      return array
    })
  }

  getFloatTimeDomainData() {
    return this._analysers.map(analyser => {
      const array = new Float32Array(analyser.fftSize)
      analyser.getFloatTimeDomainData(array)
      return array
    })
  }
}
