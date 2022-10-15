/**
 * 第 12 章 装饰者模式（Decorator）
 *
 * 在不改变原对象的基础上，通过对其进行包装拓展（添加属性或方法），
 * 使原有对象可以满足更复杂的需求
 */

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 装饰已有的功能
 *
 * 示例：在原来的点击事件基础上，增加新的功能
 */
var decorator = function (id, fn) {
  var dom = document.getElementById(id);

  // 判断是否已绑定点击事件
  if (typeof dom.onclick === 'function') {
    var oldClickFn = dom.onclick;
    // 重新绑定事件
    dom.onclick = function () {
      // 重点：执行 原回调函数 和 新回调函数
      oldClickFn();
      fn();
    };
  } else {
    // 如果未绑定点击事件，则直接添加回调函数
    dom.onclick = fn;
  }
};

// 测试
// 电话输入框功能装饰
decorator('telInput', function () {
  document.getElementById('telInputText').style.display = 'none';
});
