/*
 函数的功能是折叠token，将#和/之间的token能够整合起来，作为下表为3的项
*/
export default function nestTokens(tokens) {
	console.log("nestTokens parm",tokens);
	//结果数组
	var nestedTokens = [];
	//栈结构，存放小的tokens,栈顶(靠近端口的，最新进入的)tokens数组中当前操作的这个tokens小数组.
	var sections = [];
	//收集器，指向nestedTokens结果数组，引用类型值，指向是一个数组。
	//收集器的指向变化，当遇见#的时候，收集器会指向这个token下表为2的数组。
	var collector = nestedTokens;
	var counter =0;
	for (let i = 0; i < tokens.length; i++) {
		var token = tokens[i];
		// console.log("%d loop",i,token)
		switch (token[0]) {
			case '#':
				//收集器放入这个tokens
				collector.push(token);
				// console.log("%d,# collector.push",i,collector);
				//入栈
				sections.push(token); 
				collector = token[2] = [];
				break;
			case '/':
				
				sections.pop();
				// console.log("%d,/ sections.pop",i,sections);
				collector = sections.length > 0 ? sections[sections.length - 1][2] : nestedTokens;
				break;
			default:
				collector.push(token);
				// console.log("%d,default collector.push",i,token);
				// console.log("%d,default collector",i,collector);
				break;
		}
	}
	console.log(nestedTokens);
	return nestedTokens;
}
