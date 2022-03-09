async function async1() {
  console.log('a1 start');
  await async2();
  await async3();
  console.log('a1 end');
}
async function async2() {
  console.log('a2');
}
async function async3() {
  console.log('a3');
}
console.log('begin');
setTimeout(function () {
  console.log('setTimeout');
}, 0);
async1();
new Promise(function (resolve) {
  console.log('p1');
  resolve();
}).then(function () {
  console.log('p2');
});
console.log('end');
