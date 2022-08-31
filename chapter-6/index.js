/**
 * 第 6 章 建造者模式
 *
 * 将一个复杂对象的构建层与其表示层相互分离，同样的构建过程可采用不同的表示
 */

/**
 * 工厂模式 VS 建造者模式
 *
 * 工厂模式主要是为了创建对象实例或者类簇（抽象工厂），关心的是最终产出（创建）的是什么
 * 不关心创建的整个过程，仅需要知道最终创建的结果
 *
 * 建造者模式更多关心的是创建这个对象的整个过程、关注创建对象的细节
 */

/**
 * 创建应聘者
 */
// 创建一位人类
var Human = function (param) {
  // 技能
  this.skill = (param && param.skill) || '保密';

  // 兴趣爱好
  this.hobby = (param && param.hobby) || '保密';
};

// 人类原型方法
Human.prototype = {
  getSkill: function () {
    return this.skill;
  },
  getHobby: function () {
    return this.hobby;
  },
};

// 实例化姓名类
var Named = function (name) {
  var that = this;

  // 构造函数解析姓名的姓与名
  // 疑问：为什么要用 IIFE？
  (function (name, that) {
    that.wholeName = name;
    var index = name.indexOf(' ');
    if (index > -1) {
      that.firstName = name.slice(0, index);
      that.secondName = name.slice(index);
    }
  })(name, that);
};

// 实例化职位类
var Work = function (work) {
  var that = this;

  // 构造函数解析姓名的姓与名
  (function (work, that) {
    switch (work) {
      case 'code':
        that.work = '工程师';
        that.workDesc = '改变世界';
        break;
      case 'UI':
      case 'UE':
        that.work = '设计师';
        that.workDesc = '艺术';
        break;
      case 'teach':
        that.work = '教师';
        that.workDesc = '分享';
        break;
      default:
        that.work = work;
        that.workDesc = '没有留下描述';
    }
  })(work, that);
};

// 更换期望职位
Work.prototype.changeWork = function (work) {
  this.work = work;
};

// 添加职位描述
Work.prototype.changeDesc = function (desc) {
  this.workDesc = desc;
};

/**
 * 应聘者建造者
 *
 * @param {string} name 姓名
 * @param {string} work 期望职位
 */
var Person = function (name, work) {
  // 创建应聘者缓存对象
  var _person = new Human();

  // 创建应聘者姓名解析对象
  _person.name = new Named(name);

  // 创建应聘者期望职位
  _person.work = new Work(work);

  // 将创建的应聘者对象返回
  return _person;
};

var person = new Person('Xiao Ming', 'code');

console.log(person.skill); // 保密
console.log(person.name.firstName); // Xiao
console.log(person.work.work); // 工程师

person.work.changeDesc('沉迷代码，无法自拔');
console.log(person.work.workDesc); // 沉迷代码，无法自拔

/**
 * 通常将创建对象的类模块化，这样每一个模块就可以得到灵活运用和高质量复用，最终合并为一个完整的个体
 *
 * 如果对象颗粒度很小，或者复用率不高，为降低复杂度，建议还是创建整体对象
 */
