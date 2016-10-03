/**
 * Enables file I/O operations.
 */
var fs = require("fs");

/**
 * The name of the file that contains the words to be examined.
 */
var inputFileName = process.argv[2];

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

// Parses the words of a specified text file such that the number of
// occurrences of a word and the likelihood of a word's occurrence, as
// well as the occurrences and likelihood of each word which appears directly
// after that word, are calculated and printed to the console.
main(inputFileName);

/**
 * Determines whether or not the appropriate number of arguments was passed
 * and aborts the program if too many or too few arguments were passed.
 */
function determineIfArgsAreAcceptable()
{
    const ACCEPTABLE_NUM_OF_ARGS = 3;
    if (process.argv.length != ACCEPTABLE_NUM_OF_ARGS)
    {
        const UNACCEPTABLE_NUM_OF_ARGS = 1;
        console.log("You have specified an incorrect number of arguments." +
            "\nUsage: node data_structures.js <input_file_name>" +
            "\nAborting program...");
        process.exit(UNACCEPTABLE_NUM_OF_ARGS);
    }
}

/**
 * Reads and temporarily stores the contents the specified input file so that
 * it may be parsed.
 *
 * @param inputFileName - the name of the file to be parsed.
 *
 * @return inputFileContent - the contents of the input file as a string.
 */
function readInputFile(inputFileName)
{
    try
    {
        // Opens the input file for reading and reads its entirety while
        // storing its contents, as a string, into inputFileContent.
        var inputFileContent = fs.readFileSync(inputFileName, "utf8");
    }

    // If the specified file could not be read...
    catch(error)
    {
        if (error.code == "ENOENT")
        {
            console.log("The specified input file does not exist or is not " +
                "readable.\nAborting program...");

            const CANNOT_READ_SPECIFIED_INPUT_FILE = 1;
            process.exit(CANNOT_READ_SPECIFIED_INPUT_FILE);
        }
        else
        {
            //Unknown error. This should never execute.
            throw error;
        }
    }

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
    if (inputFileWords.length == 1
        && inputFileWords[onlyWord] == "")
    {
        console.log("Input can not be empty or only be whitespace.");
        process.exit(1);
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
function wordCount(currentWord)
{
    // If this word has not been encountered before, establish its existence in
    // the presentation data.
    if (wordCountContainer[currentWord] == undefined)
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
function condWordCount(previousWord, currentWord)
{
    if (previousWord != null)
    {
        // If current word has, until now, not been encountered after the
        // previous word, establishes its relationship to the previous word.
        if (condWordCountContainer[previousWord][currentWord] == undefined) {
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
function calculateWordCounts(inputFileWords)
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
            wordCount(currentWord);

            condWordCount(previousWord, currentWord);

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
        inputFileWords[firstWord]);

    return inputFileWords.length;
}

/**
 * Determines the likelihood of each word to appear in the input file based
 * on the number of its actual appearance(s) in the input file.
 *
 * @param numOfWords - the number of words in the input file
 */
function wordFreq(numOfWords)
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
function condWordFreq()
{
    for (var wordBefore in condWordCountContainer)
    {
        for (var wordAfter in condWordCountContainer[wordBefore])
        {
            condWordFreqContainer[wordBefore][wordAfter] =
                condWordCountContainer[wordBefore][wordAfter]
                / Object.keys(condWordCountContainer[wordBefore]).length;
        }
    }
}

/**
 * Determines the likelihood of each word to appear in the input file based
 * on the number of its actual appearance(s) in the input file. Also determines
 * the likelihood of each word to appear after the words it directly follows
 * based on the number of its actual appearances after those words.
 */
function calculateWordFrequencies()
{
    wordFreq();

    condWordFreq();
}

/**
 * Prints to the console the information gathered about the words in the
 * specified input file.
 */
function printWordCountsAndWordFrequencies()
{
    console.log("wordCount is " +
        JSON.stringify(wordCountContainer, null, "  "));
    console.log("wordFreq is " +
        JSON.stringify(wordFreqContainer, null, "  "));
    console.log("condWordCount is " +
        JSON.stringify(condWordCountContainer, null, "  "));
    console.log("condWordFreq is " +
        JSON.stringify(condWordFreqContainer, null, "  "));
}

/**
 * Parses the words of a specified text file such that the number of
 * occurrences of a word and the likelihood of a word's occurrence, as
 * well as the occurrences and likelihood of each word which appears directly
 * after that word, are calculated and printed to the console.
 *
 * @param inputFileName - the name of the file to be parsed
 */
function main(inputFileName)
{
    determineIfArgsAreAcceptable();

    var inputFileWords = parseInputFile(readInputFile(inputFileName));

    calculateWordFrequencies(calculateWordCounts(inputFileWords));

    printWordCountsAndWordFrequencies();
}