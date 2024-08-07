let output = '';

// Get the list of all user Lists:
const all_lists = rtm.getLists();

// For each list, get its name, then use that to get its tasks
for (const list of all_lists){
        output += "\r\n\r\n";
        output += "# LIST: " + list.getName();

        // create a search filter to only search this list
        const tasks_in_list  = rtm.getTasks('list:"' + list.getName() + '"' + ' AND status:incomplete');
        for (const task of tasks_in_list){
            output += "\r\n\t";
            output += truncate(task.getName(), 60);
        }
}




// TESTING:
// let list1 = 'My Bucket List';
// const tasks  = rtm.getTasks('list:"' + list1 + '"' + ' AND status:incomplete');
// output += "\r\n";
// for (const task of tasks){
//         output += "\r\n";
//         output += task.getName();
// }

// Now the list with some details:
//output += all_lists;

// Uncomment next line for debugging.
console.log(output);


function truncate(str, n){
  return (str.length > n) ? str.slice(0, n-1) + '...' : str;
};
