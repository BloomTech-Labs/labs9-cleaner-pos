const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

// Common plugins
let plugins = [new webpack.NamedModulesPlugin()];

const entry = ['@babel/polyfill', '/'];
module.exports = {
  devtool: false,
  entry: entry,
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
  mode: 'production',
  module: {
    rules: [
      {
        loader: 'babel-loader',
        options: {
          babelrc: true,
        },
        test: /\.(js|ts)$/,
      },
    ],
  },
  name: 'server',
  node: {
    Buffer: false,
    __dirname: false,
    __filename: false,
    console: false,
    global: false,
    process: false,
  },
  output: {
    filename: 'server.prod.js',
    path: path.resolve(__dirname, './dist/'),
    publicPath: './dist/',
    // libraryTarget: 'commonjs2'
  },
  plugins: plugins,
  resolve: {
    extensions: ['.ts', '.js'],
    // modules: ['./node_modules'],
  },
  target: 'node',
};
