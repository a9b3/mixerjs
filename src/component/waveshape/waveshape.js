import styles from './waveshape.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

@CSSModules(styles, {
  allowMultiple     : true,
  errorWhenNotFound : false,
})
export default class Waveshape extends Component {
  static propTypes = {
    waveshape : PropTypes.array,
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.waveshape === this.props.waveshape) return false
    return true
  }

  render() {
    return <div styleName='waveshape'>
      <div styleName='up'>
        {
          this.props.waveshape.map((wave, i) => <div
            key={`up_${i}`}
            styleName='bar'
            style={{
              height : `${wave[0].max*50}px`,
            }}
          />)
        }
      </div>
      <div styleName='down'>
        {
          this.props.waveshape.map((wave, i) => <div
            key={`down_${i}`}
            styleName='bar'
            style={{
              height : `${Math.abs(wave[0].min*50)}px`,
            }}
          />)
        }
      </div>
    </div>
  }
}
