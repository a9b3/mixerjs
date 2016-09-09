import styles from './table-row.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class TableRow extends Component {
  static propTypes = {
    children: PropTypes.any,
    rowIndex: PropTypes.number,
    table: PropTypes.any,
  }

  render() {
    const children = this.props.children.map((child, i) => {
      return React.cloneElement(child, {
        colIndex: i+1,
        rowIndex: this.props.rowIndex,
        table: this.props.table,
      })
    })

    return <div styleName='table-row'>
      {children}
    </div>
  }
}
