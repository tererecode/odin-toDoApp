// imports  {defaultToDo, ToDoFactory} from taskModules
import * as task from './tasksModules.js';

function loadLocalStorage() {
    if (localStorage.length > 0) {
        for (let i = 0; i < localStorage.length; i++) {
            task.defaultToDo.tasks.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
            render(task.defaultToDo.tasks)
        }
    } else {
        console.log('localStorage empty')
    }
}

const projectSelectEl = document.querySelector('.content__header-select');
projectSelectEl.addEventListener('change', resolveArrayToRender)
const projectListEl = document.getElementById('projects-list');
const toDolist = document.querySelector('.list__container')

let ArrayToRender = task.defaultToDo.tasks;

function resolveArrayToRender() {
    const project = projectSelectEl.value;
    if (project == "All") {
        console.log('yep')
        ArrayToRender = task.defaultToDo.tasks;
        render(ArrayToRender)
    } else {
        ArrayToRender = task.defaultToDo.filterList(project);
        render(ArrayToRender)
    }
}

function render(projectArray) {
    toDolist.innerHTML = '';
    projectArray.forEach(taskObj => {
        let cardHtml = `
        <div class="card" data-id="${taskObj.uid}">
            <input class="card__todo-title" type="text" placeholder="Title..." value="${taskObj.title}">
            <textarea class="card__todo-description" cols="30" rows="5" placeholder="Write a description...">${taskObj.description}</textarea>
            <select name="due-date" class="card__todo-dueDate">
                <option style="display: none" value="${taskObj.dueDate}">${taskObj.dueDate}</option>
                <option value="Now">Now</option>
                <option value="Today">Today</option>
                <option value="Tomorrow">Tomorrow</option>
                <option value="Sometime">Sometime</option>
            </select>
            <select name="priority" class="card__todo-priority">
                <option style="display: none" value="${taskObj.priority}">${taskObj.priority}</option>
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
            </select>
            <input class="card__todo-project" type="text" list="projects-list" value="${taskObj.project}">
            <p class="card__todo-id">${taskObj.uid}</p>
            <button class="card__add-btn">Save</button>
            <button class="card__del-btn">Delete</button>
        </div>`;
        toDolist.insertAdjacentHTML("afterbegin", cardHtml.trim());
        setBindings(taskObj.uid)

    })
    loadDatalist()
}

function setBindings(dataId) {
    const cardElement = toDolist.querySelector(`.card[data-id="${dataId}"]`);
    const deleteBtn = cardElement.querySelector('.card__del-btn');
    deleteBtn.addEventListener('click', event => taskDelete(event));
    const saveBtn = cardElement.querySelector('.card__add-btn');
    saveBtn.addEventListener('click', event => taskUpdate(event))
}

function indexFinder(event) {
    let targetUID = event.target.closest('.card').dataset.id;
    let TargetObjIndex = task.defaultToDo.tasks.findIndex(obj => obj.uid == targetUID)
    return TargetObjIndex;
}

function taskUpdate(event) {
    let index = indexFinder(event);
    const card = event.target.parentNode;
    const titleInput = card.querySelector('.card__todo-title').value;
    const descInput = card.querySelector('.card__todo-description').value;
    const dueDateSel = card.querySelector('.card__todo-dueDate').value;
    const prioritySel = card.querySelector('.card__todo-priority').value
    const projectInput = card.querySelector('.card__todo-project').value
    task.defaultToDo.edit(index, titleInput, descInput, dueDateSel, prioritySel, projectInput)
    render(ArrayToRender)
    console.log(ArrayToRender)

}

function taskDelete(event) {
    let index = indexFinder(event)
    task.defaultToDo.delete(index)
    render(ArrayToRender)
}

function createCard() {
    let newTaskObject = task.ToDoFactory()
    console.log(newTaskObject.uid)
    task.defaultToDo.add(newTaskObject)
    console.log(task.defaultToDo.tasks)
    render(ArrayToRender)
}


function loadDatalist(datalist = projectListEl) {
    const CurrentListDisplay = projectSelectEl.value;
    datalist.innerHTML = "";
    datalist.appendChild(new Option('All', 'All'));
    task.defaultToDo.projectList().forEach((element) => {
        datalist.appendChild(new Option(element, element,));
    });
    projectSelectEl.innerHTML = datalist.innerHTML
    projectSelectEl.value = CurrentListDisplay;
    console.log(task.defaultToDo.projectList())

}


export { createCard, loadLocalStorage }