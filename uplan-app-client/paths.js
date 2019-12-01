const path = require('path');

const root = path.resolve(__dirname, './');

const paths = {
  ROOT: root,
  SRC: path.join(root, 'src'),
  PUBLIC: path.join(root, 'public'),
  DIST: path.join(root, 'dist'),
  IMAGES: path.join(root, '/src/asset'),
};

exports.paths = paths;
