class EventEmitter {
  constructor() {
    this._events = {}
  }

  on(event, fn, context = this) {
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this.on(event[i], fn)
      }
    } else {
      ;(this._events[event] || (this._events[event] = [])).push({ fn, context })
    }
  }

  emit(event, ...args) {
    const cbs = this._events[event]
    if (cbs) {
      for (let i = 0, l = cbs.length; i < l; i++) {
        const { fn, context } = cbs[i]
        fn.apply(context, args)
      }
    }
    return this
  }

  once(event, fn, context = this) {
    function on(...args) {
      this.off(event, on)
      fn.apply(context, args)
    }
    on.fn = fn
    this.on(event, on)
  }

  off(...args) {
    if (!args.length) {
      this._events = Object.create(null)
      return this
    }
    const event = args[0]
    const fn = args[1]
    // array of events
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this.off(event[i], fn)
      }
      return this
    }
    // specific event
    const cbs = this._events[event]
    if (!cbs) {
      return this
    }
    if (!fn) {
      this._events[event] = null
      return this
    }
    // specific handler
    let cb
    let i = cbs.length
    while (i--) {
      cb = cbs[i]
      if (cb.fn === fn) {
        cbs.splice(i, 1)
        break
      }
    }
    return this
  }
}
export default EventEmitter
