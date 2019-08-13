# promise

## promise原理
* 在Promise的内部，有一个状态管理器的存在，有三种状态：
  - `pending、fulfilled、rejected`
  - promise 对象初始化状态为 pending。　　　　
  - 当调用resolve(成功)，会由`pending => fulfilled`
  - 当调用reject(失败)，会由`pending => rejected`
* promsie状态 只能由 pending => fulfilled/rejected, 一旦修改就不能再变。
* promise.then方法每次调用，都返回一个新的promise对象。
* Promise.resolve 返回一个fulfilled状态的promise对象，Promise.reject 返回一个rejected状态的promise对象。
* Promise.all 调用的时候，如果几个promise对象一旦有一个的状态为rejected，则all的返回值就是rejected。

## all 和 race有什么区别
* all和race都是竞速函数，all结束的时间取决于最慢的那个，其作为参数的Promise函数一旦有一个状态为rejected，则总的Promise的状态就为rejected；而race结束的时间取决于最快的那个，一旦最快的那个Promise状态发生改变，那个其总的Promise的状态就变成相应的状态，其余的参数Promise还是会继续进行的。
* race，它有任意一个返回，不管结果本身是成功状态还是失败状态。就算完成。常见使用场景：把异步操作和定时器放到一起，如果定时器先触发，认为超时，告知用户。

## 面试题
* Promise的then方法的参数期望是函数，传入非函数则会发生值穿透。
* Promise.all获得的成功结果的数组里面的数据顺序和Promise.all接收到的数组顺序是一致的。

## 原生ajax如何实现的，思路是怎样的？

## 怎样避免地狱回调

