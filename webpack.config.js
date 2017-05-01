var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    index :'./main.js',
    loggin : './loggin.js',
    school : './school.js'
  },
  output: { 
    path: path.join(__dirname, 'dist'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
    publicPath: '/',       //模板、样式、脚本、图片等资源对应的server上的路径
    filename: 'js/[name].js',     //每个页面对应的主js的生成配置
    chunkFilename: 'js/[id].chunk.js'   //chunk生成的配置
  },
  module: {
    rules: [
      {
          test: /\.css$/,
          use: 'css-loader'
          
      },
      {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"]
      },
      {test: /\.js$/,loader: 'babel-loader'},
      {test: /\.(png|jpg|gif)$/,loader: 'file-loader?name=[name].[ext]?[hash]'},
      {test: /\.eot/,loader : 'file?prefix=font/'},
      {test: /\.woff/,loader : 'file?prefix=font/&limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf/, loader : 'file?prefix=font/'},
      {test: /\.svg/, loader : 'file?prefix=font/'}
    ]
  },
  plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
        chunks: ['index','loggin'], //提取哪些模块共有的部分
        minChunks: 2 // 提取至少3个模块共有的部分
      }),
      new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
        //favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
        filename: './index.html', //生成的html存放路径，相对于path
        template: path.resolve(__dirname, './html/index.html'), //html模板路径
        inject: 'body', //js插入的位置，true/'head'/'body'/false
        chunks: ['vendors', 'index'],//需要引入的chunk，不配置就会引入所有页面的资源
        minify: { //压缩HTML文件  
          removeComments: true, //移除HTML中的注释
          collapseWhitespace: false //删除空白符与换行符
        }
      }),
      new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
        //favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
        filename: './loggin.html', //生成的html存放路径，相对于path
        template: path.resolve(__dirname, './html/loggin.html'), //html模板路径
        inject: 'body', //js插入的位置，true/'head'/'body'/false
        chunks: ['vendors', 'loggin'],//需要引入的chunk，不配置就会引入所有页面的资源
        minify: { //压缩HTML文件  
          removeComments: true, //移除HTML中的注释
          collapseWhitespace: false //删除空白符与换行符
        }
      })
  ]
}