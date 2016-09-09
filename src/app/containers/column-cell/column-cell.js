import styles from './column-cell.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import state from 'state'

@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class ColumnCell extends Component {
  static propTypes = {
    children: PropTypes.node,
    rowIndex: PropTypes.number,
    colIndex: PropTypes.number,
    tableKey: PropTypes.string,
  }

  state = {
    style: {},
  }

  _getStyle = () => {
    const style = {
      width: this.el.clientWidth,
      height: this.el.clientHeight,
    }
    return style
  }

  _getEventEmitter = () => {
    return state.table
  }

  componentDidMount() {
    this._getEventEmitter().on(this.props.tableKey, this.handleChange)

    setTimeout(() => {
      this._getEventEmitter().emit(this.props.tableKey, {
        style: this._getStyle(),
        rowIndex: this.props.rowIndex,
        colIndex: this.props.colIndex,
      })
    }, 0);
  }

  handleChange = ({ style, rowIndex, colIndex, force }) => {
    if (this.props.rowIndex === rowIndex) {
      if (style.height > this._getStyle().height || force) {
        this.setState({
          style: {
            height: style.height,
          },
        })
      }
    }

    if (this.props.colIndex === colIndex) {
      if (style.width > this._getStyle().width || force) {
        this.setState({
          style: {
            width: style.width,
          },
        })
      }
    }
  }

  render() {
    return <div styleName='column-cell'
      ref={el => this.el = el}
      style={this.state.style}>

      {this.props.children}
    </div>
  }
}
