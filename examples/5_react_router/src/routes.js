import React from 'react';
import { Router, Route, Link } from 'react-router'
import Reddit from './components/Reddit';
import About from './components/About';
import App from './components/App';

export default (
  <Route component={App} >
    <Route path="/" component={Reddit}/>
    <Route path="/about" component={About}/>
  </Route>
)
