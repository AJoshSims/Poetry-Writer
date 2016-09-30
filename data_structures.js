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
    fileInContent.trim().split(/\s+/).forEach(
        function(currentWord)
        {
            //TODO remove
            console.log(currentWord);

            words++;

            if (wordCount[currentWord] == undefined)
            {
                wordCount[currentWord] = 1;

                condWordCount[currentWord] = {};
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

            previousWord = currentWord;
        }
    );

    var lastWord = previousWord;

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

    for (var word in wordCount)
    {
        wordFreq[word] = wordCount[word] / words;

        //TODO remove
        console.log("There is a " + wordFreq[word] + " chance of " +
            "encountering " + word);
    }
}

readFile();

//TODO remove
console.log("The number of words in that file is " + words + ".");


