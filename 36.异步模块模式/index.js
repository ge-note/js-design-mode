/**
 * 第 36 章 异步模块模式（AMD，Asynchronous Module Definition）
 *
 * 请求发出后，继续其他业务逻辑，直到模块加载完成执行后续的逻辑，实现模块开发中对模块加载完成后的引用
 */

/* ***********************************  华丽分隔线  *********************************** */

// 向闭包中传入模块管理器对象 F
(function (F) {
  /**
   * 创建或调用模块方法
   * @param {string} url 模块 url
   * @param {string} deps 依赖模块
   * @param {function} callback 模块主函数
   */
  F.module = function () {
    // 将参数转为数组
    var args = [].slice.call(arguments);

    // 获取模块构造函数（参数数组中最后一个参数）
    var callback = args.pop();

    // 获取依赖模块
    var deps =
      args.length && args[args.length - 1] instanceof Array ? args.pop() : [];

    // 该模块 url（模块 ID）
    var url = args.length ? args.pop() : null;

    // 依赖模块序列
    var params = [];

    // 未加载的依赖模块数量统计
    var depsCount = 0;

    var i = 0;
    var len = deps.length;
    if (len) {
      // 遍历依赖模块
      while (i < len) {
        // 闭包保存 i
        (function (i) {
          // 增加未加载依赖模块数量统计
          depsCount++;
          // 异步加载依赖模块
          loadModule(deps[i], function (mod) {
            // 依赖模块序列中添加依赖模块接口引用
            params[i] = mod;
            // 依赖模块加载完成
            depsCount--;
            if (depsCount === 0) {
              // 在模块缓存器中矫正该模块，并执行构造函数
              setModule(url, params, callback);
            }
          });
        })(i);
        i++;
      }
    } else {
      // 在模块缓存器中矫正该模块，并执行构造函数
      setModule(url, [], callback);
    }
  };

  // 模块缓存器，存储已创建模块
  var moduleCache = {};

  /**
   * 设置模块并执行模块构造函数
   * @param {*} moduleName 模块 id 名称
   * @param {*} params 依赖模块
   * @param {*} callback 模块构造函数
   */
  function setModule(moduleName, params, callback) {
    // 模块容器，模块文件加载完成回调函数
    var _module, fn;
    // 如果模块被调用过
    if (moduleCache[moduleName]) {
      // 获取模块
      _module = moduleCache[moduleName];
      // 设置模块已加载完成
      _module.status = 'loaded';
      // 矫正模块接口
      _module.exports = callback ? callback.apply(_module, params) : null;
      // 执行模块文件加载完成回调函数
      while ((fn = _module.onload.shift())) {
        fn(_module.exports);
      }
    } else {
      // 模块不存在（匿名模块），则直接执行构造函数
      callback && callback.apply(null.params);
    }
  }

  /**
   * 异步加载依赖模块所在文件
   * @param {string} moduleName 模块路径（id）
   * @param {function} callback 模块加载完成回调函数
   */
  function loadModule(moduleName, callback) {
    // 依赖模块
    var _module;

    // 如果依赖模块被要求加载过
    if (moduleCache[moduleName]) {
      // 获取该模块信息
      _module = moduleCache[moduleName];
      // 如果模块已经加载完成，则执行回调函数
      if (_module.status === 'loaded') {
        setTimeout(callback(_module.exports), 0);
      } else {
        // 缓存该模块所处文件加载完成回调函数
        _module.onload.push(callback);
      }
    } else {
      // 模块第一次被依赖引用
      moduleCache[moduleName] = {
        moduleName: moduleName,
        status: 'loading',
        exports: null,
        onload: [callback],
      };
      // 加载模块对应文件
      loadScript(getUrl(moduleName));
    }

    // 获取文件路径
    function getUrl(moduleName) {
      return String(moduleName).replace(/\.js$/g, '') + '.js';
    }

    // 加载脚本文件
    function loadScript(src) {
      var _script = document.createElement('script');
      _script.type = 'text/JavaScript';
      _script.charset = 'UTF-8';
      _script.async = true;
      _script.src = src;
      document.getElementsByTagName('head')[0].appendChild(_script);
    }
  }
})(
  (function () {
    // 创建模块管理器对象，并保存在全局作用域中
    return (window.F = {});
  })()
);

/* ***********************************  华丽分隔线  *********************************** */

// 测试

F.module('lib/dom', function () {
  return {
    g: function (id) {
      return document.getElementById(id);
    },
    html: function (id, html) {
      if (html) {
        this.g(id).innerHTML = html;
      } else {
        return this.g(id).innerHTML;
      }
    },
  };
});

F.module('lib/event', ['lib/dom'], function (dom) {
  var events = {
    on: function (id, type, fn) {
      dom.g(id, type, fn);
    },
  };
  return events;
});

F.module(['lib/event', 'lib/dom'], function (events, dom) {
  events.on('demo', 'click', function () {
    dom.html('demo', 'success');
  });
});
