const flat = function (arr) {
  const result = [];
  while (arr.length) {
    const current = arr.shift();
    if (Array.isArray(current)) {
      arr.unshift(...current);
    } else {
      result.push(current);
    }
  }
  return result;
};

const arr = [1, 2, 3, [1, 2, [3, 4, 5]], 6, 'name', { key: 10 }];
console.log(flat(arr));
