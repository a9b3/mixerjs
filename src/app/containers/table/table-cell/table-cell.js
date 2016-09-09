import styles from './table-cell.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class TableCell extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired, // content of cell
    colIndex: PropTypes.number,
    rowIndex: PropTypes.number,
    table: PropTypes.object,

    fixed: PropTypes.bool,
  }

  state = {
    style: {},
  }

  componentDidMount() {
    this._getEventEmitter().on(this._getKey(), this.handleChange)

    setTimeout(() => {
      this._getEventEmitter().update({
        style: this._getStyle(),
        rowIndex: this.props.rowIndex,
        colIndex: this.props.colIndex,
        fixed: this.props.fixed,
      })
    }, 0);
  }

  _getKey = () => `${this.props.rowIndex}${this.props.colIndex}`
  _getEventEmitter = () => this.props.table

  _getStyle = () => {
    const style = {
      width: this.el.clientWidth,
      height: this.el.clientHeight,
    }
    return style
  }


  handleChange = (table) => {
    const { style } = table[this.props.rowIndex][this.props.colIndex]
    this.setState({ style: Object.assign({}, this.state.style, style) })
  }

  render() {
    return <div styleName='table-cell'
      ref={el => this.el = el}
      style={this.state.style}>

      {this.props.children}
    </div>
  }
}
