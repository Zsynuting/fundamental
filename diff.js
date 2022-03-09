function diff(arr1, arr2) {
  const map1 = new Map(arr1.map((item) => [JSON.stringify(item), item]));
  const map2 = new Map(arr2.map((item) => [JSON.stringify(item), item]));

  for (const item of map1) {
    if (map2.has(item[0])) {
      map1.delete(item[0]);
      map2.delete(item[0]);
    }
  }

  return [...Array.from(map1.values()), ...Array.from(map2.values())];
}

// console.log(diff([1, 2], [2, 1])); //=>[]
// console.log(diff([1, 2, 1], [2, 1, 1, 2])); //=>[]顺序不同,内容相同也没有不同
// console.log(diff([1, 2, 3], [4, 3, 1])); //=>[24]
// console.log(diff([1, [2, 3], 4], [[1, 2], [2, 3], 3, 4])); // =>[1,[1,2],3]
// console.log(diff([[1, 2, 3], [3, 2, 1], 1, 2, 3], [2, 3, 1])); // =>[[1,2,3],[3,2,1]]
console.log(JSON.stringify(diff([[1, 2, 3], [3, 2, 1], 1, 2, 3], [[1, 2, [3, [4]]], 2, 3, 1]))); // =>[[1,2,3],[3,2,1]]
