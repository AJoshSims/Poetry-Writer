"use strict";

const assert = require("assert");

suite("Tests for data_structures.js", function()
{
	const dataStructuresFile = require("../data_structures");
	const errors = require("../errors");

	test("readInputFile", function()
	{
		const readInputFile = dataStructuresFile.readInputFile;
		var inputFileContent = null;

		try
		{
			inputFileContent = readInputFile(3);
		}
		catch (error)
		{
			assert.deepStrictEqual(
				error instanceof errors.InputFilePathIsNotStringError, true);
		}

		try
		{
			inputFileContent = readInputFile("non-existent-file");
		}
		catch (error)
		{
			assert.deepStrictEqual(
				error instanceof errors.InputFileDoesNotExistError, true);
		}

		inputFileContent = readInputFile("rbbrrg_input_text.txt");
	});

	test("parseInputFile", function()
	{
		const parseInputFile = dataStructuresFile.parseInputFile;
		var inputFileWords = null;

		inputFileWords = parseInputFile("this is four words");
		assert.deepStrictEqual(inputFileWords.length === 4, true);

		try
		{
			inputFileWords = parseInputFile("");
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
			inputFileWords = parseInputFile("    \t       \n    ");
		}
		catch (error)
		{
			assert.deepStrictEqual(
				error instanceof errors.
				InputCannotBeEmptyOrOnlyWhitespaceError,
				true);
		}
	});
});
