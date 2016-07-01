import fetch from 'isomorphic-fetch'
import React from 'react';
import ReactDOMServer from 'react-dom/server'

const jsonize = res => res.json();
const fetchReddit = () => fetch("https://www.reddit.com/r/all.json").then(jsonize)

import { match, RouterContext } from 'react-router'
import routes from '../src/routes'

export default (app) => {
  const router = require('koa-router');
  let api2 = router();

  api2.get('/api/reddit', function *(){
    const res = yield fetchReddit()
    this.body =  res
  })

  app
    .use(api2.routes())
    .use(api2.allowedMethods())


  app.horese.prefech = function *(){
    const res = yield fetchReddit()
    return {
      redditRes: res
    }
  }

  app.horese.prerender = function (app, initial_state, buildBody){
    match({ routes, location: app.url }, (error, redirectLocation, renderProps) => {
      console.log('app', app)
     if (error) {
       app.status=500
       app.message = error.message
     } else if (redirectLocation) {
       app.status=302
       app.redirect(redirectLocation.pathname + redirectLocation.search)
     } else if (renderProps) {
      const html_body = ReactDOMServer.renderToString(<RouterContext {...renderProps} />);
      app.body = buildBody("Example 5",html_body, initial_state)

     } else {
       app.status =404
       app.message='Not found'
     }
   })





    // console.log('prerender ', app.url)
    // app.body = <div>prerender</div>
  }

  return app

}
