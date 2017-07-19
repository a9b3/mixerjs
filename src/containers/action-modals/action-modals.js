import styles from './action-modals.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { observer } from 'mobx-react'

import Add from './add/add.js'

@observer
@CSSModules(styles, {
  allowMultiple     : true,
  errorWhenNotFound : false,
})
export default class ActionModals extends Component {
  static propTypes = {
    actionModals : PropTypes.object,
  }

  renderModal = (key) => {
    switch(key) {
    case 'add':
      return <Add />
    }
  }

  render() {
    if (this.props.actionModals.stack.length === 0) return

    return <div styleName='action-modals'>
      <div styleName='modal'>
        <div styleName='header'>
          <div styleName='item'>
            {this.props.actionModals.peek().display}
          </div>

          <div styleName='end'>
            <div styleName='item' onClick={() => this.props.actionModals.closeModal()}>
              <i className='fa fa-close'></i>
            </div>
          </div>
        </div>

        <div styleName='content'>
          {this.renderModal(this.props.actionModals.peek().key)}
        </div>
      </div>
    </div>
  }
}
