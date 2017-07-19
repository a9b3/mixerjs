/*
 * This component will not re-render if two states are shallow equal.
 */
import React, { Component } from 'react'
import shallowCompare from 'react-addons-shallow-compare'

export default (ComposedComponent) => class extends Component {
  static displayName = ComposedComponent.displayName

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  render() {
    return <ComposedComponent {...this.props} />
  }
}
