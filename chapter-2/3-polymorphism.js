/**
 * 多态
 *
 * JS 中通过对传入的参数做判断来实现多种调用方式
 */

/**
 * 示例：定义一个方法
 * 如不传参返回 0
 * 如传一个参数返回 当前数
 * 如传两个参数返回 两个数之和
 */
function add() {
  // 获取参数
  var arg = arguments;

  // 获取参数长度
  var len = arg.length;

  switch (len) {
    case 0:
      return 0;
    case 1:
      return arg[0];
    case 2:
      return arg[0] + arg[1];
  }
}

console.log(add()); // 0

console.log(add(5)); // 5

console.log(add(2, 6)); // 8
