/*
 * Taken from http://benchling.engineering/deep-dive-react-perf-debugging/
 * This higher-order-component will log out changes that are avoidable, use for
 * debugging.
 *
 * ex.
 *
 * @whyDidYouUpdate
 * class Foo extends Component { ...
 */
import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

function isRequiredUpdateObject(o) {
  return Array.isArray(o) || (o && o.constructor === Object.prototype.constructor)
}

function notify(o1, o2, status) {
  console.warn('Update %s', status)
  console.log('%cbefore', 'font-weight: bold', o1)
  console.log('%cafter', 'font-weight: bold', o2)
}

function deepDiff(o1, o2, name) {
  if (!_.isEqual(o1, o2)) {
    console.group(name)
    if ([o1, o2].every(_.isFunction)) {
      notify(o1, o2, 'avoidable?')
    } else if (![o1, o2].every(isRequiredUpdateObject)) {
      notify(o1, o2, 'required')
    } else {
      const keys = _.union(_.keys(o1), _.keys(o2))
      for (const key of keys) {
        deepDiff(o1[key], o2[key], key)
      }
    }
    console.groupEnd()
  } else if (o1 !== o2) {
    console.group(name)
    notify(o1, o2, 'avoidable!')
    if (_.isObject(o1) && _.isObject(o2)) {
      const keys = _.union(_.keys(o1), _.keys(o2))
      for (const key of keys) {
        deepDiff(o1[key], o2[key], key)
      }
    }
    console.groupEnd()
  }
}

export default (ComposedComponent) => class extends Component {
  componentDidUpdate(prevProps, prevState) {
    const prev = {
      props: prevProps,
      state: prevState,
    }

    const current = {
      props: this.props,
      state: this.state,
    }

    deepDiff(prev, current, ComposedComponent.displayName)
  }

  render() {
    return <ComposedComponent {...this.props} />
  }
}
