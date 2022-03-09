Promise.resolve(1)
  .then((res) => {
    console.log(`res: ${res} in then`);
    throw new Error('error in then');
  })
  .catch((err) => {
    console.log(err);
    console.log('err after then');
    throw new Error('error in catch');
  })
  .finally((res) => {
    console.log('finally');
    throw new Error('error in finally');
  })
  .then(
    () => console.log('resolve after finally'),
    (err) => {
      console.log(err);
      console.log('reject after finally');
    },
  )
  .catch((err) => {
    console.log('error after finally');
  });

// finally resolve -> reject
Promise.resolve(1)
  .finally((res) => {
    console.log(`res: ${res}`);
    throw new Error('error in finally');
  })
  .catch((err) => {
    console.log(err);
  });

// catch 改变决议
new Promise((resolve) => {
  throw new Error('error');
  resolve(1);
}).catch(console.log);
