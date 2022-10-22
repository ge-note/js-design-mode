/**
 * 第 8 章 单例模式（Singleton）
 *
 * 只允许实例化一次的对象类
 * 有时也用一个对象来规划一个命名空间
 */

/* ***********************************  华丽分隔线  *********************************** */

/*
 * 定义命名空间
 */
var Ming = {
  g: function (id) {
    return document.getElementById(id);
  },
  css: function (id, key, value) {
    // 注意通过当前对象 this 来调用 g 方法
    this.g(id).style[key] = value;
  },
};

var A = {
  Util: {
    method1: function () {},
    method2: function () {},
  },
  Ajax: {
    get: function () {},
    post: function () {},
  },
};

A.Util.method1();
A.Ajax.get();

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 管理静态变量
 */
var Conf = (function () {
  // 私有变量
  var conf = {
    MAX_NUM: 100,
    MIN_NUM: 1,
    COUNT: 1000,
  };

  // 返回取值器对象
  return {
    get: function (name) {
      return conf[name] || null;
    },
  };
})();

var count = Conf.get('COUNT');

console.log(count); // 1000

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 惰性单例
 */
var LazySingle = (function () {
  // 单例实例引用
  var _instance = null;

  // 单例
  function Single() {
    return {
      publicMethod: function () {},
      publicProp: '1.0',
    };
  }

  // 获取单例对象接口
  return function () {
    if (!_instance) {
      _instance = Single();
    }

    // 返回单例
    return _instance;
  };
})();

// 通过 LazySingle 对象获取内部创建的单例对象
console.log(LazySingle().publicProp); // 1.0
