---
title: JavaScript学习笔记
date: 2023-2-10
category: 前端
tags: 前端
---

# 梗概

JavaScript 相当简洁，却非常灵活。开发者们基于 JavaScript 核心编写了大量实用工具，可以使 开发工作事半功倍。其中包括：

- 浏览器应用程序接口（[API](https://developer.mozilla.org/zh-CN/docs/Glossary/API)）—— 浏览器内置的 API 提供了丰富的功能，比如：动态创建 HTML 和设置 CSS 样式、从用户的摄像头采集处理视频流、生成 3D 图像与音频样本等等。
- 第三方 API —— 让开发者可以在自己的站点中整合其它内容提供者（Twitter、Facebook 等）提供的功能。
- 第三方框架和库 —— 用来快速构建网站和应用。

第一个hello world：

```javascript
let myHeading = document.querySelector('h1');//选择h1元素
myHeading.textContent = 'Hello world!';
```

JavaScript 把页面的标题改成了“Hello world!” 。首先用 `querySelector()` 函数获取标题的引用，并把它储存在 `myHeading` 变量中。这与 CSS 选择器的用法非常相像：若要对某个元素进行操作，首先得选择它。

之后，把 `myHeading` 变量的属性 [`textContent`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent) （标题内容）修改为“Hello world!” 。

**备注：** 上面用到的两个函数都来自 [文档对象模型 (DOM) API](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model)，均用于控制文档。

# JS基础

## 基本语法 

### 变量

[变量](https://developer.mozilla.org/zh-CN/docs/Glossary/Variable) 是存储值的容器。要声明一个变量，先输入关键字 `let` 或 `var`，然后输入合适的名称：

```javascript
let myVariable;
var myVariable;
```

**语句末尾分号**： 行末的分号表示当前语句结束，不过只有在单行内需要分割多条语句时，这个分号才是必须的。然而，一些人认为每条语句末尾加分号是一种好的风格。

**大小写**： JavaScript 对大小写敏感，`myVariable` 和 `myvariable` 是不同的。如果代码出现问题了，先检查一下大小写！

**注释**：与C和JAVA添加注释的方法相同。

**var和let的区别**：`let` 是在现代版本中的 JavaScript 创建的一个新的关键字，用于创建与 `var` 工作方式有些不同的变量，解决了过程中的问题。

当你使用 `var` 时，可以根据需要多次声明相同名称的变量，但是 `let` 不能。以下将有效：

```javascript
var myName = 'Chris';
var myName = 'Bob';
```

但是以下内容会在第二行引发错误：

```javascript
let myName = 'Chris';
let myName = 'Bob';
```

你必须这样做：

```javascript
let myName = 'Chris';
myName = 'Bob';
```

出于这些以及其他原因，在代码中尽可能多地使用 `let`，而不是 `var`。因为没有理由使用 `var`，除非需要用代码支持旧版本的 Internet Explorer (它直到第 11 版才支持 `let` ，现代的 Windows Edge 浏览器支持的很好)。

**变量命名规则**：

可以给你的变量赋任何你喜欢的名字，但有一些限制。一般你应当坚持使用拉丁字符 (0-9,a-z,A-Z) 和下划线字符。

- 你不应当使用规则之外的其他字符，因为它们可能引发错误，或对国际用户来说难以理解。
- 变量名不要以下划线开头—— 以下划线开头的被某些 JavaScript 设计为特殊的含义，因此可能让人迷惑。
- 变量名不要以数字开头。这种行为是不被允许的，并且将引发一个错误。
- 一个可靠的命名约定叫做 ["小写驼峰命名法"](https://en.wikipedia.org/wiki/CamelCase#Variations_and_synonyms)，用来将多个单词组在一起，小写整个命名的第一个字母然后大写剩下单词的首字符。我们已经在文章中使用了这种命名方法。
- 让变量名直观，它们描述了所包含的数据。不要只使用单一的字母/数字，或者长句。
- 变量名大小写敏感——因此`myage`与`myAge`是 2 个不同的变量。
- 最后也是最重要的一点—— 你应当避免使用 JavaScript 的保留字给变量命名。保留字，即是组成 JavaScript 的实际语法的单词！因此诸如 `var`、`function`、`let` 和 `for` 等，都不能被作为变量名使用。浏览器将把它们识别为不同的代码项，因此你将得到错误。

### 常量

由于`var`和`let`申明的是变量，如果要申明一个常量，在ES6之前是不行的，我们通常用全部大写的变量来表示“这是一个常量，不要修改它的值”：

```javascript
var PI = 3.14;
```

ES6标准引入了新的关键字`const`来定义常量，`const`与`let`都具有块级作用域：

```javascript
const PI = 3.14;
PI = 3; // 某些浏览器不报错，但是无效果！
PI; // 3.14
```

### 运算符

|    等于    | 测试两个值是否相等，并返回一个 `true`/`false` （布尔）值。   | `===`     | `let myVariable = 3;myVariable === 4; // false` |
| :--------: | :----------------------------------------------------------- | --------- | :---------------------------------------------: |
| **不等于** | 和等于运算符相反，测试两个值是否不相等，并返回一个 `true`/`false` （布尔）值。 | **`!==`** | `let myVariable = 3;myVariable !== 3; // false` |

其他的都跟C和JAVA的运算符运用方法相同。

### 数据类型

|                             变量                             | 解释                                                         | 示例                                                         |
| :----------------------------------------------------------: | :----------------------------------------------------------- | :----------------------------------------------------------- |
| [String](https://developer.mozilla.org/zh-CN/docs/Glossary/String) | 字符串（一串文本）：字符串的值必须用引号（单双均可，必须成对）扩起来。 | `let myVariable = '李雷';`                                   |
| [Number](https://developer.mozilla.org/zh-CN/docs/Glossary/Number) | 数字：无需引号。                                             | `let myVariable = 10;`                                       |
| [Boolean](https://developer.mozilla.org/zh-CN/docs/Glossary/Boolean) | 布尔值（真 / 假）： `true`/`false` 是 JS 里的特殊关键字，无需引号。 | `let myVariable = true;`                                     |
| [Array](https://developer.mozilla.org/zh-CN/docs/Glossary/array) | 数组：用于在单一引用中存储多个值的结构。                     | `let myVariable = [1, '李雷', '韩梅梅', 10];` 元素引用方法：`myVariable[0]`, `myVariable[1]` …… |
| [Object](https://developer.mozilla.org/zh-CN/docs/Glossary/Object) | 对象：JavaScript 里一切皆对象，一切皆可储存在变量里。这一点要牢记于心。 | `let myVariable = document.querySelector('h1');` 以及上面所有示例都是对象。 |

### 条件语句

例：

```javascript
let iceCream = 'chocolate';
if (iceCream === 'chocolate') {
  alert('我最喜欢巧克力冰激淋了。');
} else {
  alert('但是巧克力才是我的最爱呀……');
}
```

## 函数

人人都能定义自己的函数。下面的示例是为两个参数进行乘法运算的函数：

```javascript
function multiply(num1, num2)//函数名（参数） 
{
  let result = num1 * num2;
  return result;
}
//跟C的函数没什么区别，函数内定义的变量只能在函数内使用。这叫做变量的 作用域。
```

在之前的例子中的`document.querySelector` 和 `alert` 是浏览器内置的函数，随时可用。

### **匿名函数**

通常将匿名函数与事件处理程序一起使用，例如，如果单击相关按钮，以下操作将在函数内运行代码：

```javascript
var myButton = document.querySelector('button');

myButton.onclick = function() {
  alert('hello');
}
```

### **你还可以将匿名函数分配为变量的值**

例如：

```javascript
var myGreeting = function() {
  alert('hello');
}
```

现在可以使用以下方式调用此函数：

```javascript
myGreeting();
```

## 方法

在一个**对象**中绑定函数，称为这个对象的**方法**。

在JavaScript中，对象的定义是这样的：

```javascript
var xiaoming = {
    name: '小明',
    birth: 1990
};
```

但是，如果我们给`xiaoming`绑定一个函数，就可以做更多的事情。比如，写个`age()`方法，返回`xiaoming`的年龄：

```javascript
var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        var y = new Date().getFullYear();
        return y - this.birth;
    }
};

xiaoming.age; // function xiaoming.age()
xiaoming.age(); // 今年调用是25,明年调用就变成26了
```

在一个方法内部，`this`是一个特殊变量，它始终指向当前对象，也就是`xiaoming`这个变量。所以，`this.birth`可以拿到`xiaoming`的`birth`属性。

让我们拆开写：

```javascript
function getAge() {
    var y = new Date().getFullYear();
    return y - this.birth;
}

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: getAge
};

xiaoming.age(); // 25, 正常结果
getAge(); // NaN
```

单独调用函数`getAge()`怎么返回了`NaN`？*请注意*，我们已经进入到了JavaScript的一个大坑里。

JavaScript的函数内部如果调用了`this`，那么这个`this`到底指向谁？

答案是，视情况而定！

如果以对象的方法形式调用，比如`xiaoming.age()`，该函数的`this`指向被调用的对象，也就是`xiaoming`，这是符合我们预期的。

如果单独调用函数，比如`getAge()`，此时，该函数的`this`指向全局对象，也就是`window`！！

但是！！如果这么写：

```javascript
var fn = xiaoming.age; // 先拿到xiaoming的age函数
fn(); // NaN
```

也是不行的！要保证`this`指向正确，必须用`obj.xxx()`的形式调用！

## 高阶函数

一个函数接收另一个函数作为参数，这种函数就称之为高阶函数。

一个最简单的高阶函数：

```javascript
function add(x, y, f) {
    return f(x) + f(y);
}
```

当我们调用`add(-5, 6, Math.abs)`时，参数`x`，`y`和`f`分别接收`-5`，`6`和函数`Math.abs`，根据函数定义，我们可以推导计算过程为：

```javascript
x = -5;
y = 6;
f = Math.abs;
f(x) + f(y) ==> Math.abs(-5) + Math.abs(6) ==> 11;
return 11;
```

### filter

`filter()`用于把 `array`的某些元素过滤掉，然后返回剩下的元素。

例如，在一个`Array`中，删掉偶数，只保留 `奇数`，可以这么写：

```javascript
var arr = [1, 2, 4, 5, 6, 9, 10, 15];
var r = arr.filter(function (x) {
    return x % 2 !== 0;
});
r; // [1, 5, 9, 15]
```

### sort排序

通常规定，对于两个元素`x`和`y`，如果认为`x < y`，则返回`-1`，如果认为`x == y`，则返回`0`，如果认为`x > y`，则返回`1`，这样，排序算法就不用关心具体的比较过程，而是根据比较结果直接排序。

JavaScript的`Array`的`sort()`方法就是用于排序的，但是排序结果可能让你大吃一惊：

```javascript
// 看上去正常的结果:
['Google', 'Apple', 'Microsoft'].sort(); // ['Apple', 'Google', 'Microsoft'];

// apple排在了最后:
['Google', 'apple', 'Microsoft'].sort(); // ['Google', 'Microsoft", 'apple']
//第二个排序把apple排在了最后，是因为字符串根据ASCII码进行排序，而小写字母a的ASCII码在大写字母之后。

// 无法理解的结果:
[10, 20, 1, 2].sort(); // [1, 10, 2, 20]
//这是因为Array的sort()方法默认把所有元素先转换为String再排序，结果'10'排在了'2'的前面，因为字符'1'比字符'2'的ASCII码小。
```

幸运的是，`sort()`方法也是一个高阶函数，它还可以接收一个比较函数来实现**自定义的排序**。

**数字排序**

```javascript
arr.sort(function (x, y) {
    if (x < y) {
        return -1;
    }
    if (x > y) {
        return 1;
    }
    return 0;
});
console.log(arr); // [1, 2, 10, 20]
```

**字母排序**

```javascript
var arr = ['Google', 'apple', 'Microsoft'];
arr.sort(function (s1, s2) {
    x1 = s1.toUpperCase();//先全部都转换成大写
    x2 = s2.toUpperCase();
    if (x1 < x2) {
        return -1;
    }
    if (x1 > x2) {
        return 1;
    }
    return 0;
}); // ['apple', 'Google', 'Microsoft']
```



## 事件

它可以捕捉浏览器操作并运行一些代码做为响应。最简单的事件是[点击事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/click_event)，鼠标的点击操作会触发该事件。

```javascript
document.querySelector("html").addEventListener("click", function () {
  alert("别戳我，我怕疼。");
});
```

将事件与元素绑定有许多方法。在这里选用了 `HTML` 元素，然后调用了它的 [`addEventListener()`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener) 方法，将事件名称（`'click'`）以及其回调函数（当事件发生时，调用该函数）传入该函数中作为调用参数。

刚刚我们传递给 `addEventListener()` 的函数被称为*匿名函数*，因为它没有名字。匿名函数还有另一种我们称之为*箭头函数*的写法，箭头函数使用 `() =>` 代替 `function ()`：

```javascript
document.querySelector('html').addEventListener('click', () => {
  alert('别戳我，我怕疼。');
});
```

# 条件语句

```javascript
var shoppingDone = false;

if (shoppingDone === true) {
  var childsAllowance = 10;
} else {
  var childsAllowance = 5;
}
//跟C语言的条件语句没什么两样
```

# 循环语句

一段循环通常需要一个或多个条件：

- **一个开始条件，**它被初始化为一个特定的值 - 这是循环的起点 ("开始：我没有食物”，上面）。
- **一个结束条件，**这是循环停止的标准 - 通常计数器达到一定值。以上所说的“我有足够的食物”吗？假设他需要 10 份食物来养活他的家人。
- **一个迭代器，**这通常在每个连续循环上递增少量的计数器，直到达到退出条件。我们以前没有明确说明，但是我们可以考虑一下农民能够每小时收集 2 份食物。每小时后，他收集的食物量增加了两倍，他检查他是否有足够的食物。如果他已经达到 10 分（退出条件），他可以停止收集回家。

在 伪代码 中，这看起来就像下面这样：

```javascript
loop(food = 0; foodNeeded = 10) {
  if (food = foodNeeded) {
    exit loop;
    // 我们有足够的食物了，回家吧。
  } else {
    food += 2; // 花一个小时多收集两个食物。
    // 循环将会继续执行。
  }
}

//真实代码跟C语言相同
```

# JS变量的作用域

## 全局作用域

不在任何函数内定义的变量就具有全局作用域。实际上，JavaScript默认有一个全局对象`window`，全局作用域的变量实际上被绑定到`window`的一个属性：

```javascript
var course = 'Learn JavaScript';
alert(course); // 'Learn JavaScript'
alert(window.course); // 'Learn JavaScript'
```

因此，直接访问全局变量`course`和访问`window.course`是完全一样的。

你可能猜到了，由于函数定义有两种方式，以变量方式`var foo = function () {}`定义的函数实际上也是一个全局变量，因此，顶层函数的定义也被视为一个全局变量，并绑定到`window`对象：

```javascript
function foo() {
    alert('foo');
}
foo(); // 直接调用foo()
window.foo(); // 通过window.foo()调用
```

## 名字空间

全局变量会绑定到`window`上，不同的JavaScript文件如果使用了相同的全局变量，或者定义了相同名字的顶层函数，都会造成命名冲突，并且很难被发现。

减少冲突的一个方法是把自己的所有变量和函数全部绑定到一个全局变量中。例如：

```javascript
// 唯一的全局变量MYAPP:
var MYAPP = {};

// 其他变量:
MYAPP.name = 'myapp';
MYAPP.version = 1.0;

// 其他函数:
MYAPP.foo = function () {
    return 'foo';
};
```

把自己的代码全部放入唯一的名字空间`MYAPP`中，会大大减少全局变量冲突的可能。

许多著名的JavaScript库都是这么干的：jQuery，YUI，underscore等等。

# 想要尝试一下JS吗

## 输入你的姓名

<script src="\assets\js\src\inputName.js" defer></script>
<input type="button" onclick="setName()" value="click me~" />

### 代码

HTML部分：

![](https://cdn.jsdelivr.net/gh/Easter1995/blog-image/202302101502411.png)       

JS部分：

```javascript
function setName()
{
    let userName;
    while(!userName)
    {
        userName = prompt('Please Input Your Name(^v^):');
        localStorage.setItem('name', userName);
    }
    alert('hello\\@^0^@)/,' + userName);
}
```

































