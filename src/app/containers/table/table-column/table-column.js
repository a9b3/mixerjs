import styles from './table-column.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import state from 'state'

@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class TableColumn extends Component {
  static propTypes = {
    children: PropTypes.any,
    colIndex: PropTypes.number,
    tableKey: PropTypes.string, // key to identify which table this cell belongs to
  }

  state = {
    style: {},
  }

  // componentDidMount() {
  //   this._getEventEmitter().on(this.props.tableKey, this.handleChange)
  //
  //   setTimeout(() => {
  //     this._getEventEmitter().emit(this.props.tableKey, {
  //       type: 'column',
  //       style: this._getStyle(),
  //       rowIndex: this.props.rowIndex,
  //       colIndex: this.props.colIndex,
  //     })
  //   }, 0)
  // }
  //
  // _getStyle = () => {
  //   const style = {
  //     width: this.el.clientWidth,
  //   }
  //   return style
  // }
  //
  // _getEventEmitter = () => {
  //   return state.table
  // }
  //
  // handleChange = ({ type, style, rowIndex, colIndex }) => {
  //
  // }

  render() {
    const children = React.Children.map(
      this.props.children,
      (child, i) => React.cloneElement(child, {
        rowIndex: i,
      })
    )

    return <div styleName='table-column'
      ref={el => this.el = el}
      style={this.state.style}
    >
      {children}
    </div>
  }
}
