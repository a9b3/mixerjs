import styles from './main.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { observer } from 'mobx-react'
import state from 'state'

import Helmet from 'react-helmet'
import Mixer from '../mixer/mixer.js'
import ActionModals from '../action-modals/action-modals.js'
import TrackList from '../track-list/track-list.js'
import Controller from '../controller/controller.js'
import ReactPerf from '../../component/react-perf/react-perf.js'

import favicon from 'assets/favicons/favicon.ico'
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
    state.controller.setTempo(90)

    state.trackList.addTrack({ label: 'hh' })
    state.mixer.addChannel({ label: 'hh' })
    state.trackList.tracks[0].connect(state.mixer.channels[0])
    state.trackList.tracks[0].addNote(0, true)
    state.trackList.tracks[0].addNote(32, true)
    state.trackList.tracks[0].addNote(64, true)
    state.trackList.tracks[0].addNote(96, true)
    state.trackList.tracks[0].addNote(128, true)
    state.trackList.tracks[0].addNote(160, true)
    state.trackList.tracks[0].addNote(192, true)
    state.trackList.tracks[0].addNote(224, true)
    state.trackList.tracks[0].setBar(1)
    state.mixer.channels[0].setGain(.8)
    state.mixer.channels[0].setPan(-.1)

    state.trackList.addTrack({ label: 'kick' })
    state.mixer.addChannel({ label: 'kick' })
    state.trackList.tracks[1].connect(state.mixer.channels[1])
    state.trackList.tracks[1].addNote(0, true)
    state.trackList.tracks[1].addNote(64, true)
    state.trackList.tracks[1].addNote(128, true)
    state.trackList.tracks[1].addNote(192, true)
    state.trackList.tracks[1].setBar(1)

    state.trackList.addTrack({ label: 'snare' })
    state.mixer.addChannel({ label: 'snare' })
    state.trackList.tracks[2].connect(state.mixer.channels[2])
    state.trackList.tracks[2].addNote(64, true)
    state.trackList.tracks[2].addNote(192, true)
    state.trackList.tracks[2].addNote(320, true)
    state.trackList.tracks[2].addNote(448, true)
    state.trackList.tracks[2].addNote(480, true)

    state.trackList.addTrack({ label: 'clap' })
    state.mixer.addChannel({ label: 'clap' })
    state.trackList.tracks[3].connect(state.mixer.channels[3])

    state.trackList.addTrack({ label: 'perc' })
    state.mixer.addChannel({ label: 'perc' })
    state.trackList.tracks[4].connect(state.mixer.channels[4])
    state.mixer.channels[4].setGain(.5)
    state.mixer.channels[4].setPan(-.4)

    state.trackList.addTrack({ label: 'kick2' })
    state.mixer.addChannel({ label: 'kick2' })
    state.trackList.tracks[5].connect(state.mixer.channels[5])

    state.trackList.addTrack({ label: 'chant' })
    state.mixer.addChannel({ label: 'chant' })
    state.trackList.tracks[6].connect(state.mixer.channels[6])

    await Promise.all([
      state.trackList.tracks[0].load(hhmp3),
      state.trackList.tracks[1].load(kickmp3),
      state.trackList.tracks[2].load(snaremp3),
      state.trackList.tracks[3].load(clapmp3),
      state.trackList.tracks[4].load(percmp3),
      state.trackList.tracks[5].load(shakermp3),
      state.trackList.tracks[6].load(chantmp3),
    ])

    state.trackList.tracks.forEach(track => {
      state.controller.addHandler(track.handler)
    })
  }

  render() {
    return <div styleName='main'>
      {
        CONFIG.debug && <ReactPerf />
      }
      <Helmet title='Mixerjs - Beat maker'
        link={[{
          rel: 'icon',
          type: 'image/ico',
          sizes: '16x16',
          href: favicon,
        }]}
      />

      <a styleName='social' href='https://github.com/esayemm/mixerjs' target='_blank'>
        <i className='fa fa-github'></i>
      </a>

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
