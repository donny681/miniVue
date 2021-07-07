/* 
    功能是可以在dataObj对象中，寻找用连续点符号的keyName属性
    比如，dataObj是
    {
        a: {
            b: {
                c: 100
            }
        }
    }
    那么lookup(dataObj, 'a.b.c')结果就是100
    不忽悠大家，这个函数是某个大厂的面试题
*/

export default function lookup(dataObj,keyName){
	//先查看有没有"."符号，但是不能是"."本身
	if(keyName.indexOf(".")!=-1 && keyName!='.'){
		//根据"."拆分字符串
		var keys = keyName.split(".");
		//设置一个局部变量，一层层找下去
		var temp =dataObj;
		//没找一层，并且保存局部变量。
		for(let i = 0; i <keys.length ; i++){
			temp = temp[keys[i]];
		}
		return temp;
	}
	return dataObj[keyName];
}