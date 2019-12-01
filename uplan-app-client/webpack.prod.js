/* These are dev depencies */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

// var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const glob = require('glob-all');

const common = require('./webpack.common.js');
const { paths } = require('./paths');

module.exports = merge(common, {
  entry: ['@babel/polyfill', path.join(paths.SRC, 'index.js')],
  mode: 'production',
  devtool: 'none',
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, // set to true if you want JS source maps
        // Compression specific options
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html'),
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
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new PurgecssPlugin({
      paths: glob.sync([
        `${paths.SRC}/**/*.css`,
        `${paths.SRC}/**/*.html`,
        `${paths.SRC}/**/*.js`,
        `${paths.SRC}/**/*.jsx`,
      ]),
      extractors: [
        {
          extractor: class {
            static extract(content) {
              // eslint-disable-next-line no-useless-escape
              return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
            }
          },
          extensions: ['css', 'html', 'js', 'jsx'],
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: paths.DIST,
            },
          },
          'css-loader',
        ],
      },
    ],
  },
});
