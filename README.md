ChattyApp
=====================


### Project Overview
A react app that is similar to a chat room.  Uses websockets to allow real-time updates in chat messages.  App also assigns a colour to each user and users can type messages or add image URLS.

## Learned to use:
Built to learn to use React, Babel and Webpack

### Usage
Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
