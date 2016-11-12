"use strict";

const assert = require("assert");

suite("Tests for data_structures.js", function()
{
	const dataStructuresFile = require("../data_structures");
	const errors = require("../errors");

	// TODO not done
	test("readInputFile test", function()
	{
		const readInputFile = dataStructuresFile.readInputFile;

		var inputFileContent = null;
		try
		{
			inputFileContent = readInputFile("non-existent-file");
		}
		catch (error)
		{
			assert.deepStrictEqual(
				error instanceof errors.InputFileDoesNotExistError, false);
		}
		try
		{
			inputFileContent = readInputFile(3);
		}
		catch (error)
		{
			assert.deepStrictEqual(
				error instanceof errors.InputFilePathIsNotStringError, false);
		}
	});

	test("parseInputFile", function()
	{

	});
});
