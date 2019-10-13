# nodejs

## require 模块查找方式？
*  require('module') 引入方式，可能是内置模块，也可能是第三方模块，内置模块优先查找，没有的话就是第三方模块了，它会先从当前目录的 node_modules 里面查找，没有的话就到父目录下的 node_modules 里面去找，如此向上追溯，直到根目录下的 node_modules 目录，要是还没有的话就会到全局里面去找，大概是这么一个搜索过程。
* 另外一种带路径的方式，就会沿着路径去找，如果没有找到则会尝试将当前目录作一个包来加载。

## 读取一个文件的方法？
* readFile
* 读取大文件的方法
* 处理二进制文件？？

## event loop
* 

## yield, generater


## koa, express 中间件