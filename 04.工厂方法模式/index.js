/**
 * 第 4 章 工厂方法模式（Factory Method）
 *
 * 通过对产品类的抽象，使其创建业务主要负责用于创建 “多类” 产品的实例
 */

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 安全模式类
 *
 * 屏蔽类的错误使用
 */

/**
 * 错误示例
 */
var Demo1 = function () {};

Demo1.prototype = {
  show: function () {
    return '显示';
  },
};

var demo11 = new Demo1();

console.log(demo11.show()); // 显示

// 未使用 new，调用方法会报错
var demo12 = Demo1();

// console.log(demo12.show()) // Cannot read properties of undefined (reading 'show')

/**
 * 安全模式
 */
var Demo2 = function () {
  // 判断 this 指向
  if (!(this instanceof Demo2)) {
    return new Demo2();
  }
};

Demo2.prototype = {
  show: function () {
    return '显示';
  },
};

var demo2 = Demo2();

console.log(demo2.show()); // 显示

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 安全模式创建的工厂类
 */
var Factory = function (type, content) {
  if (this instanceof Factory) {
    return new this[type](content);
  } else {
    return new Factory(type, content);
  }
};

// 工厂原型中设置创建所有类型数据对象的基类
Factory.prototype = {
  Java: function (content) {},
  JavaScript: function (content) {},
  PHP: function (content) {},
  UI: function (content) {},
};

var list = [
  {
    type: 'Java',
    content: 'Java Content',
  },
  {
    type: 'JavaScript',
    content: 'Java Content',
  },
  {
    type: 'PHP',
    content: 'Java Content',
  },
  {
    type: 'UI',
    content: 'Java Content',
  },
];

for (var i = 0; i < list.length; i++) {
  Factory(list[i].type, list[i].content);
}
/* ***********************************  小结  *********************************** */

/**
 * 工厂方法模式
 * 可以创建 “多个不同类” 的实例（与简单工厂模式的区别）
 * 用户不需要关心创建该对象的具体类，只需要调用工厂方法即可
 *
 * 安全模式可以避免错误调用
 */
