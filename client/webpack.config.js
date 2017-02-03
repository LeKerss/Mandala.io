const webpack = require('webpack')
const path = require('path')
const fs = require('fs')

module.exports = {
  entry: './sketch.js',
  output: {
    filename: 'bundle.js',
    path: './'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }, {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
}
}
