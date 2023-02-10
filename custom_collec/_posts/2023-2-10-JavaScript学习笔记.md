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

# 想要尝试一下JS吗
<script src="\assets\js\src\welcome.js" defer></script>
<input type="button" onclick="setName()" value="click me~" />

## 代码

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

































