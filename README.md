# horese-koa
Rise a koa server with hot reloading in dev env, with no conf! Server Side Rendering comes for free!


## how to build a react project from scratch, with no conf!

###why I did this?
a lot of react new-be get stuck because they have to learn and configure tools like webpack and babel. This project offer them a fast kickstart, but it is not a boilerplate project!.

The cool part is that you can easily generate/deploy your SPA (client and server side)  and improve the server part using koa.

If you want, you can then decide to manage webpack / babel in the standard way.



### create an npm project (be sure your node version is 5+)

```bash
 mkdir my_project
 cd my_project
 npm init
 ```

### install horese-koa...
 ```bash
 npm i --save horese-koa
 ```

### ... and React
```bash
 npm i --save react react-dom
```

### create your first project
 add  file "src/index.js"

 ```bash
 mkdir src
 touch src/index.js
 ```

 this is the file contents:


 src/index.js
 ```
 import React from 'react';

 const App = () => <div>React Super Simple example with hot reloading and error catch</div>
 export default () => <App />
 ```


###create the running script
on your package .json add:
```js
 "scripts": {
    ...
    "dev":"horese-koa-server"
  },
```

###run your project

```bash
npm run dev
```

that's it! you will have your react project with hotreloading running!. no webpack or babel config!



##future expansion

- do build command horese-koa-build
- if user have webpack in his dir, use that config
- if user have public in his dir, use that dir for static asset
- add some basig conf to the server (change static dir, change entrypoing, multi entrypoint, change )
- write some examples adding some api management with koa
