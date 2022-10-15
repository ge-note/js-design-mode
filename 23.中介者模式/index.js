/**
 * 第 23 章 中介者模式（Mediator）
 *
 * 通过中介者对象封装一系列对象之间的交互，使对象之间不再相互引用，降低耦合
 * 有时也可以改变对象之间的交互
 */

/* ***********************************  华丽分隔线  *********************************** */

// 中介者对象
var Mediator = (function () {
  // 消息对象
  var _message = {};

  return {
    // 订阅消息
    register: function (type, action) {
      if (_message[type]) {
        _message[type].push(action);
      } else {
        _message[type] = [action];
      }
    },
    // 发布消息
    send: function (type) {
      if (_message[type]) {
        for (var i = 0; i < _message[type].length; i++) {
          _message[type][i] && _message[type][i]();
        }
      }
    },
  };
})();

// 测试
Mediator.register('test', function () {
  console.log('first');
});
Mediator.register('test', function () {
  console.log('second');
});

Mediator.send('test');

// first
// second

/**
 * 注意：
 * 观察者模式 和 中介者模式 的区别
 * - 观察者模式中的订阅者是双向的，既可以是消息的发布者，也可以额是消息的订阅者
 * - 中介者模式中的订阅者只能是单向的，只能是消息的订阅者，而消息统一由中介者对象发布，所有的订阅者间接地被中介者管理
 */
