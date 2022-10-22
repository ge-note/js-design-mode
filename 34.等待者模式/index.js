/**
 * 第 34 章 等待者模式（Waiter）
 *
 * 通过对多个异步进程监听，来触发未来发生的动作
 */

/* ***********************************  华丽分隔线  *********************************** */

// 等待者对象
var Waiter = function () {
  var dfd = [], // 监控对象集合
    doneArr = [], // 成功回调方法集合
    failArr = [], // 失败回调方法集合
    slice = Array.prototype.slice, // 缓存 slice 方法
    that = this; // 保存当前等待者对象

  // 监控对象类
  var Promise = function () {
    // 监控对象解决成功、失败状态
    this.resolved = false;
    this.rejected = false;
  };

  // 监控对象类原型方法
  Promise.prototype = {
    // 解决成功
    resolve: function () {
      this.resolved = true;

      if (!dfd.length) {
        return;
      }

      for (var i = dfd.length - 1; i >= 0; i--) {
        // 如果有任意一个监控对象没有被解决或者解析失败，则返回
        if (dfd[i] && (!dfd[i].resolved || dfd[i].rejected)) {
          return;
        }
        // 清除监控对象
        dfd.splice(i, 1);
      }
      // 执行解决成功回调方法
      _exec(doneArr);
    },
    // 解决失败
    reject: function () {
      this.rejected = true;

      if (!dfd.length) {
        return;
      }

      // 清除所有监控对象
      dfd.splice(0);
      // 执行解决失败回调方法
      _exec(failArr);
    },
  };

  // 回调执行方法
  function _exec(arr) {
    // 遍历执行回调
    for (var i = 0; i < arr.length; i++) {
      try {
        arr[i] && arr[i]();
      } catch (err) {
        console.log(err);
      }
    }
  }

  // 创建监控对象
  that.Deferred = function () {
    return new Promise();
  };

  // 监控异步方法，参数：监控对象
  that.when = function () {
    // 设置监控对象
    dfd = slice.call(arguments);

    for (var i = dfd.length - 1; i >= 0; i--) {
      // 如果不存在监控对象，或者不是监控对象，或者监控对象已被解决
      if (
        !dfd[i] ||
        !dfd[i] instanceof Promise ||
        dfd[i].resolved ||
        dfd[i].rejected
      ) {
        // 清除当前监控对象
        dfd.splice(i, 1);
      }
    }

    return that;
  };

  // 解决成功回调函数添加方法
  that.done = function () {
    doneArr = doneArr.concat(slice.call(arguments));
    return that;
  };

  // 解决失败回调函数添加方法
  that.fail = function () {
    failArr = failArr.concat(slice.call(arguments));
    return that;
  };
};

// 测试
var waiter = new Waiter();

var first = (function () {
  var dtd = waiter.Deferred();
  setTimeout(function () {
    console.log('first finish');
    dtd.resolve();
    // 测试解决失败情况
    // dtd.reject();
  }, 500);
  return dtd;
})();

var second = (function () {
  var dtd = waiter.Deferred();
  setTimeout(function () {
    console.log('second finish');
    dtd.resolve();
  }, 1000);
  return dtd;
})();

waiter
  .when(first, second)
  .done(
    function () {
      console.log('success');
    },
    function () {
      console.log('success again');
    }
  )
  .fail(function () {
    console.log('fail');
  });

// 解决成功情况
// first finish
// second finish
// success
// success again

// 解决失败情况
// first finish
// fail
// second finish

/* ***********************************  小结  *********************************** */

/**
 * 为了处理耗时较长的操作，需要用非阻塞的解决方案
 * 捕获操作完成时或中断时的状态，并执行相应的回调
 */
