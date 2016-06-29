#!/usr/bin/env node
'use strict';
console.log('TEST')
if(process.env.ENV === 'production'){
  require('./server_prod')
}
else{
  console.log('NODEMON!!');
  console.log(require('./server_dev'))
  require('./server_dev')
}
