const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto)
const methodToPatch = [
	'push', //添加一個或多個元素至陣列的末端，並且回傳陣列的新長度
	'pop', //从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。
	'shift', //方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。
	'unshift', //方法将一个或多个元素添加到数组的开头，并返回该数组的新长度(该方法修改原有数组)
	'splice', //通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。
	'sort', //用原地算法对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的
	'reverse' //将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组。
]
methodToPatch.forEach(function(method) {
	console.log('forEach:', method);
	const original = arrayProto[method];

	// console.log('this',this);
	Object.defineProperty(arrayMethods, method, {
		enumerable: false,
		configurable: true,
		writable: true,
		value: function mutor(...args) {
			// console.log("this:", this);
			//插入的时候添加ob属性。
			console.log("...args",...args);
			// console.log("typedef ...args",typeof (...args));
			const ob = this.__ob__;
			console.log("ob",ob);
			let inserted = [];
			switch(method){
				case "push":
				case "unshift":
				 inserted =args;
				 break;
				case "splice":
				 inserted =args.slice(2);//取splice第二个参数
				 console.log("args:",args)
				 console.log("inserted:",inserted)
				 break;
			}
			if(inserted){
				ob.obserArray(inserted);
			}
			const result = original.apply(this, args);
			console.log("method")
			
			// this.__proto__.arrayProto[method](args);
			return result;
		}
	})
})
