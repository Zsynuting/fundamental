function sum() {
  let args = [...arguments];
  function currySum() {
    args = args.concat(...arguments);
    return currySum;
  }
  function count() {
    return args.reduce((prev, current) => prev + current, 0);
  }
  currySum.count = count;
  return currySum;
}

console.log(sum(1)(2).count()); // 3
console.log(sum(1)(2)(3).count()); // 6
console.log(sum(1)(2)(3)(4, 5).count()); // 15
