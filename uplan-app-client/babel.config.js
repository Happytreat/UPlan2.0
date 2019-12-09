module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
  "plugins": [
    [
      "babel-plugin-styled-components",
      {
        "displayName": false
      }
    ],
    "@babel/plugin-proposal-class-properties",
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-regenerator',
    '@babel/plugin-transform-runtime',
    'react-hot-loader/babel',
  ]
};
