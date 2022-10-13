import { v4 as uuidv4 } from 'uuid';
import { adder, deleter, editor } from './taskMethods'

function ToDoFactory(title = '', description = '', dueDate = '', priority = 'Normal', project = 'Default') {
    let toDo = {
        title,
        description,
        dueDate,
        priority,
        project,
        uid: uuidv4(),
    }
    return Object.assign(toDo)
}

function ArrayFactory() {
    const taskArray = { tasks: [] }
    return {
        ...taskArray,
        ...adder(taskArray),
        ...deleter(taskArray),
        ...editor(taskArray)
    }
};

const generateDatalist = (arr = defaultToDo.tasks) => [...new Set(arr.map((obj) => obj.project))]

const defaultToDo = ArrayFactory()

export { defaultToDo, ToDoFactory, generateDatalist }