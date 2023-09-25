# Vue

## v-if 与 v-for
* 两种混在一起写法均不被官方推荐。

### Vue2中应尽量避免二者同时使用
* 当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级。
* 哪怕我们只渲染出一小部分的元素，也得在每次重渲染的时候遍历整个列表，不论是否发生了变化。
* 不建议这样做的原因就是比较浪费性能.
* 建议先将结果计算好，再使用循环。

### Vue3
* v-if 具有比 v-for 更高的优先级。
* 把 v-for 移动到容器元素上,例如ul,ol 或者外面包裹一层 `template`

## Proxy vs defineProperty
* Proxy能对整个对象的任何方法进行劫持，而defineProperty不能做到这些，需要对某些操作对象和数组的API进行重写才行。
* defineProperty不能检测到对象属性的添加和删除，需要写一个专门的API来做这些事情
* Proxy对性能的消耗比defineProperty要小？？？

### defineProperty
* 实现响应式的原理，是通过Object.defineProperty的getter和setter 下面实现一个简单的响应式函数
* setter中就会调用update方法，去改变UI视图。
* 嵌套对象，还需要进行递归，使内部的数据也变成响应式的，如果key赋值的是对象，那么也需要对这个对象进行响应式化。
* 但删除对象，或数组监听存在局限性。
* 所以在vue2中增加了set、delete等API，并且对数组的api也进行了重写。并且这种响应式对深层的嵌套对象，需要进行深层的监听，会消耗极大的性能。

### Proxy
* 可以针对对象的所有操作进行监听，就可以代理所有属性。
* 对于属性为对象的情况需要注意，也需要递归对对象的属性，进行代理才行。
* proxy监听对象，也是要递归的，proxy只能监听第一层，如果属性值也是一个对象，那么这个对象不会被监听，必须递归；proxy相对于 defineProperty()，监听属性时`不需要遍历每个属性一一操作`，而且对于后来新增的新属性也不需要在set。从API设计层来讲，更适合做监听变化的事情。
```js
function reactive(obj) {
  const observed = new Proxy(obj, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver)
      // 判断是否为对象
      if(isObject(res)) {
        return reactive(res)
      } else {
        return res
      }
    },
    set(target, key, value, receiver) {
      const res = Reflect.set(target,key,value,receiver)
      return res
    },
    deleteProperty(target, key) {
      const res = Reflect.deleteProperty(target, key)
      return res
    }
  })
  return observed
} 
```