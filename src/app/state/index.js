import Mixer from '../mixer/Mixer.js'
import TrackList from '../mixer/TrackList.js'
import ActionModals from './ActionModals.js'
import Controller from '../mixer/Controller.js'
import UI from './UI.js'
import Table from './Table.js'

class State {
  mixer = new Mixer()
  actionModals = new ActionModals()
  trackList = new TrackList()
  controller = new Controller()
  ui = new UI()
  table = new Table()
}

export default new State()
