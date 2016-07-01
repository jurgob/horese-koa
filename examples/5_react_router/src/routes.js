import React from 'react';
import { Route, IndexRedirect,IndexRoute,Redirect } from 'react-router'
import Reddit from './components/Reddit';
import About from './components/About';
import App from './components/App';
import NotFound from './components/NotFound';

export default (
  <Route component={App} path="/" >
    <IndexRoute component={Reddit}/>
    <Route path="about" component={About}/>
    <Redirect from="/redirecttohome" to="/" />
    <Route path="*" component={NotFound}/>
  </Route>
)
