const middleware = [
  async (ctx, next) => {
    console.log(1);
    await next();
  },
  async (ctx, next) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        console.log(2);
      }, 1000);
    });
    await next();
  },
  async (ctx, next) => {
    console.log(3);
    await next();
  },
  async (ctx, next) => {
    console.log(4);
    await next();
  },
  async (ctx, next) => {
    console.log(5);
    await next();
  },
];

const handleMiddleware = (ctx, next) => {
  function dispatch(i) {
    const fn = i === middleware.length ? next : middleware[i];
    if (fn) return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
    else return Promise.resolve();
  }
  return dispatch(0);
};

handleMiddleware(null, () => console.log('end')).then(() =>
  console.log('final'),
);
