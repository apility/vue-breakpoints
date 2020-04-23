const { resolve } = require('path')

module.exports = {
  entry: [
    '@babel/polyfill/noConflict',
    './src/index.js',
  ],

  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'vue-breakpoints.js',
    library: 'VueBreakpoints',
    libraryTarget: 'umd',
  },

  resolve: {
    extensions: ['.js'],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },

  externals: {
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: '_',
    },
  },
}
