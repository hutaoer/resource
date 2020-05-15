# nodejs

## 线程和进程
* 为什么说JS是单线程的。
* 进程是 CPU资源分配的最小单位；线程是 CPU调度的最小单位。

## 浏览器中与node中事件循环与执行机制的区别
* 浏览器的Event loop是在HTML5中定义的规范，而node中则由libuv库实现。

### 浏览器环境
* 异步任务分为task（宏任务，也可称为macroTask）和microtask（微任务）两类。
* task：script中代码、setTimeout、setInterval、I/O、UI render。
* microtask: promise、Object.observe、MutationObserver。

#### 执行过程
* 执行完主执行线程中的任务。
* 取出Microtask Queue中任务执行直到清空。
* 取出Macrotask Queue中一个任务执行。
* 取出Microtask Queue中任务执行直到清空。
* 重复3和4。

#### 注意
* new Promise((resolve, reject) =>{console.log(‘同步’);resolve()}).then(() => {console.log('异步')})，即promise的then和catch才是microtask，本身的内部代码不是。

### node环境
* js执行为单线程，所有代码皆在执行线程调用栈完成执行。当执行线程任务清空后才会去轮询取任务队列中任务。

#### 循环阶段
* 在node中事件每一轮循环按照顺序分为6个阶段，来自libuv的实现：
  - timers：执行满足条件的setTimeout、setInterval回调。
  - I/O callbacks：是否有已完成的I/O操作的回调函数，来自上一轮的poll残留。
  - idle，prepare：可忽略
  - poll：等待还没完成的I/O事件，会因timers和超时时间等结束等待。
  - check：执行setImmediate的回调。
  - close callbacks：关闭所有的closing handles，一些onclose事件。

## require 模块查找方式？
*  require('module') 引入方式，可能是内置模块，也可能是第三方模块，内置模块优先查找，没有的话就是第三方模块了，它会先从当前目录的 node_modules 里面查找，没有的话就到父目录下的 node_modules 里面去找，如此向上追溯，直到根目录下的 node_modules 目录，要是还没有的话就会到全局里面去找，大概是这么一个搜索过程。
* 另外一种带路径的方式，就会沿着路径去找，如果没有找到则会尝试将当前目录作一个包来加载。

## 读取一个文件的方法？
* readFile
* 读取大文件的方法
* 处理二进制文件？？

## event loop
* https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/#what-is-the-event-loop

### setImmediate 与 setTimeout区别
* setImmediate() 和 setTimeout() 很类似，但是基于被调用的时机，他们也有不同表现。
* setImmediate() 设计为一旦在当前 轮询 阶段完成， 就执行脚本。
* setTimeout() 在最小阈值（ms 单位）过后运行脚本。
* 使用 setImmediate() 相对于setTimeout() 的主要优势是，如果setImmediate()是在 I/O 周期内被调度的，那它将会在其中任何的定时器之前执行，跟这里存在多少个定时器无关

### process.nextTick
* process.nextTick() 比 setImmediate() 触发得更快

## yield, generater


## koa, express 中间件