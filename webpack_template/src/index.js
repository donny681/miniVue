import Scanner from './Scanner.js'
//提供window全局方法
window.TemplateEngine = {
	render(templateStr,data){
		var scanner = new Scanner(templateStr);
		var word ;
		while(scanner.pos!=scanner.templateStr.length)
		// while(counter --)
		{
			word = scanner.scanUtil("{{");
			console.log("word:",word);
			scanner.scan("{{");
			// console.log("word:",word);
			word = scanner.scanUtil("}}");
			console.log("word:",word);
			scanner.scan("}}");
			// console.log("word:",word);
			
			
		}
		
	}
}