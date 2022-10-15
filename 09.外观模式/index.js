/**
 * 第 9 章 外观模式
 *
 * 为一组复杂的子系统接口提供一个更高级的统一接口，简化底层接口复杂性
 *
 * 封装接口
 */

/**
 * 封装添加事件
 */
function addEvent(dom, type, fn) {
  // 考虑浏览器兼容性
  if (dom.addEventListener) {
    dom.addEventListener(type, fn, false);
  } else if (dom.attachEvent) {
    dom.attachEvent('on' + type, fn);
  } else {
    dom['on' + type] = fn;
  }
}

// 绑定事件
var input = document.getElementById('input');
addEvent(input, 'click', function () {
  console.log('绑定第一个事件');
});
addEvent(input, 'click', function () {
  console.log('绑定第二个事件');
});

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 简单实现获取元素属性样式的方法库
 */
var A = {
  // 通过 id 获取元素
  g: function (id) {
    return document.getElementById(id);
  },
  // 设置元素 css 属性
  css: function (id, key, value) {
    document.getElementById(id).style[key] = value;
  },
  // 设置元素属性
  attr: function (id, key, value) {
    document.getElementById(id)[key] = value;
  },
  // 设置 html 内容
  html: function (id, html) {
    document.getElementById(id).innerHTML = html;
  },
  // 绑定事件
  on: function (id, type, fn) {
    document.getElementById(id)['on' + type] = fn;
  }
};

A.css('wrap', 'background', '#f5f5f5');
A.attr('wrap', 'data-class', 'wrap');
A.html('wrap', 'Wrap 新内容');
A.on('wrap', 'click', function () {
  A.css('wrap', 'width', '500px');
})
