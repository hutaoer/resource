# react
* [关于React面试题汇总](https://juejin.im/post/5b2215f76fb9a00e8f795cd1)
* [常见react面试题汇总（适合中级前端）](https://segmentfault.com/a/1190000016885832)
* [为什么函数组件也需要引入 React](https://www.jianshu.com/p/63f0e2ac8aea)
  - 我们有时候在代码中明明没有使用`React`，仍然需要在头部写上`import React from "React"`
  - 我们的JSX语法只是一种语法糖，它最终会被转译成纯粹的js语法，因此在babel转译之后，我们的代码就变成了：`React.createElement()`.这就是为什么我们需要在函数式组件开头引入React的原因！
* [jsx一些原理](https://github.com/rdmclin2/blog/issues/1)
  - 为什么React的组件名一定要大写? 答: 因为普通的html标签都是小写的, div, a, p，那么React如何区分是已有的HTML标签还是用户自定义的组件呢？就是首字母大小写, 如果你小写你的组件名称，react会把它当原生html标签，然后报错因为找不到.
  - 为什么组件必须要有一个顶层节点? 答：React15以下组件需要包一个顶层节点，否则会报`_Adjacent XJS elements must be wrapped in an enclosing tag `的错，为什么呢? 再复习一遍在js当中所有东西都是js ，并列的两个tag 会渲染成什么样子？`React.createElement(...) React.createElement(...) `并不符合语法，但如果做成数组形式返回其实是可以的，因此React16中终于支持了返回数组的写法。
  - React中用className的原因：未来react可能会用…来解构this.props，这时候class和for作为保留字不能作为变量标识，就不能适用这种情况了。
* create-react-app原理实现
* [30分钟精通React今年最劲爆的新特性——React Hooks](https://segmentfault.com/a/1190000016950339)

## 组件复用
* 尤其是那些写成class的组件，它们本身包含了状态（state），所以复用这类组件就变得很麻烦。
* 官方推荐怎么解决这个问题呢？答案是：渲染属性（Render Props）和高阶组件（Higher-Order Components）。
* 渲染属性指的是使用一个值为函数的prop来传递需要动态渲染的nodes或组件。
* 高阶组件这个概念就更好理解了，说白了就是一个函数接受一个组件作为参数，经过一系列加工后，最后返回一个新的组件。
* 上面两种模式不好的地方：这两种模式，会发现它们会增加我们代码的层级关系，hooks会更加的简洁。

## react router


## 动态路由

## hook
* useState是react自带的一个hook函数，它的作用就是用来声明状态变量。
* useState这个函数接收的参数是我们的状态初始值（initial state），它返回了一个数组，这个数组的第[0]项是当前当前的状态值，第[1]项是可以改变状态值的方法函数。
* react是怎么保证多个useState的相互独立的？
  - react是根据useState出现的顺序来定的。
  - react规定我们必须把hooks写在函数的最外层，不能写在ifelse等条件语句当中，来确保hooks的执行顺序一致。
* 什么是Effect Hooks?
  - 我们之前都把这些副作用的函数写在生命周期函数钩子里，比如componentDidMount，componentDidUpdate和componentWillUnmount。而现在的useEffect就相当与这些声明周期函数钩子的集合体。
  - 第一，react首次渲染和之后的每次渲染都会调用一遍传给useEffect的函数。而之前我们要用两个声明周期函数来分别表示首次渲染（componentDidMount），和之后的更新导致的重新渲染（componentDidUpdate）。
  - 第二，useEffect中定义的副作用函数的执行不会阻碍浏览器更新视图，也就是说这些函数是异步执行的，而之前的componentDidMount或componentDidUpdate中的代码则是同步执行的。
* effect在什么时候执行的？
* 在任意一次渲染中，props和state是始终保持不变的。如果props和state在不同的渲染中是相互独立的，那么使用到它们的任何值也是独立的（包括事件处理函数）。它们都“属于”一次特定的渲染。即便是事件处理中的异步函数调用“看到”的也是这次渲染中的count值。
* 每次渲染都有它自己的Effects，effect 函数本身在每一次渲染中都不相同。effects会在每次渲染后运行。
* class写法中，this.state.count总是指向最新的count值，而不是属于某次特定渲染的值。
* 在单次渲染的范围内，props和state始终保持不变。
* 有时候你可能想在effect的回调函数里读取最新的值而不是捕获的值。最简单的实现方法是使用`refs`
* 第一个， 如果一个函数没有使用组件内的任何值，你应该把它提到组件外面去定义，然后就可以自由地在effects中使用。或者， 你也可以把它包装成 useCallback Hook:
* 使用useCallback，函数完全可以参与到数据流中。我们可以说如果一个函数的输入改变了，这个函数就改变了。
* 为什么使用hooks?同一个 componentDidMount 中可能也包含很多其它的逻辑，如设置事件监听，而之后需在 componentWillUnmount 中清除，代码量多起来的时候，容易产生bug.
* hooks 可以把副作用拆开来，达到解耦的目的。
* 一些隐藏的问题，比如函数组件中的一些副作用，排查起来比较费时间。

### hook 使用原则
* 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。
* 只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中，我们稍后会学习到。）

### useState原理
* 为什么不能在循环、判断内部使用 Hook？useState内部实现的时候，每调用一次，数组的index+1，如果使用了判断，可能导致两次渲染的时候，state对应的索引不一致。
* useState，不会把心的state和旧的state合并。
* 与 class 组件中的 setState 方法不同，useState 不会自动合并更新对象。

### useEffect
* useEffect 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。它跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途，只不过被合并成了一个 API。
* 赋值给 useEffect 的函数会在组件渲染到屏幕之后执行。默认情况下，effect 会在每轮组件渲染完成后执行。
* Taro 会确保 dispatch 函数的标识是稳定的，并且不会在组件重新渲染时改变。这就是为什么可以安全地从 useEffect 或 useCallback 的依赖列表中省略 dispatch。

### useContext
* 调用了 useContext 的组件总会在 context 值变化时重新渲染。

### useRef
* useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在【组件的整个生命周期内】保持不变。
* Ref属性用来获取DOM元素的节点和获取子组件的实例。
* 获取DOM元素的节点，获取子组件的实例，渲染周期之间共享数据的存储（state不能存储跨渲染周期的数据，因为state的保存会触发组件重渲染）。
* 因为函数组件没有实例，如果想用ref获取子组件的实例，子组件组要写成类组件
* 通过forwardRef可以访问到函数子组件

## refs

### React 16 更新一览|精读《React16 新特性》
* Fiber
  - Fiber 是对 React 核心算法的一次重新实现，将`原本的同步更新过程碎片化，避免主线程的长时间阻塞，使应用的渲染更加流畅`。
  - 在 React16 之前，更新组件时会调用各个组件的生命周期函数，计算和比对 Virtual DOM，更新 DOM 树等，这整个过程是同步进行的，`中途无法中断`。当组件比较庞大，更新操作耗时较长时，就会导致浏览器唯一的主线程都是执行组件更新操作，而无法响应用户的输入或动画的渲染，很影响用户体验。
* createRef
  - React16 规范了 Ref 的获取方式，通过 React.createRef 取得 Ref 对象。
* createContext
  - 全新的 Context API 可以很容易穿透组件而无副作用，其包含三部分：React.createContext，Provider，Consumer。
* 新增了一个顶级 API: ReactDOM.createPortal。
  - 使用 createPortal 可以快速创建 Dialog 组件，且不需要牵扯到 componentDidMount、componentDidUpdate 等生命周期函数。
* render 方法能够返回数组了
* 更好的错误处理：`componentDidCatch(error, info)` 的生命周期函数
* 更小的体积。

### react 16 新的生命周期
* React16新的生命周期弃用了componentWillMount、componentWillReceivePorps，componentWillUpdate
* 新增了getDerivedStateFromProps、getSnapshotBeforeUpdate来代替弃用的三个钩子函数（componentWillMount、componentWillReceivePorps，componentWillUpdate）
* React16并没有删除这三个钩子函数，但是不能和新增的钩子函数（getDerivedStateFromProps、getSnapshotBeforeUpdate）混用，React17将会删除componentWillMount、componentWillReceivePorps，componentWillUpdate
* 新增了对错误的处理（componentDidCatch）

### 调用 super(props) 的目的是什么？
* 在 super() 被调用之前，子类是不能使用 this 的，在 ES2015 中，子类必须在 constructor 中调用 super()。传递 props 给 super() 的原因则是便于(在子类中)能在 constructor 访问 this.props。

### 了解 redux 么，说一下 redux 
* redux 是一个应用数据流框架，主要是解决了组件间状态共享的问题，原理是集中式管理，主要有三个核心方法，action，store，reducer，工作流程是 view 调用 store 的 dispatch 接收 action 传入 store，reducer 进行 state 操作，view 通过 store 提供的 getState 获取最新的数据，flux 也是用来进行数据操作的，有四个组成部分 action，dispatch，view，store，工作流程是 view 发出一个 action，派发器接收 action，让 store 进行数据更新，更新完成以后 store 发出 change，view 接受 change 更新视图。Redux 和 Flux 很像。主要区别在于 Flux 有多个可以改变应用状态的 store，在 Flux 中 dispatcher 被用来传递数据到注册的回调事件，但是在 redux 中只能定义一个可更新状态的 store，redux 把 store 和 Dispatcher 合并,结构更加简单清晰
* 新增 state,对状态的管理更加明确，通过 redux，流程更加规范了，减少手动编码量，提高了编码效率，同时缺点时当数据更新时有时候组件不需要，但是也要重新绘制，有些影响效率。一般情况下，我们在构建多交互，多数据流的复杂项目应用时才会使用它们。
* 和 Flux 一样，Redux 规定，将模型的更新逻辑全部集中于一个特定的层（Flux 里的 store，Redux 里的 reducer）
* Redux 并没有 dispatcher 的概念。
* reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。
* 不要在reducer里面做以下操作：
  - 修改传入参数；
  - 执行有副作用的操作，如 API 请求和路由跳转；
  - 调用非纯函数，如 Date.now() 或 Math.random()。

### redux 有什么缺点
* 一个组件所需要的数据，必须由父组件传过来，而不能像 flux 中直接从 store 取。
* 当一个组件相关数据更新时，即使父组件不需要用到这个组件，父组件还是会重新 render，可能会有效率影响，或者需要写复杂的 shouldComponentUpdate 进行判断。
* Reducer 只是一些纯函数，它接收先前的 state 和 action，并返回新的 state。

### redux / flux / vuex
* redux与flux都是react框架的应用数据流框架。vuex是vue的核心方法。
* redux是一个应用数据流框架，主要是解决了【组件间状态共享的问题】，原理是集中式管理，主要有三个核心方法，action，store，reducer，工作流程是view调用store的dispatch接收action传入store，reducer进行state操作，view通过store提供的getState获取最新的数据。
* flux也是用来进行数据操作的，有四个组成部分action，dispatch，view，store，工作流程是view发出一个action，派发器接收action，让store进行数据更新，更新完成以后store发出change，view接受change更新视图。
* Redux和Flux很像。主要区别在于Flux有多个可以改变应用状态的store，在Flux中dispatcher被用来传递数据到注册的回调事件，但是在redux中只能定义一个可更新状态的store，redux把store和Dispatcher合并,结构更加简单清晰，新增state,对状态的管理更加明确，通过redux，流程更加规范了，减少手动编码量，提高了编码效率，同时缺点是当数据更新时有时候组件不需要，但是也要重新绘制，有些影响效率。一般情况下，我们在构建多交互，多数据流的复杂项目应用时才会使用它们。
* Vuex 是一个专为 Vue.js 设计的状态管理模式，vuex解决了组件之间同一状态的共享问题。当我们的应用遇到多个组件共享状态时，会需要多个组件依赖于同一状态，这时候使用vuex就可以很好的解决。

### umjs
* [如何评价支付宝新出的框架 五米](https://www.zhihu.com/question/266579173)

### dva

### antd

## React 中 keys 的作用是什么？
* Keys 是 React 用于追踪哪些列表中元素被修改、被添加或者被移除的辅助标识。
* 在开发过程中，我们需要保证某个元素的 key 在其同级元素中具有唯一性。在 React Diff 算法中 React 会借助元素的 Key 值来判断该元素是新近创建的还是被移动而来的元素，从而减少不必要的元素重渲染。此外，React 还需要借助 Key 值来判断元素与本地状态的关联关系，因此我们绝不可忽视转换函数中 Key 的重要性。

## Class Component 而不是 Functional Component？
* 在组件需要包含内部状态或者使用到生命周期函数的时候使用 Class Component ，否则使用函数式组件。

## 受控组件和非受控组件
* 受控组件（Controlled Component）代指那些交由 React 控制并且所有的表单数据统一存放的组件。
* 非受控组件（Uncontrolled Component）则是由DOM存放表单数据，并非存放在 React 组件中。我们可以使用 refs 来操控DOM元素。



