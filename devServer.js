var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var devConfig = require("./webpack.config");

var compiler = webpack(devConfig);

var fs = require('fs')
var path = require('path')

var server = new WebpackDevServer(compiler, {
  contentBase: "./public",
  publicPath: "/",
  hot: true,
  historyApiFallback: true,
  proxy: {
    '/api/*': {
        target: 'http://localhost:3000',
        secure: false
    }
  }
});



server.listen(4000);
