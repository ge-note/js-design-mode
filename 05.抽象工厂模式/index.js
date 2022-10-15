/**
 * 第 5 章 抽象工厂模式
 *
 * 通过对类的工厂抽象，使其业务用于对产品类簇的创建，而不负责创建某一类产品的实例
 */

/**
 * 抽象类
 */
var Car = function () {};

Car.prototype = {
  getPrice: function () {
    return new Error("抽象方法不能调用");
  },
  getSpeed: function () {
    return new Error("抽象方法不能调用");
  },
};

/**
 * 这个 Car 类什么也不能做，没有任何属性，原型上的方法也不能使用
 *
 * 但在继承中很有用，因为定义了一种类，并定义了该类所具备的方法
 * 如果子类中没有重写这些方法，则调用这些方法时就会报错
 *
 * 因此就要求子类中必须要实现这些方法
 *
 * 这也是抽象类的一个作用，即：定义一个产品簇，并声明一些必备的方法，如果子类没有重写就会提示或报错
 */

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 抽象工厂函数
 */
var VehicleFactory = function (subType, superType) {
  // 判断抽象工厂中是否有该抽象类
  if (typeof VehicleFactory[superType] === "function") {
    // 缓存类
    function F() {}

    // 继承父类属性和方法
    F.prototype = new VehicleFactory[superType]();

    // 将子类 constructor 指向子类
    subType.constructor = subType;

    // 子类继承“父类”
    subType.prototype = new F();
  } else {
    // 不存在该抽象类时抛出错误
    throw new Error("未创建该抽象类");
  }
};

// 小汽车抽象类
VehicleFactory.Car = function () {
  this.type = "car";
};

VehicleFactory.Car.prototype = {
  getPrice: function () {
    return new Error("抽象方法不能调用");
  },
  getSpeed: function () {
    return new Error("抽象方法不能调用");
  },
};

// 公交车抽象类
VehicleFactory.Bus = function () {
  this.type = "bus";
};

VehicleFactory.Bus.prototype = {
  getPrice: function () {
    return new Error("抽象方法不能调用");
  },
  getPassengerNum: function () {
    return new Error("抽象方法不能调用");
  },
};

// 货车抽象类
VehicleFactory.Truck = function () {
  this.type = "truck";
};

VehicleFactory.Truck.prototype = {
  getPrice: function () {
    return new Error("抽象方法不能调用");
  },
  getTrainload: function () {
    return new Error("抽象方法不能调用");
  },
};

// 以上，便通过抽象工厂函数，创建了三个不同的抽象类
// 注意：只是创建了“抽象类”，还不是真正的子类，也不能实例化

/**
 * 根据抽象类创建子类、实例化对象
 */

/**
 * 汽车子类
 */
// 宝马汽车子类
var BMW = function (price, speed) {
  this.price = price;
  this.speed = speed;
};

// 抽象工厂实现对 Car 抽象类的继承
VehicleFactory(BMW, "Car");

BMW.prototype.getPrice = function () {
  return this.price;
};

BMW.prototype.getSpeed = function () {
  return this.speed;
};

var bmw = new BMW(1000000, 1000);

console.log(bmw.getPrice()); // 1000000

console.log(bmw.type); // car

/**
 * 货车子类
 */
// 奔驰货车子类
var BenzTruck = function (price, trainLoad) {
  this.price = price;
  this.trainLoad = trainLoad;
};

// 抽象工厂实现对 Truck 抽象类的继承
VehicleFactory(BenzTruck, "Truck");

BenzTruck.prototype.getPrice = function () {
  return this.price;
};

BenzTruck.prototype.getTrainLoad = function () {
  return this.trainLoad;
};

var truck = new BenzTruck(500000, 150);

console.log(truck.getTrainLoad()); // 150

console.log(truck.type); // truck

/* ***********************************  小结  *********************************** */

/**
 * 通过抽象工厂函数，创建一个类簇，指定类的结构，创建出来的是多个抽象类
 *
 * 需要根据这些抽象类，再创建抽象类的具体子类，然后实例化
 */
