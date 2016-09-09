import styles from './sound-meter.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import Meter from '../meter/meter.js'

function raf(cb) {
  function fn() {
    cb()
    window.requestAnimationFrame(fn)
  }
  const interval = window.requestAnimationFrame(fn)

  return () => {
    window.cancelAnimationFrame(interval)
  }
}

@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class SoundMeter extends Component {
  static propTypes = {
    analyser: PropTypes.object,
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
    const averages = this.props.analyser.getByteFrequencyData().map(side => {
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
    return <div styleName='sound-meter'>
      <Meter value={this.state.averages[0]}/>
      <Meter value={this.state.averages[1]}/>
    </div>
  }
}
