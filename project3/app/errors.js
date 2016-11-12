"use strict";

// Imports and exports
var exports = module.exports = {};
exports.InputFilePathIsNotStringError =
	InputFilePathIsNotStringError;
exports.InputFileDoesNotExistError =
	InputFileDoesNotExistError;
exports.InputFilePathPointsToDirectoryError =
	InputFilePathPointsToDirectoryError;
exports.CannotReadInputFileError =
	CannotReadInputFileError;
exports.TooManyOpenFilesError =
	TooManyOpenFilesError;
exports.InputCannotBeEmptyOrOnlyWhitespaceError =
	InputCannotBeEmptyOrOnlyWhitespaceError;
exports.StanzasOrLinesPerStanzaOrWordsPerLineIsNotIntegerError =
	StanzasOrLinesPerStanzaOrWordsPerLineIsNotIntegerError;
exports.ProbabilitiesArrayIsNotArrayError =
	ProbabilitiesArrayIsNotArrayError;
exports.ProbabilitiesArrayIsEmptyError =
	ProbabilitiesArrayIsEmptyError;
exports.LengthOfProbabilitiesIsNotEqualToNumOfPoemWordsError =
	LengthOfProbabilitiesIsNotEqualToNumOfPoemWordsError;
exports.DisplayDataStructuresChoiceIsNotBooleanError =
	DisplayDataStructuresChoiceIsNotBooleanError;
exports.InvalidProbabilityError =
	InvalidProbabilityError;

// Exit codes
/**
 * Exit code indicating that the argument for the input file is not a string.
 */
const INPUT_FILE_PATH_IS_NOT_STRING = 1;

/**
 * Exit code indicating that the specified input file does not exist.
 */
const INPUT_FILE_DOES_NOT_EXIST = 2;
/**
 * Exit code indicating that the specified input file is not a file -- it is
 * a directory.
 */
const INPUT_FILE_PATH_POINTS_TO_DIRECTORY = 3;

/**
 * Exit code indicating that the specified input file cannot be read.
 */
const CANNOT_READ_INPUT_FILE = 4;

/**
 * Exit code indicating that the specified input file cannot be opened because
 * there are too many open files in the system.
 */
const TOO_MANY_OPEN_FILES = 5;

/**
 * Exit code indicating that the specified input file is empty or is composed
 * of only whitespace.
 */
const INPUT_CANNOT_BE_EMPTY_OR_ONLY_WHITESPACE = 6;

/**
 * Exit code indicating that either the specified stanzas, specified lines per
 * stanza, or the specified words per line is not an integer.
 */
const STANZAS_OR_LINES_PER_STANZA_OR_WORDS_PER_LINE_IS_NOT_INTEGER = 7;

/**
 * Exit code indicating that the probabilities array is not an array.
 */
const PROBABILITIES_ARRAY_IS_NOT_ARRAY = 8;

/**
 * Exit code indicating that an empty probabilities array was passed.
 */
const PROBABILITIES_ARRAY_IS_EMPTY = 9;

/**
 * Error indicating that the length of the probabilities array is not equal to
 * the number of words that will constitute the poem.
 */
const LENGTH_OF_PROBABILITIES_IS_NOT_EQUAL_TO_NUM_OF_POEM_WORDS = 10;

/**
 * Exit code indicating that displayDataStructuresChoice, which represents the
 * choice to display the data structures, is not a boolean.
 */
const DISPLAY_DATA_STRUCTURES_CHOICE_IS_NOT_BOOLEAN = 11;

/**
 * Exit code indicating that an element of the probabilities array is not a
 * number or that there exists a probability in the array that is less than 0
 * or greater than 1.
 */
const INVALID_PROBABILITY = 12;

// Errors
function InputFilePathIsNotStringError()
{
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = "The specified path of the input file is not a string.";
	this.errno = INPUT_FILE_PATH_IS_NOT_STRING;
}

function InputFileDoesNotExistError()
{
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = "The specified input file does not exist";
	this.errno = INPUT_FILE_DOES_NOT_EXIST;
}

function InputFilePathPointsToDirectoryError()
{
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = "The specified input file path points to a directory -- not a file.";
	this.errno = INPUT_FILE_PATH_POINTS_TO_DIRECTORY;
}

function CannotReadInputFileError()
{
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = "The specified input file cannot be read.";
	this.errno = CANNOT_READ_INPUT_FILE;
}

function TooManyOpenFilesError()
{
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = "There are too many open files in the system.";
	this.errno = TOO_MANY_OPEN_FILES;
}

function InputCannotBeEmptyOrOnlyWhitespaceError()
{
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = "Input can not be empty or only be whitespace.";
	this.errno = INPUT_CANNOT_BE_EMPTY_OR_ONLY_WHITESPACE;
}

function StanzasOrLinesPerStanzaOrWordsPerLineIsNotIntegerError(message)
{
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = message;
	this.errno = STANZAS_OR_LINES_PER_STANZA_OR_WORDS_PER_LINE_IS_NOT_INTEGER;
}

function ProbabilitiesArrayIsNotArrayError()
{
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = "The specified probabilities array must be an array.";
	this.errno = PROBABILITIES_ARRAY_IS_NOT_ARRAY;
}

function ProbabilitiesArrayIsEmptyError()
{
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = "The specified probabilities array is empty.";
	this.errno = PROBABILITIES_ARRAY_IS_EMPTY;
}

function LengthOfProbabilitiesIsNotEqualToNumOfPoemWordsError()
{
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = "The number of probabilities in the specified array of probabilities is not equal to the number of words specified to form the poem.";
	this.errno = LENGTH_OF_PROBABILITIES_IS_NOT_EQUAL_TO_NUM_OF_POEM_WORDS;
}

function DisplayDataStructuresChoiceIsNotBooleanError()
{
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = "The specified choice indicating whether or not to display the data structures is not a boolean.";
	this.errno = DISPLAY_DATA_STRUCTURES_CHOICE_IS_NOT_BOOLEAN;
}

function InvalidProbabilityError(message)
{
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = message;
	this.errno = INVALID_PROBABILITY;
}