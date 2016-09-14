import styles from './channel.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { observer } from 'mobx-react'

import Meter from '../../component/meter/meter.js'
import Slider from '../../component/slider/slider.js'
import Knob from '../../component/knob/knob.js'
import SoundMeter from '../sound-meter/sound-meter-auto.js'
import EditableText from '../../component/editable-text/editable-text.js'
import RmsReading from '../rms-reading/rms-reading.js'

@observer
@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class Channel extends Component {
  static propTypes = {
    channel: PropTypes.object,
    position: PropTypes.number,
  }

  setGain = (value) => {
    const diff = 1 - value
    this.props.channel.setGain(diff)
  }

  toggleMute = () => {
    this.props.channel.toggleMute()
  }

  setPan = (value) => {
    this.props.channel.setPan(value)
  }

  setLabel = (text) => {
    this.props.channel.setLabel(text)
  }

  render() {
    const {
      channel,
    } = this.props

    return <div styleName='channel'>
      <div styleName='pan'>
        <Knob onSelect={this.setPan} value={channel.panPosition} />

        <div styleName='reading'>
          Pan {channel.panPosition.toFixed(2)}
        </div>
      </div>

      <div styleName='header'>
        <div styleName={`button ${channel.isMute ? 'active' : ''}`}
          onClick={this.toggleMute}>
          Mute
        </div>
      </div>

      <div styleName='gain'>
        <SoundMeter analyser={this.props.channel.analyser} featurePeak={true} />

        <div styleName='slider'>
          <Slider onSelect={this.setGain} value={channel.gain} />
        </div>
      </div>

      <div styleName='end col'>
        <RmsReading analyser={this.props.channel.analyser} className={styles.reading}/>

        <div styleName='label'>
          {this.props.position}: <EditableText
            text={channel.label}
            onSubmit={this.setLabel}
          />
        </div>
      </div>
    </div>
  }
}
