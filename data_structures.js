/**
 *
 */
var fs = require("fs");

/**
 *
 * @type {number}
 */
var words = 0;

/**
 *
 * @type {{}}
 */
var wordCount = {};

/**
 *
 * @type {{}}
 */
var wordFreq = {};

/**
 *
 * @type {{}}
 */
var condWordCount = {};

/**
 *
 * @type {{}}
 */
var condWordFreq = {};

// /**
//  *
//  */
// function wordCount(word)
// {
//     wordCount[word]++;
// }

/**
 * Reads the input file and
 */
function readFile()
{
    var fileInName = process.argv[2];

    console.log("Reading file...");

    // Opens the input file for reading and reads its entirety while
    // storing its contents, as a string, into fileInContent.
    var fileInContent = fs.readFileSync(fileInName, "utf8");

    console.log("Parsing data...");

    //
    var firstWord = null;

    //
    var previousWord = null;

    //
    fileInContent.trim().split(/\s/).forEach(
        function(currentWord)
        {
            //TODO remove
            console.log(currentWord);

            words++;

            if (wordCount[currentWord] == undefined)
            {
                wordCount[currentWord] = 1;
            }

            else
            {
                wordCount[currentWord] = wordCount[currentWord] + 1;
            }

            // TODO remove
            console.log(currentWord + " occurs " +
                wordCount[currentWord] + " times.");

            if (previousWord == null)
            {
                firstWord = currentWord;
            }

            else
            {
                // condWordCount[previousWord][currentWord] =
                //     condWordCount[previousWord][currentWord] + 1;
            }

            previousWord = currentWord;
        });

        // var lastWord = previousWord;
        // condWordCount[lastWord][firstWord] =
        //     condWordCount[lastWord][firstWord] + 1;
}

readFile();

console.log("The number of words in that file is " + words + ".");


