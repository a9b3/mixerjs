import styles from './controller.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { observer } from 'mobx-react'
import state from 'state'
import moment from 'moment'
import raf from 'helpers/raf'

function pad(str) {
  str = String(str)
  if (str.length < 2) {
    return '0' + str
  }
  return str
}

@observer
@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class Controller extends Component {
  state = {
    currentBeat: 0,
    currentBar: 0,
    currentBarsPlayed: 0,

    startTime: Date.now(),
    isPlaying: false,
  }

  componentDidMount() {
    state.controller.addHandler(this.setBeatDisplay)
  }

  componentWillUnmount() {
    state.controller.removeHandler(this.setBeatDisplay)
  }

  play = () => {
    state.controller.play()

    this.setState({
      startTime: Date.now(),
      isPlaying: true,
    })

    this.unsubscribe = raf(() => {
      this.setState({})
    })
  }

  stop = () => {
    state.controller.stop()
    this.unsubscribe()
    this.setState({
      isPlaying: false,
      currentBeat: 0,
      currentBar: 0,
      currentBarsPlayed: 0,
    })
  }

  getDisplayTime = () => {
    const now = moment(Date.now())
    const then = moment(this.state.startTime)

    const str = moment.utc(now.diff(then)).format('mm:ss:SS')
    return str
  }

  setBeatDisplay = (current32ndNote) => {
    const beat = Math.floor(((current32ndNote / 32) * state.controller.beat)) + 1
    if (beat !== this.state.currentBeat) {
      const currentBeat = Math.floor((((current32ndNote % 32) / 32) * state.controller.beat)) + 1
      const currentBar = Math.ceil(beat/state.controller.beat)
      const currentBarsPlayed = current32ndNote === 0 ? this.state.currentBarsPlayed + 1 : this.state.currentBarsPlayed

      this.setState({
        currentBeat,
        currentBar,
        currentBarsPlayed,
      })
    }
  }

  render() {
    return <div styleName='controller'>
      <div styleName='display section'>
        <div styleName='item'>
          {state.controller.bpm.toFixed(2)} bpm
        </div>

        <div styleName='item'>
          bars: {state.controller.bar}
        </div>

        <div styleName='item'>
          {
            this.state.isPlaying
              ? this.getDisplayTime()
              : '00:00:00'
          }
        </div>

        <div styleName='item'>
          <div>
            {pad(this.state.currentBarsPlayed)}.
            {pad(this.state.currentBar)}.
            {pad(this.state.currentBeat)}
          </div>
        </div>
      </div>

      <div styleName='controls section'>
        <div styleName={`item ${state.controller.isPlaying ? 'active' : ''}`}
          onClick={this.play}>
          <i className='fa fa-play'></i>
        </div>
        <div styleName='item'
          onClick={this.stop}>
          <i className='fa fa-stop'></i>
        </div>
        <div styleName={`item ${state.controller.isMetronomeActive ? 'active' : ''}`}
          onClick={state.controller.toggleMetronome.bind(state.controller)}>
          M
        </div>
      </div>

      <div styleName='section'>
      </div>
    </div>
  }
}
