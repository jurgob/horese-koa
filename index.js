'use strict';

const app = require('koa')();
let serve = require('koa-static');
const router = require('koa-router');
// const fs = require('fs');
import  fs from 'fs';
import React from 'react'

import ReactDOMServer from 'react-dom/server'

const horese_koa = () => {
//routing
  const DIR = process.cwd()
  const HORESE_DIR = __dirname;

  app.use(serve(DIR + '/public'));

  let api = router();
  api.get('/', function *(){

    const prefetched = yield app.horese.prefech()
    const initial_state = JSON.stringify(prefetched);

    const App = require(DIR+'/src/app.js').default
    const html_body = ReactDOMServer.renderToString(App(prefetched));

    this.body =`
      <html>
        <head>
          <meta name="viewport" content="user-scalable=no,initial-scale=1,maximum-scale=1">
          <title>Horese Koa Simple test</title>
          <script type="text/javascript" src="//cdn.polyfill.io/v2/polyfill.min.js"></script>
        </head>
        <body>
          <div id="horese_body" >${html_body}</div>
          <script >
            window.horese = {
              initial_state: ${initial_state}
            }
          </script>
          <script src="/static/bundle.js"></script>
        </body>
      </html>
    `
  })



  app
    .use(api.routes())
    .use(api.allowedMethods());

  //dev env
  if(process.env.NODE_ENV !== 'production' ) {
    console.log('Enable hot reload')
    const webpack = require('webpack');

    console.log('it exist! '+DIR,fs.existsSync(DIR+'/webpack.config.js'))

    const webpackConfig = fs.existsSync(DIR+'/webpack.config.js') ? require(DIR+'/webpack.config.js') :  require('./confs/webpack.config.js')(DIR, HORESE_DIR);
    const webpackCompiler = webpack(webpackConfig);
    const webpackDev = require("koa-webpack-dev-middleware");



    app.use(webpackDev(webpackCompiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    }));

    app.use(require("koa-webpack-hot-middleware")(webpackCompiler));

    app.horese = {}
    app.horese.prefech = () => ({})
  }



  console.log('EXISTS: '+DIR+'/server.js')

  if(fs.existsSync(DIR+'/src/server.js')){
    console.log('SERVER MANAGED');
    require(DIR+'/src/server.js').default(app);

  }else{
    console.log('SERVER NOT MANAGED')
  }

  return app

}



module.exports = horese_koa
