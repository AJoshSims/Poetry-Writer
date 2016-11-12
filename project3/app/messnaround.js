var errors = require("./errors");
var InputFilePathIsNotStringError = errors.InputFilePathIsNotStringError;

var fs = require("fs");



function wreckIt()
{
	// var failureFile = fs.readFileSync("failureFilePath", "utf8");
	throw new InputFilePathIsNotStringError();
}

try
{
	wreckIt();
}
catch (error)
{
	console.log(error.message);
	process.exit(error.code);
}

console.log("Whoah, we didn't crash");