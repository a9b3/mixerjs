import React, { Component, PropTypes } from 'react'

import SoundMeter from './sound-meter.js'
import { raf } from 'helpers'

export default class SoundMeterAuto extends Component {
  static propTypes = {
    analyser    : PropTypes.any,
    featurePeak : PropTypes.bool,
    featureRms  : PropTypes.bool,
  }

  static defaultProps = {
    featurePeak : false,
    featureRms  : true,
  }

  state = {
    rms  : [0, 0],
    peak : [0, 0],
  }

  componentDidMount() {
    this.unsubscribe = raf(this._analyserHandler)
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.rms.every((el, i) => nextState.rms[i] === el) && this.state.peak.every((el, i) => nextState.peak[i] === el)) {
      return false
    }
    return true
  }

  _analyserHandler = () => {
    let rms = [0, 0]
    let peak = [0, 0]

    if (this.props.featureRms) {
      rms = this.props.analyser.getRms().map(rms => rms * 100)
    }
    if (this.props.featurePeak) {
      peak = this.props.analyser.getPeaks().map(peak => peak * 100)
    }

    this.setState({ rms, peak })
  }

  render() {
    return <SoundMeter
      {...this.props}
      peak={this.state.peak}
      rms={this.state.rms}
    />
  }
}
