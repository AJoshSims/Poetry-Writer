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
main('rbbrrg_input_text.txt', 1, 2, 3, [0.6, 0.2, 0.8, 0.9, 0.4, 0.4], false);

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
function sortWordFreq(wordFreq)
{
	var sortedWordFreq = {};

	Object.keys(wordFreq).sort().forEach(
		function(key)
		{
			sortedWordFreq[key] = wordFreq[key];
		});

	return sortedWordFreq;
}

/**
 *
 */
function sortCondWordFreq(condWordFreq)
{
	var sortedCondWordFreq = {};

	for (var wordBefore in condWordFreq)
	{
		sortedCondWordFreq[wordBefore] = {};
		for (var wordAfter in Object.keys(condWordFreq[wordBefore]).sort())
		{
			sortedCondWordFreq[wordBefore][wordAfter] =
				condWordFreq[wordBefore][wordAfter];
		}
	}

	return sortedCondWordFreq;
}

/**
 *
 */
function pickFirstWord(probabilityForFirstWord, wordFreq)
{
	var probabilityUpperBound = 0;
	for (var word in wordFreq)
	{
		probabilityUpperBound += wordFreq[word];

		if (probabilityForFirstWord < probabilityUpperBound)
		{
			return word;
		}
	}
}

/**
 *
 */
function pickNextWord(probabilityForCurrentWord, condWordFreq, previousWord)
{
	var probabilityUpperBound = 0;
	for (var wordAfter in condWordFreq[previousWord])
	{
		probabilityUpperBound += condWordFreq[previousWord][wordAfter];

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
	wordFreq, condWordFreq)
{
	var poem = "";

	var indexOfProbabilityOfCurrentWord = INDEX_OF_PROBABILITY_OF_FIRST_WORD;

	var firstWord = pickFirstWord(
		probabilitiesForWordsToBeWritten[indexOfProbabilityOfCurrentWord],
		wordFreq);
	poem += firstWord + " ";

	++indexOfProbabilityOfCurrentWord;

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
				numOfWordsPerLineToCreate = numOfWordsPerLine;
				numOfWordsPerLineToCreate > 0;
				--numOfWordsPerLineToCreate)
			{
				nextWord = pickNextWord(
					probabilitiesForWordsToBeWritten[
					indexOfProbabilityOfCurrentWord],
					condWordFreq, previousWord);

				poem += nextWord + " ";

				++indexOfProbabilityOfCurrentWord;
			}
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

	// TODO remove
	dataStructuresFile.displayDataStructures(dataStructures);

	var wordFreq = sortWordFreq(dataStructures[wordFreq]);
	var condWordFreq = sortCondWordFreq(dataStructures[condWordFreq]);

	var poem = makePoem(
		numOfStanzas, numOfLinesPerStanza, numOfWordsPerLine,
		probabilitiesForWordToBeWritten,
		wordFreq, condWordFreq);

	console.log(poem);

	if (displayDataStructures)
	{
		dataStructuresFile.displayDataStructures(dataStructures);
	}
}




