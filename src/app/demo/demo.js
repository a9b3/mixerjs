import styles from './demo.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import Meter from '../component/meter/meter.js'
import EditableText from '../component/editable-text/editable-text.js'
import Controller from '../containers/controller/controller.js'
import TrackComponent from '../containers/track/track.js'
import Track from '../mixer/Track.js'
import SoundMeter from '../containers/sound-meter/sound-meter.js'

const track = new Track({ label: 'yo' })

@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class Demo extends Component {
  static propTypes = {

  }

  static defaultProps = {

  }

  state = {
    text: 'hello world',
    value: 0,
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        value: Math.random() * 100,
      })
    }, 100)
  }

  render() {
    return <div styleName='demo'>
      <div style={{
        width: '100px',
        height: '100px',
      }}>
        <SoundMeter rms={[this.state.value, this.state.value]} featurePeak={false}></SoundMeter>
      </div>
      <TrackComponent track={track}></TrackComponent>
    </div>
  }
}
