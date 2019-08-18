const presets = process.env.NODE_ENV === 'test'
  ? [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-react',
  ]
  : [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'entry',
        corejs: { version: 2, proposals: true },
      },
    ],
    '@babel/preset-react',
  ];


module.exports = {
  presets,
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-regenerator',
    '@babel/plugin-transform-runtime',
    'react-hot-loader/babel',
  ],
};

// module.exports = {
//   presets: [
//     '@babel/preset-env',
//     '@babel/preset-react',
//   ],
// };
