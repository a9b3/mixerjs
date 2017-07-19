import React, { Component, PropTypes } from 'react'
import { Router } from 'react-router'
import routes from './routes.js'

export default class Root extends Component {
  render() {
    const { history } = this.props
    return <Router history={history} routes={routes} />
  }
}
