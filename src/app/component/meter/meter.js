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
    featurePeak: PropTypes.bool,
    featureHorizontal: PropTypes.bool,
  }

  static defaultProps = {
    value: 0,
    secondaryValue: 0,
    maxCounter: 100,
    featurePeak: true,
    featureHorizontal: false,
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
    const str = `${percentage < 0 ? 0 : percentage}%`
    return this.props.featureHorizontal ? `translateX(${str})` : `translateY(${str})`
  }

  getStyle() {
    return {
      container: {
        flexDirection: this.props.featureHorizontal ? 'row' : 'column',
      },
      meter: {
        width: this.props.featureHorizontal ? '100%' : '100%',
        minWidth: '5px',
        height: this.props.featureHorizontal ? '100%' : '100%',
        minHeight: '5px',
        flexDirection: this.props.featureHorizontal ? 'row' : 'column',

      },
      peak: {
        width: this.props.featureHorizontal ? '8px' : '100%',
        height: this.props.featureHorizontal ? '100%' : '8px',
      }
    }
  }

  render() {
    return <div styleName='container' style={this.getStyle().container}>
      {
        this.props.featurePeak && <div
          styleName={`peak ${this.props.value >= 100 ? 'active' : ''}`}
          style={this.getStyle().peak}
        />
      }

      <div styleName='meter' style={this.getStyle().meter}>
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
