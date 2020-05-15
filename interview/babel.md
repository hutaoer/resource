# babel
* babel转换代码的过程主要为三步：解析、转换、生成。
* babel默认编译为CommonJS规范的代码。
* 打包工具的作用，就是将模块化内部实现的细节抹平， 无论是 AMD 还是 CommonJS 模块化规范的模块，经过 打包处理之后能变成能直接运行在 WEB 或 Node.js 的 内容。
* CommonJS 是同步，AMD 为异步，比如使用RequireJS
* hot module reload 原理：