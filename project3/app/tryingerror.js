function InputFilePathError(message)
{
	this.name = "InputFilePathError";
	this.message = message || "The specified path of the input file must be a string.\nAborting program...";
	this.stack = (new Error()).stack;
}
InputFilePathError.prototype = Object.create(Error.prototype);
InputFilePathError.prototype.constructor = InputFilePathError;

try {
	throw new InputFilePathError();
} catch (e) {
	console.log(e.message);  // 'Default Message'
}
