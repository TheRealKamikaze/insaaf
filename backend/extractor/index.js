// THIS PAGE HANGLES NATURAL AND ALL SUCH NLP RELATED ISSUES
// 
// REQUIRES :- database for case handling,jsonfication,etc

const natural = require("natural");
const sw = require("stopword");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const pos = require('pos');

let commonStopwords = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
commonStopwords.push("smt", "SMT", "shri", "SHRI", "Shri","Md", "Smt","viz","Mohd");

const extractIPCSections = (tokens) => {
	let ipc = [];
	const searchParams = ["section", [
		["indian", "penal", "code"], "ipc"
	]];
	let flag = false;
	for (let i = 0; i < tokens.length; i++) {}
	let iterator = 0,
		tempIterator = 0,
		searchIterator = 0;
	for (let t of tokens) {
		if (natural.PorterStemmer.stem(t.toLowerCase()) === searchParams[searchIterator] && !flag) {
			flag = true;
			tempIterator = iterator;
			searchIterator++;
			// console.log(flag);
		} else if (flag && parseInt(t).toString() !== "NaN") {
			ipc.push(parseInt(t));
			tempIterator++;
		} else if (flag) {
			if (iterator - tempIterator > 1) {
				flag = false;
			} else {
				break;
			}
		}
		iterator++;
	}
	return ipc;
}

const extractCaseNo = (tokens) => {
	let caseNo;
	let Year;
	let searchParams = ['case', 'no'];
	let flag = true;
	for (let i = 0; i < tokens.length && flag; i++) {
		if (flag && tokens[i].toLowerCase() === searchParams[0] && tokens[i + 1].toLowerCase() === searchParams[1]) {
			//console.log(tokens[i]);
			flag = false;
			caseNo = tokens[i + 2];
			Year = tokens[i + 3];
		}
	}
	// console.log(caseNo, Year);
	return caseNo + "/" + Year;
}



const extractVictim = (tokens) => {
	let victim;
	let searchParams = ['deceased','murdered','murder','assaulted','death','victim'];
  	let search1Key = ['POINTS','POINT'];
  	let search2Key = ['FINDINGS','REASONS','REASON','FINDING'];
  	flag=true;
  	for(let i=0; i<tokens.length && flag; i++){
    		if(search1Key.includes(tokens[i].toUpperCase()) && search2Key.includes(tokens[i+1].toUpperCase())){
      			while(tokens[i]!='REASONS' && flag){
        			i++;
        			if(searchParams.includes(tokens[i].toLowerCase())){
          				const words = new pos.Lexer().lex(tokens[i+1]);
			   	 	const tagger = new pos.Tagger();
			    		const taggedWords = tagger.tag(words);
					word=taggedWords[0][0];
					tag=taggedWords[0][1];
					if((tag=='NN' || tag=='NNP') && !searchParams.includes(word.toLowerCase())) {
            					flag = !flag;
						victim = word;
					}
				}
      			}
    		}
  	}
  return victim;
}


const extractAccused = (text) => {
	let accused = [];
	const vsRegEx = /(v|V)(((\.|\/)?(s|S)\.?)|(ers(u|e)s.?))/;
	const aRegEx = /(a|A)ccused/;
	let i = text.search(vsRegEx);
	let j = text.search(aRegEx);
	// console.log(text);
	let tokens = text.slice(i, j).replace(" ", "").split("\n").slice(1);
	let aInt = 0;
	if (tokens[0][0] == (aInt + 1)) {
		for (i = 0; i < tokens.length; i++) {
			// console.log("!", tokens[i][0] == (aInt + 1));
			if (tokens[i][0] == (aInt + 1)) {
				aInt++;
				// console.log(tokens[i]);
				let temp = tokens[i].replace(/(\d| |\.|]|\))*/, "");
				// console.log("##", temp);
				accused.push(temp);
			}
		}
	} else {
		accused.push(tokens[0]);
	}
	return accused;
}

/**
 * 
 * @param {String} casePathAndName 
 */
const preprocessor = async (casePathAndName) => {
	try {
		let dotSeperated = casePathAndName.split(".");
		if (dotSeperated[dotSeperated.length - 1] === "pdf") {
			// convert pdf to txt document.
			console.log(casePathAndName);
			const casePdf = fs.readFileSync(casePathAndName);
			// console.log(casePdf);
			const caseObj = await pdfParse(casePdf);
			fs.unlinkSync(casePathAndName);
			casePathAndName = dotSeperated.slice(0, dotSeperated.length - 1).join(".") + ".txt";

			fs.writeFileSync(casePathAndName, caseObj.text);
			return caseObj.text;
		} else if (dotSeperated[dotSeperated.length - 1] === "txt") {
			return fs.readFileSync(casePathAndName).toString();
		} else {
			throw new Error("Invalid file extnsion " + dotSeperated[dotSeperated.length - 1] + "The file extension should be pdf or txt.")
		}
	} catch (exception) {
		console.error(">>>", exception);
		throw exception;
	}

};

const gistInJSON = async (casePathAndName) => {
	try {
		let textResponse = await preprocessor(casePathAndName);
		const tokenizer = new natural.WordTokenizer();
		let tokens = tokenizer.tokenize(textResponse);
		// console.log(tokens.slice(0, 200));

		tokens = sw.removeStopwords(sw.removeStopwords(tokens), commonStopwords);
		// console.log(tokens);
		return {
			penalCodes: extractIPCSections(tokens.slice(0, 500)),
			caseNumber: extractCaseNo(tokens.slice(0, 200)),
			prosecution: "the state",
			victim: extractVictim(tokens),
			accused: extractAccused(textResponse),
		};
	} catch (exception) {
		// console.log(exception);
		throw exception;
	}

};

/**
 * 
 * @param {String} casePathAndName 
 */
const extractor = async (casePathAndName) => {
	try {
		return await gistInJSON(casePathAndName);
	} catch (exception) {
		throw exception;
	}

}

module.exports = extractor;
