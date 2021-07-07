
import parseTemplateToTokens from './parseTemplateToTokens.js'
//提供window全局方法
window.TemplateEngine = {
	render(templateStr,data){
		var tokens = parseTemplateToTokens(templateStr);
		// console.log(tokens);
		
	}
}