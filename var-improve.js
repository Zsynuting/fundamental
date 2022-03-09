// function a(a) {
//   function a() {}
//   // 抛异常
//   let a = function () {};
//   // 抛异常
//   const a = 1;
// }

// function a() {
//   // 抛异常
//   // var a = function () {};
//   // 抛异常
//   const a = 1;
//   function a() {}
// }

for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log('let', i);
  }, i);
}

for (var j = 0; j < 5; j++) {
  setTimeout(() => {
    console.log('var', j);
  }, j);
}
