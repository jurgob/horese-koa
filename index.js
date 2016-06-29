'use strict';

const app = require('koa')();
let serve = require('koa-static');
const router = require('koa-router');
const fs = require('fs');

console.log('listening on port ');



const horese_koa = () => {
//set vars
  // const PORT = process.env.PORT || 3333

//routing
  let api = router();

  console.log('__filename', __filename);
  console.log('__dirname', __dirname);

  const DIR = process.cwd()
  const APP_DIR = __dirname;
  console.log('DIR', DIR);

  app.use(serve(DIR + '/public'));

  api.get('/', function *(){
    this.body =`
      <html>
        <head>
          <meta name="viewport" content="user-scalable=no,initial-scale=1,maximum-scale=1">
          <title>Horese Koa Simple test</title>
          <script type="text/javascript" src="//cdn.polyfill.io/v2/polyfill.min.js"></script>
        </head>
        <body>
          <div id="horese_body" ></div>
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

    const webpackConfig = fs.existsSync(DIR+'/webpack.config.js') ? require(DIR+'/webpack.config.js') :  require('./confs/webpack.config.js')(DIR, APP_DIR);
    const webpackCompiler = webpack(webpackConfig);
    const webpackDev = require("koa-webpack-dev-middleware");



    app.use(webpackDev(webpackCompiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    }));

    app.use(require("koa-webpack-hot-middleware")(webpackCompiler));
  }

  console.log('EXISTS: '+DIR+'/server.js')

  if(fs.existsSync(DIR+'/src/server.js')){
    console.log('SERVER MANAGED');
    require(DIR+'/src/server.js')(app);

  }else{
    console.log('SERVER NOT MANAGED')
  }


  console.log('**** app', app)

  return app

}



module.exports = horese_koa
