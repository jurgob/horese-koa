'use strict';

const app = require('koa')();
let serve = require('koa-static');
const router = require('koa-router');
// const fs = require('fs');
import  fs from 'fs';
import React from 'react'

import ReactDOMServer from 'react-dom/server'

const buildBody = (page_title, html_body, initial_state) => `
  <html>
    <head>
      <meta name="viewport" content="user-scalable=no,initial-scale=1,maximum-scale=1">
      <title>${page_title}</title>
      <script type="text/javascript" src="//cdn.polyfill.io/v2/polyfill.min.js"></script>
    </head>
    <body>
      <div id="horese_body" >${html_body}</div>
      <script >
        window.horese = {
          initial_state: ${JSON.stringify(initial_state)}
        }
      </script>
      <script src="/static/bundle.js"></script>
    </body>
  </html>
`




const horese_koa = () => {
//routing
  const DIR = process.cwd()
  const HORESE_DIR = __dirname;

  const defaultPrerender = (app, initial_state, buildBody) => {
    const App = require(DIR+'/src/index.js').default
    const html_body = ReactDOMServer.renderToString(App(initial_state));
    app.body = buildBody("",html_body, initial_state)
  }


  // app.use(serve(DIR + '/public'));

  app.horese = {}
  app.horese.prefech = () => ({})
  const SERVER_MAIN_FILE = DIR+'/src_server/index.js'
  console.log('EXISTS: '+SERVER_MAIN_FILE)
  if(fs.existsSync(SERVER_MAIN_FILE)){
    console.log('SERVER MANAGED');
    require(SERVER_MAIN_FILE).default(app);
  }else{
    console.log('SERVER NOT MANAGED')
  }

  let api = router();
  // api.get('/static/bundle.js', function *(){
  //   console.log('STATIC IGNORE')
  // })

  api.get('*', function *(next){
    // const app = this;
    console.log('URL: ',this.url)
    if(this.url.indexOf('/static') !== -1 || this.url.indexOf('/__webpack_hmr') !== -1  ){
      console.log('IGNORE STATIC PATHS')
      yield next; ;
    }
    else{
      const initial_state = yield app.horese.prefech()
      if(typeof(app.horese.prerender) === 'function'){
        console.log('CUSTOM PRERENDER')
        app.horese.prerender(this, initial_state, buildBody);
      }
      else{
        console.log('DEFAULT PRERENDER')
        defaultPrerender(this, initial_state, buildBody)
      }
    }



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


  }




  return app

}



module.exports = horese_koa
