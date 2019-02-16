//1 高阶函数
//1.1 函数为参数,回调函数做参数 eg: 数组的一些方法,sort map foreach reduce...,ajax回调
//1.2 函数返回一个函数 eg:单例模式,闭包返回函数,AOP
//单例模式
var getSingle = function(fn){
	var single
	return function(){
		return single||(single = fn.apply(this,arguments))
	}
}
//判断类型
var Type  ={},types = ['String','Array','Number','Object']
for (let i = 0; i < types.length; i++) {
	const type = types[i];
	(function(type){
		Type['is'+type] = function(obj){
			const flag =  Object.prototype.toString.call(obj)=='[object '+type+']'
			console.log(flag)
            
			return flag
		}
	})(type)
}
Type.isArray(1)


//AOP切面编程
Function.prototype.before  =function(fn){
	const me = this
	return function(){
		fn.apply(this,arguments)
		return me.apply(this,arguments)
        
	}
}
Function.prototype.after  =function(fn){
	const me = this
	return function(){
		const  reslut= me.apply(this,arguments)
		fn.apply(this,arguments)
		return reslut
        
	}
}

//2 高阶函数的其他作用 
//函数柯里化,反柯里化,debounce,throttle,分时函数,惰性函数


//2.1 柯里化
var currying = function(fn){
	var ary = []
	var func =  function(){
		if(arguments.length==0){
			console.log(ary)
            
			fn.apply(this,ary)
		}else{
			[].push.apply(ary,arguments)
			return func
		}
	}
	return func
}
var cost = (function(){
	var money = 0
	return function(){
		for (let i = 0; i < arguments.length; i++) {
			const element = arguments[i]
			money+=element
            
		}
		console.log(money)
        
		return money
	}
})()
var cost2 = currying(cost)
cost2(100)
cost2(100)
cost2(100)
cost2(100)
cost2()

//2.2 uncurrying 将泛化this的过程提取出来
Function.prototype.uncurrying = function(){
	var me = this
	return function(){
		var obj = Array.prototype.shift.call(arguments)
		return me.apply(obj,arguments)
	}
}
const push = Array.prototype.push.uncurrying()
let obj2  ={
	b:1
}
push(obj2,3,4,5)
console.log(obj2)


//2.3 debounce和throttle详情见 2.16 节流和防抖.js
//debounce 是只执行一次
//节流是每隔一段时间执行一次


//2.4 分时函数
//有时候一次创建大量的东西会造成卡顿
// eg 会让浏览器吃不消,造成卡顿
var ary = []
for (let i = 0; i < 10000; i++) {
	ary.push(i)
}
var render = function(data){
	for (let i = 0; i < data.length; i++) {
		var div = document.createElement('div')
		div.innerHTML = i
		document.body.appendChild(div)
	}
}
render(ary)
//使用分时函数
const timeThunk = function(data,fn,count){
	var t
	var start = function(){
		for (let i = 0; i < Math.min(count||1,data.length); i++) {
			const obj = data.shift()
			fn(obj)
		}
	}
	return function(){
		
		t = setInterval(function(){
			if(data.length===0){
				return clearInterval(t)
			}
			start()
		},200)
	}
}

var ary2 = []
for (let i = 0; i < 10000; i++) {
	ary2.push(i)
}
timeThunk(ary2,function(i){
	var div = document.createElement('div')
	div.innerHTML = i
	document.body.appendChild(div)
},8)


//2.5 惰性函数
//不好的写法  每次调用函数都得做一次判断
var addEvent = function(ele,type,handle){
	if(window.addEventListener){
		return ele.addEventListener(type,handle)
	}
	if(window.attachEvent){
		return ele.attachEvent('on'+type,handle)
	}
}
//稍微好点的 匿名自执行 如果每一调用该函数,它自己也会执行,不太好
var addEvent2 = (function(){
	if(window.addEventListener){
		return function(ele,type,handle){
			return ele.addEventListener(type,handle)
		}
	}
	if(window.attachEvent){
		return function(ele,type,handle){
			return ele.attachEvent('on'+type,handle)
		}
	}
})()
//惰性加载函数 当调用函数时,重写函数.第一次调用的时候,重写完毕后自身调用一次
var addEvent3 = function(ele,type,handle){
	if(window.addEventListener){
		addEvent3 = function(ele,type,handle){
			return ele.addEventListener(type,handle)
		}
	}
	if(window.attachEvent){
		addEvent3 = function(ele,type,handle){
			return ele.attachEvent('on'+type,handle)
		}
	}
	addEvent3(ele,type,handle)
}