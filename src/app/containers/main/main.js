import styles from './main.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { observer } from 'mobx-react'
import state from 'state'

import Mixer from '../mixer/mixer.js'
import ActionModals from '../action-modals/action-modals.js'
import TrackList from '../track-list/track-list.js'
import Controller from '../controller/controller.js'

import SoundSource from '../../mixer/SoundSource.js'
import audioContext from '../../mixer/audioContext.js'

import hhmp3 from '../../../assets/drumkit/hh.wav'
import kickmp3 from '../../../assets/drumkit/kick.wav'
import snaremp3 from '../../../assets/drumkit/snare.wav'
import clapmp3 from '../../../assets/drumkit/clap.wav'
import percmp3 from '../../../assets/drumkit/perc.wav'
import shakermp3 from '../../../assets/drumkit/shaker.wav'
import chantmp3 from '../../../assets/drumkit/chant.wav'

@observer
@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class Main extends Component {
  async componentDidMount() {
    state.trackList.addTrack({ label: 'hh' })
    state.trackList.addTrack({ label: 'kick' })
    state.trackList.addTrack({ label: 'snare' })
    state.trackList.addTrack({ label: 'clap' })
    state.trackList.addTrack({ label: 'perc' })
    state.trackList.addTrack({ label: 'shaker' })
    state.trackList.addTrack({ label: 'chant' })
    state.mixer.addChannel({ label: 'hh' })
    state.mixer.addChannel({ label: 'kick' })
    state.mixer.addChannel({ label: 'snare' })
    state.mixer.addChannel({ label: 'clap' })
    state.mixer.addChannel({ label: 'perc' })
    state.mixer.addChannel({ label: 'shaker' })
    state.mixer.addChannel({ label: 'chant' })

    state.mixer.channels[3].setGain(.5)

    state.trackList.tracks[0].connect(state.mixer.channels[0])
    state.trackList.tracks[1].connect(state.mixer.channels[1])
    state.trackList.tracks[2].connect(state.mixer.channels[2])
    state.trackList.tracks[3].connect(state.mixer.channels[3])
    state.trackList.tracks[4].connect(state.mixer.channels[4])
    state.trackList.tracks[5].connect(state.mixer.channels[5])
    state.trackList.tracks[6].connect(state.mixer.channels[6])

    state.trackList.tracks[0].addNote(0, true)
    state.trackList.tracks[0].addNote(8, true)
    state.trackList.tracks[0].addNote(16, true)
    state.trackList.tracks[0].addNote(24, true)
    state.trackList.tracks[0].addNote(32, true)
    state.trackList.tracks[0].addNote(40, true)
    state.trackList.tracks[0].addNote(48, true)
    state.trackList.tracks[0].addNote(56, true)

    state.trackList.tracks[1].addNote(0, true)
    state.trackList.tracks[1].addNote(8, true)

    state.trackList.tracks[2].addNote(16, true)
    state.trackList.tracks[2].addNote(48, true)

    state.trackList.tracks[3].addNote(16, true)

    state.trackList.tracks[5].addNote(0, true)

    state.trackList.tracks[6].addNote(8, true)
    state.trackList.tracks[6].addNote(24, true)
    state.trackList.tracks[6].addNote(40, true)
    state.trackList.tracks[6].addNote(56, true)

    await state.trackList.tracks[0].load(hhmp3)
    await state.trackList.tracks[1].load(kickmp3)
    await state.trackList.tracks[2].load(snaremp3)
    await state.trackList.tracks[3].load(clapmp3)
    await state.trackList.tracks[4].load(percmp3)
    await state.trackList.tracks[5].load(shakermp3)
    await state.trackList.tracks[6].load(chantmp3)

    state.trackList.tracks.forEach(track => {
      state.controller.addHandler(track.handler.bind(track.handler))
    })
  }

  render() {
    return <div styleName='main'>
      <ActionModals actionModals={state.actionModals} />

      <div styleName='row'>
        <Controller />
      </div>

      <div styleName='grow row'>
        <TrackList trackList={state.trackList} />
      </div>

      <div styleName='end'>
        <Mixer mixer={state.mixer} />
      </div>
    </div>
  }
}
