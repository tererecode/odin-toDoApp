// import { createCard } from domModules
import * as Dom from './domModules'

const newToDoBtn = document.getElementById('new__toDo-btn');
newToDoBtn.addEventListener('click', Dom.createCard)



