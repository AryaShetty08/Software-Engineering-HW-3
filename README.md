# Software Engineering Homework 3

## Context
- I ran both the code and the jasmine tests through the VScode terminal
- I also made sure node.js and the jasmine packages were in order before running
- I also added in more optional properties before the big annoucnemnt about how you are supposed to not take into account the optional formatting
- However since I already had done it, I left it in as extra, and added different optional properties from the calendar, but the overall functionallity is the same
- The testing for transforming the calendar data is done with hashmaps

## Setup for hw3.js code 
- To run the actual hw2.js code make sure you are in the lib folder (example:
     " C:\Users\aryas\Desktop\Rutgers 2021-2025\Spring 2024\Software Engineering\Homeworks\Homework 3\lib ")
- Then in the VScode terminal run "node hw3.js"
- You will then be prompted with an output in the terminal, of success or some error
- Reminder that it will display the first error it finds, and the calendar could have more, so once fixed you have to rerun to check
- If set to default "calendarTest.txt", you will get your output in the terminal that "Your calendar is formatted correctly"
- Both of these files are in lib folder

## Setup for jasmine test cases
- For the jasmine test cases make sure to go back one folder from lib into homework3 (using cd ..) 
- (example: " C:\Users\aryas\Desktop\Rutgers 2021-2025\Spring 2024\Software Engineering\Homeworks\Homework 3 ")
- Then to run the cases just type in the terminal "npx jasmine"
- It should run 46 specs or test cases and 0 failures

## IMPORTANT Setup for extra tests with txt files
- For the final extra tests not in jasmine, since they are separte files I made, you can run them thorugh the hw3.js code
- Instructions and reuslts for each file below
- To run these extra files in lib, "testcase1.txt"
- Go into the hw3.js file, at line 274, below the IMPORTANT you will see " let calendarFile = fileSystem.readFileSync("calendarTest.txt", "utf-8"); "
    To test files you must change the parameters of readFileSync to whichever file you want to test, example below:

    " let calendarFile = fileSystem.readFileSync("testcase1.txt", "utf-8"); "
    
    ## OUTPUT: 

    ## Here's the list of errors: CREATED is formatted incorrectly, should be YYYYMMDDTHHMMSS,DTEND is formatted incorrectly, should be YYYYMMDDTHHMMSS

    ## Here's the list of unknown properties: HELLO

    ## Here's the list of overlapping dates: 20010109T090100

    ## Here's the list of warning properties: CREATED,DTEND,SUMMARY
 
- If you want your own file you must put it into the lib folder then change the same line