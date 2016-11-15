"use strict";

/**
 * Parses the words of a specified text file such that the number of
 * occurrences of a word and the likelihood of a word's occurrence, as
 * well as the occurrences and likelihood of each word which appears directly
 * after that word, are calculated and stored in objects.
 *
 * <p>Usage: node data_structures.js &lt;input_text_file&gt;
 *
 * @author Joshua Sims
 * @version 03 October 2016
 */

// Imports and exports
/**
 * Enables the exportation of this file's functions.
 */
var exports = module.exports = {};
exports.wordCountContainer = wordCountContainer;
exports.condWordCountContainer = condWordCountContainer;
exports.wordFreqContainer = wordFreqContainer;
exports.condWordFreqContainer = condWordFreqContainer;
exports.readInputFile = readInputFile;
exports.parseInputFile = parseInputFile;
exports.wordCount = wordCount;
exports.condWordCount = condWordCount;
exports.calculateWordCounts = calculateWordCounts;
exports.wordFreq = wordFreq;
exports.condWordFreq = condWordFreq;
exports.calculateWordFreqs = calculateWordFreqs;
exports.getDataStructures = getDataStructures;
exports.getDataStructuresString = getDataStructuresString;

var errors = require("./errors");

/**
 * Enables file I/O operations.
 */
var fs = require("fs");

// Data structures
/**
 * Describes how many times each word appears in the input file.
 */
var wordCountContainer = {};

/**
 * Describes the likelihood of each word in the input file to appear in the
 * input file.
 */
var wordFreqContainer = {};

/**
 * Describes which words immediately follow which words and how many times they
 * do so.
 */
var condWordCountContainer = {};

/**
 * Describes which words immediately follow which words and how likely they are
 * to do so.
 */
var condWordFreqContainer = {};

// Functions
/**
 * Reads and temporarily stores the contents the specified input file so that
 * it may be parsed.
 *
 * @param inputFilePath - the path of the file to be parsed.
 *
 * @return inputFileContent - the contents of the input file as a string.
 */
function readInputFile(inputFilePath)
{
    if ((typeof inputFilePath).toLowerCase() != "string")
    {
        throw new errors.InputFilePathIsNotStringError();
    }

    // Opens the input file for reading and reads its entirety while
    // storing its contents, as a string, into inputFileContent.
    var inputFileContent = fs.readFileSync(inputFilePath, "utf8");

    return inputFileContent;
}

/**
 * Parses the contents of the specified input file such that all whitespace is
 * skipped.
 *
 * @param inputFileContent - the contents of the specified input file.
 *
 * @return inputFileWords - an array of the words found in the input file.
 */
function parseInputFile(inputFileContent)
{
    // Parses the contents of the specified input file such that all whitespace
    // is skipped.
    var inputFileWords = inputFileContent.trim().split(/\s+/);

    // Aborts the program if the specified input file is either empty or
    // composed only of whitespace.
    var onlyWord = inputFileWords.length - 1;
    if (inputFileWords.length === 1
        && inputFileWords[onlyWord] === "")
    {
        throw new errors.InputCannotBeEmptyOrOnlyWhitespaceError();
    }

    return inputFileWords;
}

/**
 * Determines how many times each word in the input file appears in the input
 * file as well as how many times each word appears after the word(s) which
 * precede it.
 *
 * @param currentWord - the word currently being examined
 */
function wordCount(
    currentWord,
    wordCountContainer, condWordCountContainer, condWordFreqContainer)
{
    // If this word has not been encountered before, establish its existence in
    // the presentation data.
    if (wordCountContainer[currentWord] === undefined)
    {
        wordCountContainer[currentWord] = 1;
        condWordCountContainer[currentWord] = {};
        condWordFreqContainer[currentWord] = {};
    }
    // Otherwise, just increment the number of times that this word has
    // appeared.
    else
    {
        wordCountContainer[currentWord] = wordCountContainer[currentWord] + 1;
    }
}

/**
 * Determines how many times the currently examined word appears after the
 * previously examined word.
 *
 * @param previousWord - the word previously examined.
 * @param currentWord - the word currently being examined.
 */
function condWordCount(previousWord, currentWord, condWordCountContainer)
{
    if (previousWord != null)
    {
        // If current word has, until now, not been encountered after the
        // previous word, establishes its relationship to the previous word.
        if (condWordCountContainer[previousWord][currentWord] === undefined) {
            condWordCountContainer[previousWord][currentWord] = 1;
        }

        // Otherwise, just increment the number of times that the current word
        // has appeared after the previous word.
        else {
            condWordCountContainer[previousWord][currentWord] =
                condWordCountContainer[previousWord][currentWord] + 1;
        }
    }
}

/**
 * Determines the number of times that each word in the input file appears in
 * the input file and also determines how many times the currently examined
 * word appears after the previously examined word.
 *
 * @param inputFileWords - an array of the words found in the input file
 *
 * @return the number of words in the input file
 */
function calculateWordCounts(
    inputFileWords,
    wordCountContainer, condWordCountContainer, condWordFreqContainer)
{
    // The first word found in the input file.
    var firstWord = null;
    // The word previously examined.
    var previousWord = null;
    // Examines each word found in the input file, recording how many times
    // the currently examined word appears in the input file and how many times
    // it appears after the previously examined word.
    inputFileWords.forEach(
        function(currentWord)
        {
            wordCount(
                currentWord,
                wordCountContainer,
                condWordCountContainer,
                condWordFreqContainer);

            condWordCount(previousWord, currentWord, condWordCountContainer);

            previousWord = currentWord;
        }
    );

    // The word after the last word is the first word of the input file.
    // Thus, this code calculates how many times the word appearing first in
    // the input file has appeared after the word appearing last in the input
    // file.
    var lastWord = inputFileWords.length - 1;
    var firstWord = 0;
    condWordCount(inputFileWords[lastWord],
        inputFileWords[firstWord], condWordCountContainer);

    return inputFileWords.length;
}

/**
 * Determines the likelihood of each word to appear in the input file based
 * on the number of its actual appearance(s) in the input file.
 *
 * @param numOfWords - the number of words in the input file
 */
function wordFreq(numOfWords, wordCountContainer, wordFreqContainer)
{
    for (var word in wordCountContainer)
    {
        wordFreqContainer[word] = wordCountContainer[word] / numOfWords;
    }
}

/**
 * Determines the likelihood of each word to appear after the words it
 * directly follows based on the number of its actual appearances after those
 * words.
 */
function condWordFreq(condWordCountContainer, condWordFreqContainer)
{
    var sumOfEveryOccurrenceOfEachWordAfter = 0;
    for (var wordBefore in condWordCountContainer)
    {
        for (var wordAfter in condWordCountContainer[wordBefore])
        {
            sumOfEveryOccurrenceOfEachWordAfter +=
                condWordCountContainer[wordBefore][wordAfter];
        }

        for (var wordAfter in condWordCountContainer[wordBefore])
        {
            condWordFreqContainer[wordBefore][wordAfter] =
                condWordCountContainer[wordBefore][wordAfter]
                / sumOfEveryOccurrenceOfEachWordAfter;
        }

        sumOfEveryOccurrenceOfEachWordAfter = 0;
    }
}

/**
 * Determines the likelihood of each word to appear in the input file based
 * on the number of its actual appearance(s) in the input file. Also determines
 * the likelihood of each word to appear after the words it directly follows
 * based on the number of its actual appearances after those words.
 *
 * @param numOfWords - the number of words in the input file
 */
function calculateWordFreqs(
    numOfWords,
    wordCountContainer,
    wordFreqContainer,
    condWordCountContainer,
    condWordFreqContainer)
{
    wordFreq(numOfWords, wordCountContainer, wordFreqContainer);

    condWordFreq(condWordCountContainer, condWordFreqContainer);
}

/**
 * Parses the words of a specified text file such that the number of
 * occurrences of a word and the likelihood of a word's occurrence, as
 * well as the occurrences and likelihood of each word which appears directly
 * after that word, are returned via an array of data structures.
 *
 * @param inputFilePath - the path of the file to be parsed
 *
 * @return dataStructures - objects containing information regarding the number
 *     of occurrences of each word in the input file and the likelihood of each
 *     word's occurrence, as well as the occurrences and likelihood of each
 *     word which appears directly after
 */
function getDataStructures(inputFilePath)
{
    var inputFileWords = parseInputFile(readInputFile(inputFilePath));

    calculateWordFreqs(
        calculateWordCounts(inputFileWords,
        wordCountContainer, condWordCountContainer, condWordFreqContainer),
        wordCountContainer,
        wordFreqContainer,
        condWordCountContainer,
        condWordFreqContainer);

    var dataStructures =
        {"wordCountContainer" : wordCountContainer,
        "wordFreqContainer" : wordFreqContainer,
        "condWordCountContainer" : condWordCountContainer,
        "condWordFreqContainer" : condWordFreqContainer};
    return dataStructures;
}

/**
 * Prints to standard output the string equivalents of the objects containing
 * information regarding the number of occurrences of each word in the input
 * file and the likelihood of each word's occurrence, as well as the
 * occurrences and likelihood of each word which appears directly after.
 *
 * @param dataStructures - objects containing information regarding the number
 *     of occurrences of each word in the input file and the likelihood of each
 *     word's occurrence, as well as the occurrences and likelihood of each
 *     word which appears directly after
 */
function getDataStructuresString(dataStructures)
{
    var dataStructuresString =
        "wordCount is " +
        JSON.stringify(dataStructures["wordCountContainer"], null, "  ") +
        "\nwordFreq is " +
        JSON.stringify(dataStructures["wordFreqContainer"], null, "  ") +
        "\ncondWordCount is " +
        JSON.stringify(dataStructures["condWordCountContainer"], null, "  ") +
        "\ncondWordFreq is " +
        JSON.stringify(dataStructures["condWordFreqContainer"], null, "  ");

    return dataStructuresString;
}