/**
 * 第 7 章 原型模式（Prototype）
 *
 * 用原型实例指向创建对象的类，使用于创建新的对象的类共享原型对象的属性及方法
 */

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 将可复用的、可共享的、耗时大的从基类中提取出来放在原型中
 * 子类通过组合继承或者寄生组合式继承而将方法或者属性继承下来
 * 对于子类中需要重写的方法进行重写
 *
 * 这样，子类创建的对象既具有子类的属性和方法，也共享了基类的原型方法
 */
// 图片轮播类
var LoopImages = function (imgArr, container) {
  // 轮播图片数组
  this.imagesArray = imgArr;

  // 轮播图片容器
  this.container = container;
};

LoopImages.prototype = {
  // 创建轮播图片
  createImage: function () {
    console.log('创建轮播图片');
  },
  // 切换下一张图片
  changeImage: function () {
    console.log('切换下一张图片');
  },
};

// 上下滑动切换类
var SlideLoopImg = function (imgArr, container) {
  // 构造函数继承图片轮播类
  LoopImages.call(this, imgArr, container);
};

SlideLoopImg.prototype = new LoopImages();

// 重写继承的切换下一张图片方法
SlideLoopImg.prototype.changeImage = function () {
  console.log('上下滑动切换下一张图片');
};

// 渐隐切换类
var FadeLoopImg = function (imgArr, container, arrow) {
  LoopImages.call(this, imgArr, container);

  // 切换箭头私有变量
  this.arrow = arrow;
};

FadeLoopImg.prototype = new LoopImages();

FadeLoopImg.prototype.changeImage = function () {
  console.log('渐隐切换下一张图片');
};

var fadeImg = new FadeLoopImg(['01.jpg', '02.jpg', '03.jpg'], 'slide', [
  'left.jpg',
  'right.jpg',
]);

console.log(fadeImg.container); // slide
fadeImg.changeImage();

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 原型对象是一个共享的对象，不论是父类的实例对象或者是子类的继承，都是对它的一个指向引用
 *
 * 所以原型模式在任何时候都可以对基类或者子类进行方法的拓展，而且所有被实例化的对象或者类都能获取这些方法
 */
LoopImages.prototype.getImageLength = function () {
  return this.imagesArray.length;
};

FadeLoopImg.prototype.getContainer = function () {
  return this.container;
};

console.log(fadeImg.getImageLength()); // 3

console.log(fadeImg.getContainer()); // slide

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 原型继承
 */

/**
 * 基于已存在的模板对象克隆出新对象的模式
 * arguments[0]、arguments[1]、arguments[2]：参数1/2/3，表示模板对象
 */
function prototypeExtend() {
  var F = function () {}, // 缓存类
    args = arguments, // 模板对象参数序列
    i = 0,
    len = args.length;

  for (; i < len; i++) {
    // 遍历模板对象中的属性
    for (var j in args[i]) {
      // 将属性复制到缓存类原型中（注意是浅拷贝）
      F.prototype[j] = args[i][j];
    }
  }

  // 返回缓存类的一个实例
  return new F();
}

var penguin = prototypeExtend(
  {
    speed: 20,
    swim: function () {
      console.log('游泳速度' + this.speed);
    },
  },
  {
    run: function (speed) {
      console.log('奔跑速度' + speed);
    },
  },
  {
    jump: function () {
      console.log('跳跃');
    },
  }
);

penguin.swim(); // 游泳速度20
penguin.run(10); // 奔跑速度10
penguin.jump(); // 跳跃

/* ***********************************  小结  *********************************** */

/**
 * 原型模式可以让多个对象共享同一个原型对象的属性和方法
 * 也是一种继承：将原型对象分享给继承的对象
 *
 * 适用于比较稳定的属性和方法共用
 */
