# babel
* babel转换代码的过程主要为三步：解析、转换、生成。
* babel默认编译为CommonJS规范的代码。
* 打包工具的作用，就是将模块化内部实现的细节抹平， 无论是 AMD 还是 CommonJS 模块化规范的模块，经过 打包处理之后能变成能直接运行在 WEB 或 Node.js 的 内容。
* CommonJS 是同步，AMD 为异步，比如使用RequireJS
* hot module reload 原理：
  - 监听文件改动
  - 计算增量值
  - 通过socket进行通信
  - 如果超出限制，就直接刷新页面

## babel-plugin-import 按需加载
* `babel-plugin-import` ，引入的时候，要把组件path写全。
* 比如`var _button = require('antd/lib/button')`

## Taro
* 通过 Taro 暴露出来的 api，可以自定义webpack 配置
```js
webpackChain(chain) {
      chain.plugin('html-template').use(require('html-webpack-plugin'), [
        {
          title: '艺直通',
          template: paths.h5Html,
          inject: true,
          cache: true,
          favicon: paths.favicon,
        },
      ])
      chain.plugin('lodash').use(require('lodash-webpack-plugin'))
      chain.module
        .rule('image')
        .store.set('test', /\.(png|jpe?g|gif|bpm)(\?.*)?$/)
      chain.module
        .rule('svg')
        .test(/\.svg$/)
        .use('raw')
        .loader('raw-loader')
    },
```
* 小程序生产环境打包的时候
```js
webpackChain(chain, options) {
        chain
          .plugin('analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
      },
      copy: {
        patterns: [
          {
            from: 'sitemap.json',
            to: 'dist/weapp/',
          },
        ],
      },

```