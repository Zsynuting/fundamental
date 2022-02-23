function Parent() {
  console.log('parent ctor is called');
  this.parent = 'parent';
}
Parent.prototype.getParent = function () {
  return this.parent;
};
function Child() {
  console.log('child ctor is called');
  this.child = 'child';
  Parent.call(this);
}
function ProxyPrototype() {}
ProxyPrototype.prototype = Parent.prototype;
Child.prototype = new ProxyPrototype();
Child.prototype.getChild = function () {
  return this.child;
};
Child.prototype.constructor = Child;

const child = new Child();
console.log(child.getChild(), child.getParent());
