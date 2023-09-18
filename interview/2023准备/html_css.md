# html 和 css

## src和href的区别
* src当浏览器解析到该元素时，会暂停其他资源的加载和处理，直到该资源加载完成。 
* href指向外部资源所在的位置，下载的时候不会阻止其他资源的加载解析。

## HTML5新特性
* 语义化标签：head, footer, nav, main, section
* 新增音视频标签，video、audio
* 新增本地存储localStorage、sessionStorage

## DOCTYPE(⽂档类型) 的作⽤
* DOCTYPE是HTML5中一种标准通用标记语言的文档类型声明，是用来告诉浏览器的解析器，该用什么样的方式去加载识别文档。

## iframe优缺点
* 优点
  - 加载的页面，隔离性比较好
* 缺点
  - 加载的内容无法被浏览器引擎识别，对SEO不友好
  - 会阻塞onload事件加载
  - 会产生很多页面，不利于管理

## script标签中defer和async的区别
* 异步加载外部JS脚本，不会阻碍页面的加载解析。
* 执行顺序：有多个`async`标签不能保证先后加载顺序，而多个`defer`标签可以按先后顺序加载。
* 是否立即执行：`async`加载完脚本后会立即执行，`defer`是要等文档解析完成后才执行。
* `async`: 异步下载，加载完后立刻执行。
* `defer`: 有顺序下载，文档解析完成后执行。

## 行内，块级，空元素
* 行内：span，a, b, input, img,strong
* 块级：div,p, ul, ol,h1
* 空：hr,br,link,meta

## 节点操作
* 添加：`document.appendChild(dom)`
* 移除：`document.removeChild()`
* 移动：`document.appendChild(targetDom)`
* 复制：`dom.cloneNode(true)`，true代表复制子节点
* 创建：`document.createElement(dom)`
* 查找：
  - `document.getElementById("id")`
  - `document.getElementsByClassName("className")`
  - `document.getElementsByTagName("tagName")`
  - `document.querySelector("selector")`
  - `document.querySelectorAll("selector")`

## CSS新特性
* 新增CSS选择器、伪类
* 特效：text-shadow、box-shadow
* 线性渐变: gradient
* 旋转过渡：transform、transtion
* 动画: animation
* 圆角: border-radius

## 盒模型
* 设置`box-sizing`
* 标准盒模型: `content-box`，width、height只包含了content
* IE盒模型：`border-box`，IE盒模型的的width、height除了content本身，还包含了border、padding

## 选择器权重
* id：100
* 类：10
* 属性：`div[class="foo"]`: 10
* 伪类：`div::last-child`:10
* 标签：1
* 伪元素：1

## 优先级
* !important
* 内联样式
* ID选择器
* 类选择器/伪类选择器/属性选择器
* 标签选择器/伪元素选择器
* 关系选择器/通配符选择器

## 可继承属性

### 可以继承
* font-weight,color,font-size,line-height

### 不可继承
* margin，display, background, width, height, position

## 隐藏元素的方式
* `display:none`,文档中不存在，不占位置
* `visibility:hidden`,位置保留，占据空间。
* `opacity: 0`,透明度0
* `z-index:负数`,使用其他元素遮盖
* `transform`
* `position:absolute`,可视区域外。

## Sass, Less 区别
* CSS预处理器，增加CSS的复用，变量，循环，mixin
* 预处理器分别是node-sass，和less-loader
* 变量符不一样，Less是@，而Scss是$。

## link和@import的区别
* link是HTML提供的标签，不仅可以加载CSS文件，还可以定义RSS、rel连接属性等
* @import 导入样式的语法
* link标签引入的CSS被同时加载，而@import引入的CSS将在页面加载完毕后被加载

## 水平垂直居中方式

### 绝对定位1
```css
.parent {
    position: relative;
}
 
.child {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}

.child {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -50px;     /* 自身 height 的一半 */
    margin-left: -50px;    /* 自身 width 的一半 */
}
```

### 绝对定位2
* 该方法适用于盒子有宽高的场景。
```css
.parent {
    position: relative;
}
 
.child {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}

```

### flex布局
```css
.parent {
    display: flex;
    justify-content:center;
    align-items:center;
}

```

## flex理解
### 常用属性
* flex-wrap: 一条轴线排列不下，换行的方式
* justify-content: 主轴上的对齐方式
* align-items: 交叉轴上的对齐方式
* flex: 1是`flex-grow、flex-shrink、flex-basis`的缩写。默认值是`0 1 auto`。flex：1也表示`flex: 1 1 auto`。
  - flex-grow定义项目放大比例，默认为0，即存在剩余空间，也不放大。
  - flex-shrink定义项目收缩比例，默认为1，即空间不足，也会进行缩小。
  - flex-basis定义项目给上面两个属性分配多余空间之前, 计算项目是否有多余空间, 默认值为 auto, 即项目本身的大小。

## BFC
* BFC是块级格式上下文（Block Formatting Context，BFC）, BFC中的元素不受外面元素影响。
* 创建条件
  - 设置浮动：float有值并不为空
  - 设置绝对定位： position（absolute、fixed）
  - overflow值为：hidden、auto、scroll
  - display值为：inline-block、table-cell、table-caption、flex等
* 作用
  - 解决margin边距重叠问题：两个独立的BFC，不会发生重叠。
  - 解决高度塌陷问题：在子元素设置浮动后，父元素会发生高度的塌陷，也就是父元素的高度为0解决这个问题，只需要将父元素变成一个BFC。

## margin重叠，如何解决
* 两个块级元素分别设置上下margin时可能会导致边距合并为一个边距，合并到边距取最大的那个值。重叠只会出现在垂直方向。
* 主要有两种：兄弟之间重叠（margin合并） 和 父子之间重叠（margin塌陷）
* 兄弟之间重叠
  - 底部元素变为行内盒子：display: inline-block
  - 底部元素设置浮动：float
  - 底部元素的position的值为absolute/fixed
* 父子之间重叠
  - 父元素加入：overflow: hidden
  - 父元素添加透明边框：border:1px solid transparent
  - 子元素变为行内盒子：display: inline-block
  - 子元素加入浮动属性或定位

## 0.5px
* `transform: scale()`
* `meta viewport`的方式，这样就能缩放到原来的0.5倍，如果是1px那么就会变成0.5px

## 如何解决1px
* 在一些 Retina屏幕 的机型上，移动端页面的 1px 会变得很粗
* 方案：
  - 0.5px
  - 使用伪元素，先放大后缩小
  - viewport缩放