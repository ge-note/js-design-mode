/*
 * 第 1 章 灵活的语言 —— JavaScript
 */

/**
 * 谨防定义全局变量
 */
function checkName() {
  // 验证姓名
}

function checkEmail(a) {
  // 验证邮箱
}

console.log("checkName: ", checkName);

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 用对象收编变量
 */
var CheckObject1 = {
  checkName: function () {},
  checkEmail: function () {},
};

console.log("CheckObject1.checkName: ", CheckObject1.checkName);

/**
 * 对象的另一种形式
 */
var CheckObject2 = function () {};

CheckObject2.checkName = function () {};

CheckObject2.checkEmail = function () {};

console.log("CheckObject2.checkName: ", CheckObject2.checkName);

// 以上两种方法，可以简单将函数保存在对象中，但是这个对象不能满足复制

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 类
 * 注意使用 this
 */
var CheckObject3 = function () {
  this.checkName = function () {};

  this.checkEmail = function () {};
};
// 使用 new 实例化
var check3 = new CheckObject3();

console.log("check3.checkName: ", check3.checkName);

// 每次实例化，就可以实现复制属性和方法
// 但是，实例化的对象，都会有一套自己的方法，有时会造成消耗问题

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 通过 “prototype 原型” 实现实例化对象复用方法
 * 因为都要依赖 prototype 原型依次寻找，而找到的方法都是同一个，都绑定在 CheckObject4 对象类的原型上
 */
var CheckObject4 = function () {};

CheckObject4.prototype.checkName = function () {};

CheckObject4.prototype.checkEmail = function () {};

var check4 = new CheckObject4();

console.log("check4.checkName: ", check4.checkName);

/**
 * 另一种定义方式
 * 如果需要绑定多个方法，上一种方式会将 prototype 写多遍，可以采用这种方式简化
 */
var CheckObject5 = function () {};

CheckObject5.prototype = {
  checkName: function () {},
  checkEmail: function () {},
};

var check5 = new CheckObject5();

check5.checkName();

check5.checkEmail();

console.log("check5.checkName: ", check5.checkName);

// 注意：以上两种方法不能混用，可能会被覆盖

/* ***********************************  华丽分隔线  *********************************** */

// 在调用对象方法时，以上方式会多次使用 check5，此时可以采用“链式调用”

/**
 * 支持链式调用
 */
var CheckObject6 = {
  checkName: function () {
    return this;
  },
  checkEmail: function () {
    return this;
  },
};

// 链式调用
CheckObject6.checkName().checkEmail();

console.log(
  "CheckObject6.checkName().checkEmail: ",
  CheckObject6.checkName().checkEmail
);

/**
 * 也可以放到类的原型对象中
 */
var CheckObject7 = function () {};

CheckObject7.prototype = {
  checkName: function () {
    return this;
  },
  checkEmail: function () {
    return this;
  },
};

var check7 = new CheckObject7();

// 链式调用
check7.checkName().checkEmail();

console.log("check7.checkName().checkEmail: ", check7.checkName().checkEmail);

/* ***********************************  华丽分隔线  *********************************** */

// 函数的祖先 Function
console.log("Function: ", Function);

/**
 * 扩展 Function
 */
Function.prototype.checkName = function () {};

// 调用
var f = function () {};

f.checkName();

console.log("f.checkName: ", f.checkName);

// 注意：会污染原生 Function，不推荐

// 如果确实需要添加，可以抽象一个统一添加的功能方法
Function.prototype.addMethod = function (name, fn) {
  this[name] = fn;
};

// 使用
var methods1 = function () {};

// 或者
var methods2 = new Function();

methods2.addMethod("checkName", function () {});

methods2.addMethod("checkEmail", function () {});

methods2.checkName();

methods2.checkEmail();

console.log("methods2.checkName: ", methods2.checkName);


/* ***********************************  小结  *********************************** */
/**
 * 函数的多样化创建与使用
 * 对象的简单了解
 * 原型的简单了解
 * 链式添加与调用
 * 扩展原生 Function 对象
 */
