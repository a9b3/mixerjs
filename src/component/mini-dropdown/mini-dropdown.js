import styles from './mini-dropdown.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import pureRender from '../../helpers/pure-render.js'

@pureRender
@CSSModules(styles, {
  allowMultiple     : true,
  errorWhenNotFound : false,
})
export default class MiniDropdown extends Component {
  static propTypes = {
    label    : PropTypes.string.isRequired,
    value    : PropTypes.any,
    onChange : PropTypes.func.isRequired,
    options  : PropTypes.any.isRequired,
  }

  state = {

  }

  onChange = (evt) => {
    this.props.onChange(evt.target.value)
  }

  render() {
    return <div styleName='mini-dropdown'>
      <div styleName='label item'>
        {this.props.label}
      </div>

      <div styleName='item'>
        <select styleName='select'
          value={this.props.value !== undefined ? this.props.value : 'none'}
          onChange={this.onChange}>

          <option value={'none'}>None</option>
          {this.props.options}
        </select>
      </div>
    </div>
  }
}
