/**
 * 第 27 章 链模式（Operate of Responsibility）
 *
 * 通过在对象方法中将当前对象返回，实现对同一个对象多个方法的链式调用
 */

/* ***********************************  华丽分隔线  *********************************** */

var A = function (selector, context) {
  // 注意：实例化
  return new A.fn.init(selector), context;
};

A.fn = A.prototype = {
  constructor: A,
  init: function (selector, context) {
    this.length = 0;
    context = context || document;

    if (selector.indexOf('#')) {
      this[0] = document.getElementById(selector.slice(1));
      this.length = 1;
    }

    this.context = context;
    this.selector = selector;

    // 关键：返回当前对象
    return this;
  },
};

A.fn.init.prototype = A.fn;

// 对象拓展
A.extend = A.fn.extend = function () {
  // 拓展对象从第二个参数开始
  var i = 1,
    len = arguments.length,
    target = arguments[0], // 第一个参数为源对象
    j;

  // 只传一个参数
  if (i == len) {
    target = this;
    i--;
  }

  // 遍历参数中的拓展对象
  for (; i < len; i++) {
    for (j in arguments[i]) {
      // 拓展源对象
      target[j] = arguments[i][j];
    }
  }

  return target;
};

A.fn.extend({
  // 获取或设置元素内容
  html: function () {
    var arg = arguments,
      len = arg.length;

    if (len === 0) {
      return this[0] && this[0].innerHTML;
    } else {
      for (var i = this.length - 1; i >= 0; i--) {
        this[i].innerHTML = arg[0];
      }
    }

    return this;
  },
});

A.extend({
  // 将 - 转为驼峰式
  camelCase: function (str) {
    return str.replace(/\-(\w)/g, function (all, letter) {
      return letter.toUpperCase();
    });
  },
});

A.extend({
  // 设置 css 样式
  css: function () {
    var arg = arguments,
      len = arg.length;

    if (this.length < 1) {
      return this;
    }
    if (len === 1) {
      if (typeof arg[0] === 'string') {
        return getComputedStyle(this[0], false)[name];
      } else if (typeof arg[0] === 'object') {
        for (var i in arg[0]) {
          for (var j = this.length - 1; j >= 0; j--) {
            this[j].style[A.camelCase(i)] = arg[0][i];
          }
        }
      }
    } else if (len === 2) {
      for (var j = this.length - 1; j >= 0; j--) {
        this[j].style[A.camelCase(arg[0])] = arg[1];
      }
    }

    return this;
  },
});

// 测试
A('wrap').html('add test text').css({
  width: '50px',
  height: '50px',
  'background-color': '#f5f5f5',
});
