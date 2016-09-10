import styles from './demo.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import Meter from '../component/meter/meter.js'
import EditableText from '../component/editable-text/editable-text.js'

@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class Demo extends Component {
  static propTypes = {

  }

  static defaultProps = {

  }

  state = {
    text: 'hello world',
  }

  render() {
    return <div styleName='demo'>

      <EditableText text={this.state.text}
        onSubmit={(text) => {
          console.log(`here`)
          this.setState({ text })
        }}
        validate={(text) => {
          if (text !== 'yo') {
            throw new Error('must be yo')
          }
        }}
      />

    </div>
  }
}
