/**
 * 第 25 章 迭代器模式（Iterator）
 *
 * 在不暴露对象内部结构的同时，可以顺序地访问聚合对象内部的元素
 */

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 轮播图迭代器
 */
var Iterator = function (items, container) {
  var container = (container && document.getElementById(container)) || document,
    items = container.getElementsByTagName(items),
    length = items.length,
    index = 0;

  // 缓存数组的 splice 方法
  var splice = [].splice;

  return {
    first: function () {
      index = 0;
      return items[index];
    },
    last: function () {
      index = length - 1;
      return items[index];
    },
    pre: function () {
      if (--index > 0) {
        return items[index];
      } else {
        index = 0;
        return null;
      }
    },
    next: function () {
      if (++index < length) {
        return items[index];
      } else {
        index = length - 1;
        return null;
      }
    },
    get: function (num) {
      index = num >= 0 ? num % length : (num % length) + length;
      return items[index];
    },
    handleEach: function (fn) {
      // 从第二个参数开始为回调函数中的参数
      var args = splice.call(arguments, 1);
      // 遍历元素执行回调函数
      for (var i = 0; i < length; i++) {
        fn.apply(items[i], args);
      }
    },
    handleItem: function (num, fn) {
      // 从第三个参数开始为回调函数中的参数
      var args = splice.call(arguments, 2);
      // 执行回调函数
      fn.apply(this.get(num), args);
    },
  };
};

// 测试
var demo = new Iterator('li', 'container');
console.log(demo.first());
console.log(demo.pre());
console.log(demo.next());
console.log(demo.get(200));
demo.handleEach(
  function (text, color) {
    this.innerHTML = text;
    this.style.background = color;
  },
  'test',
  'orange'
);

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 数组迭代器
 */
var eachArray = function (arr, fn) {
  for (var i = 0; i < arr.length; i++) {
    // 依次执行回调函数
    // 注意：
    // 回调函数中传入的参数：第一个为索引，第二个为索引对应的值
    if (fn.call(arr[i], i, arr[i]) === false) {
      break;
    }
  }
};

// 测试
var list = [10, 11, 12, 13, 14];
eachArray(list, function (i, data) {
  console.log(i, data);
});
// 0 10
// 1 11
// 2 12
// 3 13
// 4 14

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 对象迭代器
 */
var eachObject = function (obj, fn) {
  for (var i in obj) {
    // 依次执行回调函数
    // 注意：
    // 回调函数中传入的参数：第一个为属性，第二个为该属性对应的值
    if (fn.call(obj[i], i, obj[i]) === false) {
      break;
    }
  }
};

// 测试
var obj = {
  a: 12,
  b: 25,
  c: 16,
};
eachObject(obj, function (i, data) {
  console.log(i, data);
});
// a 12
// b 25
// c 16
