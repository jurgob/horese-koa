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
  console.log('DIR', DIR);
  app.use(serve(DIR + '/public'));

  app
    .use(api.routes())
    .use(api.allowedMethods());



  //dev env
  if(process.env.NODE_ENV !== 'production' ) {
    console.log('Enable hot reload')
    const webpack = require('webpack');

    console.log('it exist! '+DIR,fs.existsSync(DIR+'/webpack.config.js'))

    const webpackConfig = fs.existsSync(DIR+'/webpack.config.js') ? require(DIR+'/webpack.config.js') :  require('./confs/webpack.config.js')(DIR);
    const webpackCompiler = webpack(webpackConfig);
    const webpackDev = require("koa-webpack-dev-middleware");



    app.use(webpackDev(webpackCompiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    }));

    app.use(require("koa-webpack-hot-middleware")(webpackCompiler));
  }


  console.log('**** app', app)

  return app

}

module.exports = horese_koa
// let api2 = router();
//
// api2.get('/text', function *(){
//   this.body = {test:"Hello world"}
// })
//
// app
//   .use(api2.routes())
//   .use(api2.allowedMethods())
//
// //listen
// app.listen(PORT);
