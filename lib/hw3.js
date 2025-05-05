//Code for homework 3
const fileSystem = require("fs"); //so the filesystem works

//This is to define lists we will use later in the code
let predefinedProperties = ["BEGIN", "END", "ATTENDEE", "DTSTART", "DTSTAMP", "METHOD", "STATUS"];
let optionalProperties = ["CLASS", "GEO", "UID", "LOCATION", "SEQUENCE", "CATEGORIES", "URL", "RRULE", "EXDATE", "RDATE", "RECURRENCE-ID", "TRANSP", "PRIORITY", "COMMENT", "CONTACT", "ATTACH",
                          "EXDESCRIPTION", "REQUEST-STATUS", "RELATED-TO", "RESOURCES", "CREATED", "DTEND", "DURATION", "LAST-MODIFIED", "NAME", "ORGANIZER", "DESCRIPTION", "SUMMARY" ];
let predefinedStatus = ["TENTATIVE", "CONFIRMED", "CANCELLED"];
let warningProperties = [];
let unknownProperties = [];
let outputList = [];

//This function makes sure the calendar is able to convert into a hashmap before running any of the tests
function transformHashmap(calendarFileLines) {
    let start = calendarFileLines[0].toUpperCase();
    let end = calendarFileLines[calendarFileLines.length-1].toUpperCase();

    if(!(start.includes("BEGIN:VCALENDAR") && end.includes("END:VCALENDAR"))) {                    //This is to check for the required begin, end
        console.log("Doesn't include proper begin and end for VCalendar");
        return "Doesn't include proper begin and end for VCalendar";
    }

    let pass = 0;
    for(let i = 1; i < calendarFileLines.length - 1; i++) {                                        //This is to check for the required version, prodid
        let check = calendarFileLines[i].toUpperCase();
        //console.log(check);
        if(check.includes("VERSION")) {
            pass++;
        }
        else if(check.includes("PRODID")) {
            pass++;
        }
    }
    
    if(pass != 2) {
        console.log("Doesn't include proper properties VERSION and/or PRODID");
        return "Doesn't include proper properties VERSION and/or PRODID";
    }

    let mapEvents = [];
    let increment = -1;
    for(let i = 3; i < calendarFileLines.length-1; i++) {
        let temp = calendarFileLines[i].toUpperCase();

        if (temp.match(/:/g) != null && temp.match(/:/g).length > 1) {            //check if there are multiple properties
            console.debug("Can't have more than one property on line");
            return "Can't have more than one property on line";
        }
        else if(temp.includes("BEGIN")) {                                         //to check if need to make a new hashmap to store event
            increment++;
            mapEvents.push(new Map());
            if(mapEvents[increment] && !(mapEvents[increment].has(temp.substring(0, temp.indexOf(":"))))) {
                mapEvents[increment].set(temp.substring(0, temp.indexOf(":")), (temp.substring(temp.indexOf(":") + 1).trim()));
            }
            else {
                console.debug("You have more than one value for " + temp.substring(0, temp.indexOf(":")) + " key");    //checks for mutliple values for same key
                return "You have more than one value for " + temp.substring(0, temp.indexOf(":")) + " key";
            }
        } 
        else if(temp != "") {                                                     //For all other key value pairs
            if(temp.indexOf(":") == -1) {
                console.debug("Not an acutal Key:value property");
                return "Not an acutal Key:value property";
            }
            if(mapEvents[increment] && !(mapEvents[increment].has(temp.substring(0, temp.indexOf(":"))))) {
                mapEvents[increment].set(temp.substring(0, temp.indexOf(":")), (calendarFileLines[i].substring(temp.indexOf(":") + 1).trim()));
            }
            else {
                console.debug("You have more than one value for " + temp.substring(0, temp.indexOf(":")) + " key");
                return "You have more than one value for " + temp.substring(0, temp.indexOf(":")) + " key";
            }
        }
    }
    return mapEvents;
}

//Check format function to loop through list to check hashmap formatting
function checkFormat(mapEvents) {                                          
    //identifierList = [];
    unknownProperties = [];
    for(let i = 0; i < mapEvents.length; i++) {
        let returnCheck = checkFormatHelper(mapEvents[i]);                       //Call the checkformathelper
        if (returnCheck != true) {
            return returnCheck;
        }
    }
    return true;
}

//Where all the formatting conditions are checked 
function checkFormatHelper(event) {
    warningProperties = [];
    unknownProperties = [];
    outputList = [];

    if(!(event.has("BEGIN"))){                                                   //Check if begin is in event 
        outputList.push("Does not have required BEGIN:VEVENT");
    }
    else if(!(event.get("BEGIN") == ("VEVENT"))) {                               //Check if event is present
        outputList.push("Missing VEVENT after BEGIN:");
    }
    if(!(event.has("END"))){                                                     //Check for end in event
        outputList.push("Does not have required END:VEVENT");
    }
    else if(!(event.get("END") == ("VEVENT"))) {                                  //Check if event is present
        outputList.push("Missing VEVENT after END:");
    }
    if(event.keys().length != event.values().length) {                           //Check for multiple values again
        outputList.push("You have more than one value for each key");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    if(!(event.has("ATTENDEE"))) {                                               
        outputList.push("Does not have required ATTENDEE");
    }
    else if (!(emailRegex.test(event.get("ATTENDEE")))) {
        if(!(phoneRegex.test(event.get("ATTENDEE")))) {
            outputList.push("Invalid email address/Invalid phone number for ATTENDEE, example here: patient@example.com/1234567890");
        }
    }
    if(!(event.has("DTSTART"))) {
        outputList.push("Does not have required DTSTART");
    }
    else {
        let result =  dateFormatter(event, "DTSTART")
        if(result != true) {
            outputList.push(result);
        }
    }
    if(!(event.has("DTSTAMP"))) {
        outputList.push("Does not have required DTSTAMP");
    }
    else {
        let result =  dateFormatter(event, "DTSTAMP")
        if(result != true) {
            outputList.push(result);
        }
    }
    if(!(event.has("METHOD"))) {
        outputList.push("Does not have required METHOD");
    }
    else if(!(event.get("METHOD") == ("REQUEST"))) {
        outputList.push("METHOD does not have proper REQUEST value");
    }
    if(!(event.has("STATUS"))) {
        outputList.push("Does not have required STATUS");
    }
    else if(!(predefinedStatus.includes(event.get("STATUS")))) {
        outputList.push("STATUS does not have proper value");
    }
    if(event.has("CREATED")) {                                                                     //IMPORTANT: This was done before the announcement so format check was kept
        let result =  dateFormatter(event, "CREATED")
        if(result != true) {
            outputList.push(result);
        }
    }
    if(event.has("DTEND")) {
        let result =  dateFormatter(event, "DTEND")
        if(result != true) {
            outputList.push(result);
        }
    }
    if(event.has("DURATION")) {
        const durationRegex = /^P(?:\d+Y)?(?:\d+M)?(?:\d+W)?(?:\d+D)?(?:T(?:\d+H)?(?:\d+M)?(?:\d+S)?)?$/;
        if(!(durationRegex.test(event.get("DURATION")))) {
            outputList.push("DURATION is formatted incorrectly, should be P#Y#M#W#DT#H#M#S");
        }
    }
    if(event.has("LAST-MODIFIED")) {
        let result =  dateFormatter(event, "LAST-MODIFIED")
        if(result != true) {
            outputList.push(result);
        }
    }
    if(event.has("ORGANIZER")) {
        if (!(emailRegex.test(event.get("ORGANIZER")))) {
            if(!(phoneRegex.test(event.get("ORGANIZER")))) {
                outputList.push("Invalid email address/Invalid phone number for ORGANIZER, example here: patient@example.com/1234567890");
            }
        }
    }
    if(event.has("SUMMARY")) {
        if(event.has("DESCRIPTION")) {
            if(event.get("SUMMARY").length > event.get("DESCRIPTION").length) {
                outputList.push("SUMMARY is longer than DESCRIPTION");
            }
        }
    }
    if(!(Array.from(event.values()).every(r => r.toString()))) {                 //Check for missing values of keys
        outputList.push("You are missing a value for one of your keys");
    }
    if(outputList.length == 0) {
        return true;
    }
    return outputList;
}

//Check for unknown properties
function checkProperties(mapEvents) {                                          
    //identifierList = [];
    unknownProperties = [];
    for(let i = 0; i < mapEvents.length; i++) {
        let returnCheck = checkPropertiesHelper(mapEvents[i]);                       //Call the checkpropertyhelper
        if (returnCheck != true) {
            unknownProperties.push(returnCheck);
        }
    }
    return unknownProperties.length > 0 ? unknownProperties : true;
}

function checkPropertiesHelper(event) {
    let unknownProperties = Array.from(event.keys()).filter(
        element => !(predefinedProperties.includes(element) || optionalProperties.includes(element))
    );

    return unknownProperties.length > 0 ? unknownProperties : true;
}

//Check for warning properties
function checkWarnings(mapEvents) {                                          
    //identifierList = [];
    warningProperties = [];
    for(let i = 0; i < mapEvents.length; i++) {
        let returnCheck = checkWarningsHelper(mapEvents[i]);                       //Call the checkwarninghelper
        if (returnCheck != true) {
            return returnCheck;
        }
    }
    return true;
}

function checkWarningsHelper(event) {
    warningProperties = Array.from(event.keys()).filter(element => optionalProperties.includes(element) && !predefinedProperties.includes(element));
    if(warningProperties.length == 0) {
        return true;
    }
    return warningProperties;
}

//Function to format date objects
function dateFormatter(event, key) {
    if(event.get(key).length > 15) {
        return key + " is formatted incorrectly, should be YYYYMMDDTHHMMSS";
    }
    const correctYear = event.get(key).slice(0,4);
    const correctMonth = event.get(key).slice(4,6) - 1;
    const correctDay = event.get(key).slice(6,8);
    const correctHour = event.get(key).slice(9,11);
    const correctMinute = event.get(key).slice(11,13);

    let newInputArg = event.get(key).slice(0,4) + '-' + event.get(key).slice(4,6) + "-" + event.get(key).slice(6,11) + ":" + event.get(key).slice(11,13) + ":" +  event.get(key).slice(13,15);
    let outputDate = new Date(newInputArg);

    if(!(outputDate.getFullYear() == correctYear && correctYear != 0 && outputDate.getMonth() == correctMonth && outputDate.getDate() == correctDay && outputDate.getHours() == correctHour && outputDate.getMinutes() == correctMinute)) {
        return key + " is formatted incorrectly, should be YYYYMMDDTHHMMSS";
    }

    return true;
}

//Function to check for overlapping dates, appoinments on the same day
function checkDate(mapEvents) {
    for(let i = 0; i < mapEvents.length - 1; i++) {
        for(let j = 0; j < mapEvents.length; j++)
            if (mapEvents[i].get("DTSTART").slice(6,8) ==  mapEvents[j].get("DTSTART").slice(6,8) && i != j) {
                return mapEvents[i].get("DTSTART");
            }
    }
    return true;
}

//IMPORTANT Change line 274 to test different lines, and make sure its in lib folder
if (typeof jasmine === 'undefined') {
    let calendarFile = fileSystem.readFileSync("calendarTest.txt", "utf-8");
    let calendarFileLines = calendarFile.split("\n");
    let mapEvents = transformHashmap(calendarFileLines);

    if(typeof mapEvents === 'string') {
        return mapEvents;
    }
    let checkResult = checkFormat(mapEvents);
    let checkProperty = checkProperties(mapEvents);
    let dateResult = checkDate(mapEvents);
    let checkProperty2 = checkWarnings(mapEvents);

    if (checkResult == true && checkProperty == true && dateResult == true) {
        console.debug("Your calendar is formatted correctly");
      
    }
    else {
        console.debug(checkResult && checkResult.length ? "\nHere's the list of errors: " + checkResult + "\n": "None - No errors\n");
        console.debug(checkProperty && checkProperty.length ? "Here's the list of unknown properties: " + checkProperty + "\n": "None - No unknown properties\n");
        console.debug(dateResult && dateResult.length ? "Here's the list of overlapping dates: " + dateResult + "\n": "None - No overlapping dates\n");
        console.debug(checkProperty2 && checkProperty2.length ? "Here's the list of warning properties: " + checkProperty2 + "\n": "None - No warning properties\n");
    }
} 

module.exports = { transformHashmap, checkFormat, checkDate, checkProperties, checkWarnings};