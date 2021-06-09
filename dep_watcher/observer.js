// import { arrayMethods } from './array'
function def(obj,key,value,enumerable){
  Object.defineProperty(obj,key,{
	  value,
	  enumerable,
	  writable:true,
	  configurable:true
  })
}

class Observer{
	constructor(value) {
		
		def(value,'__ob__',this,false);
		this.dep=new Dep();
		if(Array.isArray(value)){
			value.__proto__ = arrayMethods;
			console.log('我是Observer constructor,调用__proto__',value);
			this.obserArray(value)
		}else{
			this.walk(value);
			console.log('我是Observer constructor,调用walk',value);
		}
		
	}
	walk(value){
		for(let k in value){
			defineReactive(value,k);
		}
	}
	obserArray(arr){
		for(let i=0,l =arr.length;i<l;i++)
		{
			observe(arr[i]);
		}
	}
	
}

function observe(value){
	console.log("准备调用observe",value)
	if(typeof value != 'object')
	 return;
	 console.log("调用observe啦",value)
	var ob;
	if(typeof value.__ob__ !== 'undefined'){
		ob = value.__ob__ ;
		
	}else{
		ob = new Observer(value)
	}
}

function defineReactive(obj, key, val) {
	
	console.log("我是defineReactive",key);
	const dep = new Dep();
	if (arguments.length == 2) {
		val = obj[key];
	}
	
	var childOb = observe(val);
	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: true,
		get() {
			console.log('%s 属性被读取了',key,val);
			//如果现在处于依赖收集阶段
			if(Dep.target){
				dep.depend();
				if(childOb){
					childOb.dep.depend();
				}
			}
			return val;
		},
		set(newVal) {
			console.log('%s 属性被写入了 %d:',key,newVal);
			if(val === newVal){
				return ;
			}
			val = newVal;
			childOb = observe(newVal);
			dep.notify();
		}
	})
};
