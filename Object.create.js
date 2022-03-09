// Object.create 创造以参数为原型的空对象
/**
 * MDN:
 * The Object.create() method creates a new object,
 *  using an existing object as the prototype of the newly created object.
 */

Object.createZ = function (target) {
  function f() {}
  f.prototype = target;
  return new f();
};
