var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
var webpack = require("webpack");
module.exports = {
  entry: [
    'whatwg-fetch',
    'babel-polyfill',
    'webpack-dev-server/client?http://localhost:4000',
    'webpack/hot/only-dev-server',
    './public/javascripts/index.js'
  ],
  output: {
    path: '/',
    publicPath: 'http://localhost:4000/assets/',
    filename: 'app.bundle.js',
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
 devServer: {
   host: '0.0.0.0',
   port: 4000,
   contentBase: "./public",
   publicPath: "http://0.0.0.0:4000/assets/",
   stats: {
     chunks: false
   },
   historyApiFallback: true,
   proxy: {
     '/api/*': {
       target: 'http://localhost:3000',
       secure: false
     }
   }
 },
 devtool: 'cheap-module-eval-source-map',
 debug: true,
 plugins: [
  new webpack.NoErrorsPlugin(),
  new webpack.HotModuleReplacementPlugin()
],
};
