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

const projectListDataList = document.getElementById('projects-list');

function loadDatalist(arr = defaultToDo.tasks, datalist = projectListDataList) {
    datalist.innerHTML = "";
    const projectsList = [...new Set(arr.map((obj) => obj.project))]
    console.log(projectsList)
    projectsList.forEach((element) => {
        datalist.appendChild(new Option(element, element,));
    });
}

const defaultToDo = ArrayFactory()

export { defaultToDo, ToDoFactory, loadDatalist }