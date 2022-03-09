function findPath(obj, value) {
  let result = [];

  function findPathImpl(obj, value, path = []) {
    if (!obj) {
      return;
    } else if (obj === value) {
      result = path;
      return;
    } else if (typeof obj === 'object') {
      Object.keys(obj).forEach((key) =>
        findPathImpl(obj[key], value, [...path, key]),
      );
    } else {
      return;
    }
  }

  findPathImpl(obj, value);
  return result;
}

const obj = {
  a: {
    a_1: {
      a_1_1: 'abc',
      a_1_2: 'efg',
    },
  },
  b: {
    b_1: 'xyz',
    b_2: '111',
  },
  c: '000',
};
console.log(findPath(obj, 'xyz'));
