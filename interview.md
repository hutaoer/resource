# 社招面试

### 初级
* 常见伪类元素以及使用场景。
* 常用的垂直居中写法
* 盒模型：border-box,content-box。盒模型，margin问题如何解决？
* float
* script async defer 区别
* git merge 和 git rebase 区别
* 跨域问题如何解决，哪几种方案？
* es5中，js 的作用域。函数式声明和变量声明后赋值，有什么区别？
* js 原型链，如何实现继承。
* js 遍历一个对象的方法有哪些？
  - 使用 for in 循环遍历对象的属性时，原型链上的所有属性都将被访问。
  - 推荐总是使用 hasOwnProperty 方法，这将会避免原型对象扩展带来的干扰。
* es6 解构，设置默认值。`let {b = []} = {b:null}`
* css 中的图片是否会加载？@media query 的时候呢？`<img src='的时候呢'>`
* 常见的css居中方法。

### 高级
* 函数的节流和防抖。
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
* vue dom diff 算法
* nextTick，干啥用的？

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
