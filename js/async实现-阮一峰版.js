
// 剖析 将await改成yield,即每次都是gen.next(v        )

function spawn(genF) {
  return new Promise(((resolve, reject) => {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch (e) {
        return reject(e);
      }
      if (next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(
        (v) => {
          step(() => gen.next(v));
        },
        (e) => {
          step(() => gen.throw(e));
        },
      );
      return false;
    }
    step(() => gen.next(undefined));
  }));
}
function fn() {
  const f = function* () {

  };
  return spawn(f);
}
fn(1);
