// app entry point
import 'styles/index.scss'
import React               from 'react'
import { render }          from 'react-dom'
import { browserHistory }  from 'react-router'
import useScroll           from 'scroll-behavior'
import { AppContainer }    from 'react-hot-loader'
import Root                from './root.js'

// if (CONFIG.debug === false && navigator.serviceWorker) {
//   navigator.serviceWorker.register('/service-worker.js')
// }

const history = useScroll(browserHistory)

render(
  <AppContainer>
    <Root history={history} />
  </AppContainer>,
  document.getElementById('mount')
)

if (module.hot) {
  let HotRoot = require('./root.js').default

  module.hot.accept('./styles/index.scss', () => {
    require('./styles/index.scss')
  })

  module.hot.accept('./root.js', () => {
    render(
      <AppContainer>
        <HotRoot history={history} />
      </AppContainer>,
      document.getElementById('mount')
    )
  })
}
