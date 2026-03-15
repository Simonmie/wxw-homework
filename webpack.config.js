// src/webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 入口
  entry: './index.js',

  // 输出
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true // 每次打包前自动清空 dist 文件夹
  },

  // 模式
  mode: 'development',

  // 处理 CSS、图片、字体
  module: {
    rules: [
      // CSS 
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'] // 顺序不能颠倒：先解析 CSS，再注入页面
      },
      // 图片
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]' 
        }
      },
      // 字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      }
    ]
  },

  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // 现有为模板
      filename: 'index.html'    // 打包后生成HTML
    })
  ],

  // 开发配置
  devServer: {
    port: 3000,    // 访问地址：http://localhost:3000
    open: true,    // 启动后自动打开
    hot: true,     // 代码更新自动刷新页面
    static: {
      directory: path.join(__dirname, 'dist')
    }
  }
};