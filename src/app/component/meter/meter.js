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
    secondaryValue: PropTypes.number,
    maxCounter: PropTypes.number,
  }

  static defaultProps = {
    value: 0,
    secondaryValue: 0,
    maxCounter: 50,
  }

  state = {
    runningMax: 0,
  }

  counter = 0
  componentWillReceiveProps(nextProps) {
    if (nextProps.secondaryValue > this.state.runningMax) {
      this.setState({ runningMax: nextProps.secondaryValue })
    }

    if (this.counter === this.props.maxCounter) {
      this.counter = 0
      this.setState({ runningMax: nextProps.secondaryValue })
    }
    this.counter++
  }

  shouldComponentUpdate(nextProps) {
    if (Math.round(nextProps.value) === Math.round(this.props.value)) {
      return false
    }
    return true
  }

  valueToTransformTranslate(value) {
    const percentage = 100 - value
    return `translateY(${percentage < 0 ? 0 : percentage}%)`
  }

  render() {
    return <div styleName='container'>
      <div styleName={`peak ${this.props.value >= 100 ? 'active' : ''}`} />

      <div styleName='meter'>
        <div styleName='max'
          style={{
            transform: this.valueToTransformTranslate(this.state.runningMax),
          }}
        />

        <div styleName='secondary'
          style={{
            transform: this.valueToTransformTranslate(this.props.secondaryValue),
          }}
        />

        <div styleName='inner'
          style={{
            transform: this.valueToTransformTranslate(this.props.value),
          }}
        />
      </div>
    </div>
  }
}
