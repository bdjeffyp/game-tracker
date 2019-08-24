/**
 * webpack.production.js
 *
 * What it Does:
 *   Webpack is the system that takes your TypeScript and turns it into plain
 *   javascript. This file configures webpack to create an optimized and minified
 *   build of your code in order to put the compiled files on a production server.
 *
 * Things to Edit:
 *   Be careful when editing webpack configuration files. They can be very confusing
 *   and break things in weird ways. Changing this file allows you to add new webpack
 *   plugins to your production server, or change the way that webpack is packaging
 *   your deployed files.
 *   That being said, feel free to add your own loaders as needed for other
 *   filetypes that you want to use with TypeScript.
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HashedModuleIdsPlugin } = require('webpack');

module.exports = require('./webpack.common')({
  mode: 'production',

  entry: "./index.ts",

  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },

  optimization: {
    minimize: true,
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    splitChunks: { chunks: 'all' },
    runtimeChunk: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
      template: './index.html',
    }),
    new HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),
  ],
});
