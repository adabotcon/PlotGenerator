var Wordnik_BASE_URL = 'http://api.wordnik.com:80/v4/words.json/randomWord';
var Uinames_BASE_URL = 'http://uinames.com/api/';

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
	};

	$.getJSON(Wordnik_BASE_URL, query, callback);
}

function getDataFromUinames(gender, region, callback){
	var query = {
		region: region,
		gender: gender,
		amount: 1
	};

	$.getJSON(Uinames_BASE_URL, query, callback);
}

function displayWordnikData(data){
	console.log(data);
}

function displayUinamesData(data){
	console.log(data);
}

function startGenrePage(startElement){
	startElement.on('click', function(event){
		window.location = '/genrePage.html';
	});
}


$(function(){
	// var startElement = $('.js-start-button');

	// getDataFromWordnik('verb', displayWordnikData);
	// getDataFromUinames('male', 'United States', displayUinamesData);
})