import { v4 as uuidv4 } from 'uuid';
import { adder, deleter, editor, projectListGenerator, filteredListGenerator } from './taskMethods'

function ToDoFactory(title = '', description = '', dueDate = '', priority = 'Normal', project = 'Unassigned') {
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
    const taskArray = {
        tasks: []
    }
    return {
        ...taskArray,
        ...adder(taskArray),
        ...deleter(taskArray),
        ...editor(taskArray),
        ...projectListGenerator(taskArray),
        ...filteredListGenerator(taskArray)
    }
};
// Saves all Task Objects
const defaultToDo = ArrayFactory()


export { defaultToDo, ToDoFactory }
