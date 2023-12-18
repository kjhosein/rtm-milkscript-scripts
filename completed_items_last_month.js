// This Remember the Milk MilkScript outputs the tasks that you completed *last month* in 2 formats:
// 1. Only the task names.
// 2. The task names, their priority and the date they were created
// 
// The output is in text, but also formatted in basic Markdown. 
// You may optionally strip the '.txt' extension of the downloaded file to have it read as MD.
//
// Written by Khalid J Hosein, Nov 2023.
// https://www.khalidjhosein.net


// Get the list of tasks that were completed This Month:
const searchFilter = 'completedBefore:"' + lastDayOfLastMonth() + '" AND completedAfter:"' + firstDayOfLastMonth() + '"';
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
console.log(lastMonth());
console.log(lastDayOfLastMonth());
console.log(firstDayOfLastMonth());
console.log(searchFilter);
console.log(lastMonthNumeric());
console.log(output);
*/

const filename = lastMonthNumeric() + " - Completed Tasks (via RTM).md.txt";
rtm.newFile(output, rtm.MediaType.TEXT, filename);


function listTasks(tasks, withDetails = 0) {
    let i = 1;  // for numbering the tasks
    var header = '';

    if(withDetails == 1) {
        header = "---\n# Completed Tasks with Priority & Creation Date \n"
    } else {
        header = "# Completed last month, " + lastMonth() + ". " + firstDayOfLastMonth() + " - " + lastDayOfLastMonth() + "\n";
    }

    let output = header;

    for (const task of tasks){
        output += "\r\n";

        if(withDetails == 1) {
            // Reformat the created date:
            var createdDate = task.getCreatedDate().toString();
            const dateParts = createdDate.split(' ');
            createdDate = dateParts[0] + ' ' + dateParts[2] + ' ' + dateParts[1] + ' ' + dateParts[3];
            
            output += i + ". " + task.getName() + ". \n\n \t Priority: " + task.getPriority() + ".\n\t Created: " + createdDate + "\n";
            i++;
        } else {
            output += i + ". " + task.getName() + ".";
            i++;
        }
    }

    output += "\r\n\r\n";
    return output;    
}

function lastMonth() {
    const date = new Date();
    date.setDate(0);

    const formattedDate = date.toLocaleDateString('en-GB', {
        month: 'short', year: 'numeric'
    })
    return formattedDate;
}

// Expected RTM format for 1st day of month: Oct 1, 2023
function firstDayOfLastMonth() {
    var date = new Date();
    var firstDayOfLastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);

    const formattedDate = firstDayOfLastMonth.toLocaleString('en-US', {
        month: 'numeric', day: 'numeric', year: 'numeric'
    })

    return formattedDate;
}

// Expected RTM format for last day of month: Oct 1, 2023
function lastDayOfLastMonth() {
    var date = new Date();
    date.setDate(0);

    const formattedDate = date.toLocaleString('en-US', {
        month: 'numeric', day: 'numeric', year: 'numeric'
    })

    return formattedDate;
}

// Last Month in the format 2023.11
function lastMonthNumeric() {
    const date = new Date();
    const numericMonth = date.getUTCMonth();
    const formattedDate = date.getUTCFullYear() + '.' + numericMonth;
    return formattedDate;
}
