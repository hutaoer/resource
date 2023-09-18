# JS
## 数据类型
* `Undefined, Null, Boolean, Number, String, Object`
* ES6新增: `BigInt、Symbol`
  - `Symbol`:代表创建后独一无二且不可变的数据类型，它主要是为了解决可能出现的全局变量冲突的问题
  - `BigInt`:使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围。
* 又分为了值类型和引用类型。
  - 堆： 存放引用数据类型，引用数据类型占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址，如`Object、Array、Function`。
  - 栈： 存放原始（基本）数据类型，栈中的简单数据段，占据空间小，属于被频繁使用的数据，如`Symbol、String、Number、Null、Boolean`。

## null与undefined
* `typeof null // object`
* `typeof undefined // undefined`

## Symbol
### 注意
* Symbol 可以应用在对象的属性名上面，需要添加`[]`使用。这个属性不会被`for…in`遍历到，也不会被`Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()`获取到。
* 需要使用`Object.getOwnPropertySymbols(obj)`，或者还可以用 ES6 新提供的 `Reflect` 对象的静态方法`Reflect.ownKeys`，它可以返回所有类型的属性名

### API
* `Symbol.for`: 使用 Symbol.for方法传入字符串，会先检查有没有使用该字符串调用 Symbol.for 方法创建的 symbol 值，如果有，返回该值，如果没有，则使用该字符串新创建一个。
* `Symbol.keyFor()`:传入一个值，返回全局的注册名。

### 11个内置Symbol值
* `Symbol.hasInstance`
* `Symbol.isConcatSpreadable`
* `Symbol.species`
* `Symbol.match、Symbol.replace、Symbol.search 和 Symbol.split`
* `Symbol.iterator`:数组的 `Symbol.iterator` 属性指向该数组的默认遍历器方法：

## instanceof 原理
* `instanceof` 运算符用来检测 `constructor.prototype` 是否存在于参数` object `的原型链上。
* `object instanceof constructor`

### 同 typeof 区别
* typeof  会返回一个运算数的基本类型，instanceof 返回的是布尔值
* instanceof 可以准确判断引用数据类型，但是不能正确判断原始数据类型
* typeof虽然可以判断原始数据类型（null 除外），但是无法判断引用数据类型（function 除外）

### 实现
```js
function myInstanceOf(O, C) {
  let link = O.__proto__
  while(link !== null) {
    if(link === C.prototype) return true
    link = link.__proto__
  }
}

function myInstanceOfV2(L = null, R) {
    // 对于左侧参数如果是非对象直接返回false
    if (Object(L) !== L) return false
    // 对于右侧参数可以认为只能为函数且不能没有Prototype属性
    if (typeof R !== 'function' || !R.prototype) throw new TypeError('Right-hand side of 'instanceof' is not an object')
    // 声明一个变量获取对象的__proto__
    let link = L.__proto__
    // 做循环（当link最终指向null，如果指向null的情况下都找不到那就返回false）
    while (link !== null) {
        // 如果找到说明R.prototype在L的原型链上，即返回true
        if(link === R.prototype) return true
        // 逐级向下
        link = link.__proto__
    }
    return false
}
```

## 0.1+0.2!==0.3
* 原因：浮点数精度问题，计算的时候，先转为二进制数。浮点数自身小数位数限制进行截断，截断的二进制数转十进制的时候，精度丢失，产生误差。
* 解决：
  - 先变为整数，再转小数。
  - 相加后，使用Number类型的toFixed方法，保留一位小数，再调`parseFloat`转为小数。

## 判断数组的方式
* `Object.prototype.toString.call()`，数组对象的结果为`[object Array]` 
* 原型链方式判断：`obj.__proto__ === Array.prototype`
* ES6的方法`Array.isArray()`
* `instanceof`

## 类数组、伪数组如何转成数组
* 常见的类数组有：`arguments`,`document.getElements`获取的内容，它们有`length`属性
* `Array.prototype.slice.call(arrayObj)`
* `Array.prototype.splice.call(arrayObj,0)`
* `Array.prototype.concat.apply([], arrayLike)`
* `Array.from(arrayObj)`

## 数组原生方法
* 操作数组尾部的：`pop`,`push`
* 操作数组头部的：`shift`(从头部移除),`unshift`（插入头部）
* 改变原数组的方法：fill()、pop()、push()、shift()、splice()、unshift()、reverse()、sort()；
* 不改变原数组的方法：concat()、every()、filter()、find()、findIndex()、forEach()、indexOf()、join()、lastIndexOf()、map()、reduce()、reduceRight()、slice()、some()。

## substring和substr的区别
* `substring(startIndex, endIndex)`： 接收两个参数，一个起始索引和结束索引，来指定字符串范围，如果省略第二个参数，则截取到字符串末尾。
* `substr(startIndex, length)`： 接收两个参数，并返回从 startIndex 开始，长度为 length 的子字符串。如果省略第二个参数，则截取到字符串末尾。

## object.assign和扩展运算法
* 两者都是浅拷贝。
* `Object.assign()`方法接收的第一个参数作为目标对象，后面的所有参数作为源对象。然后把所有的源对象合并到目标对象中。会触发setter
* 它不复制继承的属性或类的属性，但是它会复制ES6的 symbols 属性。

## new操作符的实现原理
* 创建一个空对象
* 设置原型，将构造函数的原型指向空对象的 prototype 属性。
* 将 this 指向这个对象，通过apply执行构造函数。
* 判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象
```js
function myNew(Fn) {
  if(typeof Fn !== 'function') throw new TypeError('This is not a constructor')
  var args = Array.from(arguments).slice(1) // 取入参，从索引下标1开始
  var obj = {}
  obj.__proto__ = Fn.prototype // 为步骤1新创建的对象添加属性`  __proto__  `，将该属性链接至构造函数的原型对象
  var res = Fn.call(obj, ...args) // 将obj作为this上下文
  return Object(res) === res ? res : obj // 如果是引用类型则直接返回，如果是值类型则返回创建的对象
}
```

## for...in和for...of区别
* for…of 遍历获取的是对象的键值，for…in 获取的是对象的键名；
* for… in 会遍历对象的整个原型链，性能非常差不推荐使用，而 for … of 只遍历当前对象不会遍历原型链；
* for...in 循环主要是为了遍历对象而生，不适用于遍历数组；for...of 循环可以用来遍历数组、类数组对象，字符串、Set、Map 以及 Generator 对象。

## 如何使用for...of遍历对象
* 数据需要实现遍历器iterator接口，就可以使用for...of来遍历。
```js
var obj = {a:1,b:2}
obj[Symbol.iterator] = function*() {
  var keys = Object.keys(obj)
  for(var k of keys) {
    yield [k, obj[k]]
  }
}
```

## 手写一个ajax请求
```js
const api = "/api/ajax"
let xhr = new XMLHttpRequest()
xhr.open("GET", api, true)
xhr.onreadystatechange = function() {
  if(this.readystate !== 4) return
  if(this.status === 200) {
    console.log(this.response)
  } else {
    console.error(this.statusText)
  }
}
xhr.onerror = function() {
  console.error(this.statusText)
}
xhr.responseType = "json"
xhr.setRequestHeader("Accept","application/json")
xhr.send(null)
```

## forEach和map方法有什么区别
* forEach 当数组元素为值类型的时候，是不会改变数组的对应值的。但如果为引用类型，则修改的时候，就相当于修改了数组元素本身。
* forEach 方法没有返回值；map 不会改变原数组，返回一个新数组。
* map不会修改原数组，直接处理后的新数组。

## 尾调用
* 尾调用就是在函数的最后一步调用函数，在一个函数里调用另外一个函数会保留当前执行的上下文，如果在函数尾部调用，因为已经是函数最后一步，所以这时可以不用保留当前的执行上下文，从而节省内存。
* 在JavaScript里，调用一个新的函数需要额外的一块预留内容来管理调用栈，成为栈帧。所以前面的代码一般会同时需要为每个 baz() 、bar(...)、foo(...) 保留一个栈帧。如果JS引擎，能够意识到函数的调用位于尾部，就不需要创建新的帧栈，而是重用以前的。从而节省内存。
* 在简单的代码片段中，这类优化算不了什么，但是在处理递归时，这就解决了大问题，特别是如果递归可能会导致成千上百个栈帧的时候。有了TCO，引擎可以用同一个栈帧执行所有的这类调用！
```js
// 用尾递归实现
function factorial(n) {
  function fact(n, res) {
    if (n < 2) return res 
    return fact(n-1, n*res)
  }
  return fact(n, 1)
}
```

## 深拷贝
* `JSON.stringify()`，序列化后再调用`JSON.parse()`
* 该方法简单，但也存在一些问题：
  - 函数、undefined、symbol丢失
  - 正则表达式、Error对象，会变成空对象
  - 无法拷贝不可枚举的属性；
  - 无法拷贝对象的原型链；
  - 拷贝 Date 引用类型会变成字符串；
  - 对象中含有NaN、Infinity以及 -Infinity，JSON 序列化的结果会变成null；
* 使用函数库`lodash`，`_.cloneDeep`
* 实现思路：使用`for in`来遍历传入参数的属性值
  - 如果值是基本类型就直接复制
  - 如果是引用类型就进行递归调用该函数
* 基础版本
```js
function myDeepClone(source) {
  // 判断是否为对象
  if(source instanceof Object === false) return source
  let target = Array.isArray(source) ? [] : {}
  for(let i in source) {
    if(source.hasOwnProperty(i)) {
      if(typeof source[i] === 'object') {
        target[i] = myDeepClone(source[i])
      } else {
        target[i] = source[i]
      }
    }
  }
  return target
}
```
* 上述版本存在问题
  - 循环引用，会导致堆栈溢出
  - 对于Date、RegExp、Set、Map等引用类型不能正确拷贝

## 浅拷贝
* `Object.assign`:`Object.assign`，将所有可枚举`（Object.propertyIsEnumerable() 返回 true）`的自有属性从一个或多个源对象复制到目标对象，返回修改后的对象。
* 扩展运算符
  - 上述两种方法，如果拷贝的是引用数据类型，拷贝的就是内存地址，引用关系仍然存在
* 浅拷贝的思路：
  - 对基础类型做最基本的拷贝；
  - 对引用类型开辟新的存储，并且仅拷贝`一层对象属性`。
```js
function shallowCopy(source) {
  if(!source || typeof source !== 'object') return source
  let res = Array.isArray(source) ? [] : {}
  for(let k in source) {
    if(source.hasOwnProperty(k)) {
      res[key] = source[k]
    }
  }
  return res
}
```

## let,var,const区别
* 块级作用域：块作用域由 { }包裹，let和const具有块级作用域，var不存在块级作用域。
* 变量提升：var存在变量提升，let和const不存在变量提升，即在变量只能在声明之后使用
* 重复声明：var声明变量时，可以重复声明变量，后声明的同名变量会覆盖之前声明的遍历。const和let不允许重复声明变量。
* 初始值设置：const声明变量必须设置初始值。
* 暂时性死区：在使用let、const命令声明变量之前，该变量都是不可用的。

## 箭头函数、普通函数区别
* 箭头函数是匿名函数，不能作为`构造函数`，不能使用`new`关键字。
* 箭头函数没有`arguments`
* 箭头函数没有自己的`this`，会获取所在的上下文作为自己的`this`
* `call()、applay()、bind()`方法不能改变箭头函数中的`this`指向
* 箭头函数没有`prototype`
* 箭头函数不能用作`Generator`函数，不能使用`yeild`关键字

## Set,Map区别
* Map的key可以是任意值，包括 null 和 undefined，键值对
* Set是类似数组的一种的数据结构，类似数组的一种集合，但在Set中没有重复的值

## map和weakMap的区别
* map的键可以是任意类型，weakMap键只能是对象类型。
* weakMap 使用弱引用来管理键和值之间的关系，因此如果键不再有其他引用，垃圾回收机制可以自动回收键值对。

## Promise理解
* 有三个状态：Pending(初始),Fulfilled(成功),Rejected(失败)，一旦从进行状态变成为其他状态就永远不能更改状态了，其过程是不可逆的。
* Promise构造函数接收一个带有resolve和reject参数的回调函数。
* 无法取消 Promise，一旦新建它就会立即执行，无法中途取消。

### promise.all 和 promise.allsettled 区别
* `Promise.all()` 和 `Promise.allSettled()` 都是用来处理多个 `Promise` 实例的方法。
* all: 只有当所有Promise实例都resolve后，才会resolve返回一个由所有Promise返回值组成的数组。如果有一个Promise实例reject，就会立即被拒绝，并返回拒绝原因。
* allSettled: 等所有Promise执行完毕后，不管成功或失败， 都会吧每个Promise状态信息放到一个数组里面返回。

## 对async/await 的理解
* `async/await`其实是Generator 的语法糖，通过async关键字声明一个异步函数， await 用于等待一个异步方法执行完成，并且会阻塞执行。
* async 函数返回的是一个 Promise 对象，如果在函数中 return 一个变量，async 会把这个直接量通过 Promise.resolve() 封装成 Promise 对象。如果没有返回值，返回 `Promise.resolve(undefined)`

## async/await对比Promise的优势
* 代码可读性高
* 更优雅
* 错误处理友好，可以通过`try/catch`捕获

## ES6模块和CommonJS模块区别
* ES6 模块使用 import 和 export 关键字来导入和导出模块，而 CommonJS 模块使用 require 和 module.exports 或 exports 来导入和导出模块。
* ES6 模块支持动态导入（dynamic import），可以异步加载模块。这使得在需要时按需加载模块成为可能，从而提高了性能。CommonJS 模块在设计时没有考虑异步加载的需求，通常在模块的顶部进行同步加载。

## 原型和原型链
* `prototype`: 每个`构造函数`内部，都有一个prototype属性，它指向另外一个对象，这个对象包含了由该构造函数的所有实例共享的属性和方法。
* `__proto__`: 使用构造函数创建实例对象后，可以通过实例对象的`__proto__`访问到`prototype`属性
* `constructor`: 实例对象通过该属性可以访问到构造函数
* 每个实例对象都有一个`__proto__`属性，指向它的构造函数的原型对象。一层层向上传递，直到顶级原型对象`null`，形成原型链。原型链的顶层原型是`Object.prototype`，如果这里没有就只指向`null`
```js
class Person {}
var p = new Person
p.__proto__ === Person.prototype // true
p.constructor // class Person {}
```

## 寄生组合继承

## 闭包
* 闭包是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，创建的函数可以访问到当前函数的局部变量。
* 优点：
  - 创建私有变量，避免全局污染
  - 缓存
* 缺点：
  - 使用不当会导致内存溢出
  - 不需要使用的时候，需要设置为null

## 作用域和作用域链
* 作用域是一个变量或函数的可访问范围，作用域控制着变量或函数的可见性和生命周期。
* 作用域分为：
  - 全局作用域
  - 函数作用域：内层作用域可以访问外层
  - ES6块级作用域
* 作用域链：变量在指定的作用域中没有找到，会依次向上一层的作用域进行查找，直到全局作用域。这个查找过程，成为作用域链。


## call() 、bind（）、 apply() 的区别
* 都可以改变`this`的指向
* call和apply的区别在于传参，call、bind都是传入对象。apply传入一个数组。
* call、apply改变this指向后会立即执行函数，bind在改变this后返回一个函数，不会立即执行函数，需要手动调用。
* 连续多次调用 bind 方法，最终函数的 this 上下文是由第一次调用 bind 方法的参数决定

## 浏览器垃圾回收机制
* 垃圾回收：`JavaScript`代码运行时，需要分配`内存空间来储存变量和值`。当变量不再参与运行时，就需要系统收回被占用的内存空间。​
* 在 V8 中，会把`堆`分为新生代和老生代两个区域，新生代中存放的是生存时间短的对象，老生代中存放生存时间久的对象
* 副垃圾回收器主要负责新⽣代的垃圾回收。大多数的对象最`开始时候`都会被分配在新生代，该存储空间相对较小，分为两个空间：from 空间（对象区）和 to 空间（空闲区）。
  - 新增变量会放到To空间，当空间满后需要执行一次垃圾清理操作
  - 对垃圾数据进行`标记`，标记完成后将`存活的数据`复制到`From空间`中，有序排列
  - 交换两个空间，原来的To变成From，旧的From变成To
* 主垃圾回收器主要负责⽼⽣代中的垃圾回收。存储一些占用空间大、存活时间长的数据，采用标记清除算法进行垃圾回收。
  - 主要分为标记、清除两个阶段。
  - 标记：将所有的变量打上标记0，然后从根节点(window对象、DOM树等)开始遍历，把存活的变量标记为1
  - 清除：清除标记为0的对象，释放内存。清除后将1的变量改为0，方便下一轮回收。
* 除了标记清除法以外，还有引用计数法。
  - 一个对象被引用就+1，反之-1，引用为0，就触发垃圾回收。
  - 存在循环引用，导致无法回收。
* 导致内存泄漏的情况
  - 意外的全局变量：未声明的变量，而意外的创建了一个全局变量。
  - 被遗忘的计时器或回调函数：设置了 setInterval 定时器，而忘记取消它，如果循环函数有对外部变量的引用的话，那么这个变量会被一直留在内存中，而无法被回收。
  - 脱离 DOM 的引用：获取一个 DOM 元素的引用，而后面这个元素被删除，由于一直保留了对这个元素的引用，所以它也无法被回收。
  - 闭包：不合理的使用闭包，从而导致某些变量一直被留在内存当中。
