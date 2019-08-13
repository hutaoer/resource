# 社招面试

### 初级

#### 盒模型：border-box,content-box。盒模型，margin问题如何解决？
- 基本概念：标准模型+ IE模型(区别)
- CSS如何设置这两种模型
- JS如何设置获取盒子模型对应的宽和高
- 实例题(根据盒模型解释边距重叠)
- BFC(边距重叠解决方案)
- 参考：https://segmentfault.com/a/1190000015235886

* css 中的图片是否会加载？@media query 的时候呢？`<img src='的时候呢'>`
* 常见伪类元素以及使用场景。
  - 去除浮动。
  - display:inline.
  - 
* 跨域问题如何解决，哪几种方案？
  - jsonp
  - 其实不然，因为在CORS中，所有的跨域请求被分为了两种类型，一种是简单请求，一种是复杂请求 (严格来说应该叫‘需预检请求’)；复杂请求，必须在正式发送请求前先发送一个OPTIONS方法的请求已得到服务器的同意，若没有得到服务器的同意，浏览器不会发送正式请求；
  - iframe跨域
  - postmessage
  - window
* es5中，js 的作用域。函数式声明和变量声明后赋值，有什么区别？
  - 接着js闭包
  - 
* js 原型链，如何实现继承。
* js 遍历一个对象的方法有哪些？
  - 使用 for in 循环遍历对象的属性时，原型链上的所有属性都将被访问。
  - 推荐总是使用 hasOwnProperty 方法，这将会避免原型对象扩展带来的干扰。
  - 
* es6 解构，设置默认值。`let {b = []} = {b:null}`
  - 
* 常见的css居中方法。
* float
* script async defer 区别。no
* git merge 和 git rebase 区别。no

### 高级
* 函数的节流和防抖。
  - 
* reflow和repaint是什么？如何避免
  - 重排一定引起重绘，重绘不一定引起重排。
  - 引起重排：窗口大小、元素尺寸、字体大小、添加或删除dom节点、激活伪类、查询元素属性等。
  - 常见导致回流的属性和方法：clientWidth,scrollTop,scrollTo(),getComputedStyle()
  - 重绘：元素样式改变，但不影响文档流中的位置，比如：color, background-color, visibility，浏览器将样式重新绘制到元素上。
  - 性能影响：重排>重绘。
  - 如何避免：避免使用table，避免多次样式层级，动画效果使用到position为absolute的元素上，不使用css表达式。
  - 通过class来操作样式，不要频繁修改。避免频繁操作DOM，创建一个`documentFragment`，在他上面做所有的操作，最后插入。
  - 先设置元素display:none，然后执行操作，最后再显示出来。display:none的时候，不会引起重排和重绘。
* vue 双向绑定
  - 目前大概有三种实现方式：发布订阅模式，Angular 的脏查机制，数据劫持。
  - Vue 则采用的是数据劫持与发布订阅相结合的方式实现双向绑定，数据劫持主要通过 Object.defineProperty 来实现。
  - Observer 监听器：用来监听属性的变化通知订阅者
  - Watcher 订阅者：收到属性的变化，然后更新视图
  - Compile 解析器：解析指令，初始化模版，绑定订阅者
  - 单向数据流和双向绑定的优缺点是什么？
* 对promise的理解
  - 
* vue dom diff 算法
* nextTick，干啥用的？
  - 主线程的执行过程就是一个 tick。规范中规定 task 分为两大类，分别是 macro task 和 micro task，并且每个 macro task 结束后，都要清空所有的 micro task。
  - 我们了解到数据的变化到 DOM 的重新渲染是一个异步过程，发生在下一个 tick。
  - 在浏览器环境中，常见的 macro task 有 setTimeout、MessageChannel、postMessage、setImmediate；常见的 micro task 有 MutationObsever 和 Promise.then。
* react 编码需要注意的
  - 避免使用 {…this.props}，按需传递 props，传递的参数越多，层次越深，都会拖慢 SCU 的执行过程
  - this.event = this.event.bind(this) (将方法的bind一律置于constructor)
  - 尽量使用 const element 无状态组件
  - map 输出时，组件需要添加 key，且 key 必须是唯一的
  - 如果可以，尽量减少使用 setTimeout, setInterval 等函数
  - props 和 state 的数据尽量维持扁平化
  - 组件渲染时，尽可能减少最终生成 dom 的数量，比如使用 return null，而非 display: none 来控制组件的显示隐藏
  - 拆分组件，复杂的逻辑做好分层，不要在一个组件内完成

### 开放题
* react或者vue里面，监听window滚动，设置fixed
* 常用的设计模式，策略模式，发布订阅模式。
* 前端性能提升，项目中有用到哪些？
  - 

### 团队相关
* 前端工程化相关的知识
* 分享
* 基础设施建设（前端编码规范）
* 协作能力
* 解决问题能力
* 自己私下有没有小项目或者总结
* 对flutter，weex是怎么看？
