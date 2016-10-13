var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require("webpack");
module.exports = {
  entry: [
    'whatwg-fetch',
    'babel-polyfill',
    'webpack/hot/only-dev-server',
    './public/javascripts/main.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'app.bundle.js'
  },
  module: {
   loaders: [{
    loader: 'babel-loader',
    test: /\.js?$/,
    exclude: /(node_modules)/,
    query: {
      presets: ['react', 'es2015'],
      plugins: ['transform-object-assign']
    }
  },
  {
    test: /\.css?$/,
    loader: 'style!css'
  }]
 },
 plugins: [
    new HtmlWebpackPlugin({
      template: 'views/index.html',
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
};
