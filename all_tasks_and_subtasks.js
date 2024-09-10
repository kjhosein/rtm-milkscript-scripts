// This Remember the Milk MilkScript outputs all of your incomplete tasks and subtasks, grouped by list.
// Subtasks are indented.
// 
// The output is in text, but also formatted in basic Markdown. 
// You may optionally strip the '.txt' extension of the downloaded file to have it read as MD.
//
// Written by Khalid J Hosein, Sept 2024.
// https://www.khalidjhosein.net


let header = "# All RTM Tasks & Substasks, as of " + todaysDate();
let output = header;

// Get the list of all user Lists:
const all_lists = rtm.getLists();

// For each list, get its name, then use that to get its tasks
for (const list of all_lists){
    
    if (! list.isArchived()){
        output += "\r\n\r\n\r\n";
        output += "## _" + list.getName() + "_" + "\r\n";
    }

    // create a search filter to only search this list
    const tasks_in_list  = rtm.getTasks('list:"' + list.getName() + '"' + ' AND status:incomplete and isSubtask:false and includeArchived:false');

    let i = 1;  // for numbering the tasks

    for (const task of tasks_in_list){
        output += "\r\n";
        output += i + ". " + truncate(task.getName(), 60);
        i++;

        // Get any subtasks:
        let j = 1;  // for numbering the subtasks
        for (const subtask of task.getSubtasks()){
            if (!subtask.isCompleted()){
                output += "\r\n    ";
                output += "* " + truncate(subtask.getName(), 60);
            }
            j++;
        }
        if (j > 1){ output += "\n"; }
    }
}

output += "\r\n\r\n";

// Uncomment next line for debugging.
// console.log(output);

const filename = todaysDateNumeric() + " - All Tasks & Subtasks (via RTM).md.txt"
rtm.newFile(output, rtm.MediaType.TEXT, filename);



function todaysDate() {
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
    })
    return formattedDate;
}

function todaysDateNumeric() {
    const date = new Date();
    const numericMonth = date.getUTCMonth() + 1;
    const formattedDate = date.getUTCFullYear() + '.' + numericMonth + '.' + date.getDate();
    return formattedDate;
}

function truncate(str, n){
    return (str.length > n) ? str.slice(0, n-1) + '...' : str;
};
