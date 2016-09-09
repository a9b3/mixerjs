import styles from './meter.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class Meter extends Component {
  static propTypes = {
    value: PropTypes.number,
  }

  static defaultProps = {
    value: 0,
  }

  shouldComponentUpdate(nextProps) {
    if (Math.round(nextProps.value) === Math.round(this.props.value)) {
      return false
    }
    return true
  }

  render() {
    return <div styleName='container'>
      <div styleName={`peak ${this.props.value >= 100 ? 'active' : ''}`}>
      </div>
      <div styleName='meter'>
        <div styleName='inner' style={{
          height: `${this.props.value > 100 ? 100 : this.props.value}%`,
        }}/>
      </div>
    </div>
  }
}
