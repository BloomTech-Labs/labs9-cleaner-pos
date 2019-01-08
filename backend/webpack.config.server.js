const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');

const nodeEnv = process.env.NODE_ENV;
const isProduction = nodeEnv !== 'development';
// Common plugins
let plugins = [new Dotenv(), new webpack.NamedModulesPlugin()];
if (!isProduction) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}
const entry = isProduction
  ? ['/']
  : ['webpack/hot/poll?1000', './src/server.ts'];
module.exports = {
  devtool: false,
  entry: entry,
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
  mode: 'development',
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
