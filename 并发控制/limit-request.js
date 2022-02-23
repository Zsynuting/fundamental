// 最高并发数为2
// 按顺序返回结果

const timeout = (delay) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(delay), delay);
  });
};
const urls = [100, 500, 300, 200];

function limitRequest() {
  const limit = 2;
  let index = 0;
  let running = 0;
  let executed = 0;
  const result = [];
  function request() {
    while (index < urls.length && running < limit) {
      const item = urls[index];
      index++;
      running++;
      timeout(item).then(() => {
        running--;
        executed++;
        result.push(item);
        if (executed === urls.length) {
          console.log(result);
        } else {
          request();
        }
      });
    }
  }
  request();
}

limitRequest();
