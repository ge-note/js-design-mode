/**
 * 第 35 章 同步模块模式（SMD，Synchronous Module Definition）
 *
 * 请求发出后，无论模块是否存在，立即执行后续的逻辑，实现模块开发中对模块的立即引用
 */

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 定义模块
 */

// 定义模块管理器单体对象
var F = F || {};

/**
 * 定义模块方法
 *
 * 理论上，模块方法应放在闭包中实现，可以隐藏内部信息，这里为了方便理解先忽略此步骤
 *
 * 总体思路：
 * 定义一个全局对象，将模块名作为 key 绑定到该全局对象上，值为对应的回调函数
 *
 * @param {*} str 模块路由
 * @param {*} fn 模块方法
 */
F.define = function (str, fn) {
  // 解析模块路由
  var parts = str.split('.');

  // grand 为当前模块的祖父模块，parent 为当前模块的父模块
  // 如果在闭包中，为了屏蔽对模块直接访问，建议将模块添加到闭包内部私有变量
  var grand = (parent = this);

  var len = parts.length;

  // 如果第一个模块是模块管理器单体对象，则移除
  if (parts[0] === 'F') {
    parts = parts.slice(1);
  }

  // 屏蔽对 define 与 module 模块方法的重写
  if (parts[0] === 'define' || parts[0] === 'module') {
    return;
  }

  // 遍历路由模块，并定义每层模块
  for (var i = 0; i < len; i++) {
    // 如果父模块中不存在当前模块，则声明当前模块
    if (typeof parent[parts[i]] === 'undefined') {
      parent[parts[i]] = {};
    }
    // 缓存下一层级祖父模块、父模块
    grand = parent;
    parent = parts[i];
  }

  // 如果给定模块方法，则定义该模块方法
  if (fn) {
    grand[parts[len - 1]] = fn();
  }

  // 返回模块管理器单体对象
  return this;
};

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 创建模块
 */

// 1. 常规创建
// F.string 模块
F.define('string', function () {
  return {
    trim: function (str) {
      return str.replace(/^\s+|\s+$/g, '');
    },
  };
});

// 测试
// 注意：真正的模块开发中，不允许这样直接调用！
console.log(F.string.trim('    去除首尾空格   ')); // 去除首尾空格

// 2. 回调函数也可以为构造函数形式返回接口
F.define('dom', function () {
  // 简化获取元素方法
  var $ = function (id) {
    $.dom = document.getElementById(id);
    return $;
  };

  $.html = function (html) {
    if (html) {
      this.dom.innerHTML = html;
      return this;
    } else {
      return this.dom.innerHTML;
    }
  };

  // 返回构造函数
  return $;
});

// 测试
F.dom('test').html();

// 3. 也可以先声明，后创建
F.define('dom.addClass');
F.dom.addClass = (function () {
  return function (className) {
    if (!this.dom.className.indexOf(className)) {
      this.dom.className += ' ' + className;
    }
  };
})();

// 测试
F.dom('test').addClass('test-class-name');

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 模块调用方法
 *
 * 总体思路：
 * 1. 解析传入的模块名，根据 key 找到对应的模块并保存
 * 2. 执行回调函数，入参即为找到的模块
 */
F.module = function () {
  // 将参数转为数组
  var args = [].slice.call(arguments);

  // 获取回调执行函数
  var fn = args.pop();

  // 获取依赖模块
  var parts = args[0] && args[0] instanceof Array ? args[0] : args;

  // 依赖模块列表
  var modules = [];

  // 模块路由
  var moduleIds = [];

  // 父模块，模块路由层级索引
  var parent, j;

  // 遍历依赖模块
  var i = 0;
  while (i < parts.length) {
    // 如果是路由模块
    if (typeof parts[i] === 'string') {
      // 设置当前模块父对象（F）
      parent = this;
      // 解析模块路由，并屏蔽模块父对象
      moduleIds = parts[i].replace(/^F\./, '').split('.');
      // 遍历模块路由层级
      for (j = 0; j < moduleIds.length; j++) {
        // 重置父模块
        parent = parent[moduleIds[j]] || false;
      }
      // 将模块添加到依赖模块列表中
      modules.push(parent);
    } else {
      // 如果是模块对象，直接添加到依赖模块列表中
      modules.push(parts[i]);
    }
    i++;
  }

  // 执行回调函数
  fn.apply(null, modules);
};

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 调用模块
 */

// 引用 dom 模块与 document 对象（注意：依赖模块对象通常为已创建的模块对象）
F.module(['dom', document], function (dom, document) {
  dom('test').html('New add!');
  document.body.style.background = '#f5f5f5';
});

// 引用 dom 模块与 string.trim 方法
F.module('dom', 'string.trim', function (dom, trim) {
  var html = dom('test').html();
  var str = trim(html);
  console.log(html, str);
});
