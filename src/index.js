import * as Dom from './domModules'

window.addEventListener('DOMContentLoaded', Dom.loadLocalStorage)


const newToDoBtn = document.getElementById('new__toDo-btn');
newToDoBtn.addEventListener('click', Dom.createCard)



