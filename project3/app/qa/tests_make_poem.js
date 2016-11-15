"use strict";

/**
 * Test suite for make_poem.js
 *
 * @author Joshua Sims
 * @version 10 November 2016
 */

const assert = require("assert");
const fs = require("fs");

suite("Test suite for make_poem.js", function()
{
	var makePoemFile = null;
	var errors = null;
	var rbbrrgString = null;
	var rbbrrgFilePath = null;
	suiteSetup("Suite setup", function()
	{
		makePoemFile = require("../make_poem");
		errors = require("../errors");

		rbbrrgString = "red blue blue red red green";
		rbbrrgFilePath = "rbbrrg_input_text.txt";
		fs.writeFileSync(rbbrrgFilePath, rbbrrgString);
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

	test("abortIfProbabilitiesArrayIsInvalid", function()
	{
		var thrown = false;
		try
		{
			makePoemFile.abortIfProbabilitiesArrayIsInvalid("notArray");
		}
		catch (error)
		{
			assert.deepStrictEqual(
				error instanceof errors.ProbabilitiesArrayIsNotArrayError, true,
				"ProbabilitiesArrayIsNotArrayError is incorrect for abortIfProbabilitiesArrayIsInvalid.")
			thrown = true;
		}
		assert.deepStrictEqual(
			thrown, true,
			"ProbabilitiesArrayIsNotArrayError is incorrect for abortIfProbabilitiesArrayIsInvalid.");

		thrown = false;
		try
		{
			makePoemFile.abortIfProbabilitiesArrayIsInvalid([]);
		}
		catch (error)
		{
			assert.deepStrictEqual(
				error instanceof errors.ProbabilitiesArrayIsEmptyError, true,
				"ProbabilitiesArrayIsEmptyError is incorrect for abortIfProbabilitiesArrayIsInvalid.")
			thrown = true;
		}
		assert.deepStrictEqual(
			thrown, true,
			"ProbabilitiesArrayIsEmptyError is incorrect for abortIfProbabilitiesArrayIsInvalid.");
	});

	test("abortIfProbabilitiesArrayLengthNotEqualsNumOfPoemWords", function()
	{
		var thrown = false;
		try
		{
			makePoemFile.
				abortIfProbabilitiesArrayLengthNotEqualsNumOfPoemWords(
				1, 2, 3, [0.1, 0.5, 0.2, 0.67, 0.89, 1, 99]);
		}
		catch (error)
		{
			assert.deepStrictEqual(
				error instanceof errors.
				LengthOfProbabilitiesIsNotEqualToNumOfPoemWordsError,
				true,
				"LengthOfProbabilitiesIsNotEqualToNumOfPoemWordsError is incorrect for abortIfProbabilitiesArrayLengthNotEqualsNumOfPoemWords.")
			thrown = true;
		}
		assert.deepStrictEqual(
			thrown, true,
			"LengthOfProbabilitiesIsNotEqualToNumOfPoemWordsError is incorrect for abortIfProbabilitiesArrayLengthNotEqualsNumOfPoemWords.");
	});

	test("abortIfdisplayDataStructuresChoiceNotBoolean", function()
	{
		var thrown = false;
		try
		{
			makePoemFile.
			abortIfdisplayDataStructuresChoiceNotBoolean("notBoolean");
		}
		catch (error)
		{
			assert.deepStrictEqual(
				error instanceof errors.
				DisplayDataStructuresChoiceIsNotBooleanError,
				true,
				"DisplayDataStructuresChoiceIsNotBooleanError is incorrect for abortIfdisplayDataStructuresChoiceNotBoolean.")
			thrown = true;
		}
		assert.deepStrictEqual(
			thrown, true,
			"DisplayDataStructuresChoiceIsNotBooleanError is incorrect for abortIfdisplayDataStructuresChoiceNotBoolean.");
	});

	test("abortIfArgsAreUnacceptable", function()
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
				"StanzasOrLinesPerStanzaOrWordsPerLineIsNotIntegerError is incorrect for abortIfArgsAreUnacceptable.");
			thrown = true;
		}
		assert.deepStrictEqual(
			thrown, true,
			"StanzasOrLinesPerStanzaOrWordsPerLineIsNotIntegerError is incorrect for abortIfArgsAreUnacceptable.");
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
				"StanzasOrLinesPerStanzaOrWordsPerLineIsNotIntegerError is incorrect for abortIfArgsAreUnacceptable.");
			thrown = true;
		}
		assert.deepStrictEqual(
			thrown, true,
			"StanzasOrLinesPerStanzaOrWordsPerLineIsNotIntegerError is incorrect for abortIfArgsAreUnacceptable.");
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
				"StanzasOrLinesPerStanzaOrWordsPerLineIsNotIntegerError is incorrect for abortIfArgsAreUnacceptable.");
			thrown = true;
		}
		assert.deepStrictEqual(
			thrown, true,
			"StanzasOrLinesPerStanzaOrWordsPerLineIsNotIntegerError is incorrect for abortIfArgsAreUnacceptable.");

		thrown = false;
		try
		{
			makePoemFile.abortIfProbabilitiesArrayIsInvalid("notArray");
		}
		catch (error)
		{
			assert.deepStrictEqual(
				error instanceof errors.ProbabilitiesArrayIsNotArrayError, true,
				"ProbabilitiesArrayIsNotArrayError is incorrect for abortIfArgsAreUnacceptable.")
			thrown = true;
		}
		assert.deepStrictEqual(
			thrown, true,
			"ProbabilitiesArrayIsNotArrayError is incorrect for abortIfArgsAreUnacceptable.");
		thrown = false;
		try
		{
			makePoemFile.abortIfProbabilitiesArrayIsInvalid([]);
		}
		catch (error)
		{
			assert.deepStrictEqual(
				error instanceof errors.ProbabilitiesArrayIsEmptyError, true,
				"ProbabilitiesArrayIsEmptyError is incorrect for abortIfArgsAreUnacceptable.")
			thrown = true;
		}
		assert.deepStrictEqual(
			thrown, true,
			"ProbabilitiesArrayIsEmptyError is incorrect for abortIfArgsAreUnacceptable.");

		thrown = false;
		try
		{
			makePoemFile.
			abortIfProbabilitiesArrayLengthNotEqualsNumOfPoemWords(
				1, 2, 3, [0.1, 0.5, 0.2, 0.67, 0.89, 1, 99]);
		}
		catch (error)
		{
			assert.deepStrictEqual(
				error instanceof errors.
					LengthOfProbabilitiesIsNotEqualToNumOfPoemWordsError,
				true,
				"LengthOfProbabilitiesIsNotEqualToNumOfPoemWordsError is incorrect for abortIfArgsAreUnacceptable.")
			thrown = true;
		}
		assert.deepStrictEqual(
			thrown, true,
			"LengthOfProbabilitiesIsNotEqualToNumOfPoemWordsError is incorrect for abortIfArgsAreUnacceptable.");

		thrown = false;
		try
		{
			makePoemFile.
			abortIfdisplayDataStructuresChoiceNotBoolean("notBoolean");
		}
		catch (error)
		{
			assert.deepStrictEqual(
				error instanceof errors.
					DisplayDataStructuresChoiceIsNotBooleanError,
				true,
				"DisplayDataStructuresChoiceIsNotBooleanError is incorrect for abortIfArgsAreUnacceptable.")
			thrown = true;
		}
		assert.deepStrictEqual(
			thrown, true,
			"DisplayDataStructuresChoiceIsNotBooleanError is incorrect for abortIfArgsAreUnacceptable.");
	});

	test("sortWordFreqContainer", function()
	{
		const blue = "blue";
		const green = "green";
		const red = "red";
		var sortedWordFreqContainerTest = {};
		sortedWordFreqContainerTest[red] = 1 / 2;
		sortedWordFreqContainerTest[blue] = 1 / 3
		sortedWordFreqContainerTest[green] = 1 / 6;

		sortedWordFreqContainerTest = makePoemFile.sortWordFreqContainer(sortedWordFreqContainerTest);

		var sortedWordFreqContainerCorrect = {};
		sortedWordFreqContainerCorrect[blue] = 1 / 3;
		sortedWordFreqContainerCorrect[green] = 1 / 6;
		sortedWordFreqContainerCorrect[red] = 1 / 2;

		var sortedWordFreqContainerTestString =
			JSON.stringify(sortedWordFreqContainerTest);
		var sortedWordFreqContainerCorrectString =
			JSON.stringify(sortedWordFreqContainerCorrect);
		assert.deepStrictEqual(
			sortedWordFreqContainerTestString,
			sortedWordFreqContainerCorrectString,
			"sortedWordFreqContainer is incorrect for sortWordFreqContainer.");
	});

	test("sortCondWordFreqContainer", function()
	{
		const blue = "blue";
		const green = "green";
		const red = "red";
		var sortedCondWordFreqContainerTest = {};
		sortedCondWordFreqContainerTest[blue] = {};
		sortedCondWordFreqContainerTest[blue][red] = 1 / 2;
		sortedCondWordFreqContainerTest[blue][blue] = 1 / 2;
		sortedCondWordFreqContainerTest[green] = {};
		sortedCondWordFreqContainerTest[green][red] = 1;
		sortedCondWordFreqContainerTest[red] = {};
		sortedCondWordFreqContainerTest[red][red] = 1 / 3;
		sortedCondWordFreqContainerTest[red][blue] = 1 / 3;
		sortedCondWordFreqContainerTest[red][green] = 1 / 3;

		sortedCondWordFreqContainerTest = makePoemFile.sortCondWordFreqContainer(sortedCondWordFreqContainerTest);

		var sortedCondWordFreqContainerCorrect = {};
		sortedCondWordFreqContainerCorrect[blue] = {};
		sortedCondWordFreqContainerCorrect[blue][blue] = 1 / 2;
		sortedCondWordFreqContainerCorrect[blue][red] = 1 / 2;
		sortedCondWordFreqContainerCorrect[green] = {};
		sortedCondWordFreqContainerCorrect[green][red] = 1;
		sortedCondWordFreqContainerCorrect[red] = {};
		sortedCondWordFreqContainerCorrect[red][blue] = 1 / 3;
		sortedCondWordFreqContainerCorrect[red][green] = 1 / 3;
		sortedCondWordFreqContainerCorrect[red][red] = 1 / 3;

		var sortedCondWordFreqContainerTestString =
			JSON.stringify(sortedCondWordFreqContainerTest);
		var sortedCondWordFreqContainerCorrectString =
			JSON.stringify(sortedCondWordFreqContainerCorrect);
		assert.deepStrictEqual(
			sortedCondWordFreqContainerTestString,
			sortedCondWordFreqContainerCorrectString,
			"sortedCondWordFreqContainer is incorrect for sortCondWordFreqContainer.");
	});

	test("pickFirstWord", function()
	{
		const blue = "blue";
		const green = "green";
		const red = "red";
		var wordFreqContainer = {};
		wordFreqContainer[blue] = 1 / 3;
		wordFreqContainer[green] = 1 / 6;
		wordFreqContainer[red] = 1 / 2;

		var firstWord = makePoemFile.pickFirstWord(1 / 2, wordFreqContainer);

		assert.deepStrictEqual(
			firstWord, red,
			"firstWord is incorrect for pickFirstWord.");
	});

	test("pickNextWord", function()
	{
		const blue = "blue";
		const green = "green";
		const red = "red";
		var condWordFreqContainer = {};
		condWordFreqContainer[blue] = {};
		condWordFreqContainer[blue][blue] = 1 / 2;
		condWordFreqContainer[blue][red] = 1 / 2;
		condWordFreqContainer[green] = {};
		condWordFreqContainer[green][red] = 1;
		condWordFreqContainer[red] = {};
		condWordFreqContainer[red][blue] = 1 / 3;
		condWordFreqContainer[red][green] = 1 / 3;
		condWordFreqContainer[red][red] = 1 / 3;

		var nextWord = makePoemFile.pickNextWord(
			1 / 3, condWordFreqContainer, red);

		assert.deepStrictEqual(
			nextWord, green,
			"nextWord is incorrect for pickNextWord.");
	});

	test("abortIfProbabilityIsInvalid", function()
	{
		var thrown = false;
		try
		{
			makePoemFile.abortIfProbabilityIsInvalid("notProbability");
		}
		catch (error)
		{
			assert.deepStrictEqual(
				error instanceof errors.InvalidProbabilityError, true,
				"InvalidProbabilityError is incorrect for abortIfProbabilityIsInvalid.");
			thrown = true;
		}
		assert.deepStrictEqual(
			thrown, true,
			"InvalidProbabilityError is incorrect for abortIfProbabilityIsInvalid.");

		thrown = false;
		try
		{
			makePoemFile.abortIfProbabilityIsInvalid(-1);
		}
		catch (error)
		{
			assert.deepStrictEqual(
				error instanceof errors.InvalidProbabilityError, true,
				"InvalidProbabilityError is incorrect for abortIfProbabilityIsInvalid.");
			thrown = true;
		}
		assert.deepStrictEqual(
			thrown, true,
			"InvalidProbabilityError is incorrect for abortIfProbabilityIsInvalid.");

		thrown = false;
		try
		{
			makePoemFile.abortIfProbabilityIsInvalid(2);
		}
		catch (error)
		{
			assert.deepStrictEqual(
				error instanceof errors.InvalidProbabilityError, true,
				"InvalidProbabilityError is incorrect for abortIfProbabilityIsInvalid.");
			thrown = true;
		}
		assert.deepStrictEqual(
			thrown, true,
			"InvalidProbabilityError is incorrect for abortIfProbabilityIsInvalid.");
	});

	test("makePoem", function()
	{
		const blue = "blue";
		const green = "green";
		const red = "red";
		var wordFreqContainer = {};
		wordFreqContainer[blue] = 1 / 3;
		wordFreqContainer[green] = 1 / 6;
		wordFreqContainer[red] = 1 / 2;
		var condWordFreqContainer = {};
		condWordFreqContainer[blue] = {};
		condWordFreqContainer[blue][blue] = 1 / 2;
		condWordFreqContainer[blue][red] = 1 / 2;
		condWordFreqContainer[green] = {};
		condWordFreqContainer[green][red] = 1;
		condWordFreqContainer[red] = {};
		condWordFreqContainer[red][blue] = 1 / 3;
		condWordFreqContainer[red][green] = 1 / 3;
		condWordFreqContainer[red][red] = 1 / 3;

		var poemTest = makePoemFile.makePoem(
			1, 2, 3,
			[0.6, 0.2, 0.8, 0.9, 0.4, 0.4],
			wordFreqContainer, condWordFreqContainer);

		var poemCorrect = "red blue red\nred green red\n\n";

		assert.deepStrictEqual(
			poemTest, poemCorrect,
			"poem is incorrect for makePoem.")
	});

	test("main", function()
	{
		var poemTest =
			makePoemFile.main(
			rbbrrgFilePath, 1, 2, 3, [0.6, 0.2, 0.8, 0.9, 0.4, 0.4], true);

		var poemCorrect = "red blue red\nred green red\n\n";

		assert.deepStrictEqual(
			poemTest, poemCorrect,
			"poem is incorrect for main.")
	});
});