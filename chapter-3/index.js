/**
 * 第 3 章 神奇的魔术师 —— 简单工厂模式
 *
 * 又称静态工厂方法，由一个工厂对象决定创建某一种产品对象类的实例
 * 主要用来创建同一类对象
 */

/**
 * 将多个类封装到一个函数中（工厂函数）
 */

// 比赛基类
var Basketball = function () {
  this.name = "篮球";
};

Basketball.prototype = {
  getPlayer: function () {
    return 5;
  },
};

var Football = function () {
  this.name = "足球";
};

Football.prototype = {
  getPlayer: function () {
    return 11;
  },
};

var Tennis = function () {
  this.name = "网球";
};

Tennis.prototype = {
  getPlayer: function () {
    return 1;
  },
};

// 运动工厂
var SportsFactory = function (type) {
  // 对不同的类实例化
  switch (type) {
    case "NBA":
      return new Basketball();
    case "WorldCup":
      return new Football();
    case "FrenchOpen":
      return new Tennis();
  }
};

// 调用者不需要关心依赖于哪个基类
var ball = SportsFactory("NBA");

console.log(ball); // Basketball { name: '篮球' } // Basketball

console.log(ball.name); // 篮球

console.log(ball.getPlayer()); // 5

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 创建相似对象
 */
// 创建弹窗
function createPop(type, text) {
  // 创建一个对象，并对对象拓展属性和方法
  var o = new Object();

  o.content = text;

  o.show = function () {
    // 显示
  };

  // 针对性处理差异化
  if (type === "alert") {
    // 警示框差异部分
  }

  if (type === "prompt") {
    // 提示框差异部分
  }

  if (type === "confirm") {
    // 确认框差异部分
  }

  // 将对象返回
  return o;
}

// 创建警示框
var userNameAlert = createPop("alert", "用户名不能为空");

/* ***********************************  小结  *********************************** */

/**
 * 通过简单工厂模式来创建一些对象，实现代码复用、尽可能少地创建全局变量
 * 方法一：通过类实例化对象创建
 * 方法二：通过创建一个新对象，然后包装增强其属性和方法
 * 
 * 简单工厂模式，仅适合于创建单一对象
 */