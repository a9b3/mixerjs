import styles from './table.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import uuid from 'node-uuid'
import Table from '../Table.js'

@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class TableComponent extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  }

  state = {
    table: new Table(),
  }

  render() {
    const children = this.props.children.map((child, rowIndex) => {
      return React.cloneElement(child, {
        rowIndex,
        table: this.state.table,
      })
    })

    return <div styleName='table'>
      {children}
    </div>
  }
}
