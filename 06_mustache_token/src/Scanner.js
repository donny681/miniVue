export default class Scanner{
	constructor(templateStr) {
		console.log(templateStr);
	    this.templateStr = templateStr;//将模板字符串写道实例身上
		this.pos = 0;//当前位置
		this.tail = templateStr;
	}
	scan(tag){
		if(this.tail.indexOf(tag)==0){//第一位就是0
			this.pos += tag.length;
			this.tail = this.templateStr.substring(this.pos);
		}
		
	}
	scanUtil(stopTag){
		// console.log("scanUtil",stopTag);
		const pos_backup = this.pos;
		//当尾巴开头不是stopTag时候，说明没有扫描到到stopTag
		//写eos很必要，因为防止找不到，最后也要停止下来
		while(this.tail.indexOf(stopTag)!=0 && !this.eos()){
			this.pos++;
			//把尾巴改为当前扫描剩余字符串
			this.tail = this.templateStr.substring(this.pos);
			// console.log(this.tail);
		}
		return this.templateStr.substring(pos_backup,this.pos);
	}
	eos(){
		return this.pos >= this.templateStr.length;
	}
}

