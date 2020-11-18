const path = require('path');
const webpack = require('webpack');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    new VueLoaderPlugin(),
    new HTMLPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader', //把图片转成base64直接写入js文件
            options: {
              limit: 1024,
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.styl/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.less/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
    ]
  }
}

config.mode = isDev ? 'development' : 'production';
config.devtool = isDev ? 'eval-cheap-module-source-map' : false;
if (isDev) {
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: { //把error显示在界面上
      errors: true
    },
    hot: true
  }
  // 不刷新界面，只刷新某个component
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports = config;
