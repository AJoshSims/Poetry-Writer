/*
 * build a string separated by single spaces
 * 1. determine and concatenate "first_word "
 * 2. then determine and concatenate each "next_word " (or "next_word" in case of last) until we've reached the end of the line (according to count)
 * 3. insert new line char
 *  [if we have have reached the end of the stanza] insert new line char
 *  [if we have reached end of poem] terminate
 *  [otherwise] return to step 1
 */

/**
 *
 *
 *
 */

/**
 *
 */
var data_structures = require("./data_structures.js");

/**
 *
 */

/**
 *
 */

// Modify this line to specify the arguments which govern the production of
// the poem.
main('rbbrrg_input_text.txt', 1, 2, 3, [0.6, 0.2, 0.8, 0.9, 0.4, 0.4], false);

/**
 *
 */
function pickFirstWord()
{
	var ordered = {};
	Object.keys(data_structures.wordFreqContainer).sort().forEach(function(key) {
		ordered[key] = theWordFreqs[key];
	});
}

/**
 *
 */
function pickNextWord()
{

}

/**
 *
 */
function makePoem(
	numOfStanzas, numOfLinesPerStanza, numOfWordsPerLine,
	probabilitiesForWordsToBeWritten,
	wordFreq, condWordFreq
)
{
	var poem = "";
	poem += pickFirstWord() + " ";

	var numOfWordsToBeWritten = ;
	for (var )
	{

	}
}

/**
 *
 */
function main(
	inputFileName,
	numOfStanzas, numOfLinesPerStanza, numOfWordsPerLine,
	probabilitiesForWordToBeWritten,
	displayDataStructures)
{
	determineIfArgsAreAcceptable();

	var dataStructures = dataStructures.getDataStructures(inputFileName);

	var poem = makePoem(
		numOfStanzas, numOfLinesPerStanza, numOfWordsPerLine,
		probabilitiesForWordToBeWritten,
		dataStructures["wordFreq"], dataStructures["condWordFreq"]);

	console.log(poem);

	if (displayDataStructures)
	{
		data_structures.displayDataStructures();
	}
}




