import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Main from './containers/main/main.js'

export default (
  <Route path='/'>
    <IndexRoute component={Main} />
  </Route>
)
