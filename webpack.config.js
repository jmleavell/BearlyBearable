const path = require('path');

module.exports = {
  entry: path.resolve('./client/index.js'),
  output: {
    path: path.resolve('./client/'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}