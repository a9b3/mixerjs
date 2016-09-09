import styles from './timer.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { observer } from 'mobx-react'

import state from 'state'

@observer
@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class Timer extends Component {
  state = {
    currentBeat: 0,
  }

  componentDidMount() {
    state.controller.addHandler(this.updateUi)
  }

  componentWillUnmount() {
    state.controller.removeHandler(this.updateUi)
  }

  updateUi = (beat) => {
    if (beat === this.state.currentBeat) {
      return
    }

    this.setState({
      currentBeat: beat,
    })
  }

  renderBeats = () => {
    let beats = []
    let counter = 0
    for (let i = 0; i < state.controller.bar; i++) {
      for (let j = 0; j < state.controller.beat * 8; j++) {
        beats.push(
          <div styleName={`beat ${this.state.currentBeat === counter && state.controller.isPlaying ? 'active' : ''}`}
            key={`${i}${j}`}>
          </div>
        )
        counter++
      }
    }
    return beats
  }

  render() {
    return <div styleName='timer'>
      {this.renderBeats()}
    </div>
  }
}
