import styles from './input-file.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import pureRender from '../../helpers/pure-render.js'

@pureRender
@CSSModules(styles, {
  allowMultiple     : true,
  errorWhenNotFound : false,
})
export default class InputFile extends Component {
  static propTypes = {
    label    : PropTypes.string,
    onChange : PropTypes.func,
  }

  static defaultProps = {
    label    : 'Choose a file',
    onChange : new Function(),
  }

  onChange = (evt) => {
    evt.preventDefault()

    const files = evt.dataTransfer ? evt.dataTransfer.files : evt.target.files
    for (let i = 0; i < files.length; i++) {
      files[i].preview = window.URL.createObjectURL(files[i])
    }
    this.props.onChange(files)
  }

  render() {
    return <div styleName='input-file'>
      <label styleName='label'>
        <div styleName='icon item'>
          <i className='fa fa-upload'></i>
        </div>

        <div styleName='text item'>
          {
            this.props.label
          }
        </div>

        <input type='file'
          styleName='input'
          onChange={this.onChange}
        />
      </label>
    </div>
  }
}
