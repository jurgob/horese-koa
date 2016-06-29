#!/usr/bin/env node
var nodemon = require('nodemon')
const HORESE_DIR = __dirname;

nodemon({
  script: HORESE_DIR+"/server_prod.js",
  exec:  HORESE_DIR+"/node_modules/.bin/babel-node"
})

// module.exports = function(){
//   nodemon({
//     script: HORESE_DIR+"/server_prod.js",
//     exec:  HORESE_DIR+"/node_modules/.bin/babel-node"
//   })
// }
// ../../server.js --exec ../../node_modules/.bin/babel-node
