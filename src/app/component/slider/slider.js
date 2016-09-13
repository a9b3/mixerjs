import styles from './slider.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import pureRender from 'helpers/pure-render'

@pureRender
@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class Slider extends Component {
  static propTypes = {
    value: PropTypes.number,
    onSelect: PropTypes.func,
  }

  static defaultProps = {
    value: 0,
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

  _setPosition = (evt, el, mouseClickOffset) => {
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

  getStyle = () => {
    if (!this.buttonEl) {
      return {}
    }
    const height = this.buttonEl.parentNode.offsetHeight - this.buttonEl.offsetHeight
    const top = height - (this.props.value * height)

    return {
      top: `${top}px`,
    }
  }

  render() {
    return <div styleName='slider'>
      <div styleName='bg' />

      <div styleName='button'
        ref={el => this.buttonEl = el}
        style={this.getStyle()}
        onMouseDown={this.onMouseDown}
        onDoubleClick={this.onDoubleClick}
      />
    </div>
  }
}
