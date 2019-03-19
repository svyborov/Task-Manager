const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: ['./src/index.js'],
  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: 'main.js',
    publicPath: '/public/assets/',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
  ],
};
