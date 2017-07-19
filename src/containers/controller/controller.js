import styles from './controller.scss'
import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import { observer } from 'mobx-react'

import state from 'state'
import moment from 'moment'
import { raf } from 'helpers'
import EditableText from '../../component/editable-text/editable-text.js'

@observer
@CSSModules(styles, {
  allowMultiple     : true,
  errorWhenNotFound : false,
})
export default class Controller extends Component {
  state = {
    startTime : Date.now(),
    isPlaying : false,
  }

  play = () => {
    state.controller.play()

    this.setState({
      startTime : Date.now(),
      isPlaying : true,
    })

    this.unsubscribe = raf(() => {
      this.setState({})
    })
  }

  stop = () => {
    state.controller.stop()
    this.unsubscribe()
    this.setState({
      isPlaying : false,
    })
  }

  getDisplayTime = () => {
    const now = moment(Date.now())
    const then = moment(this.state.startTime)

    const str = moment.utc(now.diff(then)).format('mm:ss:SS')
    return str
  }

  setTempo = (text) => {
    state.controller.setTempo(Number(text))
  }

  validateTempo = (text) => {
    if (!Number(text)) {
      throw new Error('must be number')
    }
  }

  render() {
    return <div styleName='controller'>
      <div styleName='section'>
        <div styleName='display item'>
          <EditableText
            text={state.controller.bpm.toFixed(2)}
            validate={this.validateTempo}
            onSubmit={this.setTempo}
          />
        </div>

        <div styleName='display item'>
          { this.state.isPlaying ? this.getDisplayTime() : '00:00:00' }
        </div>

        <div styleName={`control item ${state.controller.isMetronomeActive ? 'active' : ''}`}
          onClick={state.controller.toggleMetronome.bind(state.controller)}>
          M
        </div>
      </div>

      <div styleName='section'>
        <div styleName={`control item ${state.controller.isPlaying ? 'active' : ''}`}
          onClick={this.play}>
          <i className='fa fa-play'></i>
        </div>

        <div styleName='control item'
          onClick={this.stop}>
          <i className='fa fa-stop'></i>
        </div>
      </div>
    </div>
  }
}
