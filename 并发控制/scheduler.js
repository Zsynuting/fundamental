class Scheduler {
  constructor(limit) {
    this.limit = limit;
    this.queue = [];
    this.running = 0;
  }

  async addTask(fn) {
    if (!(this.running < this.limit)) {
      console.log('wait', this.running);
      await new Promise((resolve) => {
        this.queue.push(resolve);
      });
    }
    this.running++;
    const result = await fn();
    this.running--;
    if (this.queue.length) {
      this.queue.shift()();
    }
    return result;
  }
}

const scheduler = new Scheduler(3);
const urls = [100, 800, 300, 200, 400, 500];
const request = (delay) =>
  new Promise((resolve) => setTimeout(() => resolve(delay), delay));
async function execute() {
  const result = [];
  await Promise.all(
    urls.map((url) =>
      scheduler
        .addTask(async () => await request(url))
        .then((res) => result.push(res)),
    ),
  );
  console.log('result', result);
}
execute();

module.exports = Scheduler;
