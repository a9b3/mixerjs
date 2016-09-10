import styles from './demo.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import Meter from '../component/meter/meter.js'

@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class Demo extends Component {
  static propTypes = {

  }

  static defaultProps = {

  }

  state = {
    value: 0,
  }

  componentDidMount() {
    setInterval(() => {
      const value = Math.random() * 50
      const secondaryValue = value + 20

      this.setState({
        value,
        secondaryValue,
      })
    }, 100)
  }

  render() {
    return <div styleName='demo'>
      Hello World!

      <div style={{
        marginLeft: '100px',
        height: '200px',
        width: '20px',
      }}>
        <Meter value={this.state.value} secondaryValue={this.state.secondaryValue}></Meter>
      </div>
    </div>
  }
}
