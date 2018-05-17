const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const proxy = require('http-proxy-middleware')

module.exports = {
  entry: ['./src/app.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: ['css-loader', 'sass-loader']
      })
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }, {
      test: /\.html$/,
      use: 'html-loader'
    }, {
      test: /\.(gif|png|jpg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[name].[ext]',
          outputPath: 'img/',
          publicPath: 'img/'
        }
      }]
    }]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css'
    }),
    new HtmlPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new cleanWebpackPlugin(['dist'])
  ],
  devServer: {
    host: '127.0.0.1',
    port: 8000,
    proxy: [
      {
        context: '/',
        target: "http://api.douban.com/v2",
        changeOrigin: true
      }
    ]
  }
}
