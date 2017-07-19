import { extendFn } from './helpers/index.js'

/*
 * access to AudioContext
 */
if (!(window.AudioContext || window.webkitAudioContext)) {
  throw new Error('Your browser does not have support for AudioContext')
}

const audioContext = new (window.AudioContext || window.webkitAudioContext)()

audioContext.createGain = extendFn(
  audioContext.createGain.bind(audioContext),
  (superFn) => (...args) => {
    const node = superFn(...args)

    let prevGainValue = undefined
    node.isMute = false

    /**
     * @param {Number} value - between 0 and 1
     */
    node.setGain = (value) => {
      node.gain.value = value

      if (value !== 0) {
        node.isMute = false
      }
    }

    node.toggleMute = () => {
      node.isMute = !node.isMute

      if (node.isMute) {
        prevGainValue = node.gain.value
        node.setGain(0)
      } else {
        node.setGain(prevGainValue || 0)
      }
    }

    return node
  }
)

export default audioContext
