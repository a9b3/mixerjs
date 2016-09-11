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
    featureHorizontal: PropTypes.bool,
  }

  static defaultProps = {
    rms: [0, 0],
    peak: [0, 0],
    featureHorizontal: false,
  }

  getStyle() {
    const style = {
      flexDirection: this.props.featureHorizontal ? 'column' : 'row',
    }
    return style
  }

  render() {
    const {
      rms,
      peak,
      styles, // don't include this in otherProps
      ...otherProps
    } = this.props

    return <div styleName='sound-meter' style={this.getStyle()}>
      <Meter
        {...otherProps}
        value={rms[0]}
        secondaryValue={peak[0]}
      />
      <Meter
        {...otherProps}
        value={rms[1]}
        secondaryValue={peak[1]}
      />
    </div>
  }
}
