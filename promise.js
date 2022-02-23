const FULFILLED = 'fulfilled';
const PENDING = 'pending';
const REJECTED = 'rejected';

const resolveValue = function (value, resolve, reject) {
  if (value instanceof Error) {
    reject(value);
  } else if (value instanceof MyPromise) {
    value.then(resolve, reject);
  } else {
    resolve(value);
  }
};

class MyPromise {
  status = PENDING;
  value = null;
  reason = null;
  fulfilledCallbackList = [];
  rejectedCallbackList = [];

  constructor(executor) {
    this.resolveHandler = this.resolveHandler.bind(this);
    this.rejectHandler = this.rejectHandler.bind(this);
    executor(this.resolveHandler, this.rejectHandler);
  }

  resolveHandler(res) {
    this.value = res;
    this.status = FULFILLED;
    if (this.fulfilledCallbackList.length) {
      const handler = this.fulfilledCallbackList.shift();
      handler(this.value);
    }
  }
  rejectHandler(reason) {
    this.reason = reason;
    this.status = REJECTED;
    if (this.rejectedCallbackList.length) {
      const handler = this.rejectedCallbackList.shift();
      handler(this.reason);
    }
  }

  then(onResolve, onReject) {
    return new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        onResolve(this.value);
        return;
      } else if (this.status === REJECTED) {
        onReject(this.reason);
        return;
      } else {
        this.fulfilledCallbackList.push(() =>
          queueMicrotask(() => {
            resolveValue(onResolve(this.value), resolve, reject);
          }),
        );
        this.rejectedCallbackList.push(() =>
          queueMicrotask(() => {
            resolveValue(onReject(this.reason), resolve, reject);
          }),
        );
      }
    });
  }
}

new MyPromise((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    console.log(2);
    reject(2);
  }, 1000);
})
  .then(
    (res) => {
      console.log('then resolved', res);
      return new Error('reject');
    },
    (res) => {
      console.log('then rejected', res);
      return res;
    },
  )
  .then(
    () => console.log('resolved'),
    () => console.log('rejected'),
  );
