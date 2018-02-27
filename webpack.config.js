const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    //main file
    bundle: './js/main.js',
  },
  output: {
    //defines what to export(path) and how to export it(format name[chunkhash].js)
    //
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  devServer: {
    //webpack dev derver
    host: 'localhost',
    port: '8080'
  },
  module: {
    rules: [{
      //uses babel for all js files
      use: 'babel-loader',
      test: /\.js$/,
      //excludes node modules on bulndle file
      exclude: /node_modules/
    }, {
      //let you import css files
      use: ['style-loader', 'css-loader'],
      test: /\.css$/
    }, {
      //lets you import file types
      use: 'file-loader',
      test: [/\.(png|jpg|gif)$/, /\.(woff|woff2|eot|ttf|svg)$/]
    }]
  },
  //once webpack is done running, modify template file to include all the things you exported
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
};
