// This Remember the Milk MilkScript outputs the tasks that have a Due Date older than x # of days.
// 
// The output is in text, but also formatted in basic Markdown. 
// You may optionally strip the '.txt' extension of the downloaded file to have it read as MD.
// 
// Ensure your RTM account settings have the date format configured to the US setting:
// i.e., mm/dd/yyyy. e.g., 11/25/2023
//
// Written by Khalid J Hosein, Jan 2024.
// https://www.khalidjhosein.net


// How many days old should the dueBefore be. Edit as needed.
const daysOld = 14;


// Don't edit below this line
const searchFilter = 'status:incomplete AND dueBefore:"' + dateLessDaysOld(daysOld) + '"';
const tasks = rtm.getTasks(searchFilter);

let output = '';

// First generate the list of task names only:
output += listTasks(tasks, 0);
console.log("listTasks with no details just ran");

// Now the list with some details:
output += listTasks(tasks, 1);
console.log("listTasks WITH details just ran");

// Uncomment for debugging
/*
console.log(daysOld);
console.log(searchFilter);
console.log(output);
*/

const filename = todaysDateNumeric() + " - Older overdue Tasks (via RTM).md.txt"
rtm.newFile(output, rtm.MediaType.TEXT, filename);


function listTasks(tasks, withDetails = 0) {
    let i = 1;  // for numbering the tasks
    var header = '';

    if(withDetails == 1) {
        header = "---\n# Tasks with Priority & Due Date \n";   
    } else {
        header = "---\n# Tasks with a due date older than " + dateLessDaysOld(daysOld) + " \n";
    }

    let output = header;

    for (const task of tasks){
        output += "\r\n";

        if(withDetails == 1) {
            // Reformat the created date:
            var dueDate = task.getDueDate().toString();
            const dateParts = dueDate.split(' ');
            dueDate = dateParts[0] + ' ' + dateParts[2] + ' ' + dateParts[1] + ' ' + dateParts[3];
            
            output += i + ". " + task.getName() + ". \n\n \t Priority: " + task.getPriority() + ".\n\t Due: " + dueDate + "\n";
            i++;
        } else {
            output += i + ". " + task.getName() + ".";
            i++;
        }
    }

    output += "\r\n\r\n";
    return output;    
}


// Expected RTM format for date: 11/25/2023 (en-US)
function dateLessDaysOld(daysOld) {
    var date = new Date();
    date.setDate(date.getDate() - daysOld);

    const formattedDate = date.toLocaleString('en-US', {
        month: 'numeric', day: 'numeric', year: 'numeric'
    })

    return formattedDate;
}

function todaysDateNumeric() {
    const date = new Date();
    const numericMonth = date.getUTCMonth() + 1;
    const formattedDate = date.getUTCFullYear() + '.' + numericMonth + '.' + date.getDate();
    return formattedDate;
}
