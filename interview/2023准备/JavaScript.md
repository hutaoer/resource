# JS
## 数据类型
* `Undefined, Null, Boolean, Number, String, Object`
* ES6新增: `BigInt、Symbol`
  - `Symbol`:代表创建后独一无二且不可变的数据类型，它主要是为了解决可能出现的全局变量冲突的问题
  - `BigInt`:使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围。
* 又分为了值类型和引用类型。
  - 堆： 存放引用数据类型，引用数据类型占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址，如`Object、Array、Function`。
  - 栈： 存放原始（基本）数据类型，栈中的简单数据段，占据空间小，属于被频繁使用的数据，如`Symbol、String、Number、Null、Boolean`。

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