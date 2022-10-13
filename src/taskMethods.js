function adder({ tasks }) {
    return {
        add: (obj) => tasks.push(obj)
    }
};

function deleter({ tasks }) {
    return {
        delete: (index) => tasks.splice(index, 1)
    }
};

function editor({ tasks }) {
    return {
        edit: (index, newtitle, newDesc, newDue, newPriority, newProject) => {
            tasks[index].title = newtitle;
            tasks[index].description = newDesc;
            tasks[index].dueDate = newDue;
            tasks[index].priority = newPriority;
            tasks[index].project = newProject;
        }

    }
};

export { adder, deleter, editor }