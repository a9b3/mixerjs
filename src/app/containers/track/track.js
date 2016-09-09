import styles from './track.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { observer } from 'mobx-react'

import state from 'state'
import SoundMeter from '../sound-meter/sound-meter.js'
import Pattern from '../pattern/pattern.js'

@observer
@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class Track extends Component {
  static propTypes = {
    track: PropTypes.object,
  }

  onSelectChange = (evt) => {
    const channel = state.mixer.channels[evt.target.value]
    this.props.track.sends.forEach(send => this.props.track.disconnect(send))
    if (channel) {
      this.props.track.connect(channel)
    }
  }

  render() {
    let selected
    if (this.props.track.sends.length > 0) {
      for (let i = 0; i < state.mixer.channels.length; i++) {
        if (state.mixer.channels[i] === this.props.track.sends[0]) {
          selected = i
        }
      }
    }

    return <div styleName='track'>
      <div styleName='left'>
        <div styleName='box'>
          <div styleName='label'>
            {this.props.track.label}
          </div>

          <select styleName='select'
            value={selected !== undefined ? selected : 'none'}
            onChange={this.onSelectChange}>
            <option value={'none'}>None</option>
            {
              state.mixer.channels.map((channel, i) => <option
                key={channel.id}
                value={i}>
                Channel {i} ({channel.label})
              </option>)
            }
          </select>
        </div>

        <div styleName='box'>
          <div styleName='meters'>
            <SoundMeter analyser={this.props.track.analyser} />
          </div>
        </div>
      </div>
    </div>
  }
}
