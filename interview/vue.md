# vue
* Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，而是按一定的策略进行 DOM 的更新。
* $nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 $nextTick。

## nextTick

## 双向绑定
- 目前大概有三种实现方式：发布订阅模式，Angular 的脏查机制，数据劫持。
- Vue 则采用的是数据劫持与发布订阅相结合的方式实现双向绑定，数据劫持主要通过 Object.defineProperty 来实现。
- Observer 监听器：用来监听属性的变化通知订阅者
- Watcher 订阅者：收到属性的变化，然后更新视图
- Compile 解析器：解析指令，初始化模版，绑定订阅者

## diff算法
### vue2
* 会把整个DOM都比对一次。
* defineProperty
  - 针对对象的属性，for in data 进行绑定
  - 数组的变化不能监听
  - 会改变源对象
* 不能使用 tree-shaking

### vue3
* block tree，只比对绑定了 vue 指令的 dom.
* Proxy
  - 更快
  - 不会改变源对象
* 支持tree-shaking

## 缓存
* 缓存应该使用单例模式
* 多个单例，往哪里存？懵逼。
* 更新缓存，websocket 比较耗性能；轮询也一样。
* 不要存时效性太强的数据。

## use
* 把传入的方法执行一遍。
* 对象的话，需要支持 `install` 方法
* 优先执行 `install` 方法
```js
function b() {}

b.install = function(vue) {
	// main.js 里面，即全局混入，所有组件都能使用 a方法和num数据
	vue.mixin({
		methods: {
			a: function() {
				this.$options  // 组件配置
			}
		},
		data: () => {
			return {
				num: 123
			}
		},
		// 生命周期混入
		created: function() {

		},
		beforeCreate: function() {
			
		}
	})
}
```

## mixin
* 
 