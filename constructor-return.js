function A() {
  this.x = 1;
}
function B() {
  return {
    x: 1,
  };
}

var a = new A();
var b = new B();
console.log(b);
