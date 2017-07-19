import audioContext from '../audioContext.js'

export default class Metronome {
  gain = audioContext.createGain()

  constructor() {
    this.gain.connect(audioContext.destination)
  }

  handler = (currentTick, nextTickTime, { ticksPerBeat }) => {
    if (currentTick % (ticksPerBeat * 4) === 0) {
      const osc = audioContext.createOscillator()
      osc.connect(this.gain)
      osc.frequency.value = 220
      osc.start(nextTickTime)
      osc.stop(nextTickTime + 0.05)
      this.gain.setGain(.6)
    } else if (currentTick % ticksPerBeat === 0) {
      const osc = audioContext.createOscillator()
      osc.connect(this.gain)
      osc.frequency.value = 220
      osc.start(nextTickTime)
      osc.stop(nextTickTime + 0.05)
      this.gain.setGain(.3)
    }
  }
}
