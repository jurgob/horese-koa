import fetch from 'isomorphic-fetch'

const jsonize = res => res.json();
const fetchReddit = () => fetch("https://www.reddit.com/r/all.json").then(jsonize)



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

  return app

}
