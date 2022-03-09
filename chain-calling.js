// 实现function Person(){}，使得支持如下调用:
// const p = new Person()
// p.sleep(2).work().sleep(3).eat().sleep(5).eat();
// 执行效果:3s后控制台输出work，再2秒后输出eat，再5秒后输出eat，注意不一定是以eat为结束

function Person() {
  const queue = [];
  let running = false;

  function flushQueue() {
    if (queue.length) {
      const pRunner = queue.shift();
      pRunner().then(() => flushQueue());
    } else {
      running = false;
      console.log('queue flushed');
    }
  }

  function scheduleWork(fn) {
    queue.push(fn);
    if (running) {
      return;
    } else {
      running = true;
      flushQueue();
    }
  }

  this.sleep = (delay) => {
    scheduleWork(
      () => new Promise((resolve) => setTimeout(resolve, delay * 1000)),
    );
    return this;
  };
  this.work = () => {
    scheduleWork(
      () =>
        new Promise((resolve) => {
          console.log('work');
          resolve();
        }),
    );
    return this;
  };
  this.eat = () => {
    scheduleWork(
      () =>
        new Promise((resolve) => {
          console.log('eat');
          resolve();
        }),
    );
    return this;
  };
}

const p = new Person();
p.sleep(2).work().sleep(3).eat().sleep(5).eat();
