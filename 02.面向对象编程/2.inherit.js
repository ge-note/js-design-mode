/**
 * 继承
 */

/**
 * 类式继承
 */
// 声明父类
function SuperClass1() {
  this.superValue = true;
}

// 为父类添加公有方法
SuperClass1.prototype.getSuperValue = function () {
  return this.superValue;
};

// 声明子类
function SubClass1() {
  this.subValue = false;
}

// 继承父类
// 将父类的实例赋值给子类的原型
SubClass1.prototype = new SuperClass1();

// 为子类添加公有方法
SubClass1.prototype.getSubValue = function () {
  return this.subValue;
};

var sub1 = new SubClass1();

console.log(sub1.getSuperValue()); // true

console.log(sub1.getSubValue()); // false

/**
 * 类式继承原理
 *
 * 实例化父类时，新创建的对象复制了父类构造函数内的属性和方法，并且将原型 __proto__ 指向了父类的原型对象
 * 这样就拥有了父类原型对象上的属性和方法，并且新创建的对象可直接访问父类原型对象上的属性和方法
 * 也可以访问从父类构造函数中复制的属性和方法
 *
 * 将这个新创建的对象赋值给子类的原型，那么子类原型就可以访问到父类原型上的属性和方法
 * 以及从父类构造函数中复制的属性和方法
 */

/**
 * 另外，可以通过 instanceof 判断某个对象是否是某个类的实例
 * 或者说某个对象是否继承了某个类
 */

console.log(sub1 instanceof SuperClass1); // true

console.log(sub1 instanceof SubClass1); // true

// 注意：instanceof 是判断前面的对象是否是后面类（对象）的实例，并不表示两者的继承

console.log(SubClass1 instanceof SuperClass1); // false

console.log(SubClass1.prototype instanceof SuperClass1); // true

// 所创建的所有对象都是原生对象 Object 的实例
console.log(sub1 instanceof Object); // true

/**
 * 类式继承的缺点一
 *
 * 由于子类通过其原型 prototype 对父类实例化，继承了父类
 * 如果父类中的公有属性是引用类型，就会在子类中被所有实例共用，会相互影响
 */

function SuperClass2() {
  this.books = ["JS", "HTML", "CSS"];
}

function SubClass2() {}

SubClass2.prototype = new SuperClass2();

var sub21 = new SubClass2();

var sub22 = new SubClass2();

console.log(sub21.books); // ['JS', 'HTML', 'CSS']

sub22.books.push("设计模式");

console.log(sub21.books); // [ JS', 'HTML', 'CSS', '设计模式']

/**
 * 类式继承的缺点二
 *
 * 由于子类实现的继承是靠其原型 prototype 对父类的实例化实现
 * 因此在创建父类时。无法向父类传参
 * 在实例化父类时也无法对父类构造函数内的属性进行初始化
 */

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 构造函数式继承
 */
// 声明父类
function SuperClass3(id) {
  // 值类型公有属性
  this.id = id;

  // 引用类型公有属性
  this.books = ["JS", "HTML", "CSS"];
}

// 父类声明原型方法
SuperClass3.prototype.showBooks = function () {
  return this.books;
};

// 声明子类
function SubClass3(id) {
  // 关键点：继承父类
  SuperClass3.call(this, id);
}

var sub31 = new SubClass3(31);

var sub32 = new SubClass3(32);

console.log(sub31.id); // 31

console.log(sub31.books); // ['JS', 'HTML', 'CSS']

sub32.books.push("设计模式");

console.log(sub32.id); // 32

console.log(sub32.books); // [ JS', 'HTML', 'CSS', '设计模式']

console.log(sub31.books); // ['JS', 'HTML', 'CSS']

// sub31.showBooks() // sub31.showBooks is not a function

/**
 * call 方法可以更改函数的作用环境
 * 在子类中，对 superClass3 调用 call 就是将子类中的变量在父类中执行一遍
 * 由于父类中是给 this 绑定属性的，因此子类也就继承了父类的父类的公有属性
 *
 * 缺点：
 * 由于这种继承方式并没有涉及到原型 prototype，因此父类的原型方法就不会被子类继承
 */

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 组合式继承（类式继承 + 构造函数式继承）
 */
// 声明父类
function SuperClass4(id) {
  // 值类型公有属性
  this.id = id;

  // 引用类型公有属性
  this.books = ["JS", "HTML", "CSS"];
}

// 父类型公有方法
SuperClass4.prototype.getId = function () {
  return this.id;
};

// 声明子类
function SubClass4(id, name) {
  // 构造函数式继承父类 id 属性
  SuperClass4.call(this, id);

  // 子类中新增公有属性
  this.name = name;
}

// 类式继承，子类原型继承父类
SubClass4.prototype = new SuperClass4();

// 子类原型方法
SubClass4.prototype.getName = function () {
  return this.name;
};

var sub41 = new SubClass4(41, "JS Book");

sub41.books.push("设计模式");

console.log(sub41.books); // ['JS', 'HTML', 'CSS', '设计模式']

console.log(sub41.getId()); // 41

console.log(sub41.getName()); // JS Book

var sub42 = new SubClass4(42, "HTML Book");

console.log(sub42.books); // [ JS', 'HTML', 'CSS']

console.log(sub42.getId()); // 42

console.log(sub42.getName()); // HTML Book

/**
 * 组合式继承的缺点
 *
 * 使用构造函数继承时，执行了一遍父类的构造函数
 * 实现子类原型的类式继承，又执行了一遍父类的构造函数
 */

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 原型式继承
 */
function inheritObject(o) {
  // 声明一个过渡函数对象
  function F() {}

  // 过渡对象的原型继承父对象
  F.prototype = o;

  // 返回过渡对象的一个实例，该实例的原型继承了父对象
  return new F();
}

/**
 * 类似于类式继承
 * 不过由于 F 过渡类的构造函数中无内容，所以开销比较小
 *
 * 缺点
 * 与类式继承一样，父类对象的值是引用类型时，会被公用
 */

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 寄生式继承
 */
// 声明基对象
var book6 = {
  name: "JS Book",
  books: ["JavaScript 设计模式"],
};
function createBook(obj) {
  // 通过原型继承方式创建新对象
  var o = new inheritObject(obj);

  // 拓展新对象
  o.getName = function () {
    return this.name;
  };

  // 返回拓展后的新对象
  return o;
}

/**
 * 其实就是对原型继承的二次封装
 * 并且在二次封装过程中对继承的对象进行扩展
 */

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 寄生组合式继承 继承原型
 *
 * @params subClass 子类
 * @params superClass 父类
 */
function inheritPrototype(subClass, superClass) {
  // 复制一份父类的原型副本保存在变量中
  var p = inheritObject(superClass.prototype);

  // 修正因为重写子类原型导致子类的 constructor 属性被修改
  p.constructor = subClass;

  // 设置子类的原型
  subClass.prototype = p;
}

// 声明父类
function SuperClass5(id) {
  // 值类型公有属性
  this.id = id;

  // 引用类型公有属性
  this.books = ["JS", "HTML", "CSS"];
}

// 父类型公有方法
SuperClass5.prototype.getId = function () {
  return this.id;
};

// 声明子类
function SubClass5(id, name) {
  // 构造函数式继承父类 id 属性
  SuperClass5.call(this, id);

  // 子类中新增公有属性
  this.name = name;
}

// 寄生式继承父类原型
// 这里是与组合式继承的唯一区别点
inheritPrototype(SubClass5, SuperClass5);

// 子类新增原型方法
SubClass5.prototype.getName = function () {
  return this.name;
};

var sub51 = new SubClass5(51, "JS");

var sub52 = new SubClass5(52, "HTML");

sub51.books.push("设计模式");

console.log(sub51.books); // ['JS', 'HTML', 'CSS', '设计模式']

console.log(sub52.books); // ['JS', 'HTML', 'CSS']

console.log(sub52.getId()); // 52

console.log(sub52.getName()); // HTML

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 单继承 属性复制
 */
var extend = function (target, source) {
  // 遍历源对象中的属性
  for (var prop in source) {
    // 将源对象中的属性复制到目标属性中
    target[prop] = source[prop];
  }

  // 返回目标对象
  return target;
};

// 注意：这里的复制是浅复制

/**
 * 多继承 属性复制
 */
var assign = function () {
  var i = 1, // 从第二个参数起为被继承的对象
    len = arguments.length, // 获取参数长度
    target = arguments[0], // 第一个对象为目标对象
    arg; // 缓存参数对象

  // 遍历被继承的对象
  for (; i < len; i++) {
    // 缓存当前对象
    arg = arguments[i];

    // 遍历被继承对象中的属性
    for (var prop in arg) {
      // 将被继承对象中的属性复制到目标对象中
      target[prop] = arg[prop];
    }
  }

  // 返回目标对象
  return target;
};

console.log(
  assign(
    {},
    {
      name: "JavaScript 设计模式",
    },
    {
      type: "JS Book",
    }
  )
);
// { name: 'JavaScript 设计模式', type: 'JS Book' }

/* ***********************************  小结  *********************************** */

/**
 * 继承的多种方式：类式继承、构造函数式继承。组合式继承、原型式继承、寄生式继承、寄生组合式继承
 * 单继承、多继承
 */
