import styles from './add.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import state from 'state'

@CSSModules(styles, {
  allowMultiple     : true,
  errorWhenNotFound : false,
})
export default class Add extends Component {
  onSubmit = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()

    const label = this.labelEl.value
    state.mixer.addChannel({ label })
    state.actionModals.closeModal()
  }

  render() {
    return <div styleName='add'>
      <form styleName='form'
        onSubmit={this.onSubmit}>

        <input
          styleName='input'
          type='text'
          placeholder='Label'
          ref={el => this.labelEl = el}
        />

        <button styleName='button'>Add</button>

      </form>
    </div>
  }
}
