/**
 * 第 11 章 代理模式（Proxy）
 *
 * 由于一个对象不能直接引用另一个对象，因此需要通过代理对象在这两个对象之间起到中介作用
 *
 * 应用场景：
 * 1、解决跨域问题
 * 2、延迟加载首屏资源
 * 3、图片懒加载
 */

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 解决跨域问题
 */

/**
 * 1、通过 img 的 src 属性向其他域下的服务器发送请求
 *
 * 注意：这种方式是 get 请求，并且是单向的，不会有响应数据
 *
 * 可用于站长统计等
 */
// 统计代理
var count = (function () {
  // 缓存图片
  var img = new Image();

  // 返回统计函数
  return function (param) {
    // 拼接数据
    var str = 'http://example/a.gif?';
    for (var i in param) {
      str += i + '=' + param[i];
    }
    // 发送统计请求
    img.src = str;
  };
})();

// 测试：统计 num
count({
  num: 10,
});

/**
 * 2、通过 <script> 代理（JSONP）
 */
// // 浏览器 html
// <script type="text/javascript">
//   // 回调函数
//   function jsonpCallBack(res, req) {
//       console.log(res, req)
//   }
// </script>

// <script type="text/javascript" src="http://example/jsonp.php?callback=jsonpCallBack&data=getJsonpData"></script>

// // 另外一个域下的服务器请求接口
// <?php
//   $data = $_GET["data"];
//   $callback = $_GET["callback"];
//   echo $callback."('success', '".$data."')";
// ?>

/* ***********************************  小结  *********************************** */

/**
 * 通过代理解决跨域问题、延迟加载图片等
 */
