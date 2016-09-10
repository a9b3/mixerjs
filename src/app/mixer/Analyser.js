import audioContext from './audioContext.js'
import UnitInterface from './UnitInterface.js'
import RMS from './RMS/RMS.js'

/*
 * This node does not output to anything. Connect to this node to get analyser
 * data from it.
 */
export default class Analyser extends UnitInterface {
  // stereo, analyser node for left and right
  _analysers = [
    audioContext.createAnalyser(),
    audioContext.createAnalyser(),
  ]
  rms = new RMS()

  constructor() {
    // this.inputNode is set to a channelSplitter, stereo
    // ex.
    // this.inputNode.connect(fooNode, 0, 0) <-- left signal
    // this.inputNode.connect(fooNode, 1, 0) <-- right signal
    super(audioContext.createChannelSplitter(), null)

    this._analysers.forEach((analyser, i) => {
      // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/smoothingTimeConstant
      // value has to be 0 - 1 (0 meaning no time averaging) default is 0.8 if
      // not set
      analyser.smoothingTimeConstant = 0.8
      analyser.fftSize = 1024

      // connect stereo signals to individual analysers
      this.inputNode.connect(analyser, i, 0)
    })

    this.inputNode.connect(this.rms.input)
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

  getRms() {
    return this.rms.rms
  }

  getPeaks() {
    return this.rms.peaks
  }
}
