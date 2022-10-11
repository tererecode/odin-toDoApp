import { v4 as uuidv4 } from 'uuid';
// imports  {defaultToDo, ToDo} from taskModules
import * as task from './tasksModules.js';

const toDolist = document.querySelector('.list__container')

function render(projectArray) {
    toDolist.innerHTML = '';
    projectArray.forEach(taskObj => {
        let cardHtml = `<div class="card" data-id="${taskObj.uid}">
        <p class="card__todo-title" contenteditable="true">${taskObj.title}</p>
        <p class="card__todo-id">${taskObj.uid}</p>
        <button class="card__add-btn">Save</button>
        <button class="card__del-btn">Delete</button>
        </div>`;
        toDolist.insertAdjacentHTML("afterbegin", cardHtml);
        setBindings(taskObj.uid)
    })
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
    const card = event.target.parentNode
    const titlePara = card.querySelector('.card__todo-title').textContent
    task.defaultToDo.edit(index, titlePara)
    render(task.defaultToDo.tasks)
    console.log(task.defaultToDo.tasks)

}

function taskDelete(event) {
    let index = indexFinder(event)
    task.defaultToDo.delete(index)
    render(task.defaultToDo.tasks)
}

function createCard() {
    let newTaskObject = task.ToDoFactory('', '', '', '', '', uuidv4())
    console.log(newTaskObject)
    task.defaultToDo.add(newTaskObject)
    console.log(task.defaultToDo.tasks)
    render(task.defaultToDo.tasks)
}

export { createCard }