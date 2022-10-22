/**
 * 第 10 章 适配器模式（Adapter）
 *
 * 将一个类（对象）的接口（方法或属性）转化成另外一个接口，解决类（对象）之间接口的不兼容问题
 *
 * 应用场景：
 * 1、适配异类框架
 * 2、适配参数
 * 3、适配数据
 * ...
 */

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 1、适配异类框架
 *
 * 示例：有 A 框架与 jQuery 框架，创建适配器使 A 框架的方法转换到 jQuery 的方法
 */
// A 框架
var A = A || {};
A.g = function (id) {
  return document.getElementById(id);
};
A.on = function (id, type, fn) {
  var dom = typeof id === 'string' ? this.g(id) : id;
  if (dom.addEventListener) {
    dom.addEventListener(type, fn, false);
  } else if (dom.attachEvent) {
    dom.attachEvent('on' + type, fn);
  } else {
    dom['on' + type] = fn;
  }
};

// 适配器，将 A 的方法转到 jQuery 方法（假设已经引入 jQuery）
A.g = function (id) {
  return $(id).get(0);
};
A.on = function (id, type, fn) {
  var dom = typeof id === 'string' ? $('#' + id) : $(id);
  dom.on(type, fn);
};

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 2、适配参数
 *
 * 示例：为必填参数设置默认值
 */
function doSomeThing(obj) {
  var adapter = {
    name: '书籍',
    desc: '设计模式',
    label: 'js',
    color: 'white',
    price: 50,
  };

  for (var i in adapter) {
    adapter[i] = obj[i] || adapter[i];
  }
}

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 3、适配数据
 *
 * 示例：将服务端返回的数据格式化
 */
function ajaxAdapter(data) {
  return [data['key1'], data['key2'], data['key3']];
}
$.ajax({
  url: 'example.php',
  success: function (data, status) {
    if (data) {
      return ajaxAdapter(data);
    }
  },
});

/* ***********************************  小结  *********************************** */

/**
 * 通过一些转换方法，实现：
 * 兼容不同代码库
 * 对数据进行转换适配
 * 等
 */
