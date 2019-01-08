const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');

module.exports = {
  entry: './src/screens/route/index.js',
  output: {
    path: path.join(__dirname, './dist/react'),
    filename: 'react-app.bundle.js',
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
    }),
    new HtmlWebpackPlugin({
      template: './src/screens/route/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: './index.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true,
            },
          }],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: './images/[name].[ext]',
          },
        }],
      },
      {
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: './sounds/[name].[ext]',
          },
        }],
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, './'), 'node_modules'],
  },
  devServer: {
    contentBase: path.join(__dirname, './'),
    compress: true,
    port: 9000,
  },
  mode: 'development',
};
