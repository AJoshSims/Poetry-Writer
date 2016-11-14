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
		dataStructuresFile.wordCountContainer = {};
		assert.deepStrictEqual(
			dataStructuresFile.wordCountContainer, {},
			"Initial wordCountConainer is not empty.");

		var wordA = "wordA";
		dataStructuresFile.wordCount(wordA);
		assert.deepStrictEqual(
			dataStructuresFile.wordCountContainer[wordA], 1, "freq is wrong");
	});
});
