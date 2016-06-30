#!/usr/bin/env node
var nodemon = require('nodemon')
const HORESE_DIR = __dirname;
const DIR = process.cwd()

nodemon({
  script: HORESE_DIR+"/server_prod.js",
  exec:  HORESE_DIR+"/node_modules/.bin/babel-node",
  ignoreRoot: DIR+"/src/app"
})

// module.exports = function(){
//   nodemon({
//     script: HORESE_DIR+"/server_prod.js",
//     exec:  HORESE_DIR+"/node_modules/.bin/babel-node"
//   })
// }
// ../../server.js --exec ../../node_modules/.bin/babel-node
