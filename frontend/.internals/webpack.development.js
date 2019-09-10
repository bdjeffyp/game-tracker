/**
 * webpack.development.js
 *
 * What it Does:
 *   Webpack is the system that this project uses to turn TypeScript into
 *   plain javascript. This file tells webpack what to do when you want
 *   a development server to be created. This file sets up automatic reload
 *   as well as putting the configuration options into process.env to be
 *   picked up by the react app.
 *
 * Things to Edit:
 *   Be careful when editing webpack configuration as it gets confusing
 *   quickly. If you want to make any changes to how your app is being
 *   rendered in development then this is the place to look. Things like
 *   transpiling a new file type or adding a webpack plugin can be done
 *   here.
 *   That being said, feel free to add your own loaders as needed for other
 *   filetypes that you want to use with TypeScript.
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = require('./webpack.common')({
  mode: 'development',

  watch: true,

  entry: [
    './index.tsx'
  ],

  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  optimization: {
    minimize: false,
  },

  devServer: {
    compress: true,
    port: 8080,
    host: '0.0.0.0',
    disableHostCheck: true,
    overlay: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      title: 'Derp',
      template: './index.html',
    }),
  ],

  devtool: 'eval-source-map',

  performance: {
    hints: false,
  },
});
