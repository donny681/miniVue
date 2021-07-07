import lookup from './lookup.js'
import parseTemplateToTokens from './parseTemplateToTokens.js'
import renderTemplate from './renderTemplate.js'
//提供window全局方法
window.TemplateEngine = {
	render(templateStr,data){
		console.log(data);
		var tokens = parseTemplateToTokens(templateStr);
		console.log("tokens",tokens);
		console.log(data);
		var domstr = renderTemplate(tokens,data);
		console.log(domstr);
		// console.log(tokens);
		// var test={
		// 	a:{
		// 		b:{
		// 			c:100
		// 		}
		// 	}
		// };
		// var result = lookup(test,"a.b.c");
		// console.log("result",result)
	}
}