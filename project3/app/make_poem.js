"use strict";

/**
 * Prints a poem whose composing words are determined by the frequency of words
 * in a specified text file and the frequency at which they proceed certain
 * other words in that file.
 *
 * <p>This program is run by calling the function named main from within this
 * file.
 *
 * @author Joshua Sims
 * @version 25 October 2016
 */

// Imports and exports
/**
 * Enables the exportation of this file's components.
 */
var exports = module.exports = {};

// TODO export as functions
exports.main = main;
exports.makePoem = makePoem;
exports.pickFirstWord = pickFirstWord;
exports.pickNextWord = pickNextWord;

/**
 * Contains the functions for creating and printing the wordCount, wordFreq,
 * condWordCount, and condWordFreq data structures.
 */
var dataStructuresFile = require("./data_structures.js");

var errors = require("./errors");

// Miscellaneous constants
/**
 * The first word within the probabilities array.
 */
const INDEX_OF_PROBABILITY_OF_FIRST_WORD = 0;

/**
 * The quantity of a single word.
 */
const ONE_WORD = 1;

/**
 * The last word for the current line has been written.
 */
const NO_WORDS_LEFT_TO_CREATE_FOR_THIS_LINE = 1;

// Program entry point
// Modify this line to specify the arguments which govern the production of
// the poem.
	main("rbbrrg_input_text.txt", 1, 2, 3, [0.6, 0.2, 0.8, 0.9, 0.4, 0.4], true);

// Functions
/**
 * Aborts the program if either the specified stanzas, specified lines per
 * stanza, or the specified words per line is not an integer.
 *
 * @param numOfStanzas - the number of stanzas in the poem produced
 * @param numOfLinesPerStanza - the number of lines per stanza in the poem
 *     produced
 * @param numOfWordsPerLine - the number of words per line in the poem
 *     produced
 */
function abortIfNotIntegers(
	numOfStanzas, numOfLinesPerStanza, numOfWordsPerLine)
{
	var errorMessage = null;
	var abort = false;

	// If not a number or an integer.
	if (((typeof numOfStanzas).toLowerCase() != "number")
		|| ((numOfStanzas % 1) != 0))
	{
		errorMessage = "The specified number of stanzas must be an integer";
		abort = true;
	}
	if (((typeof numOfLinesPerStanza).toLowerCase() != "number")
		|| ((numOfLinesPerStanza % 1) != 0))
	{
		errorMessage = "The specified number of lines per stanza must be an integer";
		abort = true;
	}
	if (((typeof numOfWordsPerLine).toLowerCase() != "number")
		|| ((numOfWordsPerLine % 1) != 0))
	{
		errorMessage = "The specified number of words per line must be an integer";
		abort = true;
	}

	if (abort)
	{
		throw new errors.
			StanzasOrLinesPerStanzaOrWordsPerLineIsNotIntegerError(
			errorMessage);
	}
}

/**
 * Aborts the program if the probabilities array is not actually an array or
 * if the probabilities array is empty.
 *
 * @param probabilitiesForWordToBeWritten - the array containing the
 *     supposedly random probabilities which govern which words constitute the
 *     poem which is produced
 */
function abortIfProbabilitiesArrayIsInvalid(probabilitiesForWordToBeWritten)
{
	if (!Array.isArray(probabilitiesForWordToBeWritten))
	{
		throw new errors.ProbabilitiesArrayIsNotArrayError();
	}

	if (probabilitiesForWordToBeWritten.length === 0)
	{
		throw new errors.ProbabilitiesArrayIsEmptyError();
	}
}

/**
 * Aborts the program if the length of the probabilities array is not equal
 * to the number of words that will constitute the poem.
 *
 * @param numOfStanzas - the number of stanzas in the poem produced
 * @param numOfLinesPerStanza - the number of lines per stanza in the poem
 *     produced
 * @param numOfWordsPerLine - the number of words per line in the poem
 *     produced
 * @param probabilitiesForWordToBeWritten - the array containing the
 *     supposedly random probabilities which govern which words constitute the
 *     poem which is produced
 */
function abortIfProbabilitiesArrayLengthNotEqualsNumOfPoemWords(
	numOfStanzas, numOfLinesPerStanza, numOfWordsPerLine,
	probabilitiesForWordToBeWritten)
{
	if (probabilitiesForWordToBeWritten.length !=
		numOfStanzas * numOfLinesPerStanza * numOfWordsPerLine)
	{
		throw new errors.
			LengthOfProbabilitiesIsNotEqualToNumOfPoemWordsError();
	}
}

/**
 * Aborts the program if displayDataStructuresChoice is not a boolean.
 *
 * @param displayDataStructuresChoice - represents the
 *     choice to display the wordCount, wordFreq, condWordCount, and
 *     condWordFreq data structures
 */
function abortIfdisplayDataStructuresChoiceNotBoolean(
	displayDataStructuresChoice)
{
	if (displayDataStructuresChoice.toString().toLowerCase() != "true"
		&& displayDataStructuresChoice.toString().toLowerCase() != "false")
	{
		throw new errors.DisplayDataStructuresChoiceIsNotBooleanError();
	}
}

/**
 * Aborts the program if any of the program arguments are invalid.
 *
 * @param numOfStanzas - the number of stanzas in the poem produced
 * @param numOfLinesPerStanza - the number of lines per stanza in the poem
 *     produced
 * @param numOfWordsPerLine - the number of words per line in the poem
 *     produced
 * @param probabilitiesForWordToBeWritten - the array containing the
 *     supposedly random probabilities which govern which words constitute the
 *     poem which is produced
 * @param displayDataStructuresChoice - represents the
 *     choice to display the wordCount, wordFreq, condWordCount, and
 *     condWordFreq data structures
 * @param dataStructures - an array containing the wordCount, wordFreq,
 *     condWordCount, and condWordFreq data structures, in that order
 */
function abortIfArgsAreUnacceptable(
	numOfStanzas, numOfLinesPerStanza, numOfWordsPerLine,
	probabilitiesForWordToBeWritten,
	displayDataStructuresChoice, dataStructures)
{
	abortIfNotIntegers(numOfStanzas, numOfLinesPerStanza, numOfWordsPerLine);

	abortIfProbabilitiesArrayIsInvalid(probabilitiesForWordToBeWritten);

	abortIfProbabilitiesArrayLengthNotEqualsNumOfPoemWords(
		numOfStanzas, numOfLinesPerStanza, numOfWordsPerLine,
		probabilitiesForWordToBeWritten);

	abortIfdisplayDataStructuresChoiceNotBoolean(displayDataStructuresChoice);
}

/**
 * Sorts wordFreqContainer such that its elements are arranged in ascending
 * alphabetical order of the elements' keys and then returns the sorted
 * WordFreqContainer.
 *
 * @param wordFreqContainer - the object containing the frequencies at which
 *     each word in the input file appears
 *
 * @return sortedWordFreqContainer - wordFreqContainer sorted such that
 *     its elements are arranged in ascending alphabetical order of the
 *     elements' keys
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
 * Sorts condWordFreqContainer such that the elements of each of the objects
 * contained in condWordFreqContainer are arranged in ascending alphabetical
 * order of those elements' keys and then returns the sorted
 * condWordFreqContainer.
 *
 * @param condWordFreqContainer - the object containing the frequencies at
 *     which certain words in the input file appear after certain other words
 *     in the input file
 *
 * @return sortedCondWordFreqContainer - condWordFreqContainer sorted such that
 *     the elements of each of the objects contained in
 *     condWordFreqContainer are arranged in ascending alphabetical order of
 *     those elements' keys
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
 * According to the probability specified by the user and the frequencies of
 * the words in the input file, picks the word that will begin the poem and
 * returns it.
 *
 * @param probabilityForFirstWord - the probability specified by the user that
 *     will determine which word from the input file will be the first word
 *     of the poem
 * @param wordFreqContainer - the object containing the frequencies at which
 *     each word in the input file appears
 *
 * @return firstWord - the word that will begin the poem
 */
function pickFirstWord(probabilityForFirstWord, wordFreqContainer)
{
	var firstWord = "";

	var upperBound = 0;

	// If the probability specified by the user is less than the probability
	// of the currently examined input file word plus the probability of the
	// previously examined input file word, return the currently examined
	// input file word.
	for (var word in wordFreqContainer)
	{
		upperBound += wordFreqContainer[word];

		if (probabilityForFirstWord < upperBound)
		{
			firstWord = word;
			return firstWord;
		}
	}
}

/**
 * According to the probability specified by the user and the frequencies of
 * the words as they appear after other words in the input file, picks the word
 * that will proceed the word previously included in the poem and returns it.
 *
 * @param probabilityForFirstWord - the probability specified by the user that
 *     will determine which word from the input file will be the next word
 *     in the poem
 * @param condWordFreqContainer - the object containing the frequencies at
 *     which certain words in the input file appear after certain other words
 *     in the input file
 * @param previousWord - the word previously included
 *     in the poem
 *
 * @return nextWord - the word that will proceed the word previously included
 *     in the poem
 */
function pickNextWord(
	probabilityForCurrentWord,
	condWordFreqContainer,
	previousWord)
{
	var nextWord = "";

	var upperBound = 0;

	// If the probability specified by the user is less than the probability
	// of the currently examined input file word plus the probability of the
	// previously examined input file word, return the currently examined
	// input file word.
	for (var wordAfter in condWordFreqContainer[previousWord])
	{
		upperBound +=
			condWordFreqContainer[previousWord][wordAfter];

		if (probabilityForCurrentWord < upperBound)
		{
			nextWord = wordAfter;
			return nextWord;
		}
	}
}

/**
 * Aborts the program if the probability, of the probabilities array,
 * currently being examined is not actually a number, is less than 0, or is
 * greater than 1.
 *
 * @param probability - the probability, of the probabilities array,
 *     currently being examined
 */
function abortIfProbabilityIsInvalid(probability)
{
	var errorMessage = null;
	var abort = false;

	if ((typeof probability).toLowerCase() != "number")
	{
		errorMessage = "The probabilities array contains a non-number.";
		abort = true;
	}

	if (probability < 0)
	{
		errorMessage = "The probabilities array contains a probability that is less than 0.";
		abort = true;
	}

	if (probability > 1)
	{
		errorMessage = "The probabilities array contains a probability that is greater than 1.";
		abort = true;
	}

	if (abort)
	{
		throw new errors.InvalidProbabilityError(errorMessage);
	}
}

/**
 * Creates the poem as a string and returns it.
 *
 * @param numOfStanzas - the number of stanzas in the poem produced
 * @param numOfLinesPerStanza - the number of lines per stanza in the poem
 *     produced
 * @param numOfWordsPerLine - the number of words per line in the poem
 *     produced
 * @param probabilitiesForWordToBeWritten - the array containing the
 *     supposedly random probabilities which govern which words constitute the
 *     poem which is produced
 * @param wordFreqContainer - the object containing the frequencies at which
 *     each word in the input file appears
 * @param condWordFreqContainer - the object containing the frequencies at
 *     which certain words in the input file appear after certain other words
 *     in the input file
 *
 * @return poem - the poem whose composition is determined by arguments passed
 *     from the user
 */
function makePoem(
	numOfStanzas, numOfLinesPerStanza, numOfWordsPerLine,
	probabilitiesForWordsToBeWritten,
	wordFreqContainer, condWordFreqContainer)
{
	var poem = "";

	var indexOfProbabilityOfCurrentWordToBeWritten =
		INDEX_OF_PROBABILITY_OF_FIRST_WORD;
	var probabilityOfCurrentWordToBeWritten = probabilitiesForWordsToBeWritten[
		indexOfProbabilityOfCurrentWordToBeWritten];

	abortIfProbabilityIsInvalid(
		probabilityOfCurrentWordToBeWritten);

	var firstWord = pickFirstWord(probabilityOfCurrentWordToBeWritten,
		wordFreqContainer);

	poem += firstWord;

	if (Object.keys(wordFreqContainer).length > ONE_WORD)
	{
		poem += " ";
	}

	++indexOfProbabilityOfCurrentWordToBeWritten;
	var inclusionOfFirstWordInThisLine = 1;

	var previousWord = firstWord;
	var nextWord = "";
	for (
		var numOfStanzasToCreate = numOfStanzas;
		numOfStanzasToCreate > 0;
		--numOfStanzasToCreate)
	{
		for (
			var numOfLinesPerStanzaToCreate = numOfLinesPerStanza;
			numOfLinesPerStanzaToCreate > 0;
			--numOfLinesPerStanzaToCreate)
		{
			for (
				var numOfWordsPerLineToCreate =
				numOfWordsPerLine - inclusionOfFirstWordInThisLine;
				numOfWordsPerLineToCreate > 0;
				--numOfWordsPerLineToCreate)
			{
				probabilityOfCurrentWordToBeWritten =
					probabilitiesForWordsToBeWritten[
					indexOfProbabilityOfCurrentWordToBeWritten];

				abortIfProbabilityIsInvalid(
					probabilityOfCurrentWordToBeWritten);

				nextWord = pickNextWord(probabilityOfCurrentWordToBeWritten,
					condWordFreqContainer, previousWord);

				poem += nextWord;

				if (numOfWordsPerLineToCreate !=
					NO_WORDS_LEFT_TO_CREATE_FOR_THIS_LINE)
				{
					poem += " ";
				}

				previousWord = nextWord;
				++indexOfProbabilityOfCurrentWordToBeWritten;
			}
			inclusionOfFirstWordInThisLine = 0;
			poem += "\n";
			numOfWordsPerLineToCreate = numOfWordsPerLine;
		}
		poem += "\n";
	}

	return poem;
}

/**
 * Prints a poem whose composing words are determined by the frequency of words
 * in a specified text file and the frequency at which they proceed certain
 * other words in that file.
 *
 * @param inputFilePath - the path of the file to be parsed.
 * @param numOfStanzas - the number of stanzas in the poem produced
 * @param numOfLinesPerStanza - the number of lines per stanza in the poem
 *     produced
 * @param numOfWordsPerLine - the number of words per line in the poem
 *     produced
 * @param probabilitiesForWordToBeWritten - the array containing the
 *     supposedly random probabilities which govern which words constitute the
 *     poem which is produced
 * @param displayDataStructuresChoice - represents the
 *     choice to display the wordCount, wordFreq, condWordCount, and
 *     condWordFreq data structures
 */
function main(
	inputFilePath,
	numOfStanzas, numOfLinesPerStanza, numOfWordsPerLine,
	probabilitiesForWordToBeWritten,
	displayDataStructuresChoice)
{
	var dataStructures = dataStructuresFile.getDataStructures(inputFilePath);

	abortIfArgsAreUnacceptable(
		numOfStanzas, numOfLinesPerStanza, numOfWordsPerLine,
		probabilitiesForWordToBeWritten,
		displayDataStructuresChoice, dataStructures);

	var wordFreqContainer = sortWordFreqContainer(
		dataStructures["wordFreqContainer"]);
	var condWordFreqContainer = sortCondWordFreqContainer(
		dataStructures["condWordFreqContainer"]);

	var poem = makePoem(
		numOfStanzas, numOfLinesPerStanza, numOfWordsPerLine,
		probabilitiesForWordToBeWritten,
		wordFreqContainer, condWordFreqContainer);

	process.stdout.write(poem);

	if (displayDataStructuresChoice)
	{
		dataStructuresFile.displayDataStructures(dataStructures);
	}
}