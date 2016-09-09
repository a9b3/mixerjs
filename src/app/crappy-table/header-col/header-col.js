import styles from './header-col.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class HeaderCol extends Component {
  static propTypes = {
    children: PropTypes.any,
    table: PropTypes.any,
  }

  render() {
    const children = this.props.children.map((child, i) => {
      return React.cloneElement(child, {
        rowIndex: i+1,
        colIndex: 0,
        table: this.props.table,
      })
    })

    return <div styleName='header-col'>
      {children}
    </div>
  }
}
