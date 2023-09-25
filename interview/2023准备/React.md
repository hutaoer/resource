# React


## 常识类

### 声明式用户界面
* 意味着您可以用某种语言描述用户界面中需要 哪些 元素，并在某种程度上描述它们的外观，但是您可以忽略一些细节，例如元素的确切位置和视觉样式。 

### 为什么React自定义组件首字母要大写
* 组件名必须大写，区别于HTML标签，HTML 标签则必须是小写字母。
* jsx通过babel转义时，调用了`React.createElement`函数，它接收三个参数，分别是type元素类型，props元素属性，children子元素。如果是小写，会被当成是html标签。大写的化，会当成一个变量传递。

### 为什么只能有一个根元素
* React组件最后会编译为render函数，函数的返回值只能是1个，如果不用单独的根节点包裹，就会并列返回多个值，这在js中是不允许的
* react的`虚拟DOM`是一个`树状结构`，树的根节点只能是1个，如果有多个根节点，无法确认是在哪棵树上进行更新

### 如何返回多个组件
* 使用HOC
* `React.Fragment`
* 返回数组

### 生命周期
* 函数组件没有生命周期，只有类组件才有。挂载、更新、卸载阶段
* render是class组件唯一必须实现的方法。

#### 挂载
* constructor
* getDerivedStateFromProps
* render
* componentDidMount: 可访问dom,异步请求，消息订阅

#### 更新
* 组件props变化或state变化触发更新
* static getDerivedStateFromProps
* shouldComponentUpdate
* render
* getSnapShotBeforeUpdate
* componentDidUpdate

#### 卸载
* getDerivedStateFromError 在errorBoundary中使用
* componentDidCatch


### JSX
* 是语法糖，不能被浏览器直接识别，需要通过webpack，babel编译工具转为js，等价于`React.createElement`，所以需要在顶部引入`react`

### 事件机制
* React基于浏览器的事件机制实现了一套自身的事件机制，它符合W3C规范，包括`事件触发、事件冒泡、事件捕获、事件合成和事件派发`
* 原因如下：
  - 在底层磨平不同浏览器的差异，React实现了统一的事件机制，我们不再需要处理浏览器事件机制方面的兼容问题，在上层面向开发者暴露稳定、统一的、与原生事件相同的事件接口
  - React把握了事件机制的主动权，实现了对所有事件的中心化管控
  - React引入事件池避免垃圾回收，在事件池中获取或释放事件对象，避免频繁的创建和销毁
* 虽然合成事件不是原生DOM事件，但它包含了原生DOM事件的引用，可以通过`e.nativeEvent`访问
* 我们写的React事件是绑定在DOM上吗，如果不是绑定在哪里?
  - React16的事件绑定在document上， React17以后事件绑定在container，即容器节点。
* React事件机制总结如下：
  - React所有的事件绑定在container上(react17以后)
  - React自身实现了一套冒泡机制，不能通过return false阻止冒泡
  - React通过`SytheticEvent`实现了事件合成
* React实现事件绑定的过程
* 针对同一个事件，即使可能存在多次回调，document（container）也只需要注册一次监听？
  - React注册到document(container)上的并不是一个某个DOM节点具体的回调逻辑，而是一个统一的事件分发函数`dispatchEvent`。类似于事件委托。在根节点进行判断和事件分发。
* 事件触发：本质是对`dispatchEvent`函数的调用。
  - 事件冒泡到根节点
  - 执行`dispatchEvent`
  - 创建事件对应的合成时间对象：`SyntheticEvent`
  - 收集事件在捕获阶段所波及的回调函数和对应节点实例
  - 收集事件在冒泡阶段所波及的回调函数和对应节点实例
  - 将回调函数按顺序执行，并传入`SyntheticEvent`
* React事件处理为什么要手动绑定this
  - `React.createElement`,在`createElement`中，它的`this`丢失了，并不是由组件实例调用的，因此需要手动绑定`this`
* 如何阻止事件冒泡
  - 阻止合成事件的冒泡用e.stopPropagation()
  - 阻止合成事件和最外层document事件冒泡，使用e.nativeEvent.stopImmediatePropogation()
  - 阻止合成事件和除了最外层document事件冒泡，通过判断e.target避免

### useLayoutEffect和useEffect的区别
* 调用 `useLayoutEffect` 在浏览器重新绘制屏幕之前进行布局测量。`useLayoutEffect` 内部的代码和所有计划的状态更新阻塞了浏览器重新绘制屏幕。
  - 比如一个想计算一个DOM节点的高度，可以在这个hook中计算。
  - React 将它放在 DOM 中，然后运行 useLayoutEffect 中的代码。期间可能会两次渲染该节点高度。
* useEffect是在渲染时是`异步`执行，并且要等到浏览器将所有变化渲染到屏幕后才会被执行。 在本次更新完成后，再开启一个任务调度，在下次任务调度中执行。 useLayoutEffect是和componentDidMount，componentDidUpdate 执行时机一样，并且是`同步`执行的。 也就是说是在浏览器将所有变化渲染到屏幕之前执行的。

### 常用组件
#### 错误边界
* React部分组件的错误不应该导致整个应用崩溃
* getDerviedStateFromError和componentDidCatch的区别是前者展示降级UI，后者记录具体的错误信息，它只能用于class组件
* 错误边界无法捕获自身的错误，也无法捕获事件处理、异步代码(setTimeout、requestAnimationFrame)、服务端渲染的错误

#### Portal
* Portal提供了让子组件渲染在除了父组件之外的DOM节点的方式,它接收两个参数，第一个是需要渲染的React元素，第二个是渲染的地方(DOM元素)
* 用户弹窗组件

#### Fragment
* 包裹多个组件，且不会产生DOM节点

#### Context
* 跨层级（嵌套组件）传递数据
* 创建一个上下文，在传递数据的组件中，使用 provider 包裹，在消费的地方，使用 consumer 包裹。

#### Suspense
* 使组件允许在某些操作结束后再进行渲染，比如接口请求,一般与`React.lazy`一起使用

### 数据流动
* 单向数据流思想
* 父子，子父
  - props
  - 回调函数
  - 事件冒泡到父组件
  - Ref，绑定到子组件，父组件调用Ref的方法
* 兄弟
  - 通过父组件中转
* 跨组件层级
  - Context
* 无关组件
  - Store库：Redux，mobx

### React.Children.map和js的map有什么区别？
* 可以处理null或undefined的情况

### React Hooks
* 函数组件与类组件的区别:
  - 类组件需要声明constructor，函数组件不需要
  - 类组件需要手动绑定this，函数组件不需要
  - 类组件有生命周期钩子，函数组件没有
  - 类组件可以定义并维护自己的state，属于有状态组件，函数组件是无状态组件
  - 类组件需要继承class，函数组件不需要
  - 类组件使用的是面向对象的方法，封装：组件属性和方法都封装在组件内部 继承:通过extends React.Component继承;函数组件使用的是函数式编程思想

### SetState是同步还是异步的
* setState是一个异步方法，但是在setTimeout/setInterval等定时器里逃脱了React对它的掌控，变成了同步方法.
* setState并不是单纯的异步或同步，这其实与调用时的环境相关
  - 在合成事件 和 生命周期钩子(除componentDidUpdate) 中，setState是"异步"的；
  - 在 原生事件 和setTimeout 中，setState是同步的，可以马上获取更新后的值；
  - 批量更新：`多个顺序`的`setState`不是同步地一个一个执行滴，而是会一个一个`加入队列`，然后最后`一起执行`。在 合成事件 和 生命周期钩子 中，`setState`更新队列时，存储的是 `合并状态`(Object.assign)。因此前面设置的 key 值会被后面所覆盖，最终只会执行一次更新。
  - 函数式： `setState`第一个参数为函数形式时，在这个函数中可以回调拿到最新的state对象，然后函数return出的对象讲被设置成newState。this.`setState`((state, props) => newState)
* 每个setState都会被react加入到任务队列，多次对同一个state使用setState只会返回最后一次的结果，因为它不是立刻就更新，而是先放在队列中，等时机成熟在执行批量更新。
* setState 的批量更新优化也是建立在“异步”（`合成事件`、`钩子函数`）之上的，在原生事件和setTimeout 中不会批量更新。① 在“异步”中如果对同一个值进行多次setState，setState的批量更新策略会对其进行覆盖，取最后一次的执行，② 如果是同时setState多个不同的值，在更新时会对其进行合并批量更新。
* React18以后，使用了createRoot api后，所有setState都是异步批量执行的

#### setState原理
①调用this.setState(newState) -> ②将新状态newState存入pending队列 -> ③判断是否处于batch Update（`isBatchingUpdates`是否为true） -> ④isBatchingUpdates=true，保存组件于`dirtyComponents`中，走异步更新流程，合并操作，延迟更新；
⑤isBatchingUpdates=false，走同步过程。遍历所有的`dirtyComponents`，调用updateComponent，更新pending state or props。

#### setState批量更新过程
* 生命周期和合成事件执行前后都有相应的钩子，分别是pre钩子和post钩子
* pre钩子。执行batchedUpdate方法，`isBatchingUpdates`变量置为true。
* post钩子。`isBatchingUpdates`置为false

#### 为什么直接修改this.state无效
* setState本质是通过一个队列机制实现state更新的。 执行setState时，会将需要更新的state合并后放入状态队列，而不会立刻更新state，队列机制可以批量更新state。
* 直接修改this.state，那么这个state不会放入状态队列中，下次调用setState时对状态队列进行合并时，会忽略之前直接被修改的state

#### setState之后发生的事情
* diff state，判断是否更新UI

#### setState循环调用风险
* 如果在`shouldComponentUpdate`或者`componentWillUpdate`方法中调用setState，此时this._pending-StateQueue != null，就会造成循环调用，使得浏览器内存占满后崩溃

### React Hooks在平时开发中需要注意的问题和原因
* 不要在循环，条件或嵌套函数中调用Hook，必须始终在 React函数的顶层使用Hook。会造成顺序的不一致。
* 使用useState时候，使用push，pop，splice等直接更改数组对象的坑。不会直接修改。
* useState设置状态的时候，只有第一次生效，后期需要更新状态，必须通过useEffect

### React 中的高阶组件运用了什么设计模式
* 装饰器模式
* 高阶组件不是组件，是 增强函数，可以输入一个元组件，返回出一个新的增强组件。
* 通过给函数传入一个组件（函数或类）后在函数内部对该组件（函数或类）进行功能的增强（不修改传入参数的前提下），最后返回这个组件（函数或类），即允许向一个现有的组件添加新的功能，同时又不去修改该组件，属于 包装模式(Wrapper Pattern) 的一种。
* 什么是装饰者模式：在不改变对象自身的前提下在程序运行期间动态的给对象添加一些额外的属性或行为
* 可以提高代码的复用性和灵活性。

### fiber架构
* 在React16以前，React更新是通过树的深度优先遍历完成的，遍历是不能中断的，当树的层级深就会产生栈的层级过深，页面渲染速度变慢的问题，为了解决这个问题引入了fiber，React fiber就是虚拟DOM，它是一个`链表结构`，返回了return、children、siblings，分别代表父fiber，子fiber和兄弟fiber，`随时可中断`。
* fiber对渲染线程实现更精细的控制。把一个渲染任务分解为多个渲染任务，而后将其分散到多个帧里。实现任务的可中断、可恢复，并按优先级处理任务。
* 如何实现可中断和恢复。fiber是一个链表结构，它有三个指针，分别记录了当前节点的下一个兄弟节点，子节点，父节点。当遍历中断时，它是可以恢复的，只需要保留当前节点的索引，就能根据索引找到对应的节点

#### fiber更新机制
* 初始化：
  - 创建fiberRoot和rootFiber，进入beginWork
  - 两棵fiber树：workInProgress fiber构建中的，current fiber正在视图层渲染的树。
  - 两棵树通过`alternate`保持互相引用
  - 深度调和子节点，渲染视图。在新建的alternate树上，完成整个子节点的遍历，包括fiber的创建，最后会以workInProgress树最为最新的渲染树
  - fiberRoot的current指针指向workInProgress，使其变成current fiber，完成初始化。
* 更新：
  - 重新创建workInProgress树，复用当前current树上的alternate，作为新的workInProgress
  - 渲染完成后，workInProgress树又变成current树
* 双缓冲模式
  - react的current树和workInProgress树使用双缓冲模式，可以减少fiber节点的开销，减少性能损耗
* 渲染流程
  - React用JSX描述页面，JSX经过babel编译为`render function`，执行后产生VDOM，VDOM不是直接渲染的，会先转换为fiber，再进行渲染。
  - vdom转换为fiber的过程叫reconcile，转换过程会创建DOM，全部转换完成后会一次性commit到DOM。
  - 这个过程不是一次性的，而是可打断的，这就是fiber架构的渲染流程
  - vdom（React Element对象）中只记录了子节点，没有记录兄弟节点，因此渲染不可打断。fiber（fiberNode对象）是一个链表，它记录了父节点、兄弟节点、子节点，因此是可以打断的

## V15
* React15架构可以分为两层：
  - Reconciler（协调器）—— 负责找出变化的组件
  - Renderer（渲染器）—— 负责将变化的组件渲染到页面
* 由于递归执行，所以更新一旦开始，中途就无法中断。当层级很深时，递归更新时间超过了16ms，用户交互就会卡顿。

## V16
React16架构可以分为三层：
Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入Reconciler
Reconciler（协调器）—— 负责找出变化的组件
Renderer（渲染器）—— 负责将变化的组件渲染到页面上

## v16 到 v18 变化
* v16: 异步模式（Async Mode）
* v17: 并发模式(Concurrent Mode) 并发模式不是一个功能，而是一个底层设计。它可以帮助应用`保持响应`，根据用户的`设备性能`和`网速`进行调整，它通过渲染可中断来修复阻塞渲染机制。使`同步不可中断更新`变成了`异步可中断更新`
* v18: 并发更新(Concurrent Render)

## Fiber
* 更新流程：`render`和`commit`
* render: 组件render函数执行
* commit: 将render的结果渲染到页面的过程。
* 在 Sync 模式下，render 阶段是一次性执行完成；而在 Concurrent 模式下 render 阶段可以被拆解，每个时间片内执行一部分，直到执行完毕。

## React18 V18

### 三种入口模式
* legacy 模式： ReactDOM.render(, rootNode)。没有开启新功能，这是react17采用的默认模式。
* blocking 模式： ReactDOM.createBlockingRoot(rootNode).render()。作为迁移到concurrent 模式的过渡模式。
* concurrent 模式： ReactDOM.createRoot(rootNode).render()。这个模式开启了所有的新功能。

### 返回值支持undefined
* 在`react17`中，返回空组件只能返回`null`，显式返回`undefined`会报错
* 在`react18`中，支持`null`和`undefined`返回

### 新 root API
* 用户可以通过`createRoot`手动创建节点。
```js
const root = document.getElementById('app')
// v18 之前的方法
ReactDOM.render(<App/>,root)

const root = ReactDOM.createRoot(document.getElementById('app'))
// v18 的新方法
root.render(<App/>)
```

### 自动批处理
* React将`多个状态更新`分组到`一个重新渲染`中以获得更好的性能。（将多次 `setState` 事件合并）。在 v18 之前只在事件处理函数中实现了批处理。
```js
function handleOnClick() {
  // 内部合并为一次，这种批处理只限于 React 原生事件内部的更新。
  setState1(xxx)
  setState2(xxx)
}

//示例一：react17会render两次，react18只需要render一次
const handleClick = async () => {
  // 微任务也会合并
  Promise.resolve().then(() => {
    setC1((c) => c + 1);
  });
  setC2((c) => c + 1);
};

  //示例二：react18需要render两次
const handleClick = async () => {     
  await setC1((c) => c + 1); //提升到同步优先级，类似flushSync
  setC2((c) => c + 1);
};

```
* 在 v18 中所有更新都将自动批处理，包括 `promise链`、`setTimeout`等异步代码，`原生事件处理函数`。批量更新是一个破坏性的更新（`breaking change`）
* 退出自动批处理，使用`ReactDOM.flushSync()`来包裹。`flushSync` 允许你强制 React 在提供的回调函数内同步刷新任何更新，这将确保 DOM 立即更新。
* 源码实现。其实是将内部更新的优先级强制指定为`SyncLane`，即指定为同步优先，退出了批处理。
```js
export function flushSync(fn) {
  try {
    // DiscreteEventPriority === SyncLane
    setCurrentUpdatePriority(DiscreteEventPriority);
    fn && fn();
  } finally {
    setCurrentUpdatePriority(previousPriority);
  }
}

```
* 示例
```js
import {flushSync} from 'react-dom'
function fnEvent() {
  flushSync(() => {
    setState(xxx)
  })
}
```

#### 实现
* 自动批处理的实现在`React18`中是基于优先级的，用`lane`来进行优先级的控制。
* `lane` 是一个表示 `priority` 的一个东西，它通过`二进制位`来表示。优先级最高的 `SyncLane` 为 1，其次为 2、4、8。

### startTransition
* 可用来降低渲染优先级。分别用来包裹计算量大的 function和 value，降低优先级，减少重复渲染次数。类似场景下常见的做法应该是 `debounce` 或 `throttle`
* `startTransition` 可以指定 UI 的渲染优先级，哪些需要实时更新，哪些需要延迟更新。
* 官方还提供了 hook 版本的 `useTransition`，接受传入一个毫秒的参数用来修改最迟更新时间，返回一个过渡期的`pending` 状态和`startTransition`函数。
* `startTransition`的原理就是利用了`React底层的优先级调度模型`。包装在 `startTransition` 中的更新被视为非紧急更新，如果出现更紧急的更新（如点击或按键），则会中断。
* 示例
```js
import { useTransition } from 'react';
const [isPending, startTransition] = useTransition();

// 用户操作，优先级更高
setSliderValue(input);
// 大量的计算，比较耗时，但更新优先级不高
startTransition( () => {
 // 图表更新
  setGraphValue(input);
}); 
```

### useDefferdValue
* 允许变量延时更新

### 不常用的hooks
* 以下的新 hook 主要用于解决 SSR 相关的问题或者是为第三方库的开发设计的，对于普通 React 应用开发者来说几乎用不到：
* `useId` 用于解决 SSR 时客户端与服务端难以生成统一的 ID 的问题。在服务器和客户端生成相同的唯一一个id，避免hydrating的不兼容
* `useSyncExternalStore` 是一个为第三方库编写提供的新 hook，主要用于支持 React 18 在 concurrent rendering 下与第三方 store 的数据同步问题。
* `useInsertionEffect` 主要用于提高第三方 CSS in JS 库渲染过程中样式注入的性能。

#### useId
* 在服务端，将 React 组件渲染成为一个字符串，这个过程叫做脱水`dehydrate`。
* 字符串以 html 的形式传送给客户端，作为首屏直出的内容。到了客户端之后，React 还需要对该组件重新激活，用于参与新的渲染更新等过程中，这个过程叫做`hydrate`。

### Suspense
#### 浏览器端渲染
* `ComponentThatSuspends`是异步渲染的。`Legacy Suspense` 中，同级兄弟组件会立即挂载（mounted）到 DOM，相关的 effects 和生命周期会被触发，最后会隐藏这个组件。`Concurrent Suspense` 中，同级兄弟组件并不会从 DOM 上卸载，相关的 effects 和生命周期会在 `ComponentThatSuspends` 处理完成时触发。
```js
<Suspense fallback={<Loading />}>
  <ComponentThatSuspends />
  <Sibling />
</Suspense>
```

#### SSR支持 Suspense组件
* `Suspense` 的作用： 划分页面中需要`并发渲染`的部分。
* hydration[水化]：ssr 时服务器输出的是字符串（html），客户端（一般是浏览器）根据这些字符串并结合加载的 JavaScript 来完成 React 的初始化工作这一阶段为水化。
* 服务器不需要等待被`Suspense` 包裹组件是否加载到完毕，即可发送 `HTML`，而代替 suspense 包裹的组件是`fallback`中的内容，一般是一个占位符（`spinner`），以最小内联`<script>`标签标记此 HTML 的位置。等待服务器上组件的数据准备好后，React 再将剩余的 HTML发送到同一个流中。
* React 会提前监听页面上交互事件（如鼠标的点击），对发生交互的区域`优先级`进行 `hydration`。


### 移除对IE的支持
* React 18 中引入的新功能是基于现代浏览器开发的，部分能力在 IE 上是不支持的，比如 `microtasks`。
* 如果还需要支持IE，可继续使用 v17。

## Redux工作原理
* 状态管理库，使用场景
  - 跨层级组件数据共享与通信
  - 一些需要持久化的全局数据，比如用户登录信息
* 单例模式
  - Store 是一个全局状态管理对象
  - Reducer 纯函数，用于更新state
  - Action 改变状态的唯一方式是dispatch action

## React-Router 工作原理
* 是一个前端路由，为什么需要？
  - 一个页面对应一个路由，路由跳转页面刷新，体验差
  - 后来又SPA（单页应用），只有一个页面对URL做映射，SEO不友好
* 解决了什么问题
  - 当用户刷新页面，浏览器会根据当前URL对资源进行重定向(发起请求)
* 包含哪些组件：BrowserRouter/HashRouter(路由器)、Route(路由匹配)、Link、Switch、Redirect
* 路由负责定义路径和组件的映射关系
* 导航负责触发路由的改变，路由器根据Route定义的映射关系为新的路径匹配对应的逻辑
* BrowserRouter使用的HTML5的history api实现路由跳转
  - 通过浏览器的history api实现,通过`pushState`事件触发
* HashRouter使用URL的hash属性控制路由跳转
  - 让页面感知路由变化的一种模式,通过`hashchange`事件触发


## 参考
* https://zhuanlan.zhihu.com/p/438358521