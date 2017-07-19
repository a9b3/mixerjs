import React from 'react'
import { Route, IndexRoute } from 'react-router'

import CompatCheck from './containers/compat-check/compat-check.js'
import Main from './containers/main/main.js'
import Demo from './demo/demo.js'

export default (
  <Route path='/' component={CompatCheck}>
    <IndexRoute component={Main} />
    <Route path='demo' component={Demo} />
  </Route>
)
