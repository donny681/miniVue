import Scanner from './Scanner.js'
import nestTokens from './nestToToken.js'
export default function parseTemplateToTokens(temperplateStr) {
	var tokens = [];
	var scanner = new Scanner(temperplateStr);
	var word;
	while (!scanner.eos()) {
		word = scanner.scanUtil("{{");
		// console.log("word:",word);
		if (word[0] == '#') {
			tokens.push(["#", word.substring(1)]);
		} else if (word[0] == '/') {
			tokens.push(["/", word.substring(1)]);
		} else {
			tokens.push(["text", word]);
		}

		scanner.scan("{{");
		word = scanner.scanUtil("}}");
		if (word != '') {
			if (word[0] == '#') {
				tokens.push(["#", word.substring(1)]);
			} else if (word[0] == '/') {
				tokens.push(["/", word.substring(1)]);
			} else {
				tokens.push(["name", word]);
			}
			// tokens.push(["name",word]);
			// console.log("word:",word);
			word = scanner.scanUtil("}}");
			// console.log("word:",word);
			scanner.scan("}}");
			// console.log("word:",word);	
		}

	}
	// console.log(tokens);
	// return tokens;
	return nestTokens(tokens);
}
