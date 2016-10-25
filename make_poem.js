/*
 * build a string separated by single spaces
 * 1. determine and concatenate "first_word "
 * 2. then determine and concatenate each "next_word " (or "next_word" in case of last) until we've reached the end of the line (according to count)
 * 3. insert new line char
 *  [if we have have reached the end of the stanza] insert new line char
 *  [if we have reached end of poem] terminate
 *  [otherwise] return to step 1
 */

// TODO remove single space from end of lines?

// TODO error handling
// Array out of bounds for probabilitiesForWordsToBeWritten

/**
 *
 */
var dataStructuresFile = require("./data_structures.js");

/**
 *
 */
const INDEX_OF_PROBABILITY_OF_FIRST_WORD = 0;

// Modify this line to specify the arguments which govern the production of
// the poem.
main('rbbrrg_input_text.txt', 1, 2, 3, [0.6, 0.2, 0.8, 0.9, 0.4, 0.4], true);

// /**
//  * TODO
//  */
// determineIfArgsAreAcceptable(
// 	inputFileName,
// 	numOfStanzas, numOfLinesPerStanza, numOfWordsPerLine,
// 	probabilitiesForWordToBeWritten,
// 	displayDataStructures)
// {
//
// }

/**
 *
 */
function sortWordFreqContainer(wordFreqContainer)
{
	var sortedWordFreqContainer = {};

	var keys = Object.keys(wordFreqContainer).sort().forEach(
		function(key)
		{
			sortedWordFreqContainer[key] = wordFreqContainer[key];
		});

	return sortedWordFreqContainer;
}

/**
 *
 */
function sortCondWordFreqContainer(condWordFreqContainer)
{
	var sortedCondWordFreqContainer = {};

	for (var wordBefore in condWordFreqContainer)
	{
		sortedCondWordFreqContainer[wordBefore] = {};
		for (var wordAfter in Object.keys(
			condWordFreqContainer[wordBefore]).sort())
		{
			sortedCondWordFreqContainer[wordBefore][wordAfter] =
				condWordFreqContainer[wordBefore][wordAfter];
		}
	}

	return sortedCondWordFreqContainer;
}

/**
 *
 */
function pickFirstWord(probabilityForFirstWord, wordFreqContainer)
{
	var probabilityUpperBound = 0;
	for (var word in wordFreqContainer)
	{
		probabilityUpperBound += wordFreqContainer[word];

		if (probabilityForFirstWord < probabilityUpperBound)
		{
			return word;
		}
	}
}

/**
 *
 */
function pickNextWord(
	probabilityForCurrentWord,
	condWordFreqContainer,
	previousWord)
{
	var probabilityUpperBound = 0;
	for (var wordAfter in condWordFreqContainer[previousWord])
	{
		probabilityUpperBound +=
			condWordFreqContainer[previousWord][wordAfter];

		if (probabilityForCurrentWord < probabilityUpperBound)
		{
			return wordAfter;
		}
	}
}

/**
 *
 */
function makePoem(
	numOfStanzas, numOfLinesPerStanza, numOfWordsPerLine,
	probabilitiesForWordsToBeWritten,
	wordFreqContainer, condWordFreqContainer)
{
	var poem = "";

	var indexOfProbabilityOfCurrentWord = INDEX_OF_PROBABILITY_OF_FIRST_WORD;

	var firstWord = pickFirstWord(
		probabilitiesForWordsToBeWritten[indexOfProbabilityOfCurrentWord],
		wordFreqContainer);
	poem += firstWord + " ";

	++indexOfProbabilityOfCurrentWord;
	var inclusionOfFirstWord = 1;

	var previousWord = firstWord;
	var nextWord = "";
	for (
		numOfStanzasToCreate = numOfStanzas;
		numOfStanzasToCreate > 0;
		--numOfStanzasToCreate)
	{
		for (
			numOfLinesPerStanzaToCreate = numOfLinesPerStanza;
			numOfLinesPerStanzaToCreate > 0;
			--numOfLinesPerStanzaToCreate)
		{
			for (
				numOfWordsPerLineToCreate =
				numOfWordsPerLine - inclusionOfFirstWord;
				numOfWordsPerLineToCreate > 0;
				--numOfWordsPerLineToCreate)
			{
				nextWord = pickNextWord(
					probabilitiesForWordsToBeWritten[
					indexOfProbabilityOfCurrentWord],
					condWordFreqContainer, previousWord);

				poem += nextWord + " ";

				++indexOfProbabilityOfCurrentWord;
			}
			inclusionOfFirstWord = 0;
			poem += "\n";
			numOfWordsPerLineToCreate = numOfWordsPerLine;
		}
		poem += "\n";
	}

	return poem;
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
	// TODO
	// determineIfArgsAreAcceptable();

	var dataStructures = dataStructuresFile.getDataStructures(inputFileName);

	var wordFreqContainer = sortWordFreqContainer(
		dataStructures["wordFreqContainer"]);
	var condWordFreqContainer = sortCondWordFreqContainer(
		dataStructures["condWordFreqContainer"]);

	var poem = makePoem(
		numOfStanzas, numOfLinesPerStanza, numOfWordsPerLine,
		probabilitiesForWordToBeWritten,
		wordFreqContainer, condWordFreqContainer);

	console.log(poem);

	if (displayDataStructures)
	{
		dataStructuresFile.displayDataStructures(dataStructures);
	}
}




