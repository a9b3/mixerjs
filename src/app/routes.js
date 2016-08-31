import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import HelloWorld from './containers/hello-world/hello-world.js'
import NotFoundContainer from './containers/not-found/not-found.js'

export default (
  <Route path='/'>

    <IndexRedirect to='hello-world' />
    <Route path='hello-world' component={HelloWorld} />
    <Route path='*' component={NotFoundContainer} />
  </Route>
)
