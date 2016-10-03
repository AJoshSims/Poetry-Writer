// Enables file I/O operations
var fs = require("fs");

/**
 * The name of the file that contains the words to be examined.
 */
var inputFileName = process.argv[2];

/**
 * Describes how many times each word appears in the input file.
 */
var wordCount = {};

/**
 * Describes the likelihood of each word in the input file to appear in the
 * input file.
 */
var wordFreq = {};

/**
 * Describes which words immediately follow which words and how many times they
 * do so.
 */
var condWordCount = {};

/**
 * Describes which words immediately follow which words and how likely they are
 * to do so.
 */
var condWordFreq = {};

// Parses the specified input file and then calculates and stores data in
// wordCount, wordFreq, condWordCount, and condWordFreq before printing that
// data to the console.
main(inputFileName);

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
 * file.
 *
 * @param currentWord - the word currently being examined
 */
function wordCountFunc(currentWord)
{
    // If this word has not been encountered before, establish its existence in
    // the presentation data.
    if (wordCount[currentWord] == undefined)
    {
        wordCount[currentWord] = 1;
        condWordCount[currentWord] = {};
        condWordFreq[currentWord] = {};
    }
    // Otherwise, just increment the number of times that this word has
    // appeared.
    else
    {
        wordCount[currentWord] = wordCount[currentWord] + 1;
    }
}

/**
 * Determines how many times the currently examined word appears after the
 * previously examined word.
 *
 * @param previousWord - the word previously examined.
 * @param currentWord - the word currently being examined.
 */
function condWordCountFunc(previousWord, currentWord)
{
    if (previousWord != null)
    {
        // If current word has, until now, not been encountered after the previous
        // word, establish its relationship to the previous word in the
        // presentation data.
        if (condWordCount[previousWord][currentWord] == undefined) {
            condWordCount[previousWord][currentWord] = 1;
        }

        // Otherwise, just increment the number of times that the current word has
        // appeared after the previous word.
        else {
            condWordCount[previousWord][currentWord] =
                condWordCount[previousWord][currentWord] + 1;
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
            wordCountFunc(currentWord);

            condWordCountFunc(previousWord, currentWord);

            previousWord = currentWord;
        }
    );

    // The word after the last word is the first word of the input file.
    // Thereby calculates how many times the word appearing first in the input
    // file has appeared after the word appearing last in the input file.
    var lastWord = inputFileWords.length - 1;
    var firstWord = 0;
    condWordCountFunc(inputFileWords[lastWord],
        inputFileWords[firstWord]);

    return inputFileWords.length;
}

/**
 * Determines the likelihood of each word to appear in the input file based
 * on the number of its actual appearance(s) in the input file.
 *
 * @param words - the number of words in the input file
 */
function wordFreqFunc(words)
{
    for (var word in wordCount)
    {
        wordFreq[word] = wordCount[word] / words;
    }
}

/**
 * Determines the likelihood of each word to appear after the words it
 * directly follows based on the number of its actual appearances after those
 * words.
 */
function condWordFreqFunc(words)
{
    for (var wordBefore in condWordCount)
    {
        for (var wordAfter in condWordCount[wordBefore])
        {
            condWordFreq[wordBefore][wordAfter] =
                condWordCount[wordBefore][wordAfter]
                / Object.keys(condWordCount[wordBefore]).length;
        }
    }
}

/**
 * Determines the likelihood of each word to appear in the input file based
 * on the number of its actual appearance(s) in the input file. Also determines
 * the likelihood of each word to appear after the words it directly follows
 * based on the number of its actual appearances after those words.
 */
function calculateWordFrequencies(words)
{
    wordFreqFunc(words);

    condWordFreqFunc(words);
}

/**
 * Prints to the console the information gathered about the words in the
 * specified input file.
 */
function printWordCountsAndWordFrequencies()
{
    console.log("wordCount is " + JSON.stringify(wordCount, null, "  "));
    console.log("wordFreq is " + JSON.stringify(wordFreq, null, "  "));
    console.log("condWordCount is " + JSON.stringify(condWordCount, null, "  "));
    console.log("condWordFreq is " + JSON.stringify(condWordFreq, null, "  "));
}

/**
 * Parses the specified input file and then calculates and stores data in
 * wordCount, wordFreq, condWordCount, and condWordFreq before printing that
 * data to the console.
 *
 * @param inputFileName - the name of the file to be parsed
 */
function main(inputFileName)
{
    var inputFileWords = parseInputFile(readInputFile(inputFileName));

    calculateWordFrequencies(calculateWordCounts(inputFileWords));

    printWordCountsAndWordFrequencies();
}

