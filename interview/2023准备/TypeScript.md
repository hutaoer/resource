# TypeScript

## rest参数
* 其余参数允许你将不同数量的参数（零个或多个）传递给函数。当你不确定函数将接收多少参数时，这很有用。其余符号之后的所有参数...都将存储在一个数组中。
* rest参数必须是参数定义的最后一个，每个函数只能有rest参数。

## 模块
* 模块解析：模块解析是从 import 或者 require 语句中取出字符串，然后决定字符指向的是哪个文件的过程。
* TypeScript 包含两个解析策略：Classic 和 Node。Classic，当编译选项 module 不是 commonjs 时的默认选择，包含了向后兼容。

## 三斜杠
* 三斜线指令是单行注释，包含用作编译器指令的 XML 标记。每个指令都表示在编译过程中要加载的内容。三斜杠指令仅在其文件的顶部工作，并且将被视为文件中其他任何地方的普通注释。

## Omit类型有什么作用
* Omit是实用程序类型的一种形式，它促进了常见的类型转换。Omit允许你通过传递电流Type并选择Keys在新类型中省略来构造类型。
```ts
interface Todo {
  title: string;
}
type Title = Omit<Todo, 'title'>
```

## TypeScript中如何实现函数重载？
* 只需创建两个名称相同但参数/返回类型不同的函数。两个函数必须接受相同数量的参数。
* 方法重载是指在一个类中定义多个同名的方法，但要求每个方法具有不同的参数的类型或参数的个数。

## TypeScript中的Declare关键字有什么作用？
* 在我们希望定义可能存在于其他地方的变量的环境声明和方法中，可以使用declare关键字。

## TypeScript支持的访问修饰符有哪些？
* public
* protected：类及其子类成员。但类的实例无法访问。
* private: 类成员可访问

## TypeScript中的枚举
* 用于创建一组具有某种意义的变量
* 起始下标位0

## TypeScript中never和void的区别
* void 表示没有任何类型（可以被赋值为 null 和 undefined）。
* never 表示一个`不包含值`的类型，即表示永远不存在的值。

## TS中any和unknown有什么区别
* unknown 和 any 的主要区别是 unknown 类型会更加严格：在对 unknown 类型的值执行大多数操作之前，我们必须进行某种形式的检查。而在对 any 类型的值执行操作之前，我们不必进行任何检查。
* unknown 因为未知性质，不允许访问属性

## 类型断言
* 手动指定一个值具体的类型，即允许变量从一种类型更改为另一种类型。

## interface
* type 可以声明基本类型别名，联合类型，元组等类型
* interface 可以合并声明

## TypeScript中const和readonly的区别是什么
* const用于变量，readonly用于属性
* const在运行时检查，readonly在编译时检查
* 使用const变量保存的数组，可以使用push，pop等方法。但是如果使用Readonly Array声明的数组不能使用push，pop等方法

## 可配置化能力
## 业务的增长，配置优化能力。