Function.prototype.bindZ = function (context, ...savedArgs) {
  if (typeof this !== 'function') {
    throw new Error('bindZ can only be called by a function instance');
  }
  // 执行绑定是的this是方法本身
  const fn = this;
  // 使用一个空方法来模拟构造方法，进行原型链传递
  const noop = function () {};
  noop.prototype = this.prototype;
  function bind(...args) {
    // 此处的this代表执行new时function上下文的this
    // 当bindZ的结果作为构造方法时，binding context失效
    fn.apply(this instanceof bind ? this : context, [...savedArgs, ...args]);
  }
  bind.prototype = new noop();
  return bind;
};

// test case: 构造函数使用bind生成
const ClassA = function (solidX, x) {
  this.solidX = solidX;
  this.x = x;
}.bindZ(null, 'solidX');
ClassA.prototype.protoX = 'protoX';

const a = new ClassA('x');
console.log(a.solidX);
console.log(a.protoX);
console.log(a.x);
