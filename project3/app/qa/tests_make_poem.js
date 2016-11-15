"use strict";

suite("Test suite for make_poem.js", function()
{
	var dataStructuresFile = null;
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
		try
		{

		}
	});
});