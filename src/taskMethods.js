function adder({ tasks }) {
    return {
        add: (obj) => {
            tasks.push(obj);
            storageHandler('add', tasks, tasks.indexOf(obj))
        }
    }
};

function deleter({ tasks }) {
    return {
        delete: (index) => {
            storageHandler('delete', tasks, index)
            tasks.splice(index, 1);
        }
    }
};

// function editor({ tasks }) {
//     return {
//         edit: (index, newtitle, newDesc, newDue, newPriority, newProject) => {
//             tasks[index].title = newtitle;
//             tasks[index].description = newDesc;
//             tasks[index].dueDate = newDue;
//             tasks[index].priority = newPriority;
//             tasks[index].project = newProject;
//             storageHandler('edit', tasks, index)
//         }
//     }
// };
function editor({ tasks }) {
    return {
        edit: (index, newValues) => {
            tasks[index].title = newValues.title;
            tasks[index].description = newValues.Descrip;
            tasks[index].dueDate = newValues.Due;
            tasks[index].priority = newValues.Priority;
            tasks[index].project = newValues.Project;
            storageHandler('edit', tasks, index)
        }
    }
};

function projectListGenerator({ tasks }) {
    return {
        projectList: () => [...new Set(tasks.map((obj) => obj.project))]
    }
};

function filteredListGenerator({ tasks }) {
    return {
        filterList: (projectName) => tasks.filter((obj) => obj.project == projectName)
    }
}

function storageHandler(action, arr, index) {
    switch (action) {
        case "add":
        case "edit":
            let makeStr = JSON.stringify(arr[index]);
            localStorage.setItem(arr[index].uid, makeStr);
            break;
        case "delete":
            localStorage.removeItem(arr[index].uid);
            break;
    }
}

export { adder, deleter, editor, projectListGenerator, filteredListGenerator }