const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Cleans the build folder
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Copys files
const path = require('path');
const { paths } = require('./paths');

module.exports = {
  mode: "development",
  entry: ['@babel/polyfill', './src/index.js'],
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
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new CleanWebpackPlugin(),
    /* Copy Files */
    new CopyWebpackPlugin([
      { from: `${paths.PUBLIC}/`, to: `${paths.DIST}/` },
    ], {}),
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html'),
    }),
  ],
  module: {
    rules: [
      { test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: {compact: false}
        }},
      // {
      //   test: /\.(jpg|png)$/,
      //   use: {
      //     loader: 'url-loader',
      //   },
      // },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  devtool: 'source-map'
};
