const { transformHashmap } = require("../lib/hw3");
const { checkFormat } = require("../lib/hw3");
const { checkDate } = require("../lib/hw3");
const { checkProperties } = require("../lib/hw3");
const { checkWarnings } = require("../lib/hw3");


describe('tests to check transferrring data event to hashampas for testing', () => {

    var test1 = [
        'BEGIN:VCALENDAR\r',
        'VERSION:2.0\r',
        'PRODID:PID\r',
        'BEGIN:VEVENT\r',
        'END:VEVENT\r',
        'END:VCALENDAR'
    ];

    var test2 = [
        'BEGIN:VCALENDAR\r',
        'VERSION:2.0\r',
        'PRODID:PID\r',
        'END:VCALENDAR'
    ];

    var test3 = [
        'BEGIN:VCALENDAR\r',
        'PRODID:PID\r',
        'BEGIN:VEVENT\r',
        'END:VEVENT\r',
        'END:VCALENDAR'
    ];

    var test4 = [
        'BEGIN:VCALENDAR\r',
        'VERSION:2.0\r',
        'BEGIN:VEVENT\r',
        'END:VEVENT\r',
        'END:VCALENDAR'
    ];
    
    var test5 = [
        'PRODID:PID\r',
        'VERSION:2.0\r',
        'BEGIN:VEVENT\r',
        'END:VEVENT\r',
        'END:VCALENDAR'
    ];
    
    var test6 = [
        'BEGIN:VCALENDAR\r',
        'VERSION:2.0\r',
        'PRODID:PID\r',
        'BEGIN:VEVENT\r',
        'END:VEVENT\r',
    ];

    var test7 = [
        'BEGIN:VCALENDAR\r',
        'VERSION:2.0\r',
        'PRODID:PID\r',
        'BEGIN:VEVENT BEGIN:VEVENT\r',
        'END:VEVENT\r',
        'END:VCALENDAR'
    ];

    var test8 = [
        'BEGIN:VCALENDAR\r',
        'VERSION:2.0\r',
        'PRODID:PID\r',
        'BEGIN:VEVENT\r',
        '\r',
        'END:VEVENT\r',
        'END:VCALENDAR'
    ];

    var test9 = [
        'BEGIN:VCALENDAR\r',
        'VERSION:2.0\r',
        'PRODID:PID\r',
        'BEGIN:VEVENT\r',
        'END:VEVENT\r',
        'END:VEVENT\r',
        'END:VCALENDAR'
    ];

    var test10 = [
        'BEGIN:VCALENDAR\r',
        'VERSION:2.0\r',
        'PRODID:PID\r',
        'BEGIN:VEVENT\r',
        'BEGIN:VEVENT\r',
        'END:VEVENT\r',
        'END:VCALENDAR'
    ];

    var test11 = [
        'BEGIN:VCALENDAR\r',
        'VERSION:2.0\r',
        'PRODID:PID\r',
        'BEGIN:VEVENT\r',
        'TEST:HAI\r',
        'TEST:BYE\r',
        'END:VEVENT\r',
        'END:VCALENDAR'
    ];

    it('should be true with good data (1)', () => {
        const result = [
            new Map([['BEGIN', 'VEVENT'], ['END', 'VEVENT']]),
          ];
        expect(transformHashmap(test1)).toEqual(result);
    });

    it('should be true with good data (2)', () => {
        const result = [];
        expect(transformHashmap(test2)).toEqual(result);
    });
  
    it('should not be true, no version (3)', () => {
        expect(transformHashmap(test3)).toBe("Doesn't include proper properties VERSION and/or PRODID");
    });

    it('should not be true, no prodid (4)', () => {
        expect(transformHashmap(test4)).toBe("Doesn't include proper properties VERSION and/or PRODID");
    });

    it('should not be true, no begin (5)', () => {
        expect(transformHashmap(test5)).toBe("Doesn't include proper begin and end for VCalendar");
    });
    
    it('should not be true, no end (6)', () => {
        expect(transformHashmap(test6)).toBe("Doesn't include proper begin and end for VCalendar");
    });

    it('should not be true, two Begins on same line (7)', () => {
        expect(transformHashmap(test7)).toBe("Can't have more than one property on line");
    });

    it('should not be true, blank space (8)', () => {
        expect(transformHashmap(test8)).toBe("Not an acutal Key:value property");
    });

    it('should not be true, two end for one begin (9)', () => {
        expect(transformHashmap(test9)).toBe("You have more than one value for END key");
    });

    it('should be true, the check for end will be later function (10)', () => {
        const result = [
            new Map([['BEGIN', 'VEVENT']]),
            new Map([['BEGIN', 'VEVENT'], ['END', 'VEVENT']]),
          ];
         
        expect(transformHashmap(test10)).toEqual(result);
    });
    
    it('should not be true multiple same properties in same event (11)', () => {
        expect(transformHashmap(test11)).toBe('You have more than one value for TEST key');
    });
  });

describe('tests to for checkformathelper function', () => {
    //add good tests for each component 
    var test12 = [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['DTSTART', '20010109T090100'], ['METHOD', 'REQUEST'],  ['STATUS', 'CONFIRMED'], ['DTSTAMP', '20010109T090100'], ['END', 'VEVENT']]),
    ];

    var test13 = [
        new Map([['END', 'VEVENT']]),
    ];

    var test14 = [
        new Map([['BEGIN', 'VEVENT']]),
    ];

    var test15 = [
        new Map([['BEGIN', ''], ['END', 'VEVENT']]),
    ];

    var test16 = [
        new Map([['BEGIN', 'VEVENT'], ['END', '']]),
    ];

    var test17 = [
        new Map([['BEGIN', 'VEVENT'], ['METHOD', 'REQUEST'], ['METHOD', 'DENIED'], ['END', 'VEVENT']]),
    ];

    var test18 = [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', '7329897819'], ['DTSTART', '20010109T090100'], ['DTSTAMP', '20010109T090100'], ['METHOD', 'REQUEST'], ['STATUS', 'CONFIRMED'], ['HELuinowLO', 'REQUEST'], ['END', 'VEVENT']]),
    ];

    var test19 = [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['DTSTART', '20010109T090100'], ['DTSTAMP', '20010109T090100'], ['METHOD', 'REQUEST'], ['STATUS', 'CONFIRMED'], ['CREATED', '20010109T090100'], ['DESCRIPTION', ''], ['END', 'VEVENT']]),
    ];

    var test20 = [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@'], ['END', 'VEVENT']]),
    ];

    var test21 = [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', '128387'], ['END', 'VEVENT']]),
    ];
    
    var test22 = [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['DTSTART', '20010909T09090'], ['END', 'VEVENT']]),
    ];
    //20010909T090900
    var test23 = [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['DTSTART', '20010109T090100'], ['DTSTAMP', '2001090wdqwd9T09090'], ['METHOD', 'REQUEST'], ['END', 'VEVENT']]),
    ];

    var test24= [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['DTSTART', '20010109T090100'], ['DTSTAMP', '20010109T090100'], ['METHOD', 'BUYING'], ['END', 'VEVENT']]),
    ];

    var test25= [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['DTSTART', '20010109T090100'], ['DTSTAMP', '20010109T090100'], ['METHOD', 'REQUEST'], ['STATUS', 'LOST'], ['END', 'VEVENT']]),
    ];

    var test26= [
        new Map([['BEGIN', 'VEVENT'], ['STATUS', 'LOST'], ['END', 'VEVENT']]),
    ];

    var test27= [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['STATUS', 'LOST'], ['END', 'VEVENT']]),
    ];

    var test28= [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['DTSTART', '20010109T090100'], ['STATUS', 'LOST'], ['END', 'VEVENT']]),
    ];

    var test29= [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['DTSTART', '20010109T090100'], ['DTSTAMP', '20010109T090100'], ['STATUS', 'LOST'], ['END', 'VEVENT']]),
    ];

    var test30= [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['DTSTART', '20010109T090100'], ['DTSTAMP', '20010109T090100'], ['METHOD', 'REQUEST'], ['END', 'VEVENT']]),
    ];

    var test31 = [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['DTSTART', '20010109T090100'], ['METHOD', 'REQUEST'],  ['STATUS', 'CONFIRMED'], ['DTSTAMP', '20010109T090100'], ['CREATED', '20010109T090100dwdw'], ['END', 'VEVENT']]),
    ];

    var test32 = [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['DTSTART', '20010109T090100'], ['METHOD', 'REQUEST'],  ['STATUS', 'CONFIRMED'], ['DTSTAMP', '20010109T090100'], ['CREATED', '20010109T090100'], ['END', 'VEVENT']]),
    ];

    var test33 = [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['DTSTART', '20010109T090100'], ['METHOD', 'REQUEST'],  ['STATUS', 'CONFIRMED'], ['DTSTAMP', '20010109T090100'], ['DTEND', '20010dd109T090100'], ['END', 'VEVENT']]),
    ];

    var test34 = [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['DTSTART', '20010109T090100'], ['METHOD', 'REQUEST'],  ['STATUS', 'CONFIRMED'], ['DTSTAMP', '20010109T090100'], ['DTEND', '20010109T090100'], ['END', 'VEVENT']]),
    ];
    
    var test35 = [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['DTSTART', '20010109T090100'], ['METHOD', 'REQUEST'],  ['STATUS', 'CONFIRMED'], ['DTSTAMP', '20010109T090100'], ['DURATION', '20010dd109T090100'], ['END', 'VEVENT']]),
    ];

    var test36 = [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['DTSTART', '20010109T090100'], ['METHOD', 'REQUEST'],  ['STATUS', 'CONFIRMED'], ['DTSTAMP', '20010109T090100'], ['DURATION', 'P15DT5H0M20S'], ['END', 'VEVENT']]),
    ];

    var test37 = [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['DTSTART', '20010109T090100'], ['METHOD', 'REQUEST'],  ['STATUS', 'CONFIRMED'], ['DTSTAMP', '20010109T090100'], ['LAST-MODIFIED', '20010dd109T090100'], ['END', 'VEVENT']]),
    ];

    var test38 = [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['DTSTART', '20010109T090100'], ['METHOD', 'REQUEST'],  ['STATUS', 'CONFIRMED'], ['DTSTAMP', '20010109T090100'], ['LAST-MODIFIED', '20010109T090100'], ['END', 'VEVENT']]),
    ];

    var test39 = [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['DTSTART', '20010109T090100'], ['METHOD', 'REQUEST'],  ['STATUS', 'CONFIRMED'], ['DTSTAMP', '20010109T090100'], ['ORGANIZER', 'heyo@m'], ['END', 'VEVENT']]),
    ];

    var test40 = [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['DTSTART', '20010109T090100'], ['METHOD', 'REQUEST'],  ['STATUS', 'CONFIRMED'], ['DTSTAMP', '20010109T090100'], ['ORGANIZER', 'heyo@gmail.com'], ['END', 'VEVENT']]),
    ];

    var test41 = [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['DTSTART', '20010109T090100'], ['METHOD', 'REQUEST'],  ['STATUS', 'CONFIRMED'], ['DTSTAMP', '20010109T090100'], ['SUMMARY', 'this is a summary'], ['END', 'VEVENT']]),
    ];

    var test42 = [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['DTSTART', '20010109T090100'], ['METHOD', 'REQUEST'],  ['STATUS', 'CONFIRMED'], ['DTSTAMP', '20010109T090100'], ['DESCRIPTION', 'this is a description'], ['END', 'VEVENT']]),
    ];

    var test43 = [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['DTSTART', '20010109T090100'], ['METHOD', 'REQUEST'],  ['STATUS', 'CONFIRMED'], ['DTSTAMP', '20010109T090100'], ['SUMMARY', 'short summary'], ['DESCRIPTION', 'this is a long description'], ['END', 'VEVENT']]),
    ];

    var test44 = [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['DTSTART', '20010109T090100'], ['METHOD', 'REQUEST'],  ['STATUS', 'CONFIRMED'], ['DTSTAMP', '20010109T090100'], ['SUMMARY', 'short summary is actually long'], ['DESCRIPTION', 'this is short description'], ['END', 'VEVENT']]),
    ];

    var test45 = [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['DTSTART', '20010109T090100'], ['METHOD', 'REQUEST'],  ['STATUS', 'CONFIRMED'], ['DTSTAMP', '20010109T090100'], ['BELLO', 'short summary is actually long'], ['HEYO', 'this is short description'], ['END', 'VEVENT']]),
    ];

    var test46 = [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['DTSTART', '20010109T090100'], ['METHOD', 'REQUEST'],  ['STATUS', 'CONFIRMED'], ['DTSTAMP', '20010109T090100'], ['SUMMARY', 'short summary is actually long'], ['DESCRIPTION', 'this is short description'], ['END', 'VEVENT']]),
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['DTSTART', '20010109T090100'], ['METHOD', 'REQUEST'],  ['STATUS', 'CONFIRMED'], ['DTSTAMP', '20010109T090100'], ['SUMMARY', 'short summary is actually long'], ['DESCRIPTION', 'this is short description'], ['END', 'VEVENT']]),
    ];

    var test47 = [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['DTSTART', '20010109T090100'], ['METHOD', 'REQUEST'],  ['STATUS', 'CONFIRMED'], ['DTSTAMP', '20010109T090100'], ['BELLO', 'short summary is actually long'], ['HEYO', 'this is short description'], ['END', 'VEVENT']]),
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['DTSTART', '20010106T090100'], ['METHOD', 'REQUEST'],  ['STATUS', 'CONFIRMED'], ['DTSTAMP', '20010109T090100'], ['BELLO', 'short summary is actually long'], ['HEYO', 'this is short description'], ['END', 'VEVENT']]),
    ];


    it('should find true since the map events are good (12)', () => {
      expect(checkFormat(test12)).toBe(true);
    });

    it('should not find true missing begin (13)', () => {
        expect(checkFormat(test13)).toEqual([ 'Does not have required BEGIN:VEVENT', 'Does not have required ATTENDEE', 'Does not have required DTSTART', 'Does not have required DTSTAMP', 'Does not have required METHOD', 'Does not have required STATUS' ]);
    });

    it('should not find true missing end (14)', () => {
        expect(checkFormat(test14)).toEqual([ 'Does not have required END:VEVENT', 'Does not have required ATTENDEE', 'Does not have required DTSTART', 'Does not have required DTSTAMP', 'Does not have required METHOD', 'Does not have required STATUS' ]);
    });

    it('should not find true missing NEVENT after begin (15)', () => {
        expect(checkFormat(test15)).toEqual([ 'Missing VEVENT after BEGIN:', 'Does not have required ATTENDEE', 'Does not have required DTSTART', 'Does not have required DTSTAMP', 'Does not have required METHOD', 'Does not have required STATUS', 'You are missing a value for one of your keys' ]);
    });
    
    it('should not find true missing NEVENT after end (16)', () => {
        expect(checkFormat(test16)).toEqual([ 'Missing VEVENT after END:', 'Does not have required ATTENDEE', 'Does not have required DTSTART', 'Does not have required DTSTAMP', 'Does not have required METHOD', 'Does not have required STATUS', 'You are missing a value for one of your keys' ]);
    });
  
    it('should not find true missing value for property (19)', () => {
        expect(checkFormat(test19)).toEqual(['You are missing a value for one of your keys']);
    });

    it('should not find true wrong attendee format for email (20)', () => {
        expect(checkFormat(test20)).toEqual([ 'Invalid email address/Invalid phone number for ATTENDEE, example here: patient@example.com/1234567890', 'Does not have required DTSTART', 'Does not have required DTSTAMP', 'Does not have required METHOD', 'Does not have required STATUS' ]);
    });

    it('should not find true wrong attendee format for phone (21)', () => {
        expect(checkFormat(test21)).toEqual([ 'Invalid email address/Invalid phone number for ATTENDEE, example here: patient@example.com/1234567890', 'Does not have required DTSTART', 'Does not have required DTSTAMP', 'Does not have required METHOD', 'Does not have required STATUS' ]);
    });

    it('should not find true wrong DTSTART format (22)', () => {
        expect(checkFormat(test22)).toEqual([ 'DTSTART is formatted incorrectly, should be YYYYMMDDTHHMMSS', 'Does not have required DTSTAMP', 'Does not have required METHOD', 'Does not have required STATUS' ]);
    });

    it('should not find true wrong DTSTAMP format (23)', () => {
        expect(checkFormat(test23)).toEqual( [ 'DTSTAMP is formatted incorrectly, should be YYYYMMDDTHHMMSS', 'Does not have required STATUS' ] );
    });

    it('should not find true wrong METHOD format (24)', () => {
        expect(checkFormat(test24)).toEqual([ 'METHOD does not have proper REQUEST value', 'Does not have required STATUS' ]);
    });

    it('should not find true wrong STATUS value (25)', () => {
        expect(checkFormat(test25)).toEqual([ 'STATUS does not have proper value' ]);
    });

    it('should not find true missing ATTENDEE (26)', () => {
        expect(checkFormat(test26)).toEqual([ 'Does not have required ATTENDEE', 'Does not have required DTSTART', 'Does not have required DTSTAMP', 'Does not have required METHOD', 'STATUS does not have proper value' ]);
    });

    it('should not find true missing DTSTART (27)', () => {
        expect(checkFormat(test27)).toEqual([ 'Does not have required DTSTART', 'Does not have required DTSTAMP', 'Does not have required METHOD', 'STATUS does not have proper value' ]);
    });

    it('should not find true missing DTSTAMP (28)', () => {
        expect(checkFormat(test28)).toEqual([ 'Does not have required DTSTAMP', 'Does not have required METHOD', 'STATUS does not have proper value' ]);
    });

    it('should not find true missing METHOD (29)', () => {
        expect(checkFormat(test29)).toEqual([ 'Does not have required METHOD', 'STATUS does not have proper value' ]);
    });
    
    it('should not find true missing STATUS (30)', () => {
        expect(checkFormat(test30)).toEqual([ 'Does not have required STATUS' ]);
    });

    it('should not find true, wrong CREATED format (31)', () => {
        expect(checkFormat(test31)).toEqual([ 'CREATED is formatted incorrectly, should be YYYYMMDDTHHMMSS' ]);
    });

    it('should find true CREATED format (32)', () => {
        expect(checkFormat(test32)).toEqual(true);
    });

    it('should not find true, wrong DTEND format (33)', () => {
        expect(checkFormat(test33)).toEqual( [ 'DTEND is formatted incorrectly, should be YYYYMMDDTHHMMSS' ] );
    });

    it('should find true DTEND format (34)', () => {
        expect(checkFormat(test34)).toBe(true);
    });

    it('should not find true, wrong DURATION format (35)', () => {
        expect(checkFormat(test35)).toEqual([ 'DURATION is formatted incorrectly, should be P#Y#M#W#DT#H#M#S' ]);
    });

    it('should find true DURATION format (36)', () => {
        expect(checkFormat(test36)).toBe(true);
    });

    it('should not find true, wrong LAST-MODIFIED format (37)', () => {
        expect(checkFormat(test37)).toEqual([ 'LAST-MODIFIED is formatted incorrectly, should be YYYYMMDDTHHMMSS' ]);
    });

    it('should find true LAST-MODIFIED format (38)', () => {
        expect(checkFormat(test38)).toBe(true);
    });

    it('should not find true, wrong ORGANIZER format (39)', () => {
        expect(checkFormat(test39)).toEqual([ 'Invalid email address/Invalid phone number for ORGANIZER, example here: patient@example.com/1234567890' ]);
    });

    it('should find true ORGANIZER format (40)', () => {
        expect(checkFormat(test40)).toBe(true);
    });

    it('should find true SUMMARY (41)', () => {
        expect(checkFormat(test41)).toBe(true);
    });

    it('should find true DESCRIPTION (42)', () => {
        expect(checkFormat(test42)).toBe(true);
    });

    it('should find true DESCRIPTION > SUMMARY (43)', () => {
        expect(checkFormat(test43)).toBe(true);
    });

    it('should find false DESCRIPTION < SUMMARY (44)', () => {
        expect(checkFormat(test44)).toEqual( [ 'SUMMARY is longer than DESCRIPTION' ] );
    });

    it('should find false events are on same day (46)', () => {
        expect(checkDate(test46)).toBe("20010109T090100");
    });

    it('should find true event dates are different day (47)', () => {
        expect(checkDate(test47)).toBe(true);
    });

  });

describe('tests for check properties and warnings functions', () => {

    var test48 = [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['DTSTART', '20010109T090100'], ['METHOD', 'REQUEST'],  ['STATUS', 'CONFIRMED'], ['DTSTAMP', '20010109T090100'], ['END', 'VEVENT']]),
    ];

    var test49 = [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['HELLO', 'ede'], ['DTSTART', '20010109T090100'], ['METHOD', 'REQUEST'],  ['STATUS', 'CONFIRMED'], ['DTSTAMP', '20010109T090100'], ['END', 'VEVENT']]),
    ];

    var test50 = [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['DTSTART', '20010109T090100'], ['METHOD', 'REQUEST'],  ['STATUS', 'CONFIRMED'], ['DTSTAMP', '20010109T090100'], ['END', 'VEVENT']]),
    ];

    var test51= [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['frfrfw', 'ede'], ['DTSTART', '20010109T090100'], ['METHOD', 'REQUEST'],  ['STATUS', 'CONFIRMED'], ['DTSTAMP', '20010109T090100'], ['END', 'VEVENT']]),
    ];

    var test52= [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['frfrfw', 'ede'], ['geleeo', 'test'], ['DTSTART', '20010109T090100'], ['METHOD', 'REQUEST'],  ['STATUS', 'CONFIRMED'], ['DTSTAMP', '20010109T090100'], ['END', 'VEVENT']]),
    ];

    var test53= [
        new Map([['BEGIN', 'VEVENT'], ['ATTENDEE', 'hello@sup.com'], ['frfrfw', 'ede'], ['geleeo', 'test'], ['DTSTART', '20010109T090100'], ['METHOD', 'REQUEST'],  ['STATUS', 'CONFIRMED'], ['DTSTAMP', '20010109T090100'], ['END', 'VEVENT']]),
    ];
    
    it('should true all properties right (48)', () => {
        expect(checkProperties(test48)).toBe(true);
    });

    it('should find false not included in list (49)', () => {
        expect(checkProperties(test49)).toEqual([ [ 'HELLO' ] ]);
    });

    it('should true all properties right (50)', () => {
        expect(checkWarnings(test50)).toBe(true);
    });

    it('should find false not included in list but will display as true (51)', () => {
        expect(checkWarnings(test51)).toEqual(true);
    });
  
    it('should find false not included in list (52)', () => {
        expect(checkProperties(test52)).toEqual([[ 'frfrfw', 'geleeo' ]]);
    });
    
    it('should find false not included in list but will display as true (53)', () => {
        expect(checkWarnings(test53)).toEqual(true);
    });

  });
