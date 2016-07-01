import React from 'react';
import routes from './routes'
import { Router, browserHistory } from 'react-router'


export default function (initial_state){
  // return (<App redditRes={initial_state.redditRes} />)
  return (
    <Router history={browserHistory}>
      {routes}
    </Router>
  )
}
