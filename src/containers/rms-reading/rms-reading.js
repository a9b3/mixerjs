import React, { Component, PropTypes } from 'react'
import { raf } from 'helpers'

export default class RmsReading extends Component {
  static propTypes = {
    analyser : PropTypes.any,
  }

  state = {
    rms : [0, 0],
  }

  componentDidMount() {
    this.unsubscribe = raf(this._analyserHandler)
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.rms.every((el, i) => nextState.rms[i] === el)) {
      return false
    }
    return true
  }

  _analyserHandler = () => {
    const rms = this.props.analyser.getRms().map(rms => rms * 100)
    this.setState({ rms })
  }

  render() {
    return <div className={this.props.className}>
      <div>
        {this.state.rms[0].toFixed(1)}
      </div>
      <div>
        {this.state.rms[1].toFixed(1)}
      </div>
    </div>
  }
}
