import styles from './hello-world.scss'
import React, { Component } from 'react'
import CSSModules from 'react-css-modules'

class HelloWorld extends Component {
  render() {
    return <div styleName='hello-world'>
      Hello World!
    </div>
  }
}

export default CSSModules(HelloWorld, styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
