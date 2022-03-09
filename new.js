/**
 * 当构造函数返回对象时，以对象的属性为准，构造函数执行过程中this上的属性失效
 * 例如 
function F(x) {
  this.x = x;

  return {
    y: x + 1,
  };
}
const f = new F(1)
console.log(f.x) // undefined
console.log(f.y) // 2
 *
 * 当构造函数的返回值为非对象类型，则返回值失效，仍以this作为返回值
function F(x) {
  this.x = x;

  return x + 1;
}
const f = new F(1)
console.log(f) // {x:1}
console.log(f.x) // 1

// 当构造函数返回值为function时，this失效，以function为实例
function F(x) {
  this.x = x;

  return function() {};
}
const f = new F(1)
console.log(f) // ƒ () {}
console.log(f.x) // undefined
 * 
 */
function objectFactory() {
  const Ctor = Array.prototype.shift.call(arguments);
  const obj = new Object();
  obj.__proto__ = Ctor.prototype;
  const res = Ctor.apply(obj, arguments);
  return ['object', 'function'].indexOf(typeof res) > -1 ? res : obj;
}

function F(x) {
  this.x = x;
}
const a = new F(1);
console.log(a.x);
