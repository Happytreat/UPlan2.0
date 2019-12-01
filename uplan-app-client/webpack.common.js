const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Cleans the build folder
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Copys files
const { paths } = require('./paths');

module.exports = {
  output: {
    path: paths.DIST,
    filename: '[name].[hash].js',
    publicPath: '',
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
  ],
  module: {
    rules: [
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
