var uid =0;
class Dep {
	constructor(arg) {
		console.log("I am  Dep");
		this.id=uid++;
		//用数组存储自己的订阅者.subs:subscribes
		this.subs= [];//这个数组里面放的是watcher的实例
		console.log(this.id);
	}
	addSub(sub){
		this.subs.push(sub)
		console.log("addSub:",sub,this.subs)
	}
	//添加依赖
	depend(){
		//Dep.target就是指向window.target
		if(Dep.target){
			console.log("depend:",Dep.target)
			this.addSub(Dep.target);
			
		}
	}
	//通知更新
	notify(){
		console.log("I am Dep.notify");
		//浅克隆一份;
		const subs =this.subs.slice();
		// console.log(subs);
		for(let i=0,l=subs.length;i<l;i++){
			subs[i].update();
			console.log("subs[i]",i,subs[i]);
		}
		
		console.log("result:",subs);
	}
}