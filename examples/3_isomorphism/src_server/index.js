export default (app) => {
  const router = require('koa-router');
  let api2 = router();

  api2.get('/api', function *(){
    this.body = {test:"Hello world"}
  })

  app
    .use(api2.routes())
    .use(api2.allowedMethods())

  return app

}
