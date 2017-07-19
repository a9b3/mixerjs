import { observable } from 'mobx'
import Track from './Track.js'

export default class TrackList {
  @observable tracks = []

  addTrack(...args) {
    const track = new Track(...args)
    this.tracks.push(track)
    return track
  }

  removeTrack(track) {
    const i = this.tracks.indexOf(track)
    if (i > -1) {
      this.tracks.splice(i, 1)
    }
  }
}
