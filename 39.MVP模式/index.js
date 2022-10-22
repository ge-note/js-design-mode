/**
 * 第 39 章 MVP 模式
 *
 * M：Model 模型
 * V：View 视图
 * P：Presenter 管理器
 *
 * View 层不直接引用 Model 层内的数据，而是通过 Presenter 层实现对 Model 层内的数据访问
 */

/* ***********************************  华丽分隔线  *********************************** */

/**
 * MVP 模型结构
 */
(function (window) {
  // MVP 构造函数
  var MVP = function (modName, pst, data) {
    // 在数据层添加 modName 渲染数据模块
    MVP.model.setData(modeName, data);
    // 在管理层中添加 modeName 管理器模块
    MVP.presenter.add(modName, pst);
  };

  // 数据层
  MVP.model = function () {
    var M = {};
    M.data = {};
    M.conf = {};
    return {
      getData: function (m) {
        return M.data[m];
      },
      setData: function (m, v) {
        M.data[m] = v;
        return this;
      },
      getConf: function (c) {
        return M.conf[c];
      },
      setConf: function (c, v) {
        M.conf[c] = v;
        return this;
      },
    };
  };

  // 视图层
  MVP.view = function () {
    // 主要逻辑为将输入的 str 字符串处理转为 html 返回
    // 模板引擎
    return function (str) {
      return html;
    };
  };

  // 管理层
  MVP.presenter = function () {
    var M = MVP.model;
    var V = MVP.view;
    var P = {};
    return {
      init: function () {
        // 遍历并执行所有的管理器内部逻辑
        for (var i in P) {
          P[i] && P[i](M, V, i);
        }
      },
      /**
       * 为管理器添加模块
       * @param {string} modeName 模块名称
       * @param {function} pst 模块器管理者
       * @returns
       */
      add: function (modeName, pst) {
        P[modeName] = pst;
        return this;
      },
    };
  };

  // MVP 入口
  MVP.init = function () {
    this.presenter.init();
  };

  // 暴露 MVP 对象，使得可以在外部访问 MVP
  window.MVP = MVP;
})(window);

window.onload = function () {
  MVP.init();
};

/* ***********************************  小结  *********************************** */

/**
 * Model 提供数据
 * View 仅接收 Presenter 传入的参数，完成 html 字符串的拼接与格式化
 * Presenter 作为管理中心，调用 Model 处理数据，然后传入 View，在回调中处理渲染数据、创建容器、插入元素、绑定事件等
 *
 * MVP 与 MVC 相比：
 * - MVP 将视图层与数据层完全解耦，使得数据层、视图层各自的改动不会影响对方
 * - MVP 中的 P 做的事情更多
 * - MVP 也可以实现一个管理器，可以调用多个数据，或者创建多种视图
 */
