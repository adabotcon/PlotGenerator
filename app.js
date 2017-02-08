var Wordnik_BASE_URL = 'http://api.wordnik.com:80/v4/words.json/randomWord';
var Uinames_BASE_URL = 'http://uinames.com/api/';

function getDropdownMenu(){
	var dropdownMenuItems = '<div>'
}

function getPlot(firstCharacterName, firstCharacterAdj1, firstCharacterAdj2, firstCharacterGender, secondCharacterName, secondCharacterAdj1, secondCharacterAdj2, secondCharacterGender, place, verb1, adj1, verb2, genre){
	var genderNounChar1 = "";
	var genderNounChar2 = "";
	var genderNounChar1Poss = "";
	var genderNounChar2Poss = "";
	var genderNounChar1HH = "";
	var genderNounChar2HH = "";

	if(firstCharacterGender==="female"){
		genderNounChar1 = "she";
		genderNounChar1Poss = "her";
		genderNounChar1HH = "her";
	} else if (firstCharacterGender==="male"){
		genderNounChar1 = "he";
		genderNounChar1Poss = "his";
		genderNounChar1HH = "him";
	}

	if(secondCharacterGender==="female"){
		genderNounChar2 = "she";
		genderNounChar2Poss = "her";
		genderNounChar2HH = "her";
	} else if (secondCharacterGender==="male"){
		genderNounChar2 = "he";
		genderNounChar2Poss = "his";
		genderNounChar2HH = "him";
	}

	var plotNum = Math.floor(Math.random() * 4);
	var plot = readTextFile(plotNum, genre);

}

function readTextFile(plotNum, genre){
	

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
	$('.js-region-trigger').on('click', function(event) {
		event.preventDefault();
		buildRegionsList(arrayRegions);
		$('.regions').fadeToggle();
	});
}

function buildRegionsList(arrayRegions){
	var regionsHTML = arrayRegions.map(region => `<li> ${region} </li>`);

	$('.regions ul').html(regionsHTML);
}

function getRandomName(){
	$('.js-button-name').on('click', function(event){
		event.preventDefault();
		var region = 
	})
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

var plot_array = [
	// {
	// 	ID: '1',
	// 	plot: `${firstCharacterName} is a ${firstCharacterAdj1}, ${firstCharacterAdj2} cop who is sick of being stuck on the same beat. ${genderNounChar1} should have been careful about what ${genderNounChar1} wished for because ${genderNounChar1}'s just met ${secondCharacterName}. And ${genderNounChar2} is a ${secondCharacterAdj1}, ${secondCharacterAdj2} secret agent who is caught up in a criminal underground in ${place}. Soon the two will have to ${verb1} in order to save ${place} If that wasn't bad enough some ${adj1} figure head is ${verb2} the strings.`,
	// 	genre: 'mystery'
	// }
	// {
	// 	ID: '4',
	// 	plot: `${firstCharacterName} is a ${firstCharacterAdj1}, ${firstCharacterAdj2} student who works as a ${job} after school. Unfortunately ${genderNounChar1} is doing so illegally and without the school's permission. One day ${genderNounChar1} is followed by ${secondCharacterName} a ${secondCharacterAdj1}, ${secondCharacterAdj2} student who is determined to ${verb1} ${genderNounChar2Poss} classmate. ${secondCharacterName} wants to be a ${job2} when they graduate but ${genderNounChar2} is unable to due to ${genderNounChar2Poss} parents who have an ${adj1} habit. They ${verb2} which costs the family all their earnings.
	// 		So when ${secondCharacterName} finds out about ${firstCharacterName} ${genderNounChar2} blackmails ${genderNounChar1HH}. Now both of them are hiding secrets from the school and have to work together to keep it that way. It would be easy if only the ${adj2} feelings between the two weren't changing into something more. Will they be able to get through school without being exposed or will they end up ${verb3}?`,
	// 	genre: 'romance'
	// }
	// {

	// }
]