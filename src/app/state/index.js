import Mixer from '../mixer/Mixer.js'
import TrackList from '../mixer/TrackList.js'
import ActionModals from './ActionModals.js'
import Controller from '../mixer/Controller.js'

class State {
  mixer = new Mixer()
  actionModals = new ActionModals()
  trackList = new TrackList()
  controller = new Controller()
}

export default new State()
