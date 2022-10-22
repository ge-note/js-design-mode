/**
 * 第 40 章 MVVM 模式
 *
 * M：Model 模型
 * V：View 视图
 * VM：ViewModel 视图模型
 *
 * 为视图层量身定做一套视图模型，并在视图模型中创建属性和方法，为视图层绑定数据并实现交互
 */

/* ***********************************  华丽分隔线  *********************************** */

/**
 * MVVM 模型结构
 */
(function () {
  // 在闭包中获取全局变量
  var window = this || (0, eval)('this');

  // 视图模型对象
  var VM = (function () {
    // 创建各种 UI 组件的方法
    var Method = {
      // 进度条组件创建方法
      progressbar: function (dom, data) {
        // 创建元素
        // 根据 data 设置元素属性
        // 将元素添加到 dom
        // 绑定事件
      },
      // 滑动条组件创建方法
      slider: function () {},
    };

    /**
     * 获取组件绑定的自定义数据
     * @param {*} dom 组件元素
     */
    function getBindData(dom) {
      // 获取组件自定义属性 data-bind 值
      var data = dom.getAttribute('data-bind');
      // 将自定义属性 data-bind 值转化为对象
      return !!data && new Function('return ({' + data + '})')();
    }

    // 组件实例化方法
    return function () {
      // 获取页面中所有元素
      var doms = document.body.getElementsByTagName('*');
      // 元素自定义数据
      var ctx = null;

      // ui 处理时会向页面中插入元素，此时 doms.length 会改变，此时动态获取 doms.length
      for (var i = 0; i < doms.length; i++) {
        // 获取元素自定义数据
        ctx = getBindData(doms[i]);
        // 如果元素是 UI 组件，则根据自定义属性中组件类型，渲染该组件
        ctx.type && Method[ctx.type] && Method[ctx.type](doms[i], ctx);
      }
    };
  })();

  // 将视图模型绑定在 windows 上，供外部获取
  window.VM = VM;
})();

window.onload = function () {
  VM();
};
