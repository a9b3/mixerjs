import styles from './table-row.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class TableRow extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    rowIndex: PropTypes.number,
    table: PropTypes.object,
  }

  state = {
    style: {},
  }

  render() {
    const children = this.props.children.map((child, i) => {
      return React.cloneElement(child, {
        rowIndex: this.props.rowIndex,
        colIndex: i,
        table: this.props.table,
      })
    })

    return <div styleName='table-row'
      style={this.state.style}
      ref={el => this.el = el}
    >
      {children}
    </div>
  }
}
