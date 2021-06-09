var uid = 0;
class Watcher {
	constructor(target, expression, callback) {
		console.log("I am  watcher");
		this.id = uid++;
		this.target = target;
		this.getter = parsePath(expression);
		this.callback = callback;
		this.value = this.get();
	}
	update() {
			console.log("I am Watcher update");
			this.run();
	}
	get(){
		console.log("I am Watcher get",this);
		//进入依赖收集阶段，让全局Dep.target 设置为Watcher本身，那么就是进入依赖收集阶段
		Dep.target =this;
		console.log("开始传递Dep.target")
		const obj =this.target;
		var value;
		try{
			value=this.getter(obj);
			console.log(value);
		}catch(e){
			console.log("can not find",obj,e)
		}finally{
			Dep.target=null;
		}
		return value;
	}
	run(){
		this.getAndInvoke(this.callback);
	}
	getAndInvoke(cb){
		console.log("getAndInvoke");
		const value = this.get();
		if(value !== this.value || typeof value == 'object')
		{
			const oldValue =this.value;
			this.value =value;
			console.log("this.callback",this.callback)
			// cb.callback(this.target,value,oldValue);
			 cb.call(this.target,value,oldValue);
		}
		console.log(value)
	}
}

function parsePath(str) {
	var segments = str.split('.');
	console.log(segments, segments.length);
	return (obj) => {
		for (let i = 0; i < segments.length; i++) {
			if (!obj) return;
			obj = obj[segments[i]]
			console.log("parsePath obj", obj);
		}
		return obj;
	};
}
