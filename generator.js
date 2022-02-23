function* getYield() {
  yield 1;
  yield 2;
}

function* getNext() {
  yield 0;
  yield* getYield();
  yield 3;
}

function runYield() {
  for (const it of getNext()) {
    console.log(it);
  }
}

runYield();
