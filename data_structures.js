/**
 *
 */
var fs = require("fs");

/**
 *
 */
var inputFileName = process.argv[2];

/**
 *
 */
var wordCount = {};

/**
 *
 */
var wordFreq = {};

/**
 *
 */
var condWordCount = {};

/**
 *
 */
var condWordFreq = {};
{

}

//
main(inputFileName);

/**
 *
 * @param inputFileName
 */
function readInputFile(inputFileName)
{
    console.log("Reading file...");

    // Opens the input file for reading and reads its entirety while
    // storing its contents, as a string, into fileInContent.
    var fileInContent = fs.readFileSync(inputFileName, "utf8");

    return fileInContent;
}

/**
 *
 * @param inputFileContent
 */
function parseInputFile(inputFileContent)
{
    console.log("Parsing data...");
    //
    var inputFileWords = inputFileContent.trim().split(/\s+/);

    //
    if (inputFileWords.length == 1
        && inputFileWords[inputFileWords.length - 1] == "")
    {
        console.log("Input can not be empty or only be whitespace.");
        process.exit(1);
    }

    //
    return inputFileWords;
}

/**
 *
 */
function wordCountFunc(currentWord)
{
    if (wordCount[currentWord] == undefined)
    {
        wordCount[currentWord] = 1;

        condWordCount[currentWord] = {};

        condWordFreq[currentWord] = {};
    }

    else
    {
        wordCount[currentWord] = wordCount[currentWord] + 1;
    }

    // TODO remove
    console.log(currentWord + " occurs " +
        wordCount[currentWord] + " times.");
}

/**
 *
 */
function condWordCountFunc(previousWord, currentWord)
{
    if (condWordCount[previousWord][currentWord] == undefined)
    {
        condWordCount[previousWord][currentWord] = 1;
    }

    else
    {
        condWordCount[previousWord][currentWord] =
            condWordCount[previousWord][currentWord] + 1;
    }

    // TODO remove
    console.log(currentWord + " occurs " +
        condWordCount[previousWord][currentWord] + " times after " +
        previousWord);
}

/**
 *
 */
function condWordCountForLastWord(firstWord, lastWord)
{
    if (condWordCount[lastWord][firstWord] == undefined)
    {
        condWordCount[lastWord][firstWord] = 1;
    }

    else
    {
        condWordCount[lastWord][firstWord] =
            condWordCount[lastWord][firstWord] + 1;
    }

    // TODO remove
    console.log(firstWord + " occurs " +
        condWordCount[lastWord][firstWord] + " times after " +
        lastWord);
}

/**
 *
 */
function calculateWordCounts(inputFileWords)
{
    //
    var words = 0;

    //
    var firstWord = null;
    //
    var previousWord = null;
    //
    inputFileWords.forEach(
        function(currentWord)
        {
            words++;

            wordCountFunc(currentWord);

            if (previousWord == null)
            {
                firstWord = currentWord;
            }

            else
            {
                condWordCountFunc(previousWord, currentWord);
            }

            previousWord = currentWord;
        }
    );

    //
    var lastWord = previousWord;
    condWordCountForLastWord(firstWord, lastWord);

    return words;
}

/**
 *
 */
function wordFreqFunc(words)
{
    for (var word in wordCount)
    {
        wordFreq[word] = wordCount[word] / words;

        //TODO remove
        console.log("There is a " + wordFreq[word] + " chance of " +
            "encountering " + word);
    }

}

/**
 *
 */
function condWordFreqFunc(words)
{
    for (var wordBefore in condWordCount)
    {
        for (var wordAfter in condWordCount[wordBefore])
        {
            condWordFreq[wordBefore][wordAfter] =
                condWordCount[wordBefore][wordAfter] / words;

            // TODO remove
            console.log("There is a " + condWordFreq[wordBefore][wordAfter] +
                " chance of " + "encountering " + wordAfter + " after " +
                wordBefore);
        }
    }
}

/**
 *
 */
function calculateWordFrequencies(words)
{
    wordFreqFunc(words);

    condWordFreqFunc(words);
}

/**
 *
 */
function printWordCountsAndWordFrequencies()
{

}

function main(inputFileName)
{
    var inputFileWords = parseInputFile(readInputFile(inputFileName));

    calculateWordFrequencies(calculateWordCounts(inputFileWords));

    printWordCountsAndWordFrequencies();
}

