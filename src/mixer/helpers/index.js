import audioContext from '../audioContext.js'

export function extendFn(fn, fnFactory) {
  const oldFn = fn
  return fnFactory(oldFn)
}

/**
 * Wrap call to return promise.
 *
 * @param {String} url - url to get arraybuffer for
 * @returns {Promise.resolve(ArrayBuffer)}
 */
export function getBuffer(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.responseType = 'arraybuffer'

    request.onload = () => {
      resolve(request.response)
    }
    request.send()
  })
}

/**
 * Wrap decodeAudioData to return promise.
 *
 * @param {ArrayBuffer} arrayBuffer - return from getBuffer
 * @returns {Promise.resolve(AudioBuffer)}
 */
export function decodeAudioData(arrayBuffer) {
  return new Promise((resolve, reject) => {
    audioContext.decodeAudioData(arrayBuffer, resolve, reject)
  })
}

export async function getAudioBuffer(url) {
  const buffer = await getBuffer(url)
  return decodeAudioData(buffer)
}
