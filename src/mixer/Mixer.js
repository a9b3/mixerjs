import { observable } from 'mobx'
import audioContext from './audioContext.js'
import Channel from './Channel.js'

export default class Mixer {
  @observable channels = []
  @observable master = new Channel({ label: 'master' })

  constructor() {
    this.master.outputNode.connect(audioContext.destination)
  }

  addChannel(...args) {
    const channel = new Channel(...args)
    channel.connect(this.master)
    this.channels.push(channel)
  }

  removeChannel(channel) {
    const i = this.channels.indexOf(channel)
    if (i > -1) {
      this.channels.splice(i, 1)
    }
  }
}
