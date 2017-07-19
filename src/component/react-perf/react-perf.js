import styles from './react-perf.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import Perf from 'react-addons-perf'

@CSSModules(styles, {
  allowMultiple     : true,
  errorWhenNotFound : false,
})
export default class ReactPerf extends Component {
  state = {
    started : false,
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = (evt) => {
    switch(evt.key) {
    case 'z':
      if (this.state.started) {
        this.stop()
      }
      this.start()
      break
    case 'x':
      if (this.state.started) {
        this.stop()
      }
      break
    case 'c':
      if (this.state.started) {
        this.stop()
      }
      this.printWasted()
      break
    }
  }

  start = () => {
    Perf.start()
    this.setState({ started: true })
  }

  stop = () => {
    Perf.stop()
    this.setState({ started: false })
  }

  printWasted = () => {
    this.setState({ log: Perf.printWasted() })
  }

  render() {
    return <div styleName='react-perf' />
  }
}
