var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };
console.log(a);
console.log(a.x);
console.log(b);
console.log(b.x);
