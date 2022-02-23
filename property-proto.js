function A() {}
A.prototype.x = 10;

function B(x) {
  this.x = x;
}
B.prototype = new A();

const a = new A();
a.x = 20;
console.log(a.x);
delete a.x;
console.log(a.x);
delete a.x;
console.log(a.x);

const b = new B(30);
console.log(b.x);
delete b.x;
console.log(b.x);
