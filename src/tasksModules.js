function ToDoFactory(title, description, dueDate, priority, project, uid) {
    let toDo = {
        title,
        description,
        dueDate,
        priority,
        project,
        uid,
    }
    return Object.assign(toDo)
}

function ArrayFactory() {
    const taskArray = { tasks: [] }

    return { ...taskArray, ...adder(taskArray), ...deleter(taskArray), ...editor(taskArray) }
};

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
        edit: (index, newtitle) => tasks[index].title = newtitle
    }
};

const defaultToDo = ArrayFactory()

export { defaultToDo, ToDoFactory }