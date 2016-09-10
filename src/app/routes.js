import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Main from './containers/main/main.js'
import Demo from './demo/demo.js'

export default (
  <Route path='/'>
    <IndexRoute component={Main} />
    <Route path='demo' component={Demo} />
  </Route>
)
