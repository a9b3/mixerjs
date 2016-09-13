import styles from './channel.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { observer } from 'mobx-react'

import { raf } from 'helpers'
import Meter from '../../component/meter/meter.js'
import Slider from '../../component/slider/slider.js'
import Knob from '../../component/knob/knob.js'
import SoundMeter from '../sound-meter/sound-meter.js'
import EditableText from '../../component/editable-text/editable-text.js'

@observer
@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class Channel extends Component {
  static propTypes = {
    channel: PropTypes.object,
  }

  state = {
    rms: [0, 0],
    peak: [0, 0],
  }

  componentDidMount() {
    this.unsubcribe = raf(this.analyserHandler.bind(this))
  }

  componentWillUnmount() {
    this.unsubcribe()
  }

  analyserHandler = () => {
    const rms = this.props.channel.analyser.getRms().map(rms => rms * 100)
    const peak = this.props.channel.analyser.getPeaks().map(peak => peak * 100)
    this.setState({ rms, peak })
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
        <SoundMeter rms={this.state.rms} peak={this.state.peak} />

        <div styleName='slider'>
          <Slider onSelect={this.setGain} value={channel.gain} />
        </div>
      </div>

      <div styleName='end col'>
        <div styleName='reading'>
          <div>
            {this.state.rms[0].toFixed(1)}
          </div>
          <div>
            {this.state.rms[1].toFixed(1)}
          </div>
        </div>

        <div styleName='label'>
          <EditableText
            text={channel.label}
            onSubmit={this.setLabel}
          />
        </div>
      </div>
    </div>
  }
}
