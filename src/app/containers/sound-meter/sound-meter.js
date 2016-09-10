import styles from './sound-meter.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import Meter from '../../component/meter/meter.js'
import raf from 'helpers/raf'

@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class SoundMeter extends Component {
  static propTypes = {
    analyser: PropTypes.object,
  }

  state = {
    rms: [ 0, 0 ],
    peak: [ 0, 0 ],
  }

  componentDidMount() {
    this.unsubscribe = raf(this._analyserHandler.bind(this))
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  _analyserHandler = () => {
    const rms = this.props.analyser.getRms().map(rms => rms * 150)
    const peak = this.props.analyser.getPeaks().map(peak => peak * 150)
    this.setState({ rms, peak })
  }

  render() {
    return <div styleName='sound-meter'>
      <Meter
        value={this.state.rms[0]}
        secondaryValue={this.state.peak[0]}
      />
      <Meter
        value={this.state.rms[1]}
        secondaryValue={this.state.peak[1]}
      />
    </div>
  }
}
