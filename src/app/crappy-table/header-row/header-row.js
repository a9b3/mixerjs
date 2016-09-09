import styles from './header-row.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class HeaderRow extends Component {
  static propTypes = {
    children: PropTypes.any,
    table: PropTypes.any,
  }

  render() {
    const children = this.props.children.map((child, i) => {
      return React.cloneElement(child, {
        rowIndex: 0,
        colIndex: i+1,
        table: this.props.table,
      })
    })

    return <div styleName='header-row'>
      {children}
    </div>
  }
}
