import styles from './track.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { observer } from 'mobx-react'

import state from 'state'
import SoundMeter from '../sound-meter-auto/sound-meter-auto.js'
import Pattern from '../pattern/pattern.js'
import EditableText from '../../component/editable-text/editable-text.js'

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

  selectChangeBar = (evt) => {
    this.props.track.setBar(evt.target.value)
  }

  setLabel = (text) => {
    this.props.track.setLabel(text)
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
          <div styleName='label item'>
            <EditableText
              text={this.props.track.label}
              onSubmit={this.setLabel}
            />
          </div>

          <div styleName='item'>
            <div styleName='label'>
              Out:
            </div>
            <select styleName='select'
              value={selected !== undefined ? selected : 'none'}
              onChange={this.onSelectChange}>
              <option value={'none'}>None</option>
              {
                state.mixer.channels.map((channel, i) => <option
                  key={channel.id}
                  value={i}>
                  {i}: ({channel.label})
                </option>)
              }
            </select>
          </div>

          <div styleName='item'>
            <div styleName='label'>
              Bar
            </div>
            <select styleName='select'
              value={this.props.track.bar}
              onChange={this.selectChangeBar}>
              {
                [1,2,3,4,5,6,7,8].map((value, i) => <option
                  key={i}
                  value={value}
                >
                  {value} bars
                </option>)
              }
            </select>
          </div>
        </div>

        <div styleName='right'>
          <div styleName='meters'>
            <SoundMeter analyser={this.props.track.analyser} featurePeak={false} />
          </div>
        </div>
      </div>
    </div>
  }
}
