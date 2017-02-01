var Wordnik_BASE_URL = 'http://api.wordnik.com:80/v4/words.json/randomWord';
var Uinames_BASE_URL = 'http://uinames.com/api/';

function getDropdownMenu(){
	var dropdownMenuItems = '<div>'
}

function getPlot(firstCharacterName, firstCharacterAdj1, firstCharacterAdj2, firstCharacterGender, secondCharacterName, secondCharacterAdj1, secondCharacterAdj2, secondCharacterGender, place, verb1, adj1, verb2){
	var genderNounChar1 = "";
	var genderNounChar2 = "";

	if(firstCharacterGender==="female"){
		genderNounChar1 = "she";
	} else {
		genderNounChar1 = "he";
	}

	if(secondCharacterGender==="female"){
		genderNounChar2 = "she";
	} else {
		genderNounChar2 = "he";
	}

	var plot = `This an example of a plot. ${firstCharacterName} is a ${firstCharacterAdj1}, ${firstCharacterAdj2} cop who is sick of being stuck on the same beat. ${genderNounChar1} should have been careful about what ${genderNounChar1} wished for because ${genderNounChar1}'s just met ${secondCharacterName}. And ${genderNounChar2} is a ${secondCharacterAdj1}, ${secondCharacterAdj2} secret agent who is caught up in a criminal underground in ${place}. Soon the two will have to ${verb1} in order to save ${place} If that wasn't bad enough some ${adj1} figure head is ${verb2} the strings.`;
}

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

function getDataFromUinames(gender, region, callback) {
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

function regionListener(arrayRegions){
	console.log("Listener called");
	$('.js-region-trigger').on('click', function(event) {
		console.log("Trigger called");
		event.preventDefault();
		buildRegionsList(arrayRegions);
		$('.regions').fadeToggle();
	});
}

function buildRegionsList(arrayRegions){
	var regionsHTML = arrayRegions.map(region => `<li> ${region} </li>`);

	$('.regions ul').html(regionsHTML);
}


$(function(){
	$('.regions').hide();
	regionListener(arrayRegions);
	// var startElement = $('.js-start-button');

	// getDataFromWordnik('verb', displayWordnikData);
	// getDataFromUinames('male', 'United States', displayUinamesData);
})


var arrayRegions = ["Albania",
"Argentina",
"Armenia",
"Australia",
"Austria",
"Azerbaijan",
"Bangladesh",
"Belgium",
"Bosnia and Herzegovina",
"Brazil",
"Canada",
"China",
"Colombia",
"Denmark",
"Egypt",
"England",
"Estonia",
"Finland",
"France",
"Georgia",
"Germany",
"Greece",
"Hungary",
"India",
"Iran",
"Israel",
"Italy",
"Japan",
"Korea",
"Mexico",
"Morocco",
"Netherlands",
"New Zealand",
"Nigeria",
"Norway",
"Pakistan",
"Poland",
"Portugal",
"Romania",
"Russia",
"Slovakia",
"Slovenia",
"Spain",
"Sweden",
"Switzerland",
"Turkey",
"Ukraine",
"United States",
"Vietnam"];