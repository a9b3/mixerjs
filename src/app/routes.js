import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import Main from './containers/main/main.js'

export default (
  <Route path='/'>

    <IndexRedirect to='main' />
    <Route path='main' component={Main} />
  </Route>
)
