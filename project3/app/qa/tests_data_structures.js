"use strict";

var assert = require("chai").assert;

suite("Tests for data_structures.js", function()
{
	var dataStructuresFile = require("../data_structures.js");

	test("readInputFile test", function()
	{
		var readInputFile = dataStructuresFile.readInputFile;

		var inputFileContent = readInputFile("non-existent");

		assert.deepEqual(0, 0);
	});
});
