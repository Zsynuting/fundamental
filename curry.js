const curry = (fn, arity = fn.length, ...args) => {
  return arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);
}
  

const add = (a, b, c, d, e, f, g) => a + b + c + d + e + f + g;
const curryAdd = curry(add);
console.log(curryAdd(1)(2)(3)(4)(5)(6)(7))