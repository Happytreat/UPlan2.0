const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { paths } = require('./paths');
const merge = require('webpack-merge'); // Merges webpack config
const common = require('./webpack.common.js');


module.exports = merge(common, {
  mode: "development",
  entry: ['@babel/polyfill', path.join(paths.SRC, 'index.js')],
  output: {
    path: paths.DIST,
    filename: '[name].[hash].js',
    publicPath: '',
  },
  devServer: {
    // publicPath: paths.DIST,
    contentBase: paths.DIST,
    historyApiFallback: true,
    // hot: true,
    https: false,
    overlay: true,
    port: 3010,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  devtool: 'source-map'
});
