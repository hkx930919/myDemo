// 节流 是每隔一段时间就执行
function throttle(fn, time, immediate) {
	let timer = null
	let callNow = immediate
	return function () {
		const args = arguments
		const context = this
		if (callNow) {
			fn.apply(context, args)
			callNow = false
		}
		if (!timer) {
			timer = setTimeout(() => {
				fn.apply(context, args)
				timer = null
			}, time)
		}
	}
}
throttle()


// 防抖 多次调用只会执行一次
function debounce(fn, time, immediate) {
	let timer = null
	return function () {
		const args = arguments
		const context = this
		if (immediate && !timer) {
			fn.apply(context, args)
		}
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(() => {
			fn.apply(context, args)
			timer = null
		}, time)
	}
}
debounce()
