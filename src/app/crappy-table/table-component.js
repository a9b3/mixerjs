import styles from './table.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import Table from './Table.js'

@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class TableComponent extends Component {
  static propTypes = {
    headerRow: PropTypes.any,
    headerCol: PropTypes.any,
    children: PropTypes.any,
  }

  state = {
    table: new Table(),
    style: {
      marginLeft: 0,
    },
  }

  componentDidMount() {
    this.state.table.on(`00`, (table) => {
      this.setState({ style: Object.assign({}, this.state.style, { marginLeft: table[0][0].style.width }) })
    })
  }

  _setScroll = (scrollLeft, scrollTop) => {
    if (this.headerRow) this.headerRow.scrollLeft = scrollLeft
    if (this.headerCol) this.headerCol.scrollTop = scrollTop
  }

  onScroll = (evt) => {
    window.requestAnimationFrame(
      this._setScroll.bind(this, evt.target.scrollLeft, evt.target.scrollTop)
    )
  }

  render() {
    const children = this.props.children.map((child, i) => {
      return React.cloneElement(child, {
        rowIndex: i+1,
        table: this.state.table,
      })
    })

    return <div styleName='table'>
      {
        this.props.headerRow && <div styleName='fixed-row'
          style={this.state.style}
          ref={el => this.headerRow = el}
        >
          {React.cloneElement(this.props.headerRow, {
            table: this.state.table,
          })}
        </div>
      }

      <div styleName='columns'>
        {
          this.props.headerCol && <div styleName='fixed-col'
            ref={el => this.headerCol = el}
          >
            {React.cloneElement(this.props.headerCol, {
              table: this.state.table,
            })}
          </div>
        }

        <div styleName='grid' onScroll={this.onScroll}>
          {children}
        </div>
      </div>
    </div>
  }
}
