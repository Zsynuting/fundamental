function OnlyAllowNew() {
  if (this.__proto__.constructor !== OnlyAllowNew || Object.keys(this).length)
    throw new Error();
  console.log('new');
}
OnlyAllowNew.call = () => {};
OnlyAllowNew.bind = () => {};
OnlyAllowNew.prototype.x = 2;
OnlyAllowNew.prototype.y = 2;
// OnlyAllowNew.call(new OnlyAllowNew());

// OnlyAllowNew();
// OnlyAllowNew.bind(Object.create(null))();
// new OnlyAllowNew();
function ProxyPrototype() {}
ProxyPrototype.prototype = OnlyAllowNew.prototype;
const o = new ProxyPrototype();
o.proxyF = function () {
  delete o.proxyF;
  OnlyAllowNew();
};
o.proxyF();
