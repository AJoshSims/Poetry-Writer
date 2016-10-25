
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

/**
 *
 */
const ONE_WORD = 1;

/**
 *
 */
const ONE_WORD_LEFT = 1;

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

	Object.keys(wordFreqContainer).sort().forEach(
		function(word)
		{
			sortedWordFreqContainer[word] = wordFreqContainer[word];
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

		Object.keys(condWordFreqContainer[wordBefore]).sort().forEach(
			function(wordAfter)
			{
				sortedCondWordFreqContainer[wordBefore][wordAfter] =
					condWordFreqContainer[wordBefore][wordAfter];
			});
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

	poem += firstWord;

	if (Object.keys(wordFreqContainer).length > ONE_WORD)
	{
		poem += " ";
	}

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

				poem += nextWord;

				if (numOfWordsPerLineToCreate != ONE_WORD_LEFT)
				{
					poem += " ";
				}

				previousWord = nextWord;
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

	process.stdout.write(poem);

	if (displayDataStructures)
	{
		dataStructuresFile.displayDataStructures(dataStructures);
	}
}




