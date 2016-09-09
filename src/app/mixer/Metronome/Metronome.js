import audioContext from '../audioContext.js'

export default class Metronome {
  gain = audioContext.createGain()

  constructor() {
    this.gain.connect(audioContext.destination)
  }

  handler = (current32ndNote, nextNoteTime) => {
    const osc = audioContext.createOscillator()
    osc.connect(this.gain)

    if (current32ndNote % 32 === 0) {
      osc.frequency.value = 220
      osc.start(nextNoteTime)
      osc.stop(nextNoteTime + 0.05)
      this.gain.setGain(.6)
    } else if (current32ndNote % 8 === 0) {
      osc.frequency.value = 220
      osc.start(nextNoteTime)
      osc.stop(nextNoteTime + 0.05)
      this.gain.setGain(.3)
    }
  }
}
