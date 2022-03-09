Promise.allZ = function (promises) {
  const result = new Array(promises.length);
  let rejected = false;
  let unresolvedCount = promises.length;
  return new Promise((resolve, reject) => {
    promises.forEach((p, index) => {
      p.then(
        (res) => {
          result[index] = res;
          unresolvedCount--;
          if (unresolvedCount === 0) {
            resolve(result);
          }
        },
        (err) => {
          if (!rejected) {
            rejected = true;
            reject(err);
          }
        },
      );
    });
  });
};

Promise.raceZ = function (promises) {
  let rejected = false;
  return new Promise((resolve, reject) => {
    promises.forEach((p) => {
      p.then(
        (res) => resolve(res),
        (err) => {
          if (!rejected) {
            rejected = true;
            reject(err);
          }
        },
      );
    });
  });
};

const delay = function (timeout, toResolve = true) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      toResolve ? resolve(timeout) : reject('error');
    }, timeout),
  );
};

Promise.allZ([delay(100), delay(300), delay(200), delay(400)]).then(
  console.log,
  console.error,
);
Promise.raceZ([delay(100, false), delay(300), delay(200), delay(400)]).then(
  console.log,
  console.error,
);
