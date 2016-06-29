#!/usr/bin/env node
'use strict';
const horese_koa = require('./index');
// import horese_koa from './index';

let app = horese_koa()

const PORT = process.env.PORT || 3333
app.listen(PORT);
console.log('listening on port !'+PORT);
