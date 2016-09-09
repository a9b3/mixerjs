import styles from './slider.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class Slider extends Component {
  static propTypes = {
    onSelect: PropTypes.func,
  }

  static defaultProps = {
    onSelect: () => {},
  }

  mouseClickOffset = null
  buttonEl = null
  state = {
    position: {
      y: 0,
    },
  }

  onMouseDown = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()

    this.mouseClickOffset = evt.clientY - (evt.target.offsetTop + evt.target.parentNode.offsetTop)

    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
  }

  onMouseUp = (evt) => {
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
  }

  _getYPos = (evt, el, mouseClickOffset = 0) => {
    let yPos = evt.clientY - el.parentNode.offsetTop - mouseClickOffset
    if (yPos < 0) {
      yPos = 0
    }
    if (yPos > el.parentNode.offsetHeight - el.offsetHeight) {
      yPos = el.parentNode.offsetHeight - el.offsetHeight
    }
    return yPos
  }

  _setPosition = (evt, el, mouseClickOffset = 0) => {
    const yPos = this._getYPos(evt, el, mouseClickOffset)
    const value = yPos / (el.parentNode.offsetHeight - el.offsetHeight)
    this.props.onSelect(value)

    this.setState({
      position: {
        y: yPos,
      },
    })
  }

  onMouseMove = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()

    window.requestAnimationFrame(() => {
      this._setPosition(evt, this.buttonEl, this.mouseClickOffset)
    })
  }

  onClick = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()

    this._setPosition(evt, this.buttonEl, this.mouseClickOffset)
  }

  render() {
    return <div styleName='slider' onClick={this.onClick}>
      <div styleName='bg'>
      </div>
      <div styleName='button'
        style={{
          top: `${this.state.position.y}px`,
        }}
        ref={el => this.buttonEl = el}
        onMouseDown={this.onMouseDown}
        onDoubleClick={this.onDoubleClick}
      />
    </div>
  }
}
