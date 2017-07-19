import styles from './compat-check.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

@CSSModules(styles, {
  allowMultiple     : true,
  errorWhenNotFound : false,
})
export default class CompatCheck extends Component {
  static propTypes = {
    children : PropTypes.any,
  }

  state = {
    ready : false,
    error : false,
  }

  componentWillMount() {
    let error
    if (navigator.userAgent.indexOf('Chrome') === -1) {
      error = 'Sorry, this is only compatible with Chrome for now.'
    }

    this.setState({
      ready : true,
      error,
    })
  }

  render() {
    if (!this.state.ready) {
      return <span></span>
    }

    if (this.state.error) {
      return <div styleName='compat-check'>
        {this.state.error}
      </div>
    }

    return this.props.children
  }
}
