/**
 * 第 17 章 观察者模式（Observer）
 * 或 发布-订阅者模式 或 消息机制
 */

/* ***********************************  华丽分隔线  *********************************** */

// 将观察者放在闭包中，当页面加载完成时立即执行
var Observer = (function () {
  // 将消息队列定义为内部变量
  var _message = {};

  return {
    // 注册信息接口（将订阅者注册的消息添加到消息队列中）
    register: function (type, fn) {
      // 判断消息是否存在
      // 如果存在，添加新动作方法；如果不存在，则将动作方法作为数组第一个元素保存
      if (typeof _message[type] === 'undefined') {
        _message[type] = [fn];
      } else {
        _message[type].push(fn);
      }
    },
    // 发布信息接口（当观察者发布一个消息时，将所有订阅者订阅的消息一次执行）
    fire: function (type, args) {
      // 消息没有被注册，直接返回
      if (!_message[type]) return;

      // 定义消息信息
      var events = {
        type: type,
        args: args || {},
      };

      for (var i = 0; i < _message[type].length; i++) {
        // 遍历消息动作，依次执行
        _message[type][i].call(this, events);
      }
    },
    // 移除信息接口（将订阅者注册的消息从消息队列中移除）
    remove: function (type, fn) {
      // 消息没有被注册，直接返回
      if (!_message[type]) return;

      // 从最后一个消息动作遍历删除
      for (var i = _message[type].length - 1; i >= 0; i--) {
        _message[type][i] === fn && _message[type].splice(i, 1);
      }
    },
  };
})();

// 测试
// 注册
Observer.register('test', function (e) {
  console.log(e.type, e.args.msg);
  // test 发布消息传递参数
});
// 发布
Observer.fire('test', {
  msg: '发布消息传递参数',
});

/* ***********************************  小结  *********************************** */

/**
 * 观察者模式主要是解耦相互依赖的对象，使其依赖于观察者的消息机制
 * 注册消息（或订阅消息）、发布消息、移除消息（或注销消息）
 *
 * 主要思路：
 * 定义一个公共消息队列：注册时添加消息、发布时执行消息方法、注销时移除消息
 * 多个对象之间通过消息队列来通信
 *
 * 对任意一个订阅者对象来说，其他订阅者对象的改变不会影响到自身，以实现对象间的解耦
 *
 * 对于每一个订阅者来说，其自身既可以是消息的发出者，也可以是消息的执行者
 */
