var Wordnik_BASE_URL = 'http://api.wordnik.com:80/v4/words.json/randomWord';
var Uiname_BASE_URL = '';

function getDataFromWordnik(wordType, callback){
	var query = {
		hasDictionaryDef: false,
		includePartOfSpeech: wordType,
		minCorpusCount: 0,
		maxCorpusCount: -1,
		minDictionaryCount: 1,
		maxDictionaryCount: -1,
		minLength: 4,
		maxLength: -1,
		api_key: '3c1825dd8857abc17e0060ff479098d6269c21519abe76465'
	}

	$.getJSON(Wordnik_BASE_URL, query, callback);
}

function getDataFromUiname(gender, region, callback){

}

function displayWordnikData(data){
	console.log(data);
}


$(function(){
	getDataFromWordnik('verb', displayWordnikData);
	console.log('Hello World');
})