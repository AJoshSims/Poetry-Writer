/**
 * Sorts a list of information which describes at most 100 persons.
 *
 * <p>The sort is alphabetical, according to the first and last name of the
 * persons.
 * The list can describe at most 100 persons.
 * The format for the list (a text file) must be as follows
 * (the line wrapping shown here does not apply to the format):
 *
 * (optional white space here)first name, last name, street address, city,
 * state, zip code, phone number\n
 * (optional white space here)first name, last name, street address, city,
 * state, zip code, phone number\n
 * (optional white space here)first name, last name, street address, city,
 * state, zip co...
 * ...
 *
 * Example:
 *
 * John, Smith, 10 Maple Street, Cullowhee, NC, 28779, 828.123.4567
 *    Susan, thompson, 21 Oak Road, Webster, NC, 28711, 828.434.3232
 * Sarah, foster, 32 Sycamore Street, Sylva, NC, 28712, 828.112.3456
 * bruce, Hampton, 321 Linden Street, Dillsboro, NC, 28123, 828.432.7895
 *    Bill, Thompson, 141 Cedar...
 * ...
 *
 * @author Joshua Sims
 * @version 20 April, 2016
 */

/**
 * Access to the file system.
 */
var fs = require("fs");

/**
 * The name of the file from which the persons information is read.  
 */
var fileInName;

/**
 * The name of the file to which the information of the sorted persons is 
 * written.
 */
var fileOutName;

// Applies the program arguments if they are acceptable.
applyArgs();

// Prints progress message to screen.
console.log("Reading input file information...");

/**                                                                             
 * The persons whose information is sorted.                                     
 */                                                                
var persons = [];   

// Reads input file and stores each person's information.
inputPersonsInformation();

// Prints progress message to screen.
console.log("Sorting information and writing to output file...\n");

// Writes alphabetically sorted information of persons to output file.
outputPersonsInformation();

// Prints success message to screen.
console.log("The information in " + fileOutName + " has successfully been " +
    "sorted and written to " + fileInName);

/**
 * Applies the program arguments if they are acceptable.
 */
function applyArgs()
{
    /**
     * The acceptable number of program arguments.
     */
    const ACCEPTABLE_NUM_OF_ARGS = 4;

    /**
     * Exit status when program exits due to the pass of an unacceptable 
     * number of program arguments.
     */
    const ERROR_UNACCEPTABLE_NUM_OF_ARGS = 1;

    // Aborts program and prints error message if more or less than 2 
    // program arguments are passed.
    if (process.argv.length !== ACCEPTABLE_NUM_OF_ARGS)
    {
        console.log("The only arguments should be node, " +
        "the name of the source file, the input file, " +
        "and the output file." +
        "\nUsage: node source_file_name input_file_name " +
            "output_file_name");
        process.exit(ERROR_UNACCEPTABLE_NUM_OF_ARGS);
    }

    // Assigns the specified, file input name to variable.
    fileInName = process.argv[2];

    // Attempts to find the specified input file and if it is readable.     
    fs.accessSync(fileInName, fs.F_OK | fs.R_OK); 

    // Assigns the specified, file output name to variable.
    fileOutName = process.argv[3];
}

/**
 * Describes a person's contact information (first name, last name and
 * phone
 * number) and physical home address (street address, city, state and zip
 * code).
 *
 * @param assignedNameFirst - The person's first name.
 * @param assignedNameLast - The person's last name.
 * @param streetAddress - The street address of the person's home.
 * @param assignedCity - The city in which the person's home is located.
 * @param assignedState - The state in which the person's home is located.
 * @param assignedZipCode - The zip code of the person's area of residence.
 */
function person(assignedNameFirst, assignedNameLast, assignedPhoneNum,
    assignedStreetAddress, assignedCity, assignedState, assignedZipCode)
{
    this.nameFirst = assignedNameFirst;
    this.nameLast = assignedNameLast;
    this.phoneNum = assignedPhoneNum;
    this.streetAddress = assignedStreetAddress;
    this.city = assignedCity;
    this.state = assignedState;
    this.zipCode = assignedZipCode;
}

/**
 * Reads the input file and stores each person's information.
 */
function inputPersonsInformation()
{
    // Opens the input file for reading and reads its entirety while 
    // storing its contents, as a string, into fileInContent.
    var fileInContent = fs.readFileSync(fileInName, "utf8");

    // The current person in the iteration of persons.
    var personCurrent;

    // The indices (their positions in each line) of each piece of a 
    // person's information.
    const INDEX_NAME_FIRST = 0;
    const INDEX_NAME_LAST = 1;
    const INDEX_STREET_ADDRESS = 2;
    const INDEX_CITY = 3;
    const INDEX_STATE = 4;
    const INDEX_ZIP_CODE = 5;
    const INDEX_PHONE_NUM = 6;

    // Iterates through the input file's contents line by line.
    fileInContent.split("\n").forEach(
        function(line)
        {
            // Creates a new person entry for each line.
            personCurrent = new person(null, null, null, null, null, 
                null, null);

            // Iterates through each line's pieces of information.
            line.split(",").forEach(
                function(infoPiece, indexInfoPiece)
                {
                    // Trims the white space from the ends each piece.
                    infoPiece = infoPiece.trim();

                    // Assigns each piece to the appropriate variable.
                    switch (indexInfoPiece)
                    {
                        case INDEX_NAME_FIRST:
                            personCurrent.nameFirst = infoPiece;
                            break;
                        case INDEX_NAME_LAST:
                            personCurrent.nameLast = infoPiece;
                            break;
                        case INDEX_STREET_ADDRESS:
                            personCurrent.streetAddress = infoPiece;
                            break;
                        case INDEX_CITY:
                            personCurrent.city = infoPiece;
                            break;
                        case INDEX_STATE:
                            personCurrent.state = infoPiece;
                            break;
                        case INDEX_ZIP_CODE:
                            personCurrent.zipCode = infoPiece;
                            break;
                        case INDEX_PHONE_NUM:                                   
                            personCurrent.phoneNum = infoPiece;                 
                            break;  
                    }
                });
            
            // Then pushes each person entry into the list.
            persons.push(personCurrent);
        });
}

/**
 * Sorts the persons information alphabetically, according to first and last
 * names and then writes each person's information to the output file.
 */
function outputPersonsInformation()
{
    // The index of the first person in the persons array.
    const INDEX_PERSON_FIRST = 0;

    // The index of the last person in the persons array.
    const INDEX_PERSON_LAST = persons.length - 1;

    // Sorts the persons alphabetically, according to first and last names.
    sortPersons(INDEX_PERSON_FIRST, INDEX_PERSON_LAST);

    // The content that will be written to the output file.
    var fileOutContent = "";

    // The index of the phone num (its position in a line).
    const INDEX_PHONE_NUM = 6;

    // So for each person,
    persons.forEach(
        function(person, indexPerson)
        {
            // And for each piece of info regarding that person, append the
            // info to an ordered list of persons info,
            Object.keys(person).forEach(
	        function(infoPiece, indexInfoPiece)
	        {
	  	    if (indexInfoPiece !== INDEX_PHONE_NUM)
		    {  
		        fileOutContent = fileOutContent + person[infoPiece] + ", ";
		    }
		    
		    else
		    {
		        fileOutContent = fileOutContent + person[infoPiece];
	     	    }
		});
	    if (indexPerson !== INDEX_PERSON_LAST)
	    {
	        fileOutContent = fileOutContent + "\n";
	    }
            else
	    {
	        // Does not add a new line.
	    }
	});

    // And then write the ordered list of persons to the output file.
    fs.writeFileSync(fileOutName, fileOutContent);
}

/**
 * Sorts the persons alphabetically, according to first and last names, using
 * the quicksort algorithm.
 *
 * @param indexPersonFirst - The index of the first person in the persons 
 *     array.
 * @param indexPersonLast - The index of the last person in the persons array.
 */
function sortPersons(indexPersonFirst, indexPersonLast)
{
// The index of the pivot element.
var indexPivot;

// Temporary index used for the quicksort.
var indexTempI;

// Temporary index used for the quicksort.
var indexTempJ;

// Temporary variable to hold a person.
var temp;

if (indexPersonFirst < indexPersonLast)

{
    // indexPivot becomes indexPersonFirst.
    indexPivot = indexPersonFirst;

    // indexTempI becomes indexPersonFirst.
    indexTempI = indexPersonFirst;

    // indexTempJ becomes indexPersonLast.
    indexTempJ = indexPersonLast;

    // While indexTempI is less than indexTempJ
    while (indexTempI < indexTempJ)

    {
        // While the full name of person at indexTempI is less 
        // than or equal to the full name of person at indexPivot.
        while (
            (persons[indexTempI].nameFirst + 
                persons[indexTempI].nameLast).toLowerCase() 
             < (persons[indexPivot].nameFirst + 
                persons[indexPivot].nameLast).toLowerCase()

            // And while indexTempI is less than indexPersonLast.
            && (indexTempI < indexPersonLast))

        {
            // indexTempI moves forward by 1.
            indexTempI ++;
        }

        // While the full name of person at indexTempJ is 
        // greater than the full name of person at indexPivot.
        while (
            (persons[indexTempJ].nameFirst +
                persons[indexTempJ].nameLast).toLowerCase() 
            > (persons[indexPivot].nameFirst +
                persons[indexPivot].nameLast).toLowerCase())

        {
            // indexTempJ moves backward by 1.
            indexTempJ --;
        }

        // If indexTempI is less than indexTempJ.
        if (indexTempI < indexTempJ)

        {
            // swap persons at indexTempI and indexTempJ
            temp = persons[indexTempI];
            persons[indexTempI] = persons[indexTempJ];
            persons[indexTempJ] = temp;
        }
    }  

    // swap persons at indexPivot and indexTempJ
    temp = persons[indexPivot];
    persons[indexPivot] = persons[indexTempJ];
    persons[indexTempJ] = temp;

    // Recursive call w/ same arguments except that indexPersonLast
    // is indexTempJ - 1.
    sortPersons(indexPersonFirst, indexTempJ - 1);

    // Recursive call w/ same arguments except that indexPersonFirst
    // is indexTempJ + 1.
    sortPersons(indexTempJ + 1, indexPersonLast);
    }
}
