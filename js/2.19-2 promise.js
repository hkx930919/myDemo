// 1 promise类有三种状态,pending,resolved,rejected,内部有个值value来记录resolve的值
// 2 实例化的时候传递一个函数进去,在实例化过程中调用该函数.调用时传递两个参数,this.resolve,this.reject
// 2.1 this.resolve函数被调用时,会传递一个value进来.如果value为promise,那么返回一个value.then(this.resolve,this.reject),当这个promise改变状态时,就会调用this.resolve或者reject.此时本身的promise也会修改状态,掉用自己的then方法;
// 掉用resolve和reject都会修改此promise的value和state
// 3 then方法有两个回调函数参数,并且返回一个promise.
// 3.1 在then方法中,判断promise的state,如果不是pending,那么就在返回的promise中调用onResolved或onRejected方法,并且将本身的promise的value当做参数.最后调用resolutionProcedure(promise2,x,resolve,reject)
// 3.2 如果state是pending,那么在返回的promise中给resolvedCallbacks,rejectedCallbacks推入一个函数.在该函数中调用onResolved或onRejected方法
// 4 resolutionProcedure函数
// 4.1 有四个参数:promise2(then方法返回的promise),x(onResolved或onRejected的返回值),resolve(新promise的fn中的两个函数参数,即promise的this._resolve),reject(新promise的fn中的两个函数参数,即promise的this._reject)
// 4.2 函数作用:使用传递进来的resolve和reject来修改新promise的状态和值
// 4.3 判断x的返回值:
// 4.3.1 如果x与promise2相等,那么reject一个错误
// 4.3.2 如果x是一个promise
// 4.3.2.1 如果promise的状态是pending,那么调用promise.then方法,再then的回调中调用resolutionProcedure(promise2, value, resolve, reject);当promise状态不为pending时,继续判断value与promise2的值,然后借助resolve,reject函数修改promise2的状态
// 4.3.2.2 如果x为promise且状态不是pending,那么调用promise.then,将resolutionProcedure的resolve和reject传进去修改promise2的state和value
// 4.3.3 如果x是个对象,且有then方法.那么调用then.call(promsie2,(res)=>resolve(res),e=>reject(e)),为防止调用then第一个回调的res的值为promise,修改为then.call(promsie2,(res)=>resolutionProcedure(promise2, res, resolve, reject);,e=>reject(e))
// 4.3.3.1 如果then不是函数,那么resolve(x)修改promise2
// 4.3.4 如果x是个普通值,那么就resolve(x) 修改promise2


// promise 的实现
// 三种状态
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';
// promise 接收一个函数参数，该函数会立即执行
function MyPromise(fn) {
  const _this = this;
  _this.currentState = PENDING;
  _this.value = undefined;
  // 用于保存 then 中的回调，只有当 promise
  // 状态为 pending 时才会缓存，并且每个实例至多缓存一个
  _this.resolvedCallbacks = [];
  _this.rejectedCallbacks = [];

  _this.resolve = function (value) {
    if (value instanceof MyPromise) {
      // 如果 value 是个 Promise，递归执行
      return value.then(_this.resolve, _this.reject);
    }
    setTimeout(() => { // 异步执行，保证执行顺序
      if (_this.currentState === PENDING) {
        _this.currentState = RESOLVED;
        _this.value = value;
        _this.resolvedCallbacks.forEach(cb => cb());
      }
    });
  };

  _this.reject = function (reason) {
    setTimeout(() => { // 异步执行，保证执行顺序
      if (_this.currentState === PENDING) {
        _this.currentState = REJECTED;
        _this.value = reason;
        _this.rejectedCallbacks.forEach(cb => cb());
      }
    });
  };
  // 用于解决以下问题
  // new Promise(() => throw Error('error))
  try {
    fn(_this.resolve, _this.reject);
  } catch (e) {
    _this.reject(e);
  }
}

MyPromise.prototype.then = function (onResolved, onRejected) {
  const self = this;
  // 规范 2.2.7，then 必须返回一个新的 promise
  let promise2;
  // 规范 2.2.onResolved 和 onRejected 都为可选参数
  // 如果类型不是函数需要忽略，同时也实现了透传
  // Promise.resolve(4).then().then((value) => console.log(value))
  onResolved = typeof onResolved === 'function' ? onResolved : v => v;
  onRejected = typeof onRejected === 'function' ? onRejected : (r) => { throw r; };

  if (self.currentState === RESOLVED) {
    return (promise2 = new MyPromise(((resolve, reject) => {
      // 规范 2.2.4，保证 onFulfilled，onRjected 异步执行
      // 所以用了 setTimeout 包裹下
      setTimeout(() => {
        try {
          const x = onResolved(self.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      });
    })));
  }

  if (self.currentState === REJECTED) {
    return (promise2 = new MyPromise(((resolve, reject) => {
      setTimeout(() => {
        // 异步执行onRejected
        try {
          const x = onRejected(self.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      });
    })));
  }

  if (self.currentState === PENDING) {
    return (promise2 = new MyPromise(((resolve, reject) => {
      self.resolvedCallbacks.push(() => {
        // 考虑到可能会有报错，所以使用 try/catch 包裹
        try {
          const x = onResolved(self.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (r) {
          reject(r);
        }
      });

      self.rejectedCallbacks.push(() => {
        try {
          const x = onRejected(self.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (r) {
          reject(r);
        }
      });
    })));
  }
};
// /*
// 规范 2.3
function resolutionProcedure(promise2, x, resolve, reject) {
  // 规范 2.3.1，x 不能和 promise2 相同，避免循环引用
  if (promise2 === x) {
    return reject(new TypeError('Error'));
  }
  // 规范 2.3.2
  // 如果 x 为 Promise，状态为 pending 需要继续等待否则执行
  if (x instanceof MyPromise) {
    if (x.currentState === PENDING) {
      x.then((value) => {
        // 再次调用该函数是为了确认 x resolve 的
        // 参数是什么类型，如果是基本类型就再次 resolve
        // 把值传给下个 then
        resolutionProcedure(promise2, value, resolve, reject);
      }, reject);
    } else {
      x.then(resolve, reject);
    }
    return;
  }
  // 规范 2.3.3.3.3
  // reject 或者 resolve 其中一个执行过得话，忽略其他的
  let called = false;
  // 规范 2.3.3，判断 x 是否为对象或者函数
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    // 规范 2.3.3.2，如果不能取出 then，就 reject
    try {
      // 规范 2.3.3.1
      const { then } = x;
      // 如果 then 是函数，调用 x.then
      if (typeof then === 'function') {
        // 规范 2.3.3.3
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            // 规范 2.3.3.3.1
            resolutionProcedure(promise2, y, resolve, reject);
          },
          (e) => {
            if (called) return;
            called = true;
            reject(e);
          },
        );
      } else {
        // 规范 2.3.3.4
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // 规范 2.3.4，x 为基本类型
    resolve(x);
  }
}
// */

class MyPromise2 {
  constructor(fn) {
    if (typeof fn != 'function') {
      return;
    }
    this._value = undefined;
    this._state = PENDING;
    this.resolvedCallbacks = [];// 当状态为pending存入的回调
    this.rejectedCallbacks = [];// 当状态为pending存入的回调
    try {
      fn(this._resolve, this._reject);
    } catch (error) {
      this._reject(error);
    }
  }

  // resolve方法
  _resolve(value) {
    if (value instanceof MyPromise2) {
      return value.then(this._resolve, this._reject);
    }
    setTimeout(() => {
      if (this._state == PENDING) {
        this._value = value;
        this._state = RESOLVED;
        this.resolvedCallbacks.forEach(v => v());
      }
    });
  }

  // reject方法
  _reject(value) {
    setTimeout(() => {
      if (this._state == PENDING) {
        this._value = value;
        this._state = REJECTED;
        this.rejectedCallbacks.forEach(v => v());
      }
    });
  }

  then(onResolved, onRejected) {
    const me = this;
    onResolved = typeof onResolved == 'function' ? onResolved : v => v;
    onRejected = typeof onRejected == 'function' ? onRejected : (err) => { throw err; };
    let x; let promise2;
    // 判断promise的状态
    switch (me._state) {
      // resolve状态
      case RESOLVED:
        return (promise2 = new MyPromise2((resolve, reject) => {
          setTimeout(() => {
            try {
              x = onResolved(me._value);
              resolutionProcedure(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        }));
      // reject 状态
      case REJECTED:
        return (promise2 = new MyPromise2((resolve, reject) => {
          setTimeout(() => {
            try {
              x = onRejected(me._value);
              resolutionProcedure(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        }));
      case PENDING:
        return (promise2 = new MyPromise2((resolve, reject) => {
          me.resolvedCallbacks.push(() => {
            try {
              const x = onResolved(me.value);
              resolutionProcedure(promise2, x, resolve, reject);
            } catch (r) {
              reject(r);
            }
          });
          me.rejectedCallbacks.push(() => {
            try {
              const x = onRejected(me.value);
              resolutionProcedure(promise2, x, resolve, reject);
            } catch (r) {
              reject(r);
            }
          });
        }));

      default:
        break;
    }
  }
}

function resolutionProcedure(promise2, x, resolve, reject) {
  // promise2 为新返回的promise
  // x是then方法中调用resolve返回的值
  if (x === promise2) {
    return reject(new TypeError('error'));
  }
  if (x instanceof MyPromise2) {
    if (x._state == PENDING) {
      x.then((value) => {
        resolutionProcedure(promise2, value, resolve, reject);
      }, (reject) => {

      });
    } else {
      x.then(resolve, reject);
    }
  }
  let called = false;
  if (x !== null && (typeof x == 'function' || typeof x == 'object')) {
    try {
      const { then } = x;
      if (typeof then == 'function') {
        then.call(promise2, (v) => {
          if (called) { return; }
          called = true;
          resolve(v);
        }, (err) => {
          if (called) { return; }
          called = true;
          reject(err);
        });
      } else {
        if (called) { return; }
        called = true;
        resolve(x);
      }
    } catch (error) {
      if (called) { return; }
      called = true;
      reject(error);
    }
  } else {
    if (called) { return; }
    called = true;
    resolve(x);
  }
}
