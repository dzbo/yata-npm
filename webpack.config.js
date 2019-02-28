const webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
          /node_modules/,
          /tests/
        ],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: [
          /node_modules/
        ],
        use: {
          loader: 'eslint-loader',
          options: {
            configFile: '.eslintrc.js'
          }
        }
      }
    ]
  },
  entry: {
    yata: './src/yata.js',
    cli: './src/cli.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
  node: {
    fs: 'empty',
    child_process: 'empty'
  }
};
