import styles from './track.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { observer } from 'mobx-react'

import state from 'state'
import SoundMeter from '../sound-meter/sound-meter-auto.js'
import Pattern from '../pattern/pattern.js'
import EditableText from '../../component/editable-text/editable-text.js'
import MiniDropdown from '../../component/mini-dropdown/mini-dropdown.js'
import InputFile from '../../component/input-file/input-file.js'

@observer
@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class Track extends Component {
  static propTypes = {
    track: PropTypes.object,
  }

  state = {
    inputLabel: null,
  }

  onSelectChange = (value) => {
    const channel = state.mixer.channels[value]
    this.props.track.sends.forEach(send => this.props.track.disconnect(send))
    if (channel) {
      this.props.track.connect(channel)
    }
  }

  selectChangeBar = (value) => {
    this.props.track.setBar(value)
  }

  setLabel = (text) => {
    this.props.track.setLabel(text)
  }

  validateLabel = (text) => {
    if (text.trim() === '') {
      throw new Error('Cannot be empty')
    }
  }

  selectFile = async ([ file ]) => {
    await this.props.track.load(file.preview)
    this.setState({ inputLabel: file.name })
  }

  render() {
    let selected
    if (this.props.track.sends.length > 0) {
      for (let i = 0; i < state.mixer.channels.length; i++) {
        if (state.mixer.channels[i] === this.props.track.sends[0]) {
          selected = i
        }
      }
    }

    return <div styleName='track'>
      <div styleName='left'>
        <div styleName='box'>
          <div styleName='label'>
            <i className='fa fa-file-audio-o'></i>
            <EditableText
              text={this.props.track.label}
              onSubmit={this.setLabel}
              validate={this.validateLabel}
            />
          </div>

          <div styleName='file'>
            <InputFile
              label={this.state.inputLabel || this.props.track.url}
              onChange={this.selectFile}
            />
          </div>

          <div styleName='buttons item'>
            <MiniDropdown
              label={'O'}
              value={selected}
              onChange={this.onSelectChange}
              options={
                state.mixer.channels.map((channel, i) => <option key={channel.id} value={i}>
                  {i+1}: ({channel.label})
                </option>)
              }
            />

            <MiniDropdown
              label={'B'}
              value={this.props.track.bar}
              onChange={this.selectChangeBar}
              options={
                [1,2,3,4,5,6,7,8].map((value, i) => <option
                  key={i}
                  value={value}
                >
                  {value}
                </option>)
              }
            />
          </div>
        </div>

        <div styleName='right'>
          <div styleName='meters'>
            <SoundMeter analyser={this.props.track.analyser} featurePeak={false} />
          </div>
        </div>
      </div>
    </div>
  }
}
