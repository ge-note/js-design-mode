/**
 * 第 38 章 MVC 模式
 *
 * M：model 模型
 * V：view 视图
 * C：controller 控制器
 *
 * 用一种将业务逻辑、数据、视图分离的方式组织架构代码
 */

/* ***********************************  华丽分隔线  *********************************** */

/**
 * MVC 模型结构
 */

// 页面加载后创建 MVC 对象
$(function () {
  // 初始化 MVC 对象
  var MVC = MVC || {};

  // 数据模型层
  MVC.model = (function () {
    // 内部数据对象
    var M = {};

    // 页面数据（假设为同步数据）
    M.data = {};

    // 配置数据，页面加载时即提供
    M.conf = {};

    // 返回数据模型层对象操作方法
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
  })();

  // 视图层
  MVC.view = (function () {
    // 模型数据层对象操作方法引用
    var M = MVC.model;

    // 通过 M 可以获取数据，并用于创建 V

    // 内部视图创建方法对象
    var V = {};

    // 主要为 html 字符串拼接、将 html 片段追加到容器等

    // 返回获取视图接口方法
    return function (v) {
      // 根据视图名称返回视图
      V[v]();
    };
  })();

  // 控制器层
  MVC.ctrl = (function () {
    // 模型数据层对象操作方法引用
    var M = MVC.model;

    // 视图层对象操作方法引用
    var V = MVC.view;

    // 控制器创建方法对象
    var C = {};

    // 通过 M、V 可以执行创建视图方法、绑定事件等
  })();

  // 注意：model、view、ctrl 是自执行函数，用于为其他对象调用提供接口方法
});
