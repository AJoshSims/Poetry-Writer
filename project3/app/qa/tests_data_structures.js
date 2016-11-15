"use strict";

const assert = require("assert");
const fs = require("fs");

suite("Test suite for data_structures.js", function()
{
	var dataStructuresFile = null;
	var errors = null;
	var ygybrgybString = null;
	var ygybrgybFilePath = null;
	suiteSetup("Suite setup", function()
	{
		dataStructuresFile = require("../data_structures");
		errors = require("../errors");

		ygybrgybString = "\t\n yellow green yellow\n\nblue   red \tgreen  \t\n\t  yellow blue\n\t ";
		ygybrgybFilePath = "ygybrgyb.txt";
		fs.writeFileSync(ygybrgybFilePath, ygybrgybString);
	});

	test("readInputFile", function()
	{
		var thrown = false;
		try
		{
			dataStructuresFile.readInputFile(3);
		}
		catch (error)
		{
			thrown = true;
			assert.deepStrictEqual(
				error instanceof errors.InputFilePathIsNotStringError,
				true, "Error is not InputFilePathIsNotStringError.");
		}
		assert.deepStrictEqual(thrown, true,
			"InputFilePathIsNotStringError is not thrown.");

		var inputFileContent =
			dataStructuresFile.readInputFile(ygybrgybFilePath);
		assert.deepStrictEqual(inputFileContent, ygybrgybString,
			"readInputFile does not return correct string.");
	});

	test("parseInputFile", function()
	{
		var ygybrgybArray = ["yellow", "green", "yellow", "blue", "red",
			"green", "yellow", "blue"];
		var inputFileWords = dataStructuresFile.parseInputFile(ygybrgybString);
		assert.deepStrictEqual(inputFileWords, ygybrgybArray);

		try
		{
			dataStructuresFile.parseInputFile("");
		}
		catch (error)
		{
			assert.deepStrictEqual(
				error instanceof errors.
				InputCannotBeEmptyOrOnlyWhitespaceError,
				true);
		}

		try
		{
			dataStructuresFile.parseInputFile("    \t       \n    ");
		}
		catch (error)
		{
			assert.deepStrictEqual(
				error instanceof errors.
				InputCannotBeEmptyOrOnlyWhitespaceError,
				true);
		}
	});

	test("wordCount", function()
	{
		var wordCountContainerTest = {};
		var condWordCountContainerTest = {};
		var condWordFreqContainerTest = {};
		const testWord = "testWord";
		dataStructuresFile.wordCount(
			testWord,
			wordCountContainerTest,
			condWordCountContainerTest,
			condWordFreqContainerTest);
		var wordCountContainerCorrect = {};
		wordCountContainerCorrect[testWord] = 1;
		assert.deepStrictEqual(
			wordCountContainerTest, wordCountContainerCorrect,
			"wordCountContainer is incorrect for wordCount.");
		var condWordCountContainerCorrect = {};
		condWordCountContainerCorrect[testWord] = {};
		assert.deepStrictEqual(
			condWordCountContainerTest, condWordCountContainerCorrect,
			"condWordCountContainer is incorrect for wordCount.");
		var condWordFreqContainerCorrect = {};
		condWordFreqContainerCorrect[testWord] = {};
		assert.deepStrictEqual(
			condWordFreqContainerTest, condWordFreqContainerCorrect,
			"condWordFreqContainer is incorrect for wordCount.");

		dataStructuresFile.wordCount(
			testWord,
			wordCountContainerTest,
			condWordCountContainerTest,
			condWordFreqContainerTest);
		wordCountContainerCorrect[testWord] =
			wordCountContainerCorrect[testWord] + 1;
		assert.deepStrictEqual(
			wordCountContainerTest, wordCountContainerCorrect,
			"wordCountContainer is incorrect for wordCount.");
		assert.deepStrictEqual(
			condWordCountContainerTest, condWordCountContainerCorrect,
			"condWordCountContainer is incorrect for wordCount.");
		assert.deepStrictEqual(
			condWordFreqContainerTest, condWordFreqContainerCorrect,
			"condWordFreqContainer is incorrect for wordCount.");
	});

	test("condWordCount", function()
	{
		var condWordCountContainerTest = {};
		const testWord01 = "testWord01";
		const testWord02 = "testWord02";
		condWordCountContainerTest[testWord01] = {};
		condWordCountContainerTest[testWord02] = {};
		dataStructuresFile.condWordCount(
			testWord01, testWord02, condWordCountContainerTest);
		var condWordCountContainerCorrect = {};
		condWordCountContainerCorrect[testWord01] = {};
		condWordCountContainerCorrect[testWord01][testWord02] = 1;
		condWordCountContainerCorrect[testWord02] = {};
		assert.deepStrictEqual(
			condWordCountContainerTest, condWordCountContainerCorrect,
			"condWordCountContainer is incorrect for condWordCount.");

		dataStructuresFile.condWordCount(
			null, testWord01, condWordCountContainerTest);
		assert.deepStrictEqual(
			condWordCountContainerTest, condWordCountContainerCorrect,
			"condWordCountContainer is incorrect for condWordCount.")
	});

	test("calculateWordCounts", function()
	{
		const testWord01 = "testWord01";
		const testWord02 = "testWord02";
		const testWord03 = "testWord03";
		const inputFileWords =
			[testWord03, testWord01, testWord01, testWord02,
			testWord03, testWord01, testWord02];
		var wordCountContainerTest = {};
		var condWordCountContainerTest = {};
		var condWordFreqContainerTest = {};
		dataStructuresFile.calculateWordCounts(
			inputFileWords,
			wordCountContainerTest,
			condWordCountContainerTest,
			condWordFreqContainerTest);

		var wordCountContainerCorrect = {};
		wordCountContainerCorrect[testWord01] = 3;
		wordCountContainerCorrect[testWord02] = 2;
		wordCountContainerCorrect[testWord03] = 2;
		var condWordCountContainerCorrect = {};
		condWordCountContainerCorrect[testWord01] = {};
		condWordCountContainerCorrect[testWord02] = {};
		condWordCountContainerCorrect[testWord03] = {};
		condWordCountContainerCorrect[testWord01][testWord01] = 1;
		condWordCountContainerCorrect[testWord01][testWord02] = 2;
		condWordCountContainerCorrect[testWord02][testWord03] = 2;
		condWordCountContainerCorrect[testWord03][testWord01] = 2;
		var condWordFreqContainerCorrect = {};
		condWordFreqContainerCorrect[testWord01] = {};
		condWordFreqContainerCorrect[testWord02] = {};
		condWordFreqContainerCorrect[testWord03] = {};
		assert.deepStrictEqual(
			wordCountContainerTest, wordCountContainerCorrect,
			"wordCountContainer incorrect for calculateWordCounts.");
		assert.deepStrictEqual(
			condWordCountContainerTest, condWordCountContainerCorrect,
			"condWordCountContainer incorrect for calculateWordCounts.");
		assert.deepStrictEqual(
			condWordFreqContainerTest, condWordFreqContainerCorrect,
			"condWordFreqContainer incorrect for calculateWordCounts.");
	});

	test("wordFreq", function()
	{
		const testWord01 = "testWord01";
		const testWord02 = "testWord02";
		var wordCountContainerTest = {};
		wordCountContainerTest[testWord01] = 2;
		wordCountContainerTest[testWord02] = 4;
		var wordCountContainerCorrect = wordCountContainerTest;
		var wordFreqContainerTest = {};
		dataStructuresFile.wordFreq(
			6,
			wordCountContainerTest, wordFreqContainerTest);
		var wordFreqContainerCorrect = {};
		wordFreqContainerCorrect[testWord01] = 2 / 6;
		wordFreqContainerCorrect[testWord02] = 4 / 6;
		assert.deepStrictEqual(
			wordCountContainerTest, wordCountContainerCorrect,
			"wordCountContainer is incorrect for wordFreq");
		assert.deepStrictEqual(
			wordFreqContainerTest, wordFreqContainerCorrect,
			"wordFreqContainer is incorrect for wordFreq.");
	});

	test("condWordFreq", function()
	{
		const testWord01 = "testWord01";
		const testWord02 = "testWord02";
		const testWord03 = "testWord03";
		const testWord04 = "testWord04";
		var condWordCountContainerTest = {};
		condWordCountContainerTest[testWord01] = {};
		condWordCountContainerTest[testWord01][testWord01] = 5;
		condWordCountContainerTest[testWord01][testWord02] = 2;
		condWordCountContainerTest[testWord01][testWord03] = 1;
		condWordCountContainerTest[testWord01][testWord04] = 2;
		condWordCountContainerTest[testWord02] = {};
		condWordCountContainerTest[testWord02][testWord03] = 11;
		condWordCountContainerTest[testWord03] = {};
		condWordCountContainerTest[testWord03][testWord01] = 2;
		condWordCountContainerTest[testWord03][testWord02] = 1;
		condWordCountContainerTest[testWord04] = {};
		var condWordContainerCorrect = condWordCountContainerTest;

		var condWordFreqContainerTest = {};
		condWordFreqContainerTest = {};
		condWordFreqContainerTest[testWord01] = {};
		condWordFreqContainerTest[testWord02] = {};
		condWordFreqContainerTest[testWord03] = {};
		condWordFreqContainerTest[testWord04] = {};

		dataStructuresFile.condWordFreq(
			condWordCountContainerTest, condWordFreqContainerTest);

		var condWordFreqContainerCorrect = {};
		condWordFreqContainerCorrect[testWord01] = {};
		condWordFreqContainerCorrect[testWord01][testWord01] = 5 / 10;
		condWordFreqContainerCorrect[testWord01][testWord02] = 2 / 10;
		condWordFreqContainerCorrect[testWord01][testWord03] = 1 / 10;
		condWordFreqContainerCorrect[testWord01][testWord04] = 2 / 10;
		condWordFreqContainerCorrect[testWord02] = {};
		condWordFreqContainerCorrect[testWord02][testWord03] = 1;
		condWordFreqContainerCorrect[testWord03] = {};
		condWordFreqContainerCorrect[testWord03][testWord01] = 2 / 3;
		condWordFreqContainerCorrect[testWord03][testWord02] = 1 / 3;
		condWordFreqContainerCorrect[testWord04] = {};

		assert.deepStrictEqual(
			condWordCountContainerTest, condWordContainerCorrect,
			"condWordCountContainer is incorrect for condWordFreq.");
		assert.deepStrictEqual(
			condWordFreqContainerTest, condWordFreqContainerCorrect,
			"condWordFreqCounter is incorrect for condWordFreq.");
	});

	test("calculateWordFreqs", function()
	{
		const testWord01 = "testWord01";
		const testWord02 = "testWord02";
		var wordCountContainerTest = {};
		wordCountContainerTest[testWord01] = 10;
		wordCountContainerTest[testWord02] = 20;
		var wordCountContainerCorrect = wordCountContainerTest;
		var wordFreqContainerTest = {};

		var wordFreqContainerCorrect = {};
		wordFreqContainerCorrect[testWord01] = 1 / 3;
		wordFreqContainerCorrect[testWord02] = 2 / 3;




		const testWord03 = "testWord03";
		const testWord04 = "testWord04";
		var condWordCountContainerTest = {};
		condWordCountContainerTest[testWord01] = {};
		condWordCountContainerTest[testWord01][testWord01] = 5;
		condWordCountContainerTest[testWord01][testWord02] = 2;
		condWordCountContainerTest[testWord01][testWord03] = 1;
		condWordCountContainerTest[testWord01][testWord04] = 2;
		condWordCountContainerTest[testWord02] = {};
		condWordCountContainerTest[testWord02][testWord03] = 11;
		condWordCountContainerTest[testWord03] = {};
		condWordCountContainerTest[testWord03][testWord01] = 2;
		condWordCountContainerTest[testWord03][testWord02] = 1;
		condWordCountContainerTest[testWord04] = {};
		var condWordContainerCorrect = condWordCountContainerTest;

		var condWordFreqContainerTest = {};
		condWordFreqContainerTest = {};
		condWordFreqContainerTest[testWord01] = {};
		condWordFreqContainerTest[testWord02] = {};
		condWordFreqContainerTest[testWord03] = {};
		condWordFreqContainerTest[testWord04] = {};

		var condWordFreqContainerCorrect = {};
		condWordFreqContainerCorrect[testWord01] = {};
		condWordFreqContainerCorrect[testWord01][testWord01] = 5 / 10;
		condWordFreqContainerCorrect[testWord01][testWord02] = 2 / 10;
		condWordFreqContainerCorrect[testWord01][testWord03] = 1 / 10;
		condWordFreqContainerCorrect[testWord01][testWord04] = 2 / 10;
		condWordFreqContainerCorrect[testWord02] = {};
		condWordFreqContainerCorrect[testWord02][testWord03] = 1;
		condWordFreqContainerCorrect[testWord03] = {};
		condWordFreqContainerCorrect[testWord03][testWord01] = 2 / 3;
		condWordFreqContainerCorrect[testWord03][testWord02] = 1 / 3;
		condWordFreqContainerCorrect[testWord04] = {};

		dataStructuresFile.calculateWordFreqs(
			30,
			wordCountContainerTest,
			wordFreqContainerTest,
			condWordCountContainerTest,
			condWordFreqContainerTest);

		assert.deepStrictEqual(
			wordCountContainerTest, wordCountContainerCorrect,
			"wordCountContainer is incorrect for calculateWordFreqs");
		assert.deepStrictEqual(
			wordFreqContainerTest, wordFreqContainerCorrect,
			"wordFreqContainer is incorrect for calculateWordFreqs.");
		assert.deepStrictEqual(
			condWordCountContainerTest, condWordContainerCorrect,
			"condWordCountContainer is incorrect for calculateWordFreqs.");
		assert.deepStrictEqual(
			condWordFreqContainerTest, condWordFreqContainerCorrect,
			"condWordFreqCounter is incorrect for calculateWordFreqs.");
	});

	test("getDataStructures", function()
	{
		const wordCountContainer = "wordCountContainer";
		const wordFreqContainer = "wordFreqContainer";
		const condWordCountContainer = "condWordCountContainer";
		const condWordFreqContainer = "condWordFreqContainer";
		const yellow = "yellow";
		const green = "green";
		const red = "red";
		const blue = "blue";
		var dataStructuresTest =
			dataStructuresFile.getDataStructures(ygybrgybFilePath);
		var dataStructuresCorrect = {};
		dataStructuresCorrect[wordCountContainer] = {};
		dataStructuresCorrect[wordCountContainer][yellow] = 3;
		dataStructuresCorrect[wordCountContainer][green] = 2;
		dataStructuresCorrect[wordCountContainer][blue] = 2;
		dataStructuresCorrect[wordCountContainer][red] = 1;
		dataStructuresCorrect[wordFreqContainer] = {};
		dataStructuresCorrect[wordFreqContainer][yellow] = 3 / 8;
		dataStructuresCorrect[wordFreqContainer][green] = 2 / 8;
		dataStructuresCorrect[wordFreqContainer][blue] = 2 / 8;
		dataStructuresCorrect[wordFreqContainer][red] = 1 / 8;
		dataStructuresCorrect[condWordCountContainer] = {};
		dataStructuresCorrect[condWordCountContainer][yellow] = {};
		dataStructuresCorrect[condWordCountContainer][yellow][green] = 1;
		dataStructuresCorrect[condWordCountContainer][yellow][blue] = 2;
		dataStructuresCorrect[condWordCountContainer][green] = {};
		dataStructuresCorrect[condWordCountContainer][green][yellow] = 2;
		dataStructuresCorrect[condWordCountContainer][blue] = {};
		dataStructuresCorrect[condWordCountContainer][blue][red] = 1;
		dataStructuresCorrect[condWordCountContainer][blue][yellow] = 1;
		dataStructuresCorrect[condWordCountContainer][red] = {};
		dataStructuresCorrect[condWordCountContainer][red][green] = 1;
		dataStructuresCorrect[condWordFreqContainer] = {};
		dataStructuresCorrect[condWordFreqContainer][yellow] = {};
		dataStructuresCorrect[condWordFreqContainer][yellow][green] = 1 / 3;
		dataStructuresCorrect[condWordFreqContainer][yellow][blue] = 2 / 3;
		dataStructuresCorrect[condWordFreqContainer][green] = {};
		dataStructuresCorrect[condWordFreqContainer][green][yellow] = 1;
		dataStructuresCorrect[condWordFreqContainer][blue] = {};
		dataStructuresCorrect[condWordFreqContainer][blue][red] = 1 / 2;
		dataStructuresCorrect[condWordFreqContainer][blue][yellow] = 1 / 2;
		dataStructuresCorrect[condWordFreqContainer][red] = {};
		dataStructuresCorrect[condWordFreqContainer][red][green] = 1;

		assert.deepStrictEqual(
			dataStructuresTest[wordCountContainer],
			dataStructuresCorrect[wordCountContainer],
			"wordCountContainer is incorrect for getDataStructures");
		assert.deepStrictEqual(
			dataStructuresTest[wordFreqContainer],
			dataStructuresCorrect[wordFreqContainer],
			"wordFreqContainer is incorrect for getDataStructures");
		assert.deepStrictEqual(
			dataStructuresTest[condWordCountContainer],
			dataStructuresCorrect[condWordCountContainer],
			"condWordCountContainer is incorrect for getDataStructures");
		assert.deepStrictEqual(
			dataStructuresTest[condWordFreqContainer],
			dataStructuresCorrect[condWordFreqContainer],
			"condWordFreqContainer is incorrect for getDataStructures");
		assert.deepStrictEqual(
			dataStructuresTest, dataStructuresCorrect,
			"dataStructures is incorrect for getDataStructures");

		var dataStructuresStringCorrect =
			"wordCount is " +
			JSON.stringify(dataStructuresCorrect["wordCountContainer"], null, "  ") +
			"\nwordFreq is " +
			JSON.stringify(dataStructuresCorrect["wordFreqContainer"], null, "  ") +
			"\ncondWordCount is " +
			JSON.stringify(dataStructuresCorrect["condWordCountContainer"], null, "  ") +
			"\ncondWordFreq is " +
			JSON.stringify(dataStructuresCorrect["condWordFreqContainer"], null, "  ");
	});

	test("getDataStructuresString", function()
	{
		const wordCountContainer = "wordCountContainer";
		const wordFreqContainer = "wordFreqContainer";
		const condWordCountContainer = "condWordCountContainer";
		const condWordFreqContainer = "condWordFreqContainer";
		const yellow = "yellow";
		const green = "green";
		const red = "red";
		const blue = "blue";

		var dataStructures = {};
		dataStructures[wordCountContainer] = {};
		dataStructures[wordCountContainer][yellow] = 3;
		dataStructures[wordCountContainer][green] = 2;
		dataStructures[wordCountContainer][blue] = 2;
		dataStructures[wordCountContainer][red] = 1;
		dataStructures[wordFreqContainer] = {};
		dataStructures[wordFreqContainer][yellow] = 3 / 8;
		dataStructures[wordFreqContainer][green] = 2 / 8;
		dataStructures[wordFreqContainer][blue] = 2 / 8;
		dataStructures[wordFreqContainer][red] = 1 / 8;
		dataStructures[condWordCountContainer] = {};
		dataStructures[condWordCountContainer][yellow] = {};
		dataStructures[condWordCountContainer][yellow][green] = 1;
		dataStructures[condWordCountContainer][yellow][blue] = 2;
		dataStructures[condWordCountContainer][green] = {};
		dataStructures[condWordCountContainer][green][yellow] = 2;
		dataStructures[condWordCountContainer][blue] = {};
		dataStructures[condWordCountContainer][blue][red] = 1;
		dataStructures[condWordCountContainer][blue][yellow] = 1;
		dataStructures[condWordCountContainer][red] = {};
		dataStructures[condWordCountContainer][red][green] = 1;
		dataStructures[condWordFreqContainer] = {};
		dataStructures[condWordFreqContainer][yellow] = {};
		dataStructures[condWordFreqContainer][yellow][green] = 1 / 3;
		dataStructures[condWordFreqContainer][yellow][blue] = 2 / 3;
		dataStructures[condWordFreqContainer][green] = {};
		dataStructures[condWordFreqContainer][green][yellow] = 1;
		dataStructures[condWordFreqContainer][blue] = {};
		dataStructures[condWordFreqContainer][blue][red] = 1 / 2;
		dataStructures[condWordFreqContainer][blue][yellow] = 1 / 2;
		dataStructures[condWordFreqContainer][red] = {};
		dataStructures[condWordFreqContainer][red][green] = 1;

		var dataStructuresStringTest =
			dataStructuresFile.getDataStructuresString(dataStructures);

		var dataStructuresStringCorrect =
			"wordCount is " +
			JSON.stringify(dataStructures[wordCountContainer], null, "  ") +
			"\nwordFreq is " +
			JSON.stringify(dataStructures[wordFreqContainer], null, "  ") +
			"\ncondWordCount is " +
			JSON.stringify(dataStructures[condWordCountContainer], null, "  ") +
			"\ncondWordFreq is " +
			JSON.stringify(dataStructures[condWordFreqContainer], null, "  ");

		assert.deepStrictEqual(
			dataStructuresStringTest, dataStructuresStringCorrect,
			"dataStructuresString is incorrect for getDataStructuresString.");
	});
});
