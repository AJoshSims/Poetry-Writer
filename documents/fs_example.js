/*
 * Example reading from and writing to files that are 
 * specified by a command-line arguments using node.js,
 * the fs module of node.js, and javascript.
 *
 * @author Mark Holliday
 * @date 2 April 2015
*/
var fs = require("fs");
var data = fs.readFileSync(process.argv[2], "utf8");
fs.writeFileSync(process.argv[3], data);
console.log("done");
