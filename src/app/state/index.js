import Mixer from '../mixer/Mixer.js'
import TrackList from '../mixer/TrackList.js'
import ActionModals from './ActionModals.js'
import Controller from '../mixer/Controller.js'

const controller = new Controller()

class State {
  mixer = new Mixer()
  actionModals = new ActionModals()
  trackList = new TrackList()
  controller = controller
}

document.body.onkeydown = (evt => {
  if (evt.keyCode == 32) {
    if (controller.isPlaying) {
      controller.stop()
    } else {
      controller.play()
    }
  }
})

export default new State()
