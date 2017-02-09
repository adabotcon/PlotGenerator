var Wordnik_BASE_URL = 'http://api.wordnik.com:80/v4/words.json/randomWord';
var Uinames_BASE_URL = 'http://uinames.com/api/';

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
	if(genre==="romance"){

	}
	var plotNum = Math.floor(Math.random() * 4);
	var plot = readTextFile(plotNum, genre);

}

function readTextFile(plotNum, genre){
	

}

function getDataFromWordnik(wordType, callback, closestInput){
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

	$.getJSON(Wordnik_BASE_URL, query, callback(closestInput));
}

function getDataFromUinames(gender, region, callback) {
	var query = {
		region: region,
		gender: gender,
		amount: 1
	};

	$.getJSON(Uinames_BASE_URL, query, callback);
}

function displayWordnikData(data, closestInput){
	console.log(closestInput);
	debugger;
	var word = data.word;
	console.log(word);
}

function displayUinamesData(data){
	console.log(data);
	var resultName = data.name;
	var resultLastName = data.surname;
}

function regionListener(arrayRegions){
	$('.js-region-trigger').on('click', function(event) {
		event.preventDefault();
		buildRegionsList(arrayRegions);
		$('.regions').fadeToggle();
		$('.regions li').on('click', function(event) {
			$('.js-region-trigger').text($(this).text());
			$('.regions').fadeToggle();
		})
	});
}

function buildRegionsList(arrayRegions){
	var regionsHTML = arrayRegions.map(region => `<li> ${region} </li>`);

	$('.regions ul').html(regionsHTML);
}

function getRandomName(){
	$('.js-button-name').on('click', function(event){
		event.preventDefault();
		var region = $('.js-region-trigger').text().trim();
		if(region === "Choose Your Region"){
			region = "United States";
		}

		var gender = $('input[name=gender]:checked').val();
		getDataFromUinames(gender, region, displayUinamesData);
	})
}

function getRandomAdj(){
	$('.js-adj-button').on('click', function(event) {
		event.preventDefault();
		var closestInput = $(event.currentTarget.closest('input'));
		debugger;
		getDataFromWordnik("adjective", displayWordnikData, closestInput);
	})
}


$(function(){
	$('.regions').hide();
	regionListener(arrayRegions);
	getRandomName();
	getRandomAdj();

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
	{
		ID: '1',
		plotFirstParagraph: `${firstCharacterName} is a ${firstCharacterAdj1}, ${firstCharacterAdj2} cop who is sick of being stuck on the same beat. ${genderNounChar1} should have been careful about what ${genderNounChar1} wished for because ${genderNounChar1}'s just met ${secondCharacterName}. And ${genderNounChar2} is a ${secondCharacterAdj1}, ${secondCharacterAdj2} who works as a ${job2} but is caught up in a criminal underground in ${place}. ${secondCharacterName} doesn't want a failed cop's help, ${genderNounChar2} is too worried that the new gang in town will ${verb1} to ${genderNounChar2HH}. But now ${genderNounChar2} has been seen talking to ${firstCharacterName} after witnessing an illegal ${verb2}.`,
		plotSecondParagraph: `With a criminal organization that has infiltrated the government they are now on the run. They will have to utilize all the skills they have between them in order to infiltrate the ${adj2} organization as ${job1}.  It won't be easy, ${firstCharacterName} will have to give up ${genderNounChar1Poss} morals in order to ${verb3} and protect ${secondCharacterName}. It might have been easier to stay a ${adj1} beat cop.`,
		genre: 'mystery'
	}
	{
		ID: '2',
		plotFirstParagraph: `${firstCharacterName} has just moved to ${place} in order to work as a ${job1}. The house is large and didn't cost much, it seemed like a bargain. But ${genderNounChar1} quickly finds out the reason for that. It seems that the last family to live there was murdered. Though the police ruled it a murder/suicide perpatrated by one of the ${adj2} girls, the people of the town have other ideas. ${secondCharacterName} has lived at ${place} all ${genderNounChar2Poss} life. ${genderNounChar1} is a ${secondCharacterAdj1}, ${secondCharacterAdj2} who is interested in the history of ${genderNounChar2Poss} hometown but works as a ${job2} on the side.`,
		plotSecondParagraph: `It seems that ${firstCharacterName}'s house is not the only one with such a history in the last 200 years. There have been other houses around the area with similar murders. However because of the time frame the police have dismissed any similarties. Now ${firstCharacterName} must join forces with ${secondCharacterName} in order to unravel a 200 year old mystery. But they aren't the only ones after the truth. Now they must ${verb1} and ${verb2} in order to dodge ${adj1} figures that seem determined to stop them. It doesn't help that ${firstCharacterName} has a personality described as ${firstCharacterAdj1} and ${fistCharacterAdj2} by ${genderNounChar1Poss} friends.`,
		genre: 'mystery'
	}
	{
		ID: '4',
		plotFirstParagraph: `In ${place}, ${firstCharacterName} is a ${firstCharacterAdj1}, ${firstCharacterAdj2} student who works as a ${job1} after school. Unfortunately ${genderNounChar1} is doing so illegally and without the school's permission. One day ${genderNounChar1} is followed by ${secondCharacterName} a ${secondCharacterAdj1}, ${secondCharacterAdj2} student who is determined to ${verb1} ${genderNounChar2Poss} classmate. ${secondCharacterName} wants to be a ${job2} when they graduate but ${genderNounChar2} is unable to due to ${genderNounChar2Poss} parents who have an ${adj1} habit. They ${verb2} which costs the family all their earnings.`
		plotSecondParagraph: `So when ${secondCharacterName} finds out about ${firstCharacterName} ${genderNounChar2} blackmails ${genderNounChar1HH}. Now both of them are hiding secrets from the school and have to work together to keep it that way. It would be easy if only the ${adj2} feelings between the two weren't changing into something more. Will they be able to get through school without being exposed or will they end up ${verb3}?`,
		genre: 'romance'
	}
	{
		ID: '5',
		plotFirstParagraph: `${firstCharacterName} is a ${firstCharacterAdj1} and ${firstCharacterAdj2} who works at ${job1} in ${place}. ${genderNounChar1} used to be childhood friends with ${secondCharacterName} but they had a falling out after they ${verb1}. Now after years of never seeing each other they have met and ${secondCharacterName} is ${secondCharacterAdj1} and ${secondCharacterAdj2} everything that ${firstCharacterName} hates. Unfortunately ${genderNounChar1Poss} work is joining forces with ${secondCharacterName}'s workplace.`
		plotSecondParagraph: `${secondCharacterName} has been working double shifts as a ${job} and hates it. ${genderNounChar2} is desperate to ${verb2} but can't seem to get anywhere. This ${adj1} project with ${firstCharacterName}'s work seems the best way to move forward. If only ${firstCharacterName} would put aside ${genderNounChar1Poss} ${adj2} hatred. Especially since ${secondCharacterName} still enjoys the idea of ${verb3} with ${genderNounChar1HH}. Will they every get over past hurt, or will this project fall into the river?`,
		genre: 'romance'
	}
	{
		ID: '6',
		plotFirstParagraph: `${firstCharacterName} is a paranormal investigator who works as a ${job1} on the side. ${genderNounChar1} has a personality that could be described as ${firstCharacterAdj1} and ${firstCharacterAdj2}. ${genderNounChar1} has been called in to investigate a house in ${place} by ${secondCharacterName}. ${genderNounChar2Poss} house has been ${verb1} on its own when ${genderNounChar2} is working as a ${job2} and isn't home. ${secondCharacterName} is ${secondCharacterAdj1} and ${secondCharacterAdj2} and doesn't usually belive in the supernatural but this has been going on for such a long time ${genderNounChar2} is desperate.`,
		plotSecondParagraph: `Unfortunately the house is being uncooperative. With ${secondCharacterName} certain that ${firstCharacterName} is a fraud can ${genderNounChar1} take care of the spirits that are making the house ${verb2}? It doesn't help that the ${adj2} house seems to want to keep the two together. Can a skeptic and a fanatic put aside their feelings to find out the mysteries of this house? As far as ${firstCharacterName} considers that's a resound 'no'. But ${secondCharacterName} might be willing to finally be able to ${verb3} in peace. Especially after the house locks them in together.`
		genre: 'romance'
	}
]