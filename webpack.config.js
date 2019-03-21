var path = require('path')

// 在内存中根据指定的html模板生成首页，并且自动将绑定好的bundle注入
var htmlWebpackPlugin = require('html-webpack-plugin')

//***** Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的
var VueLoaderPlugin = require('vue-loader/lib/plugin')

// 命令行运行时如果没有相关配置就会读取这个配置文件
module.exports = {
  entry: path.join(__dirname, '/src/main.js'),
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },

  //***** 4.x需要设置mode：development，production，none
  mode: 'development',

  // 所有webpack 插件的配置节点
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      // 只有index可以被浏览器自动打开
      // 内存页面的名称
      filename: 'index.html'
    }),
    // make sure to include the plugin for the magic
    new VueLoaderPlugin()
  ],

  module: {
    // 所有的三方模块的匹配规则
    rules: [
      // i style-loader css-loader -D
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      // i less-loader less -D
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      // i sass-loader node-sass -D
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      // 图片处理，大于limit的图片会被转为base64，name用来指定使用的图片名称加上hash可确保图片名称不会重复
      // i url-loader file-loader -D
      { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]' },
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },
      // 将js的高级语法转换为低级语法
      // i babel-core babel-loader babel-plugin-transform-runtime babel-plugin-conponent -D 转换器 transform-runtime babel的插件
      // i babel-preset-env babel-preset-stage-0 -D 语法的对应关系
      // 新建.babelrc.json的配置文件
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      // i vue-loader vue-template-compiler
      { test: /\.vue$/, use: 'vue-loader' }
    ]
  },

  resolve: {
    // 在requir或import时会用到这个配置
    // alias: { "vue$": "vue/dist/vue.js" }
  }
}
