import styles from './editable-text.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class EditableText extends Component {
  static propTypes = {
    text: PropTypes.any,
    validate: PropTypes.func,
    onSubmit: PropTypes.func,
  }

  static defaultProps = {
    validate: () => {},
    onSubmit: () => {},
  }

  state = {
    isEditing: false,
  }

  toggleIsEditing = () => {
    this.setState({
      isEditing: !this.state.isEditing,
    })
  }

  onKeyPress = (evt) => {
    if (evt.key === 'Enter') {
      this.onSubmit()
    }
  }

  onSubmit = async () => {
    const text = this.el.value

    try {
      await this.props.validate(text)
      await this.props.onSubmit(text)
    } catch (e) {
      console.log('ERROR', e)
      // do nothing for now
    }
    this.toggleIsEditing()
  }

  render() {
    return <span styleName={`editable-text ${this.state.isEditing ? 'editing' : ''}`}>
      {
        this.state.isEditing && <input
          styleName='input'
          type='text'
          ref={el => this.el = el}
          defaultValue={this.props.text}
          onBlur={this.onSubmit}
          onKeyPress={this.onKeyPress}
        />
      }

      <span onDoubleClick={this.toggleIsEditing}>
        {this.props.text}
      </span>
    </span>
  }
}
