function machine() {

}
machine('ygy').execute();
// start ygy
machine('ygy').do('eat').execute();
// start ygy
// ygy eat
machine('ygy').wait(5).do('eat').execute();
// start ygy
// wait 5s（这里等待了5s）
// ygy eat
machine('ygy').waitFirst(5).do('eat').execute();
// wait 5s
// start ygy
// ygy eat


const syncItem = function (time, callback) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(callback());
    }, time * 1000 || 0);
  });
};

class QueueItem {
  constructor(callback, defer) {
    this.callback = callback;
    this.defer = defer || 0;
  }
}

class Action {
  constructor(name) {
    this.name = name;
    this.queue = [];
    this.queue.push(
      new QueueItem(() => {
        console.log(`start ${this.name}`);
      }),
    );
  }

  do(eat) {
    this.queue.push(
      new QueueItem(() => {
        console.log(`${this.name} ${eat}`);
      }),
    );
    return this;
  }

  wait(time) {
    this.queue.push(
      new QueueItem(() => {
        console.log(`wait ${time}s`);
      }, time),
    );
    return this;
  }

  waitFirst(time) {
    this.queue.unshift(
      new QueueItem(() => {
        console.log(`wait ${time}s`);
      }, time),
    );
    return this;
  }

  async execute() {
    // 执行函数
    while (this.queue.length) {
      const item = this.queue.shift();

      if (!item.defer) {
        item.callback();
        continue;
      }
      await syncItem(item.defer, item.callback);
    }
  }
}
function machine2(name) {
  return new Action(name);
}
// console.log('**************');
// machine2('ygy').execute();
// // start ygy

// console.log('**************');
// machine2('ygy')
//   .do('eat')
//   .execute();
// start ygy
// ygy eat
// console.log('**************');
// machine2('ygy')
//   .wait(5)
//   .do('eat')
//   .execute();
// start ygy
// wait 5s（这里等待了5s）
// ygy eat
console.log('**************');
machine2('ygy')
  .waitFirst(5)
  .do('eat')
  .execute();
