const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Cleans the build folder
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Copys files
const webpack = require('webpack');

const { paths } = require('./paths');
const { version } = require('./package.json');

module.exports = {
  output: {
    path: paths.DIST,
    filename: '[name].[hash].js',
    publicPath: '',
  },
  resolve: {
    // .mjs needed for https://github.com/graphql/graphql-js/issues/1272
    extensions: [".js", ".jsx", ".mjs"]
  },
  plugins: [
    new CleanWebpackPlugin(),
    /* Copy Files */
    new CopyWebpackPlugin([
      { from: `${paths.PUBLIC}/`, to: `${paths.DIST}/` },
    ], {}),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(version),
      DEF_NAME: JSON.stringify('UPlan'),
      DEF_COMPANY: JSON.stringify('UPlan.'),
    }),
  ],
  module: {
    rules: [
      // fixes https://github.com/graphql/graphql-js/issues/1272
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      { test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: {compact: false}
        }},
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
    ]
  }
};

exports.paths = paths;
