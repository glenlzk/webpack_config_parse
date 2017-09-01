var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
//  合并对象
// 具体参阅: vue-cli中webpack配置解析 > webpack-merge作用
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
//  this plugin that copies individual files or entire directories to the build directory
// 将独立的文件或入口，拷贝到生成打包的文件目录中
// 具体参阅: vue-cli中webpack配置解析 > copy-webpack-plugin作用
var CopyWebpackPlugin = require('copy-webpack-plugin')
// 1.重新创建输出html文件
// 2.把编译后的js包含hash值，重新植入指定html里
// 具体参阅：vue-cli中webpack配置解析 > html-webpack-plugin作用
var HtmlWebpackPlugin = require('html-webpack-plugin')
// 针对 vue文件里的样式单独拆分，这样他们会被合并到css文件里去
// 具体参阅: vue-cli中webpack配置解析 > extract-text-webpack-plugin作用解析
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// 主要是为了解决 extract-text-webpack-plugin 合并css问题
// 优化 和 压缩 CSS资源
// 具体参阅: vue-cli中webpack配置解析 > optimize-css-assets-webpack-plugin作用
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

// 获得入口js文件
var entries =  utils.getMultiEntry('./src/'+config.moduleName+'/**/**/*.js');
var chunks = Object.keys(entries);


var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

// merge用来合并对象
var webpackConfig = merge(baseWebpackConfig, {
  module: {
    // 对所有css/less/sass使用不同的loader进行编译会css 和 抽取
    rules: utils.styleLoaders({
      // sourceMap跟调试有关系detools,影响打包效率
      sourceMap: config.build.productionSourceMap,
      // 是否提取css
      extract: true
    })
  },
  //devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    // 打包输出文件所放的位置，（例如：/dist）
    // path路径我们一定要绝对路径，因为环境不一样，有些环境运行不起来
    path: config.build.assetsRoot,
    // 输出的文件名格式，name对应的是entry里的入口key ru:{app: './main.js'}
    filename: utils.assetsPath('js/[name].js'),
    chunkFilename: utils.assetsPath('js/[id].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    // 定义能全局访问的变量，大部分用于区分开发环境 和 生成环境打包问题
    // 具体参阅：vue-cli中webpack配置解析 > webpack.DefinePlugin中的淫技巧
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // 压缩JS代码
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    // 输出文件名:css/[name].css, 也算视为模块，对应入口entries
    // HtmlWebpackPlugin执行内嵌到指定的html中去,
    // Name of the result file. May contain [name], [id] and [contenthash]
    // 具体参阅: vue-cli中webpack配置解析 > extract-text-webpack-plugin作用解析
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    // 主要是为了解决 extract-text-webpack-plugin 重复合并css问题
    // 优化 和 压缩 CSS资源
    // 具体参阅: vue-cli中webpack配置解析 > optimize-css-assets-webpack-plugin作用
    new OptimizeCSSPlugin(),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
   /* new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),*/
    // split vendor js into its own file
    /*new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),*/
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    // 会自动提取公共依赖
    // 具体参阅：vue-cli中webpack配置解析 > webpack.optimize.CommonsChunkPlugin作用
    new webpack.optimize.CommonsChunkPlugin({
      // 公共模块打包出来的包名， vendor.js
      name: 'vendor',
      // 指定抽取哪些公用的包
      chunks: chunks,
      // 控制当一个模块被引入几次可以被打包到共 用的chunk中
      minChunks: 4 || chunks.length
    }),
	/*
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])*/

  ]
})

// 用于减少包体大小的插件
// 该插件能够将资源文件压缩为.gz文件，并且根据客户端的需求按需加载
// 具体参阅：vue-cli中webpack配置解析 > 基于 Webpack 的应用包体尺寸优化
// https://www.npmjs.com/package/compression-webpack-plugin
if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

// Webpack 生成的包体组成并且以可视化的方式反馈给开发者
// 具体参阅：vue-cli中webpack配置解析 > webpack-bundle-analyzer作用
// 具体参阅：vue-cli中webpack配置解析 > 基于 Webpack 的应用包体尺寸优化
if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

//构建生成多页面的HtmlWebpackPlugin配置，主要是循环生成
var pages =  utils.getMultiEntry('./src/'+config.moduleName+'/**/**/*.html');
//  pages = {
//       'views/home/list':'views/home/list/list.html',
//       'views/router/details': 'views/router/details/details.html'
//  }
for (var pathname in pages) {

  var conf = {
    // 输出文件名
    filename: pathname + '.html',
    // 模板路径
    template: pages[pathname],
    // 每个html引用的js，css模块
    // Allows you to add only some chunks,只引入针对性的模块
    chunks: ['vendor',pathname],
    // js插入位置
    inject: true,
    // js插入包产生hash值
	hash:true
  };

  // 1.重新创建输出html文件
  // 2.把编译后的js包含hash值，重新植入指定html里
  // 具体参阅：vue-cli中webpack配置解析 > html-webpack-plugin作用
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}



module.exports = webpackConfig
