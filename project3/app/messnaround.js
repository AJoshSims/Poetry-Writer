"use strict";

var errors = require("./errors");
var InputFilePathIsNotStringError =
	errors.InputFilePathIsNotStringError;
var InputFileDoesNotExistError =
	errors.InputFileDoesNotExistError;
var InputFilePathPointsToDirectoryError =
	errors.InputFilePathPointsToDirectoryError;
var CannotReadInputFileError =
	errors.CannotReadInputFileError;
var TooManyOpenFilesError =
	errors.TooManyOpenFilesError;
var InputCannotBeEmptyOrOnlyWhitespaceError =
	errors.InputCannotBeEmptyOrOnlyWhitespaceError;
var StanzasOrLinesPerStanzaOrWordsPerLineIsNotIntegerError =
	errors.StanzasOrLinesPerStanzaOrWordsPerLineIsNotIntegerError;
var ProbabilitiesArrayIsNotArrayError =
	errors.ProbabilitiesArrayIsNotArrayError;
var ProbabilitiesArrayIsEmptyError =
	errors.ProbabilitiesArrayIsEmptyError;
var LengthOfProbabilitiesIsNotEqualToNumOfPoemWordsError =
	errors.LengthOfProbabilitiesIsNotEqualToNumOfPoemWordsError;
var DisplayDataStructuresChoiceIsNotBooleanError =
	errors.DisplayDataStructuresChoiceIsNotBooleanError;
var InvalidProbabilityError =
	errors.InvalidProbabilityError;

var fs = require("fs");

function wreckIt()
{
	// var failureFile = fs.readFileSync("failureFilePath", "utf8");
	throw new InputFileDoesNotExistError();
}

// try
// {
	wreckIt();
// }
// catch (error)
// {
// 	if (error.code === "ENOENT")
// 	{
// 		console.log(error.message);
// 		process.exit(error.errno);
// 	}
// 	console.log(error.message);
// 	process.exit(error.code);
// }

console.log("Whoah, we didn't crash");