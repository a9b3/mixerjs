/*
 * SoundSource ex.
 *
 * const soundSource = new SoundSource()
 *
 * // raw audio node
 * soundSource.outputNode.connect(audioContext.destination)
 * // another unit
 * soundSource.connect(unitNode)
 *
 * await soundSource.load(url)
 * soundSource.play()
 */
import invariant from 'invariant'
import audioContext from './audioContext.js'
import UnitInterface from './UnitInterface.js'
import { observable } from 'mobx'

const helper = {
  /**
   * Wrap call to return promise.
   *
   * @param {String} url - url to get arraybuffer for
   * @returns {Promise.resolve(ArrayBuffer)}
   */
  getBuffer(url) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest()
      request.open('GET', url, true)
      request.responseType = 'arraybuffer'

      request.onload = () => {
        resolve(request.response)
      }
      request.send()
    })
  },

  /**
   * Wrap decodeAudioData to return promise.
   *
   * @param {ArrayBuffer} arrayBuffer - return from getBuffer
   * @returns {Promise.resolve(AudioBuffer)}
   */
  decodeAudioData(arrayBuffer) {
    return new Promise((resolve, reject) => {
      audioContext.decodeAudioData(arrayBuffer, resolve, reject)
    })
  },
}

/*
 * A SoundSource encapsulates logic regarding the loading and playing of a
 * particular sound.
 *
 * This node does not expect inbound audio, it should only outbound. This node
 * should be an edge of an audio graph.
 */
export default class Sound extends UnitInterface {
  url = undefined
  audioBuffer = undefined // set on this.load()
  bufferSources = [] // store buffer source for instance of sound playing
  onended = () => {} // function to call onended
  @observable ready = false

  constructor() {
    super(null, audioContext.createGain())
  }

  /**
   * @param {String} url - url to load sound for
   * @returns {Promise.resolve(null)}
   */
  async load(url) {
    invariant(url, `'url' must be provided`)
    this.ready = false
    this.audioBuffer = undefined
    this.url = url
    const buffer = await helper.getBuffer(url)
    this.audioBuffer = await helper.decodeAudioData(buffer)
    this.ready = true
  }

  /**
   * @param {Number} position - in seconds
   * @param {Boolean} oneShot - set to true if no parallel sounds desired, this
   * will stop currently playing sounds
   */
  play({
    startTime = 0,
    position = 0,
    oneShot = false,
  } = {}) {
    if (oneShot) {
      this.stop()
    }

    const bufferSource = audioContext.createBufferSource()
    bufferSource.buffer = this.audioBuffer
    bufferSource.start(startTime, position)
    bufferSource.connect(this.outputNode)
    this.bufferSources.push(bufferSource)

    bufferSource.onended = () => {
      this.bufferSources.shift()
      if (this.bufferSources.length === 0) {
        this.onended()
      }
    }
  }

  stop(...args) {
    let cursor = this.bufferSources.pop()
    while(cursor) {
      cursor.stop(...args)
      cursor.disconnect(this.outputNode)
      cursor = this.bufferSources.pop()
    }
  }

  /**
   * Get stereo representation of the entire sound source.
   *
   * @returns {Array<Array<Number>>} - Array represents left(0) and right(1)
   */
  getChannelData() {
    if (!this.audioBuffer) return
    return [this.audioBuffer.getChannelData(0), this.audioBuffer.getChannelData(1)]
  }

  /**
   * Values range from -1 to 1.
   *
   * @param {Number} buckets - how many buckets to split data into
   * @returns {Array<Array<min, max>>} - left and right represensations of min
   * and max
   */
  getWaveShape({
    buckets = 100,
  } = {}) {
    if (!this.audioBuffer) return
    const channelData = this.getChannelData()
    const bucketSize = Math.round(channelData[0].length / buckets)

    const arr = []
    for (let i = 0; i < buckets; i++) {
      let minLeft = 1
      let maxLeft = -1
      let minRight = 1
      let maxRight = -1
      for (let j = bucketSize * i; j < bucketSize * (i+1); j++) {
        const valueLeft = channelData[0][j]
        if (valueLeft < minLeft) minLeft = valueLeft
        if (valueLeft > maxLeft) maxLeft = valueLeft

        const valueRight = channelData[1][j]
        if (valueRight < minRight) minRight = valueRight
        if (valueRight > maxRight) maxRight = valueRight
      }
      arr.push([{ min: minLeft, max: maxLeft }, { min: minRight, max: maxRight }])
    }
    return arr
  }
}
