import styles from './knob.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class Knob extends Component {
  static propTypes = {
    onSelect: PropTypes.func,
    ticks: PropTypes.number,
    pxRange: PropTypes.number,
  }

  static defaultProps = {
    onSelect: () => {},
    ticks: 10,
    pxRange: 120,
  }

  state = {
    position: 0,
  }

  renderTicks = () => {
    const ticks = []
    for (let i = 0; i < this.props.ticks; i++) {
      ticks.push(<div styleName='tick' style={{
        transform: `rotate(${(i+1) * (180/this.props.ticks)}deg)`
      }}>
      </div>)
    }
    return ticks
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
      position: 0,
    })
  }

  _select = (evt) => {
    let diff = this.startPosition - evt.clientY

    if (Math.abs(diff) > this.props.pxRange) return

    const percentage = diff/this.props.pxRange
    this.props.onSelect(percentage)
    this.setState({
      position: diff,
    })
  }

  render() {
    return <div styleName='knob'>
      {/* <div styleName='click-guide'> */}
      {/* </div> */}

      <div styleName='knob-inner' onMouseDown={this.onMouseDown} onDoubleClick={this.onDoubleClick}>
        <div styleName='knob-indicator' style={{
          transform: `rotate(${this.state.position}deg)`
        }}>
        </div>
      </div>

      {/* {this.renderTicks()} */}
    </div>
  }
}
