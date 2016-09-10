import styles from './sound-meter.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import Meter from '../../component/meter/meter.js'

@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class SoundMeter extends Component {
  static propTypes = {
    rms: PropTypes.any,
    peak: PropTypes.any,
  }

  static defaultProps = {
    rms: [0, 0],
    peak: [0, 0],
  }

  render() {
    return <div styleName='sound-meter'>
      <Meter
        value={this.props.rms[0]}
        secondaryValue={this.props.peak[0]}
      />
      <Meter
        value={this.props.rms[1]}
        secondaryValue={this.props.peak[1]}
      />
    </div>
  }
}
