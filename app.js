var Wordnik_BASE_URL = 'http://api.wordnik.com:80/v4/words.json/randomWord';
var Uinames_BASE_URL = 'http://uinames.com/api/';

function getPlot(genre, firstCharacterName, secondCharacterName, firstCharacterGender, secondCharacterGender, place, job1, job2, firstCharacterAdj1, firstCharacterAdj2, secondCharacterAdj1, secondCharacterAdj2, adj1, adj2, verb1, verb2, verb3, species1, species2){
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

	var plot_array = buildPlotArray(genre, firstCharacterName, secondCharacterName, firstCharacterGender, secondCharacterGender, place, job1, job2, firstCharacterAdj1, firstCharacterAdj2, secondCharacterAdj1, secondCharacterAdj2, adj1, adj2, verb1, verb2, verb3, genderNounChar1, genderNounChar2, genderNounChar2Poss, genderNounChar1Poss, genderNounChar1HH, genderNounChar2HH, species1, species2);

	var plotNum = 0;

	if(genre==="romance"){
		plotNum = Math.floor(Math.random() * (5-3+1) + 3);
	} else if(genre==="mystery"){
		plotNum = Math.floor(Math.random() * (2-1+1) + 1);
	} else if(genre==="sci-fi"){
		plotNum = Math.floor(Math.random() * (9-8+1) + 8);
	} else if(genre==="fantasy"){
		plotNum = Math.floor(Math.random() * (7-6+1) + 6);

	}

	var plot = readPlotFile(plotNum.toString(), plot_array);
	var firstParagraph = plot.plotFirstParagraph;
	var secondParagraph = plot.plotSecondParagraph;
	displayPlot(firstParagraph, secondParagraph);

}

function readPlotFile(plotNum, plot_array){
	var plot = "";
	$.each(plot_array, function(index, obj) {
		if(obj.ID === plotNum){
			plot = obj;
		}
	});
	return plot;
}

function displayPlot(firstParagraph, secondParagraph){
	window.location.href = "plotDisplayPage.html";
	$('js-first-paragraph').text(firstParagraph);
	$('.js-second-paragraph').text(secondParagraph);
}

function retryBack(){
	$('.js-retry').on('click', function(event) {
		event.preventDefault();
		window.location.href = "genrePage.html";
	})
}

function genreClick(){
	$('.js-genre-item').on('click', function(event) {
		if($(this).text() === "Romance")
		{
			window.location.href = "basicFormPlot.html#romance";
		} else if($(this).text() === "Modern Mystery") 
		{
			window.location.href = "basicFormPlot.html#mystery";
		} else if($(this).text() === "Fantasy") 
		{
			window.location.href = "fantsciFormPlot.html#fantasy";
		} else if($(this).text() === "Sci-Fi")
		{
			window.location.href = "fantsciFormPlot.html#sci-fi";
		}
	})
}

function letTheBunniesOut(){
	$('.js-start-button').on('click', function(event) {
		event.preventDefault();
		window.location.href = "genrePage.html";
	})
}

function getDataFromWordnik(wordType, displayWordnikData, closestInput){
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

	var callback = (data) => displayWordnikData.call(this, data, closestInput);

	$.getJSON(Wordnik_BASE_URL, query, callback);
}

function getDataFromUinames(gender, region, displayUinamesData, closestInput) {
	var query = {
		region: region,
		gender: gender,
		amount: 1
	};

	var callback = (data) => displayUinamesData.call(this, data, closestInput);
	$.getJSON(Uinames_BASE_URL, query, callback);
}

function displayWordnikData(data, closestInput){
	console.log(closestInput);
	var word = data.word;
	console.log(word);
	closestInput.val(word);
}

function displayUinamesData(data, closestInput){
	var resultName = data.name;
	var resultLastName = data.surname;
	console.log(`${resultName} ${resultLastName}`);
	closestInput.val(`${resultName} ${resultLastName}`);
	console.log(closestInput.val());
}

function regionListener(arrayRegions){
	$('.js-region-trigger').on('click', function(event) {
		event.preventDefault();
		buildRegionsList(arrayRegions, 'regions');
		$('.regions').fadeToggle();
		$('.regions li').on('click', function(event) {
			$('.js-region-trigger').text($(this).text());
			$('.regions').fadeToggle();
		})
	});
}

function regionListenerChar2(arrayRegions){
	$('.js-region-trigger-char2').on('click', function(event) {
		event.preventDefault();
		buildRegionsList(arrayRegions, 'regions-2');
		$('.regions-2').fadeToggle();
		$('.regions-2 li').on('click', function(event) {
			$('.js-region-trigger-char2').text($(this).text());
			$('.regions-2').fadeToggle();
		})
	});
}

function buildRegionsList(arrayRegions, regionClass){
	var regionsHTML = arrayRegions.map(region => `<li> ${region} </li>`);

	$(`.${regionClass} ul`).html(regionsHTML);
}

function getRandomName(){
	$('.js-button-name').on('click', function(event){
		event.preventDefault();
		var region = $(this).closest("form").find("p").text().trim();
		if(region === "Choose Your Region"){
			region = "United States";
		}

		var closestInput = $(event.currentTarget).closest("form").find("input[type=text]");
		console.log(closestInput);
		var gender = $('input[name=gender]:checked').val();
		getDataFromUinames(gender, region, displayUinamesData, closestInput);
	})
}

function getRandomAdj(){
	$('.js-adj-button').on('click', function(event) {
		event.preventDefault();
		var closestInput = $(event.currentTarget).closest("div").find("input[type=text]");
		getDataFromWordnik("adjective", displayWordnikData, closestInput);
	})
}

function getRandomVerb(){
	$('.js-verb-button').on('click', function(event) {
		event.preventDefault();
		var closestInput = $(event.currentTarget).closest("div").find("input[type=text]");
		getDataFromWordnik("verb", displayWordnikData, closestInput);
	})
}

function generatePlot(){
	$('.js-generate-plot').on('click', function(event) {
		event.preventDefault();
		var genre = window.location.hash.substring(1);
		var firstCharacterName = $('input[name=first-name]').val();
		var secondCharacterName = $('input[name=second-name]').val();
		var firstCharacterGender = $('.js-name-form-char1-basic').find($('input[name=gender]:checked')).val();
		var secondCharacterGender = $('.js-name-form-char2-basic').find($('input[name=gender]:checked')).val();
		var place = $('input[name=place]').val();
		var job1 = $('input[name=char1-job]').val();
		var job2 = $('input[name=char2-job]').val();
		var firstCharacterAdj1 = $('input[name=first-char-adj1]').val();
		var firstCharacterAdj2 = $('input[name=first-char-adj2]').val();
		var secondCharacterAdj1 = $('input[name=second-char-adj1]').val();
		var secondCharacterAdj2 = $('input[name=second-char-adj2]').val();
		var adj1 = $('input[name=adj1]').val();
		var adj2 = $('input[name=adj2]').val();
		var verb1 = $('input[name=verb1]').val();
		var verb2 = $('input[name=verb2]').val();
		var verb3 = $('input[name=verb3]').val();
		var species1 = "Human";
		var species2 = "Human";
		if(genre === "fantasy" || genre === "sci-fi"){
			species1 = $('input[name=char1-species]').val();
			species2 = $('input[name=char2-species]').val();

		}

		var valueArray = [firstCharacterName, secondCharacterName, firstCharacterGender, secondCharacterGender, place, job1, job2, firstCharacterAdj1, firstCharacterAdj2, secondCharacterAdj1, secondCharacterAdj2, adj1, adj2, verb1, verb2, verb3];

		var isBlank = checkForBlanks(genre, valueArray);

		if(!isBlank){
			getPlot(genre, firstCharacterName, secondCharacterName, firstCharacterGender, secondCharacterGender, place, job1, job2, firstCharacterAdj1, firstCharacterAdj2, secondCharacterAdj1, secondCharacterAdj2, adj1, adj2, verb1, verb2, verb3, species1, species2);
		}

	});
}

function checkForBlanks(genre, valueArray){
	var isBlank = false;
	if(genre === "fantasy" || genre === "sci-fi")
		{
			for(var i = 0; i <= valueArray.length; i++)
			{
				if(valueArray[i].length < 1){
					alert("You have left a field blank.");
					isBlank = true;
					break;
				}
			}

		} else 
		{
			for(var i = 0; i <= valueArray.length -2; i++)
			{
				if(valueArray[i].length < 1){
					alert("You have left a field blank.");
					isBlank = true;
					break;
				}
			}
		}
	return isBlank;
}

function buildPlotArray(genre, firstCharacterName, secondCharacterName, firstCharacterGender, secondCharacterGender, place, job1, job2, firstCharacterAdj1, firstCharacterAdj2, secondCharacterAdj1, secondCharacterAdj2, adj1, adj2, verb1, verb2, verb3, genderNounChar1, genderNounChar2, genderNounChar2Poss, genderNounChar1Poss, genderNounChar1HH, genderNounChar2HH, species1, species2){

	var plot_array = [
	{
		ID: '1',
		plotFirstParagraph: `${firstCharacterName} is a ${firstCharacterAdj1}, ${firstCharacterAdj2} cop who is sick of being stuck on the same beat. ${genderNounChar1} should have been careful about what ${genderNounChar1} wished for because ${genderNounChar1}'s just met ${secondCharacterName}. And ${genderNounChar2} is a ${secondCharacterAdj1}, ${secondCharacterAdj2} who works as a ${job2} but is caught up in a criminal underground in ${place}. ${secondCharacterName} doesn't want a failed cop's help, ${genderNounChar2} is too worried that the new gang in town will ${verb1} to ${genderNounChar2HH}. But now ${genderNounChar2} has been seen talking to ${firstCharacterName} after witnessing an illegal ${verb2}.`,
		plotSecondParagraph: `With a criminal organization that has infiltrated the government they are now on the run. They will have to utilize all the skills they have between them in order to infiltrate the ${adj2} organization as ${job1}.  It won't be easy, ${firstCharacterName} will have to give up ${genderNounChar1Poss} morals in order to ${verb3} and protect ${secondCharacterName}. It might have been easier to stay a ${adj1} beat cop.`,
		genre: 'mystery'
	},
	{
		ID: '2',
		plotFirstParagraph: `${firstCharacterName} has just moved to ${place} in order to work as a ${job1}. The house is large and didn't cost much, it seemed like a bargain. But ${genderNounChar1} quickly finds out the reason for that. It seems that the last family to live there was murdered. Though the police ruled it a murder/suicide perpatrated by one of the ${adj2} girls, the people of the town have other ideas. ${secondCharacterName} has lived at ${place} all ${genderNounChar2Poss} life. ${genderNounChar2} is a ${secondCharacterAdj1}, ${secondCharacterAdj2} who is interested in the history of ${genderNounChar2Poss} hometown but works as a ${job2} on the side.`,
		plotSecondParagraph: `It seems that ${firstCharacterName}'s house is not the only one with such a history in the last 200 years. There have been other houses around the area with similar murders. However because of the time frame the police have dismissed any similarties. Now ${firstCharacterName} must join forces with ${secondCharacterName} in order to unravel a 200 year old mystery. But they aren't the only ones after the truth. Now they must ${verb1} and ${verb2} in order to dodge ${adj1} figures that seem determined to stop them. It doesn't help that ${firstCharacterName} has a personality described as ${firstCharacterAdj1} and ${firstCharacterAdj2} by ${genderNounChar1Poss} friends.`,
		genre: 'mystery'
	},
	{
		ID: '3',
		plotFirstParagraph: `In ${place}, ${firstCharacterName} is a ${firstCharacterAdj1}, ${firstCharacterAdj2} student who works as a ${job1} after school. Unfortunately ${genderNounChar1} is doing so illegally and without the school's permission. One day ${genderNounChar1} is followed by ${secondCharacterName} a ${secondCharacterAdj1}, ${secondCharacterAdj2} student who is determined to ${verb1} ${genderNounChar2Poss} classmate. ${secondCharacterName} wants to be a ${job2} when they graduate but ${genderNounChar2} is unable to due to ${genderNounChar2Poss} parents who have an ${adj1} habit. They ${verb2} which costs the family all their earnings.`,
		plotSecondParagraph: `So when ${secondCharacterName} finds out about ${firstCharacterName} ${genderNounChar2} blackmails ${genderNounChar1HH}. Now both of them are hiding secrets from the school and have to work together to keep it that way. It would be easy if only the ${adj2} feelings between the two weren't changing into something more. Will they be able to get through school without being exposed or will they end up ${verb3}?`,
		genre: 'romance'
	},
	{
		ID: '4',
		plotFirstParagraph: `${firstCharacterName} is a ${firstCharacterAdj1} and ${firstCharacterAdj2} who works at ${job1} in ${place}. ${genderNounChar1} used to be childhood friends with ${secondCharacterName} but they had a falling out after they ${verb1}. Now after years of never seeing each other they have met and ${secondCharacterName} is ${secondCharacterAdj1} and ${secondCharacterAdj2} everything that ${firstCharacterName} hates. Unfortunately ${genderNounChar1Poss} work is joining forces with ${secondCharacterName}'s workplace.`,
		plotSecondParagraph: `${secondCharacterName} has been working double shifts as a ${job2} and hates it. ${genderNounChar2} is desperate to ${verb2} but can't seem to get anywhere. This ${adj1} project with ${firstCharacterName}'s work seems the best way to move forward. If only ${firstCharacterName} would put aside ${genderNounChar1Poss} ${adj2} hatred. Especially since ${secondCharacterName} still enjoys the idea of ${verb3} with ${genderNounChar1HH}. Will they every get over past hurt, or will this project fall into the river?`,
		genre: 'romance'
	},
	{
		ID: '5',
		plotFirstParagraph: `${firstCharacterName} is a paranormal investigator who works as a ${job1} on the side. ${genderNounChar1} has a personality that could be described as ${firstCharacterAdj1} and ${firstCharacterAdj2}. ${genderNounChar1} has been called in to investigate a house in ${place} by ${secondCharacterName}. ${genderNounChar2Poss} house has been ${verb1} on its own when ${genderNounChar2} is working as a ${job2} and isn't home. ${secondCharacterName} is ${secondCharacterAdj1} and ${secondCharacterAdj2} and doesn't usually belive in the supernatural but this has been going on for such a long time ${genderNounChar2} is desperate.`,
		plotSecondParagraph: `Unfortunately the house is being uncooperative. With ${secondCharacterName} certain that ${firstCharacterName} is a fraud can ${genderNounChar1} take care of the spirits that are making the house ${verb2}? It doesn't help that the ${adj2} house seems to want to keep the two together. Can a skeptic and a fanatic put aside their feelings to find out the mysteries of this house? As far as ${firstCharacterName} considers that's a resound 'no'. But ${secondCharacterName} might be willing to finally be able to ${verb3} in peace. Especially after the house locks them in together.`,
		genre: 'romance'
	},
	{
		ID: '6',
		plotFirstParagraph: `${firstCharacterName} is the ruler of a small kingdom named ${place}. ${genderNounChar1} is considered ${firstCharacterAdj1} and ${firstCharacterAdj2} which makes them the perfect ruler. But not everyone thinks this way. ${secondCharacterName} is peasant who has lost everything after being kicked out of their job, ${job2}. Now ${genderNounChar2} is ${secondCharacterAdj1} and ${secondCharacterAdj2}. As a consequence ${genderNounChar2} has gotten involved with a rebellion that has been stirring in the kingdom of ${place}. ${secondCharacterName} is surprised to find out that this rebellion is using magic. Something that has been considered a myth. Now ${secondCharacterName} is learning to use their magic to ${verb1}.`,
		plotSecondParagraph: `${firstCharacterName} has been growing increasingly worried. The ${adj1} rebellion is gaining momentum. ${genderNounChar1} can't convince ${genderNounChar1Poss} council to ${verb2} in order to stop them. ${genderNounChar1} is validated when ${secondCharacterName}  ends up kidnapping ${genderNounChar1HH}. Now they are on their way back to the rebellion headquarters disguised as ${job1}, but there's more to this then just a repressed people. Magic is returning to the world and they will have to ${verb3} to make certain that ${place} isn't bulled over. But can ${secondCharacterName} convince ${firstCharacterName} that there's a plight beyond just the rebellion? Or will ${genderNounChar2} become the latest casualty and mauder of the ${adj2} cause.`,
		genre: 'fantasy'
	},
	{
		ID: '7',
		plotFirstParagraph: `${firstCharacterName} is a ${species1} and ${secondCharacterName} is a ${species2} that are partners in crime. Specifically magical thieving. Though ${firstCharacterName} works as a ${job1} and ${secondCharacterName} works as a ${job2}, they only do so as a way to keep up a disguise so the guards don't catch up to them. On their latest run they picked up a map. ${secondCharacterName} is ${secondCharacterAdj1} and ${secondCharacterAdj2} which helps ${genderNounChar2HH} decide that they should sell it. ${firstCharacterName} is ${firstCharacterAdj1} and ${firstCharacterAdj1} and is far more interested in discovering what the map is for. But neither choice matters because when they get back to ${place} a group of strange people attack them using ${adj1} magic. Now the thieves are in to the secrets of an occult. With no way out they have to ${verb1}.`,
		plotSecondParagraph: `The ${adj2} occult seems to have spread across the kingdom and the thieves have no one they can trust. Until they meet up with a group of mages. Their own abilities will be tested and they will ${verb2} to make their power grow. The map is only the beginning, and the occult is only the surface. It's time to put away greed and ${verb3} for the sake of their world.`,
		genre: 'fantasy'
	},
	{
		ID: '8',
		plotFirstParagraph: `${firstCharacterName} is a ${species1} who worked as a ${job1} but is now a Captain of a freighter for the Galactic ${place}. ${genderNounChar1} has picked up ${secondCharacterName} as a new ${job2} for the ship. ${genderNounChar2} is a ${species2} an endangered species that has recently had their home planet destroyed. The details of the recent destruction have been ${verb1} and the ${adj1} media has stopped reporting on it. ${firstCharacterName} is ${firstCharacterAdj1} and ${firstCharacterAdj2} and just ready to get this delivery over with. Unfortunately whatever destroyed ${secondCharacterName}'s planet is now following the freighter.`,
		plotSecondParagraph: `${secondCharacterName} is trying to get on with ${genderNounChar2Poss} life but loosing all of ${genderNounChar2Poss} family has made ${genderNounChar2HH} ${secondCharacterAdj1}  and ${secondCharacterAdj2}. It doesn't help that ${genderNounChar2} is certain that the destruction of the planet is ${genderNounChar2Poss} because &{genderNounChar2} ${verb2}. Now ${firstCharacterName} and ${secondCharacterName} will have to ${verb3} in order to stay alive and discover the secret behind the destruction before the ${adj2} freighter is destroyed.`,
		genre: 'sci-fi'
	},
	{
		ID: '9',
		plotFirstParagraph: `${firstCharacterName} is a ${species1} who comes from a family that worked as ${job1}. But ${genderNounChar1} is far more interested in going to space. ${genderNounChar1} decides to join the ${place} Academy in order to ${verb1} and become a ${adj1} cadet. Cadet's are able to join either the research staff or the military in order to travel the cosmos. While there ${firstCharacterName} meets ${secondCharacterName} a ${species2} and a senior Cadet a year away from going on ${genderNounChar2Poss} first mission. They do not get along. ${firstCharacterName} tends to be more ${firstCharacterAdj1} and ${firstCharacterAdj2} which conflicts with ${secondCharacterName} who is more ${secondCharacterAdj1} and ${secondCharacterAdj2}. Their conflict starts with them ${verb2} together and ends with a fight.`,
		plotSecondParagraph: `But while on probation for the fight the two stumble across a ${adj2} meeting. Now they are flung into a conspiracy as old as the acedemy and the strange secret to space travel. Soon they will have to ${verb3} their differences in order to save the peace that the world has achieved with others. Can they do it without getting thrown out of the ${place} Academy? Or will none of that matter?`,
		genre: 'sci-fi'
	}
	]

	return plot_array;

}


$(function(){
	$('.regions').hide();
	letTheBunniesOut();
	genreClick();
	regionListener(arrayRegions);
	regionListenerChar2(arrayRegions);
	getRandomName();
	getRandomAdj();
	getRandomVerb();
	generatePlot();

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