# webpack
* [webpack面试题](https://juejin.im/post/5c6cffde6fb9a049d975c8c1)
* webpack4里面压缩和tree-shaking默认开启
* webpack打包思路：
  - 单页、多页
  - 单页面：业务代码、异步模块、第三方包，运行代码
  - 多页面：业务代码、公共模块、第三方包，运行代码

## 打包优化
* 使用webpack插件`webpack-bundle-analyzer`分析体积大的模块。
* 提取公共模块`CommonsChunkPlugin`，如何使用的？
  - 三个参数：name, minChunks，chunks
  - name:打包后的文件名。
  - minChunks: minChunks如果传入的是一个数字的话，指的是如果该模块被其他模块的引用次数达到了这个数值的话该模块就会被打包。
  - chunks: 指定一个字符串数组，如果设置了该参数，则打包的时候只会从其中指定的模块中提取公共子模块。
* 对于`moment`这个库，打包如何处理，比如只引入中文相关的代码，如何处理？
  - webpack自带的两个库可以实现这个功能： 
  - IgnorePlugin
  - ContextReplacementPlugin
  - externals
```js
module.exports = (webpackConfig) => {
  // Avoid import all locale file of moment
  webpackConfig.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
  return webpackConfig;
};
```

## tree-shaking
* tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块语法的 静态结构 特性，例如 import 和 export。
* 

## optimization

### 代码分割：splitChunks
* chunks: 'initial'
* 
* cacheGroups：将某些规则的模块打包为一个文件

### runtimeChunks
* webpack 运行代码 manifest.js 提取


### 异步引入会自动分割
* 两种方式异步加载方式，webpack会自动提取。
* `import(/*webpackChunkName: 'moduleName'*/)`
* `require.ensure([], function(){
  require('./moduleA.js')
})`
