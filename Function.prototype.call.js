// 接受一个对象，以对象作为方法的执行上下文this
// 参数无限个数，使用ES6有点超纲，可以使用eval
Function.prototype.callZ = function () {
  const target = arguments[0];
  target.fn = this;
  const evalArgs = [];
  for (let i = 1; i < arguments.length; i++) {
    evalArgs.push(`arguments[${i}]`);
  }
  const evalStr = `target.fn(${evalArgs})`;
  const res = eval(evalStr);
  delete target.fn;
  return res;
};

Function.prototype.applyZ = function (target, args) {
  target.fn = this;
  const evalArgs = [];
  for (let i = 0; i < args.length; i++) {
    evalArgs.push(`args[${i}]`);
  }
  const evalStr = `target.fn(${evalArgs})`;
  const res = eval(evalStr);
  delete target.fn;
  return res;
};

const a = {
  add(x, y) {
    console.log(x, y);
    return this.a + this.b + this.c + x + y;
  },
};

const b = {
  a: 0,
  b: 1,
  c: 2,
};

console.log(a.add.callZ(b, 10, 11));
console.log(a.add.applyZ(b, [10, 11]));
