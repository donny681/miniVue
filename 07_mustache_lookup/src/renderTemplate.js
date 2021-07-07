import lookup from "./lookup.js";
/*
	 该函数功能是把toekns数组转变为dom字符串
*/
export default function renderTemplate(tokens,data){
	var resultStr = '';
	for(let i = 0; i < tokens.length ; i ++){
		let token = tokens[i];
		//看类型
		if(token[0]=='text'){
			resultStr += token[1];
		}else if(token[0]){
			resultStr +=lookup(data,token[1]);
		}
	}
	return resultStr;
}
