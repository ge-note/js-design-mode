/**
 * 封装
 */

/**
 * 创建一个类
 */
var Book1 = function (id, name, price) {
  this.id = id;
  this.name = name;
  this.price = price;
};

/**
 * 也可以在类的原型上添加属性和方法（类也是一个对象，所以也有原型 prototype）
 */

// 方式一：一一为原型对象属性赋值
Book1.prototype.display = function () {
  // 展示这本书
};

// 方式二：将一个对象赋值给类的原型对象
Book1.prototype = {
  display: function () {},
};

// 注意：两种方式不要混用

// 实例化对象
var book1 = new Book1(1, "JavaScript 设计模式", 50);

console.log(book1.name); // JavaScript 设计模式

/**
 * 区分：“通过 this 添加的属性和方法” 与 “在 prototype 中添加的属性和方法”
 *
 * 通过 this 添加的属性和方法，是在当前对象上添加的
 *
 * 通过 prototype 继承的属性和方法。是每个对象通过 prototype 访问到的
 * 通过类创建一个新对象时。这些属性和方法不会再次创建
 *
 * JavaScript 是一种基于原型 prototype 的语言，所以每创建一个对象时，
 * 都有一个原型 prototype 用于指向其继承的属性和方法，这样通过 prototype
 * 继承的方法并不是对象本身的，所以在使用这些方法时，需要通过 prototype 逐级
 * 查找得到
 */

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 属性与方法封装
 */
var Book2 = function (id, name, price) {
  // 类的私有属性
  var num = 1;

  // 类的私有方法
  function checkId() {}

  // 对象公有属性
  // 在类创建对象时，每个对象自身都拥有一份并且可以在外部访问到
  this.id = id;

  // 对象公有方法
  this.copy = function () {};

  // 特权方法
  // 通过 this 创建的方法，不但可以访问对象的公有属性和公有方法
  // 还可以访问到类或对象自身的私有属性和私有方法
  this.getName = function () {};
  this.setName = function () {};
  this.getPrice = function () {};
  this.setPrice = function () {};

  // 构造器
  // 在对象创建时，通过使用特权方法，可以初始化实例对象的一些属性
  // 因此这些在创建对象时调用的特权方法还可以看作是 类的构造器
  this.setName(name);
  this.setPrice(price);
};

// 类的静态公有属性（对象不能访问）
Book2.isChinese = true;

// 类的静态公有方法（对象不能访问）
Book2.resetTime = function () {
  return "New Time";
};

Book2.prototype = {
  // 类的公有属性（类的实例对象可以通过 this 访问）
  isJSBook: true,
  // 类的公有方法（类的实例对象可以通过 this 访问）
  display: function () {},
};

// 实例化
var book2 = new Book2(2, "JavaScript 设计模式", 50);

console.log(book2.num); // undefined

console.log(book2.id); // 2

console.log(book2.isChinese); // undefined

console.log(book2.isJSBook); // true

console.log(Book2.isChinese); // true

console.log(Book2.resetTime()); // New Time

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 将类的静态变量通过 “闭包” 来实现
 *
 * 闭包：指有权访问另一个函数作用域中变量的函数，即在一个函数内部创建另外一个函数
 */
var Book3 = (function () {
  // 静态私有变量
  var num = 0;

  // 静态私有方法
  function checkBook(name) {}

  // 创建类
  // 闭包
  function _book(newId, newName, newPrice) {
    // 闭包内部自身的私有变量
    var name, price;

    // 闭包内部自身的私有方法
    function checkId(id) {}

    // 特权方法
    this.getName = function () {};
    this.setName = function () {};
    this.getPrice = function () {};
    this.setPrice = function () {};

    // 公有属性
    this.id = newId;

    // 公有方法
    this.copy = function () {};

    // 可以访问类函数作用域中的变量
    num++;

    if (num > 100) {
      throw new Error("我们仅出版 100 本书");
    }

    // 构造器
    this.setName(name);
    this.setPrice(price);
  }

  // 构建原型
  _book.prototype = {
    // 静态公有属性
    isISBook: true,
    // 静态公有方法
    display: function () {},
  };

  // 返回类
  return _book;
})();

var book3 = new Book3(3, "JavaScript 设计模式", 50);

console.log(book3.id); // 3

console.log(book3.isISBook); // true

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 创建对象错误示例
 */
var Book4 = function (name, price) {
  this.name = name;
  this.price = price;
};

// 没有使用 new
var book4 = Book4("JavaScript 设计模式", 50);

console.log(book4); // undefined

// 浏览器运行环境全局变量 window
// console.log(window.name) // JavaScript 设计模式

// console.log(window.price) // 50

// node.js 运行环境全局变量 global
console.log(global.name) // JavaScript 设计模式

console.log(global.price) // 50

/**
 * 注意：以上实例化对象时，没有 new
 * new 关键字的作用可以看作是对当前对象的 this 不停地赋值
 * 但如果没有使用 new，就会直接执行这个函数，而这个函数在全局作用域中执行了
 * 所以在全局作用域中 this 指向的当前对象就是全局变量
 * 浏览器运行环境全局变量 window
 * node.js 运行环境全局变量 global
 */

/**
 * 创建对象的安全模式
 */
var Book5 = function (name, price) {
  // 判断执行过程 this 是否是当前这个对象，如果是则说明是用 new 创建的
  if (this instanceof Book5) {
    this.name = name;
    this.price = price;
  } else {
    // 否则重新创建这个对象
    return new Book5(name, price);
  }
};

// 实例化对象，注意这里没有 new
var book5 = Book5("JavaScript 设计模式", 50);

/* ***********************************  小结  *********************************** */
/**
 * 创建类的不同方法
 * 属性与方法封装
 * 将类的静态变量通过 “闭包” 来实现
 * 实例化对象时注意 new 关键字
 */