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
    averages: [0, 0],
  }

  componentDidMount() {
    this.unsubcribe = raf(this.analyserHandler.bind(this))
  }

  componentWillUnmount() {
    this.unsubcribe()
  }

  averagesQueue = []
  analyserHandler = () => {
    const averages = this.props.channel.analyser.getByteFrequencyData().map(side => {
      const sum = side.reduce((sum, i) => sum + i, 0)
      const average = sum / side.length
      return average
    })

    if (this.averagesQueue.length < 5) {
      this.averagesQueue.push(averages)
    } else {
      if (this.averagesQueue.every(a => a[0] === averages[0] && a[1] === averages[1])) {
        this.setState({ averages: [0, 0] })
        return
      } else {
        this.averagesQueue.shift()
        this.averagesQueue.push(averages)
      }
    }

    this.setState({ averages })
  }

  render() {
    const {
      channel,
    } = this.props

    return <div styleName='channel'>
      <div styleName='pan'>
        <Knob onSelect={channel.setPan.bind(channel)} />

        <div styleName='reading'>
          Pan {channel.panPosition.toFixed(2)}
        </div>
      </div>

      <div styleName='header'>
        <div styleName={`button ${channel.isMute ? 'active' : ''}`}
          onClick={channel.toggleMute.bind(channel)}>
          Mute
        </div>
      </div>

      <div styleName='gain'>
        <SoundMeter analyser={channel.analyser} />

        <div styleName='slider'>
          <Slider onSelect={(value) => {
            const diff = 1 - value
            channel.setGain(diff)
          }} />
        </div>
      </div>

      <div styleName='end col'>
        <div styleName='reading'>
          <div>
            {this.state.averages[0].toFixed(1)}
          </div>
          <div>
            {this.state.averages[1].toFixed(1)}
          </div>
        </div>

        <div styleName='label'>
          <EditableText
            text={channel.label}
            onSubmit={(text) => {
              channel.setLabel(text)
            }}
          />
        </div>
      </div>
    </div>
  }
}
