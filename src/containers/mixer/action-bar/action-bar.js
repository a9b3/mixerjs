import styles from './action-bar.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import state from 'state'

@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class ActionBar extends Component {
  render() {
    return <div styleName='action-bar'>
      <div styleName='item'
        onClick={state.actionModals.showModal.bind(state.actionModals, 'add')}
      >
        <i className='fa fa-plus'></i>
      </div>
    </div>
  }
}
