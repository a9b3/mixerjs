import styles from './knob.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import pureRender from 'helpers/pure-render'

@pureRender
@CSSModules(styles, {
  allowMultiple     : true,
  errorWhenNotFound : false,
})
export default class Knob extends Component {
  static propTypes = {
    onSelect : PropTypes.func,
    pxRange  : PropTypes.number,
    value    : PropTypes.number,
  }

  static defaultProps = {
    onSelect : () => {},
    pxRange  : 120,
    value    : 0,
  }

  state = {
    position : 0,
  }

  onMouseDown = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()

    this.startPosition = this.state.position + evt.clientY

    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
  }

  onMouseUp = (evt) => {
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
  }

  onMouseMove = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()

    window.requestAnimationFrame(() => {
      this._select(evt)
    })
  }

  onDoubleClick = () => {
    this.props.onSelect(0)
    this.setState({
      position : 0,
    })
  }

  _select = (evt) => {
    const diff = this.startPosition - evt.clientY

    if (Math.abs(diff) > this.props.pxRange) return

    const percentage = diff/this.props.pxRange
    this.props.onSelect(percentage)
    this.setState({
      position : diff,
    })
  }

  getStyles = () => {
    const pos = this.props.value * this.props.pxRange

    return {
      transform : `rotate(${pos}deg)`,
    }
  }

  render() {
    return <div styleName='knob'>
      <div styleName='knob-inner' onMouseDown={this.onMouseDown} onDoubleClick={this.onDoubleClick}>
        <div styleName='knob-indicator' style={this.getStyles()}>
        </div>
      </div>
    </div>
  }
}
