"use strict";

suite("Test suite for make_poem.js", function()
{
	var makePoemFile = null;
	var errors = null;
	var ygybrgybString = null;
	var ygybrgybFilePath = null;
	suiteSetup("Suite setup", function()
	{
		makePoemFile = require("../make_poem");
		errors = require("../errors");

		ygybrgybString = "\t\n yellow green yellow\n\nblue   red \tgreen  \t\n\t  yellow blue\n\t ";
		ygybrgybFilePath = "ygybrgyb.txt";
		fs.writeFileSync(ygybrgybFilePath, ygybrgybString);
	});

	test("abortIfNotIntegers", function()
	{
		var thrown = false;
		try
		{
			makePoemFile.abortIfNotIntegers("notInt", 2, 3);
		}
		catch (error)
		{
			assert.deepStrictEqual(
				error instanceof errors.
				StanzasOrLinesPerStanzaOrWordsPerLineIsNotIntegerError,
				true,
				"StanzasOrLinesPerStanzaOrWordsPerLineIsNotIntegerError is incorrect for abortIfNotIntegers.");
			thrown = true;
		}
		assert.deepStrictEqual(
			thrown, true,
			"StanzasOrLinesPerStanzaOrWordsPerLineIsNotIntegerError is incorrect for abortIfNotIntegers.");
		thrown = false;
		try
		{
			makePoemFile.abortIfNotIntegers(1, "notInt", 3);
		}
		catch (error)
		{
			assert.deepStrictEqual(
				error instanceof errors.
					StanzasOrLinesPerStanzaOrWordsPerLineIsNotIntegerError,
				true,
				"StanzasOrLinesPerStanzaOrWordsPerLineIsNotIntegerError is incorrect for abortIfNotIntegers.");
			thrown = true;
		}
		assert.deepStrictEqual(
			thrown, true,
			"StanzasOrLinesPerStanzaOrWordsPerLineIsNotIntegerError is incorrect for abortIfNotIntegers.");
		thrown = false;
		try
		{
			makePoemFile.abortIfNotIntegers(1, 2, "notInt");
		}
		catch (error)
		{
			assert.deepStrictEqual(
				error instanceof errors.
					StanzasOrLinesPerStanzaOrWordsPerLineIsNotIntegerError,
				true,
				"StanzasOrLinesPerStanzaOrWordsPerLineIsNotIntegerError is incorrect for abortIfNotIntegers.");
			thrown = true;
		}
		assert.deepStrictEqual(
			thrown, true,
			"StanzasOrLinesPerStanzaOrWordsPerLineIsNotIntegerError is incorrect for abortIfNotIntegers.");
	});
});