/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/uuid/dist/esm-browser/native.js":
/*!******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/native.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  randomUUID
});

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "unsafeStringify": () => (/* binding */ unsafeStringify)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ "./node_modules/uuid/dist/esm-browser/native.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");




function v4(options, buf, offset) {
  if (_native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID && !buf && !options) {
    return _native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ }),

/***/ "./src/domModules.js":
/*!***************************!*\
  !*** ./src/domModules.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createCard": () => (/* binding */ createCard),
/* harmony export */   "loadLocalStorage": () => (/* binding */ loadLocalStorage)
/* harmony export */ });
/* harmony import */ var _tasksModules_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasksModules.js */ "./src/tasksModules.js");
// imports  {defaultToDo, ToDoFactory} from taskModules


function loadLocalStorage() {
    if (localStorage.length > 0) {
        for (let i = 0; i < localStorage.length; i++) {
            _tasksModules_js__WEBPACK_IMPORTED_MODULE_0__.defaultToDo.tasks.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
            render(_tasksModules_js__WEBPACK_IMPORTED_MODULE_0__.defaultToDo.tasks)
        }
    } else {
        console.log('localStorage empty')
    }
}

const projectSelectEl = document.querySelector('.content__header-select');
projectSelectEl.addEventListener('change', resolveArrayToRender)
const projectListEl = document.getElementById('projects-list');
const toDolist = document.querySelector('.list__container')

let ArrayToRender = _tasksModules_js__WEBPACK_IMPORTED_MODULE_0__.defaultToDo.tasks;

function resolveArrayToRender() {
    const project = projectSelectEl.value;
    if (project == "All") {
        console.log('yep')
        ArrayToRender = _tasksModules_js__WEBPACK_IMPORTED_MODULE_0__.defaultToDo.tasks;
        render(ArrayToRender)
    } else {
        ArrayToRender = _tasksModules_js__WEBPACK_IMPORTED_MODULE_0__.defaultToDo.filterList(project);
        render(ArrayToRender)
    }
}

function render(projectArray) {
    toDolist.textContent = '';
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
// this implementation only load  once after the loop, but requires a re write on the set bindings fn
// function render(projectArray) {
//     toDolist.textContent = '';
//     let html = '';
//     projectArray.forEach(taskObj => {
//         html = `
//         <div class="card" data-id="${taskObj.uid}">
//             <input class="card__todo-title" type="text" placeholder="Title..." value="${taskObj.title}">
//             <textarea class="card__todo-description" cols="30" rows="5" placeholder="Write a description...">${taskObj.description}</textarea>
//             <select name="due-date" class="card__todo-dueDate">
//                 <option style="display: none" value="${taskObj.dueDate}">${taskObj.dueDate}</option>
//                 <option value="Now">Now</option>
//                 <option value="Today">Today</option>
//                 <option value="Tomorrow">Tomorrow</option>
//                 <option value="Sometime">Sometime</option>
//             </select>
//             <select name="priority" class="card__todo-priority">
//                 <option style="display: none" value="${taskObj.priority}">${taskObj.priority}</option>
//                 <option value="Low">Low</option>
//                 <option value="Normal">Normal</option>
//                 <option value="High">High</option>
//                 <option value="Urgent">Urgent</option>
//             </select>
//             <input class="card__todo-project" type="text" list="projects-list" value="${taskObj.project}">
//             <p class="card__todo-id">${taskObj.uid}</p>
//             <button class="card__add-btn">Save</button>
//             <button class="card__del-btn">Delete</button>
//         </div> ${html}`;
//         // toDolist.insertAdjacentHTML("afterbegin", cardHtml.trim());
//         // setBindings(taskObj.uid)

//     })
//     toDolist.innerHTML = html;
//     // loadDatalist()
// }

function setBindings(dataId) {
    const cardElement = toDolist.querySelector(`.card[data-id="${dataId}"]`);
    const projectInputElement = cardElement.querySelector('.card__todo-project')
    projectInputElement.addEventListener('click', clearInput)
    const deleteBtn = cardElement.querySelector('.card__del-btn');
    deleteBtn.addEventListener('click', event => taskDelete(event));
    const saveBtn = cardElement.querySelector('.card__add-btn');
    saveBtn.addEventListener('click', event => taskUpdate(event));
}

function indexFinder(event) {
    let targetUID = event.target.closest('.card').dataset.id;
    let TargetObjIndex = _tasksModules_js__WEBPACK_IMPORTED_MODULE_0__.defaultToDo.tasks.findIndex(obj => obj.uid == targetUID)
    return TargetObjIndex;
}

function taskUpdate(event) {
    let index = indexFinder(event);
    const card = event.target.parentNode;
    const newValues = {
        title: card.querySelector('.card__todo-title').value,
        Descrip: card.querySelector('.card__todo-description').value,
        Due: card.querySelector('.card__todo-dueDate').value,
        Priority: card.querySelector('.card__todo-priority').value,
        Project: card.querySelector('.card__todo-project').value,
    }
    // const titleInput = card.querySelector('.card__todo-title').value;
    // const descInput = card.querySelector('.card__todo-description').value;
    // const dueDateSel = card.querySelector('.card__todo-dueDate').value;
    // const prioritySel = card.querySelector('.card__todo-priority').value
    // const projectInput = card.querySelector('.card__todo-project').value
    // task.defaultToDo.edit(index, titleInput, descInput, dueDateSel, prioritySel, projectInput)
    _tasksModules_js__WEBPACK_IMPORTED_MODULE_0__.defaultToDo.edit(index, newValues)
    render(ArrayToRender)
    console.log(ArrayToRender)

}

function clearInput(event) {
    let previousValue = event.target.value;
    event.target.value = ''
    event.target.addEventListener('blur', cancelInput)
    function cancelInput(e) {
        if (e.target.value == '') {
            e.target.value = previousValue
        }
    }
}

function taskDelete(event) {
    let index = indexFinder(event)
    _tasksModules_js__WEBPACK_IMPORTED_MODULE_0__.defaultToDo["delete"](index)
    render(ArrayToRender)
}

function createCard() {
    let newTaskObject = _tasksModules_js__WEBPACK_IMPORTED_MODULE_0__.ToDoFactory()
    console.log(newTaskObject.uid)
    _tasksModules_js__WEBPACK_IMPORTED_MODULE_0__.defaultToDo.add(newTaskObject)
    console.log(_tasksModules_js__WEBPACK_IMPORTED_MODULE_0__.defaultToDo.tasks)
    render(ArrayToRender)
}


function loadDatalist(datalist = projectListEl) {
    const CurrentListDisplay = projectSelectEl.value;
    datalist.innerHTML = "";
    datalist.appendChild(new Option('All', 'All'));
    _tasksModules_js__WEBPACK_IMPORTED_MODULE_0__.defaultToDo.projectList().forEach((element) => {
        datalist.appendChild(new Option(element, element,));
    });
    projectSelectEl.innerHTML = datalist.innerHTML
    projectSelectEl.value = CurrentListDisplay;
    console.log(_tasksModules_js__WEBPACK_IMPORTED_MODULE_0__.defaultToDo.projectList())

}




/***/ }),

/***/ "./src/taskMethods.js":
/*!****************************!*\
  !*** ./src/taskMethods.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "adder": () => (/* binding */ adder),
/* harmony export */   "deleter": () => (/* binding */ deleter),
/* harmony export */   "editor": () => (/* binding */ editor),
/* harmony export */   "filteredListGenerator": () => (/* binding */ filteredListGenerator),
/* harmony export */   "projectListGenerator": () => (/* binding */ projectListGenerator)
/* harmony export */ });
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



/***/ }),

/***/ "./src/tasksModules.js":
/*!*****************************!*\
  !*** ./src/tasksModules.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ToDoFactory": () => (/* binding */ ToDoFactory),
/* harmony export */   "defaultToDo": () => (/* binding */ defaultToDo)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _taskMethods__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskMethods */ "./src/taskMethods.js");



function ToDoFactory(title = '', description = '', dueDate = '', priority = 'Normal', project = 'Unassigned') {
    let toDo = {
        title,
        description,
        dueDate,
        priority,
        project,
        uid: (0,uuid__WEBPACK_IMPORTED_MODULE_1__["default"])(),
    }
    return Object.assign(toDo)
}

function ArrayFactory() {
    const taskArray = {
        tasks: []
    }
    return {
        ...taskArray,
        ...(0,_taskMethods__WEBPACK_IMPORTED_MODULE_0__.adder)(taskArray),
        ...(0,_taskMethods__WEBPACK_IMPORTED_MODULE_0__.deleter)(taskArray),
        ...(0,_taskMethods__WEBPACK_IMPORTED_MODULE_0__.editor)(taskArray),
        ...(0,_taskMethods__WEBPACK_IMPORTED_MODULE_0__.projectListGenerator)(taskArray),
        ...(0,_taskMethods__WEBPACK_IMPORTED_MODULE_0__.filteredListGenerator)(taskArray)
    }
};
// Saves all Task Objects
const defaultToDo = ArrayFactory()





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _domModules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domModules */ "./src/domModules.js");


window.addEventListener('DOMContentLoaded', _domModules__WEBPACK_IMPORTED_MODULE_0__.loadLocalStorage)


const newToDoBtn = document.getElementById('new__toDo-btn');
newToDoBtn.addEventListener('click', _domModules__WEBPACK_IMPORTED_MODULE_0__.createCard)




})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VyxrRUFBb0I7QUFDL0IsV0FBVyxtRUFBcUI7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7OztBQUdtQzs7Ozs7OztVQ2hDbkM7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05tQzs7QUFFbkMsNENBQTRDLHlEQUFvQjs7O0FBR2hFO0FBQ0EscUNBQXFDLG1EQUFjIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10b2RvYXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9uYXRpdmUuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvYXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9yZWdleC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG9hcHAvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JuZy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG9hcHAvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG9hcHAvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3Y0LmpzIiwid2VicGFjazovL29kaW4tdG9kb2FwcC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvYXBwLy4vc3JjL2RvbU1vZHVsZXMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvYXBwLy4vc3JjL3Rhc2tNZXRob2RzLmpzIiwid2VicGFjazovL29kaW4tdG9kb2FwcC8uL3NyYy90YXNrc01vZHVsZXMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tdG9kb2FwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHJhbmRvbVVVSUQgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8ucmFuZG9tVVVJRCAmJiBjcnlwdG8ucmFuZG9tVVVJRC5iaW5kKGNyeXB0byk7XG5leHBvcnQgZGVmYXVsdCB7XG4gIHJhbmRvbVVVSURcbn07IiwiZXhwb3J0IGRlZmF1bHQgL14oPzpbMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfXwwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDApJC9pOyIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuIEluIHRoZSBicm93c2VyIHdlIHRoZXJlZm9yZVxuLy8gcmVxdWlyZSB0aGUgY3J5cHRvIEFQSSBhbmQgZG8gbm90IHN1cHBvcnQgYnVpbHQtaW4gZmFsbGJhY2sgdG8gbG93ZXIgcXVhbGl0eSByYW5kb20gbnVtYmVyXG4vLyBnZW5lcmF0b3JzIChsaWtlIE1hdGgucmFuZG9tKCkpLlxubGV0IGdldFJhbmRvbVZhbHVlcztcbmNvbnN0IHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm5nKCkge1xuICAvLyBsYXp5IGxvYWQgc28gdGhhdCBlbnZpcm9ubWVudHMgdGhhdCBuZWVkIHRvIHBvbHlmaWxsIGhhdmUgYSBjaGFuY2UgdG8gZG8gc29cbiAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG8gaW1wbGVtZW50YXRpb24uXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKTtcblxuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG59IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5cbmNvbnN0IGJ5dGVUb0hleCA9IFtdO1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zbGljZSgxKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICByZXR1cm4gKGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgM11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDVdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA3XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDhdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxM11dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNV1dKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIGNvbnN0IHV1aWQgPSB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQpOyAvLyBDb25zaXN0ZW5jeSBjaGVjayBmb3IgdmFsaWQgVVVJRC4gIElmIHRoaXMgdGhyb3dzLCBpdCdzIGxpa2VseSBkdWUgdG8gb25lXG4gIC8vIG9mIHRoZSBmb2xsb3dpbmc6XG4gIC8vIC0gT25lIG9yIG1vcmUgaW5wdXQgYXJyYXkgdmFsdWVzIGRvbid0IG1hcCB0byBhIGhleCBvY3RldCAobGVhZGluZyB0b1xuICAvLyBcInVuZGVmaW5lZFwiIGluIHRoZSB1dWlkKVxuICAvLyAtIEludmFsaWQgaW5wdXQgdmFsdWVzIGZvciB0aGUgUkZDIGB2ZXJzaW9uYCBvciBgdmFyaWFudGAgZmllbGRzXG5cbiAgaWYgKCF2YWxpZGF0ZSh1dWlkKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignU3RyaW5naWZpZWQgVVVJRCBpcyBpbnZhbGlkJyk7XG4gIH1cblxuICByZXR1cm4gdXVpZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RyaW5naWZ5OyIsImltcG9ydCBuYXRpdmUgZnJvbSAnLi9uYXRpdmUuanMnO1xuaW1wb3J0IHJuZyBmcm9tICcuL3JuZy5qcyc7XG5pbXBvcnQgeyB1bnNhZmVTdHJpbmdpZnkgfSBmcm9tICcuL3N0cmluZ2lmeS5qcyc7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIGlmIChuYXRpdmUucmFuZG9tVVVJRCAmJiAhYnVmICYmICFvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5hdGl2ZS5yYW5kb21VVUlEKCk7XG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3Qgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7IC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcblxuICBybmRzWzZdID0gcm5kc1s2XSAmIDB4MGYgfCAweDQwO1xuICBybmRzWzhdID0gcm5kc1s4XSAmIDB4M2YgfCAweDgwOyAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcblxuICBpZiAoYnVmKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHJuZHNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuXG4gIHJldHVybiB1bnNhZmVTdHJpbmdpZnkocm5kcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHY0OyIsImltcG9ydCBSRUdFWCBmcm9tICcuL3JlZ2V4LmpzJztcblxuZnVuY3Rpb24gdmFsaWRhdGUodXVpZCkge1xuICByZXR1cm4gdHlwZW9mIHV1aWQgPT09ICdzdHJpbmcnICYmIFJFR0VYLnRlc3QodXVpZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlOyIsIi8vIGltcG9ydHMgIHtkZWZhdWx0VG9EbywgVG9Eb0ZhY3Rvcnl9IGZyb20gdGFza01vZHVsZXNcbmltcG9ydCAqIGFzIHRhc2sgZnJvbSAnLi90YXNrc01vZHVsZXMuanMnO1xuXG5mdW5jdGlvbiBsb2FkTG9jYWxTdG9yYWdlKCkge1xuICAgIGlmIChsb2NhbFN0b3JhZ2UubGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxvY2FsU3RvcmFnZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGFzay5kZWZhdWx0VG9Eby50YXNrcy5wdXNoKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYWxTdG9yYWdlLmtleShpKSkpKVxuICAgICAgICAgICAgcmVuZGVyKHRhc2suZGVmYXVsdFRvRG8udGFza3MpXG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygnbG9jYWxTdG9yYWdlIGVtcHR5JylcbiAgICB9XG59XG5cbmNvbnN0IHByb2plY3RTZWxlY3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50X19oZWFkZXItc2VsZWN0Jyk7XG5wcm9qZWN0U2VsZWN0RWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgcmVzb2x2ZUFycmF5VG9SZW5kZXIpXG5jb25zdCBwcm9qZWN0TGlzdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RzLWxpc3QnKTtcbmNvbnN0IHRvRG9saXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3RfX2NvbnRhaW5lcicpXG5cbmxldCBBcnJheVRvUmVuZGVyID0gdGFzay5kZWZhdWx0VG9Eby50YXNrcztcblxuZnVuY3Rpb24gcmVzb2x2ZUFycmF5VG9SZW5kZXIoKSB7XG4gICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RTZWxlY3RFbC52YWx1ZTtcbiAgICBpZiAocHJvamVjdCA9PSBcIkFsbFwiKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd5ZXAnKVxuICAgICAgICBBcnJheVRvUmVuZGVyID0gdGFzay5kZWZhdWx0VG9Eby50YXNrcztcbiAgICAgICAgcmVuZGVyKEFycmF5VG9SZW5kZXIpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgQXJyYXlUb1JlbmRlciA9IHRhc2suZGVmYXVsdFRvRG8uZmlsdGVyTGlzdChwcm9qZWN0KTtcbiAgICAgICAgcmVuZGVyKEFycmF5VG9SZW5kZXIpXG4gICAgfVxufVxuXG5mdW5jdGlvbiByZW5kZXIocHJvamVjdEFycmF5KSB7XG4gICAgdG9Eb2xpc3QudGV4dENvbnRlbnQgPSAnJztcbiAgICBwcm9qZWN0QXJyYXkuZm9yRWFjaCh0YXNrT2JqID0+IHtcbiAgICAgICAgbGV0IGNhcmRIdG1sID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiIGRhdGEtaWQ9XCIke3Rhc2tPYmoudWlkfVwiPlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiY2FyZF9fdG9kby10aXRsZVwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJUaXRsZS4uLlwiIHZhbHVlPVwiJHt0YXNrT2JqLnRpdGxlfVwiPlxuICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiY2FyZF9fdG9kby1kZXNjcmlwdGlvblwiIGNvbHM9XCIzMFwiIHJvd3M9XCI1XCIgcGxhY2Vob2xkZXI9XCJXcml0ZSBhIGRlc2NyaXB0aW9uLi4uXCI+JHt0YXNrT2JqLmRlc2NyaXB0aW9ufTwvdGV4dGFyZWE+XG4gICAgICAgICAgICA8c2VsZWN0IG5hbWU9XCJkdWUtZGF0ZVwiIGNsYXNzPVwiY2FyZF9fdG9kby1kdWVEYXRlXCI+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIiB2YWx1ZT1cIiR7dGFza09iai5kdWVEYXRlfVwiPiR7dGFza09iai5kdWVEYXRlfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJOb3dcIj5Ob3c8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiVG9kYXlcIj5Ub2RheTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJUb21vcnJvd1wiPlRvbW9ycm93PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlNvbWV0aW1lXCI+U29tZXRpbWU8L29wdGlvbj5cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPHNlbGVjdCBuYW1lPVwicHJpb3JpdHlcIiBjbGFzcz1cImNhcmRfX3RvZG8tcHJpb3JpdHlcIj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHN0eWxlPVwiZGlzcGxheTogbm9uZVwiIHZhbHVlPVwiJHt0YXNrT2JqLnByaW9yaXR5fVwiPiR7dGFza09iai5wcmlvcml0eX08L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTG93XCI+TG93PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIk5vcm1hbFwiPk5vcm1hbDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJIaWdoXCI+SGlnaDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJVcmdlbnRcIj5VcmdlbnQ8L29wdGlvbj5cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiY2FyZF9fdG9kby1wcm9qZWN0XCIgdHlwZT1cInRleHRcIiBsaXN0PVwicHJvamVjdHMtbGlzdFwiIHZhbHVlPVwiJHt0YXNrT2JqLnByb2plY3R9XCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImNhcmRfX3RvZG8taWRcIj4ke3Rhc2tPYmoudWlkfTwvcD5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJjYXJkX19hZGQtYnRuXCI+U2F2ZTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNhcmRfX2RlbC1idG5cIj5EZWxldGU8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+YDtcbiAgICAgICAgdG9Eb2xpc3QuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYWZ0ZXJiZWdpblwiLCBjYXJkSHRtbC50cmltKCkpO1xuICAgICAgICBzZXRCaW5kaW5ncyh0YXNrT2JqLnVpZClcblxuICAgIH0pXG4gICAgbG9hZERhdGFsaXN0KClcbn1cbi8vIHRoaXMgaW1wbGVtZW50YXRpb24gb25seSBsb2FkICBvbmNlIGFmdGVyIHRoZSBsb29wLCBidXQgcmVxdWlyZXMgYSByZSB3cml0ZSBvbiB0aGUgc2V0IGJpbmRpbmdzIGZuXG4vLyBmdW5jdGlvbiByZW5kZXIocHJvamVjdEFycmF5KSB7XG4vLyAgICAgdG9Eb2xpc3QudGV4dENvbnRlbnQgPSAnJztcbi8vICAgICBsZXQgaHRtbCA9ICcnO1xuLy8gICAgIHByb2plY3RBcnJheS5mb3JFYWNoKHRhc2tPYmogPT4ge1xuLy8gICAgICAgICBodG1sID0gYFxuLy8gICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiIGRhdGEtaWQ9XCIke3Rhc2tPYmoudWlkfVwiPlxuLy8gICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiY2FyZF9fdG9kby10aXRsZVwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJUaXRsZS4uLlwiIHZhbHVlPVwiJHt0YXNrT2JqLnRpdGxlfVwiPlxuLy8gICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiY2FyZF9fdG9kby1kZXNjcmlwdGlvblwiIGNvbHM9XCIzMFwiIHJvd3M9XCI1XCIgcGxhY2Vob2xkZXI9XCJXcml0ZSBhIGRlc2NyaXB0aW9uLi4uXCI+JHt0YXNrT2JqLmRlc2NyaXB0aW9ufTwvdGV4dGFyZWE+XG4vLyAgICAgICAgICAgICA8c2VsZWN0IG5hbWU9XCJkdWUtZGF0ZVwiIGNsYXNzPVwiY2FyZF9fdG9kby1kdWVEYXRlXCI+XG4vLyAgICAgICAgICAgICAgICAgPG9wdGlvbiBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIiB2YWx1ZT1cIiR7dGFza09iai5kdWVEYXRlfVwiPiR7dGFza09iai5kdWVEYXRlfTwvb3B0aW9uPlxuLy8gICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJOb3dcIj5Ob3c8L29wdGlvbj5cbi8vICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiVG9kYXlcIj5Ub2RheTwvb3B0aW9uPlxuLy8gICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJUb21vcnJvd1wiPlRvbW9ycm93PC9vcHRpb24+XG4vLyAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlNvbWV0aW1lXCI+U29tZXRpbWU8L29wdGlvbj5cbi8vICAgICAgICAgICAgIDwvc2VsZWN0PlxuLy8gICAgICAgICAgICAgPHNlbGVjdCBuYW1lPVwicHJpb3JpdHlcIiBjbGFzcz1cImNhcmRfX3RvZG8tcHJpb3JpdHlcIj5cbi8vICAgICAgICAgICAgICAgICA8b3B0aW9uIHN0eWxlPVwiZGlzcGxheTogbm9uZVwiIHZhbHVlPVwiJHt0YXNrT2JqLnByaW9yaXR5fVwiPiR7dGFza09iai5wcmlvcml0eX08L29wdGlvbj5cbi8vICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTG93XCI+TG93PC9vcHRpb24+XG4vLyAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIk5vcm1hbFwiPk5vcm1hbDwvb3B0aW9uPlxuLy8gICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJIaWdoXCI+SGlnaDwvb3B0aW9uPlxuLy8gICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJVcmdlbnRcIj5VcmdlbnQ8L29wdGlvbj5cbi8vICAgICAgICAgICAgIDwvc2VsZWN0PlxuLy8gICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiY2FyZF9fdG9kby1wcm9qZWN0XCIgdHlwZT1cInRleHRcIiBsaXN0PVwicHJvamVjdHMtbGlzdFwiIHZhbHVlPVwiJHt0YXNrT2JqLnByb2plY3R9XCI+XG4vLyAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmRfX3RvZG8taWRcIj4ke3Rhc2tPYmoudWlkfTwvcD5cbi8vICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJjYXJkX19hZGQtYnRuXCI+U2F2ZTwvYnV0dG9uPlxuLy8gICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNhcmRfX2RlbC1idG5cIj5EZWxldGU8L2J1dHRvbj5cbi8vICAgICAgICAgPC9kaXY+ICR7aHRtbH1gO1xuLy8gICAgICAgICAvLyB0b0RvbGlzdC5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlcmJlZ2luXCIsIGNhcmRIdG1sLnRyaW0oKSk7XG4vLyAgICAgICAgIC8vIHNldEJpbmRpbmdzKHRhc2tPYmoudWlkKVxuXG4vLyAgICAgfSlcbi8vICAgICB0b0RvbGlzdC5pbm5lckhUTUwgPSBodG1sO1xuLy8gICAgIC8vIGxvYWREYXRhbGlzdCgpXG4vLyB9XG5cbmZ1bmN0aW9uIHNldEJpbmRpbmdzKGRhdGFJZCkge1xuICAgIGNvbnN0IGNhcmRFbGVtZW50ID0gdG9Eb2xpc3QucXVlcnlTZWxlY3RvcihgLmNhcmRbZGF0YS1pZD1cIiR7ZGF0YUlkfVwiXWApO1xuICAgIGNvbnN0IHByb2plY3RJbnB1dEVsZW1lbnQgPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZF9fdG9kby1wcm9qZWN0JylcbiAgICBwcm9qZWN0SW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xlYXJJbnB1dClcbiAgICBjb25zdCBkZWxldGVCdG4gPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZF9fZGVsLWJ0bicpO1xuICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHRhc2tEZWxldGUoZXZlbnQpKTtcbiAgICBjb25zdCBzYXZlQnRuID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmRfX2FkZC1idG4nKTtcbiAgICBzYXZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4gdGFza1VwZGF0ZShldmVudCkpO1xufVxuXG5mdW5jdGlvbiBpbmRleEZpbmRlcihldmVudCkge1xuICAgIGxldCB0YXJnZXRVSUQgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLmNhcmQnKS5kYXRhc2V0LmlkO1xuICAgIGxldCBUYXJnZXRPYmpJbmRleCA9IHRhc2suZGVmYXVsdFRvRG8udGFza3MuZmluZEluZGV4KG9iaiA9PiBvYmoudWlkID09IHRhcmdldFVJRClcbiAgICByZXR1cm4gVGFyZ2V0T2JqSW5kZXg7XG59XG5cbmZ1bmN0aW9uIHRhc2tVcGRhdGUoZXZlbnQpIHtcbiAgICBsZXQgaW5kZXggPSBpbmRleEZpbmRlcihldmVudCk7XG4gICAgY29uc3QgY2FyZCA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlO1xuICAgIGNvbnN0IG5ld1ZhbHVlcyA9IHtcbiAgICAgICAgdGl0bGU6IGNhcmQucXVlcnlTZWxlY3RvcignLmNhcmRfX3RvZG8tdGl0bGUnKS52YWx1ZSxcbiAgICAgICAgRGVzY3JpcDogY2FyZC5xdWVyeVNlbGVjdG9yKCcuY2FyZF9fdG9kby1kZXNjcmlwdGlvbicpLnZhbHVlLFxuICAgICAgICBEdWU6IGNhcmQucXVlcnlTZWxlY3RvcignLmNhcmRfX3RvZG8tZHVlRGF0ZScpLnZhbHVlLFxuICAgICAgICBQcmlvcml0eTogY2FyZC5xdWVyeVNlbGVjdG9yKCcuY2FyZF9fdG9kby1wcmlvcml0eScpLnZhbHVlLFxuICAgICAgICBQcm9qZWN0OiBjYXJkLnF1ZXJ5U2VsZWN0b3IoJy5jYXJkX190b2RvLXByb2plY3QnKS52YWx1ZSxcbiAgICB9XG4gICAgLy8gY29uc3QgdGl0bGVJbnB1dCA9IGNhcmQucXVlcnlTZWxlY3RvcignLmNhcmRfX3RvZG8tdGl0bGUnKS52YWx1ZTtcbiAgICAvLyBjb25zdCBkZXNjSW5wdXQgPSBjYXJkLnF1ZXJ5U2VsZWN0b3IoJy5jYXJkX190b2RvLWRlc2NyaXB0aW9uJykudmFsdWU7XG4gICAgLy8gY29uc3QgZHVlRGF0ZVNlbCA9IGNhcmQucXVlcnlTZWxlY3RvcignLmNhcmRfX3RvZG8tZHVlRGF0ZScpLnZhbHVlO1xuICAgIC8vIGNvbnN0IHByaW9yaXR5U2VsID0gY2FyZC5xdWVyeVNlbGVjdG9yKCcuY2FyZF9fdG9kby1wcmlvcml0eScpLnZhbHVlXG4gICAgLy8gY29uc3QgcHJvamVjdElucHV0ID0gY2FyZC5xdWVyeVNlbGVjdG9yKCcuY2FyZF9fdG9kby1wcm9qZWN0JykudmFsdWVcbiAgICAvLyB0YXNrLmRlZmF1bHRUb0RvLmVkaXQoaW5kZXgsIHRpdGxlSW5wdXQsIGRlc2NJbnB1dCwgZHVlRGF0ZVNlbCwgcHJpb3JpdHlTZWwsIHByb2plY3RJbnB1dClcbiAgICB0YXNrLmRlZmF1bHRUb0RvLmVkaXQoaW5kZXgsIG5ld1ZhbHVlcylcbiAgICByZW5kZXIoQXJyYXlUb1JlbmRlcilcbiAgICBjb25zb2xlLmxvZyhBcnJheVRvUmVuZGVyKVxuXG59XG5cbmZ1bmN0aW9uIGNsZWFySW5wdXQoZXZlbnQpIHtcbiAgICBsZXQgcHJldmlvdXNWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICBldmVudC50YXJnZXQudmFsdWUgPSAnJ1xuICAgIGV2ZW50LnRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgY2FuY2VsSW5wdXQpXG4gICAgZnVuY3Rpb24gY2FuY2VsSW5wdXQoZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQudmFsdWUgPT0gJycpIHtcbiAgICAgICAgICAgIGUudGFyZ2V0LnZhbHVlID0gcHJldmlvdXNWYWx1ZVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiB0YXNrRGVsZXRlKGV2ZW50KSB7XG4gICAgbGV0IGluZGV4ID0gaW5kZXhGaW5kZXIoZXZlbnQpXG4gICAgdGFzay5kZWZhdWx0VG9Eby5kZWxldGUoaW5kZXgpXG4gICAgcmVuZGVyKEFycmF5VG9SZW5kZXIpXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNhcmQoKSB7XG4gICAgbGV0IG5ld1Rhc2tPYmplY3QgPSB0YXNrLlRvRG9GYWN0b3J5KClcbiAgICBjb25zb2xlLmxvZyhuZXdUYXNrT2JqZWN0LnVpZClcbiAgICB0YXNrLmRlZmF1bHRUb0RvLmFkZChuZXdUYXNrT2JqZWN0KVxuICAgIGNvbnNvbGUubG9nKHRhc2suZGVmYXVsdFRvRG8udGFza3MpXG4gICAgcmVuZGVyKEFycmF5VG9SZW5kZXIpXG59XG5cblxuZnVuY3Rpb24gbG9hZERhdGFsaXN0KGRhdGFsaXN0ID0gcHJvamVjdExpc3RFbCkge1xuICAgIGNvbnN0IEN1cnJlbnRMaXN0RGlzcGxheSA9IHByb2plY3RTZWxlY3RFbC52YWx1ZTtcbiAgICBkYXRhbGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGRhdGFsaXN0LmFwcGVuZENoaWxkKG5ldyBPcHRpb24oJ0FsbCcsICdBbGwnKSk7XG4gICAgdGFzay5kZWZhdWx0VG9Eby5wcm9qZWN0TGlzdCgpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZGF0YWxpc3QuYXBwZW5kQ2hpbGQobmV3IE9wdGlvbihlbGVtZW50LCBlbGVtZW50LCkpO1xuICAgIH0pO1xuICAgIHByb2plY3RTZWxlY3RFbC5pbm5lckhUTUwgPSBkYXRhbGlzdC5pbm5lckhUTUxcbiAgICBwcm9qZWN0U2VsZWN0RWwudmFsdWUgPSBDdXJyZW50TGlzdERpc3BsYXk7XG4gICAgY29uc29sZS5sb2codGFzay5kZWZhdWx0VG9Eby5wcm9qZWN0TGlzdCgpKVxuXG59XG5cblxuZXhwb3J0IHsgY3JlYXRlQ2FyZCwgbG9hZExvY2FsU3RvcmFnZSB9IiwiZnVuY3Rpb24gYWRkZXIoeyB0YXNrcyB9KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkOiAob2JqKSA9PiB7XG4gICAgICAgICAgICB0YXNrcy5wdXNoKG9iaik7XG4gICAgICAgICAgICBzdG9yYWdlSGFuZGxlcignYWRkJywgdGFza3MsIHRhc2tzLmluZGV4T2Yob2JqKSlcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmZ1bmN0aW9uIGRlbGV0ZXIoeyB0YXNrcyB9KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGVsZXRlOiAoaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHN0b3JhZ2VIYW5kbGVyKCdkZWxldGUnLCB0YXNrcywgaW5kZXgpXG4gICAgICAgICAgICB0YXNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLy8gZnVuY3Rpb24gZWRpdG9yKHsgdGFza3MgfSkge1xuLy8gICAgIHJldHVybiB7XG4vLyAgICAgICAgIGVkaXQ6IChpbmRleCwgbmV3dGl0bGUsIG5ld0Rlc2MsIG5ld0R1ZSwgbmV3UHJpb3JpdHksIG5ld1Byb2plY3QpID0+IHtcbi8vICAgICAgICAgICAgIHRhc2tzW2luZGV4XS50aXRsZSA9IG5ld3RpdGxlO1xuLy8gICAgICAgICAgICAgdGFza3NbaW5kZXhdLmRlc2NyaXB0aW9uID0gbmV3RGVzYztcbi8vICAgICAgICAgICAgIHRhc2tzW2luZGV4XS5kdWVEYXRlID0gbmV3RHVlO1xuLy8gICAgICAgICAgICAgdGFza3NbaW5kZXhdLnByaW9yaXR5ID0gbmV3UHJpb3JpdHk7XG4vLyAgICAgICAgICAgICB0YXNrc1tpbmRleF0ucHJvamVjdCA9IG5ld1Byb2plY3Q7XG4vLyAgICAgICAgICAgICBzdG9yYWdlSGFuZGxlcignZWRpdCcsIHRhc2tzLCBpbmRleClcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vIH07XG5mdW5jdGlvbiBlZGl0b3IoeyB0YXNrcyB9KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZWRpdDogKGluZGV4LCBuZXdWYWx1ZXMpID0+IHtcbiAgICAgICAgICAgIHRhc2tzW2luZGV4XS50aXRsZSA9IG5ld1ZhbHVlcy50aXRsZTtcbiAgICAgICAgICAgIHRhc2tzW2luZGV4XS5kZXNjcmlwdGlvbiA9IG5ld1ZhbHVlcy5EZXNjcmlwO1xuICAgICAgICAgICAgdGFza3NbaW5kZXhdLmR1ZURhdGUgPSBuZXdWYWx1ZXMuRHVlO1xuICAgICAgICAgICAgdGFza3NbaW5kZXhdLnByaW9yaXR5ID0gbmV3VmFsdWVzLlByaW9yaXR5O1xuICAgICAgICAgICAgdGFza3NbaW5kZXhdLnByb2plY3QgPSBuZXdWYWx1ZXMuUHJvamVjdDtcbiAgICAgICAgICAgIHN0b3JhZ2VIYW5kbGVyKCdlZGl0JywgdGFza3MsIGluZGV4KVxuICAgICAgICB9XG4gICAgfVxufTtcblxuZnVuY3Rpb24gcHJvamVjdExpc3RHZW5lcmF0b3IoeyB0YXNrcyB9KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcHJvamVjdExpc3Q6ICgpID0+IFsuLi5uZXcgU2V0KHRhc2tzLm1hcCgob2JqKSA9PiBvYmoucHJvamVjdCkpXVxuICAgIH1cbn07XG5cbmZ1bmN0aW9uIGZpbHRlcmVkTGlzdEdlbmVyYXRvcih7IHRhc2tzIH0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBmaWx0ZXJMaXN0OiAocHJvamVjdE5hbWUpID0+IHRhc2tzLmZpbHRlcigob2JqKSA9PiBvYmoucHJvamVjdCA9PSBwcm9qZWN0TmFtZSlcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHN0b3JhZ2VIYW5kbGVyKGFjdGlvbiwgYXJyLCBpbmRleCkge1xuICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICAgIGNhc2UgXCJhZGRcIjpcbiAgICAgICAgY2FzZSBcImVkaXRcIjpcbiAgICAgICAgICAgIGxldCBtYWtlU3RyID0gSlNPTi5zdHJpbmdpZnkoYXJyW2luZGV4XSk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShhcnJbaW5kZXhdLnVpZCwgbWFrZVN0cik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImRlbGV0ZVwiOlxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYXJyW2luZGV4XS51aWQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufVxuXG5leHBvcnQgeyBhZGRlciwgZGVsZXRlciwgZWRpdG9yLCBwcm9qZWN0TGlzdEdlbmVyYXRvciwgZmlsdGVyZWRMaXN0R2VuZXJhdG9yIH0iLCJpbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJztcbmltcG9ydCB7IGFkZGVyLCBkZWxldGVyLCBlZGl0b3IsIHByb2plY3RMaXN0R2VuZXJhdG9yLCBmaWx0ZXJlZExpc3RHZW5lcmF0b3IgfSBmcm9tICcuL3Rhc2tNZXRob2RzJ1xuXG5mdW5jdGlvbiBUb0RvRmFjdG9yeSh0aXRsZSA9ICcnLCBkZXNjcmlwdGlvbiA9ICcnLCBkdWVEYXRlID0gJycsIHByaW9yaXR5ID0gJ05vcm1hbCcsIHByb2plY3QgPSAnVW5hc3NpZ25lZCcpIHtcbiAgICBsZXQgdG9EbyA9IHtcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICBkdWVEYXRlLFxuICAgICAgICBwcmlvcml0eSxcbiAgICAgICAgcHJvamVjdCxcbiAgICAgICAgdWlkOiB1dWlkdjQoKSxcbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24odG9Ebylcbn1cblxuZnVuY3Rpb24gQXJyYXlGYWN0b3J5KCkge1xuICAgIGNvbnN0IHRhc2tBcnJheSA9IHtcbiAgICAgICAgdGFza3M6IFtdXG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIC4uLnRhc2tBcnJheSxcbiAgICAgICAgLi4uYWRkZXIodGFza0FycmF5KSxcbiAgICAgICAgLi4uZGVsZXRlcih0YXNrQXJyYXkpLFxuICAgICAgICAuLi5lZGl0b3IodGFza0FycmF5KSxcbiAgICAgICAgLi4ucHJvamVjdExpc3RHZW5lcmF0b3IodGFza0FycmF5KSxcbiAgICAgICAgLi4uZmlsdGVyZWRMaXN0R2VuZXJhdG9yKHRhc2tBcnJheSlcbiAgICB9XG59O1xuLy8gU2F2ZXMgYWxsIFRhc2sgT2JqZWN0c1xuY29uc3QgZGVmYXVsdFRvRG8gPSBBcnJheUZhY3RvcnkoKVxuXG5cbmV4cG9ydCB7IGRlZmF1bHRUb0RvLCBUb0RvRmFjdG9yeSB9XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIERvbSBmcm9tICcuL2RvbU1vZHVsZXMnXG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgRG9tLmxvYWRMb2NhbFN0b3JhZ2UpXG5cblxuY29uc3QgbmV3VG9Eb0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXdfX3RvRG8tYnRuJyk7XG5uZXdUb0RvQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgRG9tLmNyZWF0ZUNhcmQpXG5cblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=