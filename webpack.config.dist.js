var webpack = require("webpack");
module.exports = {
  entry: [
    'whatwg-fetch',
    'babel-polyfill',
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
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
  ],
};
