import styles from './not-found.scss'
import React from 'react'
import CSSModules from 'react-css-modules'

class NotFoundContainer extends React.Component {
  render() {
    return (
      <div styleName='not-found'>
        <div>
          <h1>Whoops!</h1>
          <h4>Page Not Found</h4>
        </div>
      </div>
    )
  }
}

export default CSSModules(NotFoundContainer, styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
