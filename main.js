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
/* harmony export */   "createCard": () => (/* binding */ createCard)
/* harmony export */ });
/* harmony import */ var _tasksModules_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasksModules.js */ "./src/tasksModules.js");
// imports  {defaultToDo, ToDoFactory} from taskModules


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
    let TargetObjIndex = _tasksModules_js__WEBPACK_IMPORTED_MODULE_0__.defaultToDo.tasks.findIndex(obj => obj.uid == targetUID)
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
    _tasksModules_js__WEBPACK_IMPORTED_MODULE_0__.defaultToDo.edit(index, titleInput, descInput, dueDateSel, prioritySel, projectInput)
    render(ArrayToRender)
    console.log(ArrayToRender)

}

function taskDelete(event) {
    let index = indexFinder(event)
    _tasksModules_js__WEBPACK_IMPORTED_MODULE_0__.defaultToDo["delete"](index)
    render(ArrayToRender)
}

function createCard() {
    let newTaskObject = _tasksModules_js__WEBPACK_IMPORTED_MODULE_0__.ToDoFactory()
    console.log(newTaskObject)
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
    const taskArray = { tasks: [] }
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


const newToDoBtn = document.getElementById('new__toDo-btn');
newToDoBtn.addEventListener('click', _domModules__WEBPACK_IMPORTED_MODULE_0__.createCard)




})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxPQUFPO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkNvQztBQUMrRDs7QUFFbkc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGdEQUFNO0FBQ25CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0EsV0FBVyxtREFBSztBQUNoQixXQUFXLHFEQUFPO0FBQ2xCLFdBQVcsb0RBQU07QUFDakIsV0FBVyxrRUFBb0I7QUFDL0IsV0FBVyxtRUFBcUI7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7OztBQUdtQzs7Ozs7OztVQzlCbkM7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05tQzs7QUFFbkM7QUFDQSxxQ0FBcUMsbURBQWMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvZG9hcHAvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL25hdGl2ZS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG9hcHAvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwid2VicGFjazovL29kaW4tdG9kb2FwcC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcm5nLmpzIiwid2VicGFjazovL29kaW4tdG9kb2FwcC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovL29kaW4tdG9kb2FwcC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvYXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92YWxpZGF0ZS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG9hcHAvLi9zcmMvZG9tTW9kdWxlcy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG9hcHAvLi9zcmMvdGFza01ldGhvZHMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvYXBwLy4vc3JjL3Rhc2tzTW9kdWxlcy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG9hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXRvZG9hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXRvZG9hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXRvZG9hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcmFuZG9tVVVJRCA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5yYW5kb21VVUlEICYmIGNyeXB0by5yYW5kb21VVUlELmJpbmQoY3J5cHRvKTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgcmFuZG9tVVVJRFxufTsiLCJleHBvcnQgZGVmYXVsdCAvXig/OlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9fDAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCkkL2k7IiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gSW4gdGhlIGJyb3dzZXIgd2UgdGhlcmVmb3JlXG4vLyByZXF1aXJlIHRoZSBjcnlwdG8gQVBJIGFuZCBkbyBub3Qgc3VwcG9ydCBidWlsdC1pbiBmYWxsYmFjayB0byBsb3dlciBxdWFsaXR5IHJhbmRvbSBudW1iZXJcbi8vIGdlbmVyYXRvcnMgKGxpa2UgTWF0aC5yYW5kb20oKSkuXG5sZXQgZ2V0UmFuZG9tVmFsdWVzO1xuY29uc3Qgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBybmcoKSB7XG4gIC8vIGxhenkgbG9hZCBzbyB0aGF0IGVudmlyb25tZW50cyB0aGF0IG5lZWQgdG8gcG9seWZpbGwgaGF2ZSBhIGNoYW5jZSB0byBkbyBzb1xuICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0byBpbXBsZW1lbnRhdGlvbi5cbiAgICBnZXRSYW5kb21WYWx1ZXMgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pO1xuXG4gICAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY3J5cHRvLmdldFJhbmRvbVZhbHVlcygpIG5vdCBzdXBwb3J0ZWQuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQjZ2V0cmFuZG9tdmFsdWVzLW5vdC1zdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbn0iLCJpbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG4vKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cblxuY29uc3QgYnl0ZVRvSGV4ID0gW107XG5cbmZvciAobGV0IGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4LnB1c2goKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnNsaWNlKDEpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgLy8gTm90ZTogQmUgY2FyZWZ1bCBlZGl0aW5nIHRoaXMgY29kZSEgIEl0J3MgYmVlbiB0dW5lZCBmb3IgcGVyZm9ybWFuY2VcbiAgLy8gYW5kIHdvcmtzIGluIHdheXMgeW91IG1heSBub3QgZXhwZWN0LiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkL3B1bGwvNDM0XG4gIHJldHVybiAoYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV0pLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgY29uc3QgdXVpZCA9IHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwiaW1wb3J0IG5hdGl2ZSBmcm9tICcuL25hdGl2ZS5qcyc7XG5pbXBvcnQgcm5nIGZyb20gJy4vcm5nLmpzJztcbmltcG9ydCB7IHVuc2FmZVN0cmluZ2lmeSB9IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgaWYgKG5hdGl2ZS5yYW5kb21VVUlEICYmICFidWYgJiYgIW9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmF0aXZlLnJhbmRvbVVVSUQoKTtcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuIHVuc2FmZVN0cmluZ2lmeShybmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjQ7IiwiaW1wb3J0IFJFR0VYIGZyb20gJy4vcmVnZXguanMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgUkVHRVgudGVzdCh1dWlkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7IiwiLy8gaW1wb3J0cyAge2RlZmF1bHRUb0RvLCBUb0RvRmFjdG9yeX0gZnJvbSB0YXNrTW9kdWxlc1xuaW1wb3J0ICogYXMgdGFzayBmcm9tICcuL3Rhc2tzTW9kdWxlcy5qcyc7XG5cbmNvbnN0IHByb2plY3RTZWxlY3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50X19oZWFkZXItc2VsZWN0Jyk7XG5wcm9qZWN0U2VsZWN0RWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgcmVzb2x2ZUFycmF5VG9SZW5kZXIpXG5jb25zdCBwcm9qZWN0TGlzdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RzLWxpc3QnKTtcbmNvbnN0IHRvRG9saXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3RfX2NvbnRhaW5lcicpXG5cbmxldCBBcnJheVRvUmVuZGVyID0gdGFzay5kZWZhdWx0VG9Eby50YXNrcztcblxuZnVuY3Rpb24gcmVzb2x2ZUFycmF5VG9SZW5kZXIoKSB7XG4gICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RTZWxlY3RFbC52YWx1ZTtcbiAgICBpZiAocHJvamVjdCA9PSBcIkFsbFwiKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd5ZXAnKVxuICAgICAgICBBcnJheVRvUmVuZGVyID0gdGFzay5kZWZhdWx0VG9Eby50YXNrcztcbiAgICAgICAgcmVuZGVyKEFycmF5VG9SZW5kZXIpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgQXJyYXlUb1JlbmRlciA9IHRhc2suZGVmYXVsdFRvRG8uZmlsdGVyTGlzdChwcm9qZWN0KTtcbiAgICAgICAgcmVuZGVyKEFycmF5VG9SZW5kZXIpXG4gICAgfVxufVxuXG5mdW5jdGlvbiByZW5kZXIocHJvamVjdEFycmF5KSB7XG4gICAgdG9Eb2xpc3QuaW5uZXJIVE1MID0gJyc7XG4gICAgcHJvamVjdEFycmF5LmZvckVhY2godGFza09iaiA9PiB7XG4gICAgICAgIGxldCBjYXJkSHRtbCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIiBkYXRhLWlkPVwiJHt0YXNrT2JqLnVpZH1cIj5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImNhcmRfX3RvZG8tdGl0bGVcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiVGl0bGUuLi5cIiB2YWx1ZT1cIiR7dGFza09iai50aXRsZX1cIj5cbiAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cImNhcmRfX3RvZG8tZGVzY3JpcHRpb25cIiBjb2xzPVwiMzBcIiByb3dzPVwiNVwiIHBsYWNlaG9sZGVyPVwiV3JpdGUgYSBkZXNjcmlwdGlvbi4uLlwiPiR7dGFza09iai5kZXNjcmlwdGlvbn08L3RleHRhcmVhPlxuICAgICAgICAgICAgPHNlbGVjdCBuYW1lPVwiZHVlLWRhdGVcIiBjbGFzcz1cImNhcmRfX3RvZG8tZHVlRGF0ZVwiPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gc3R5bGU9XCJkaXNwbGF5OiBub25lXCIgdmFsdWU9XCIke3Rhc2tPYmouZHVlRGF0ZX1cIj4ke3Rhc2tPYmouZHVlRGF0ZX08L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTm93XCI+Tm93PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlRvZGF5XCI+VG9kYXk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiVG9tb3Jyb3dcIj5Ub21vcnJvdzwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJTb21ldGltZVwiPlNvbWV0aW1lPC9vcHRpb24+XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgIDxzZWxlY3QgbmFtZT1cInByaW9yaXR5XCIgY2xhc3M9XCJjYXJkX190b2RvLXByaW9yaXR5XCI+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIiB2YWx1ZT1cIiR7dGFza09iai5wcmlvcml0eX1cIj4ke3Rhc2tPYmoucHJpb3JpdHl9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkxvd1wiPkxvdzwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJOb3JtYWxcIj5Ob3JtYWw8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiSGlnaFwiPkhpZ2g8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiVXJnZW50XCI+VXJnZW50PC9vcHRpb24+XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImNhcmRfX3RvZG8tcHJvamVjdFwiIHR5cGU9XCJ0ZXh0XCIgbGlzdD1cInByb2plY3RzLWxpc3RcIiB2YWx1ZT1cIiR7dGFza09iai5wcm9qZWN0fVwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkX190b2RvLWlkXCI+JHt0YXNrT2JqLnVpZH08L3A+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY2FyZF9fYWRkLWJ0blwiPlNhdmU8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJjYXJkX19kZWwtYnRuXCI+RGVsZXRlPC9idXR0b24+XG4gICAgICAgIDwvZGl2PmA7XG4gICAgICAgIHRvRG9saXN0Lmluc2VydEFkamFjZW50SFRNTChcImFmdGVyYmVnaW5cIiwgY2FyZEh0bWwudHJpbSgpKTtcbiAgICAgICAgc2V0QmluZGluZ3ModGFza09iai51aWQpXG5cbiAgICB9KVxuICAgIGxvYWREYXRhbGlzdCgpXG59XG5cbmZ1bmN0aW9uIHNldEJpbmRpbmdzKGRhdGFJZCkge1xuICAgIGNvbnN0IGNhcmRFbGVtZW50ID0gdG9Eb2xpc3QucXVlcnlTZWxlY3RvcihgLmNhcmRbZGF0YS1pZD1cIiR7ZGF0YUlkfVwiXWApO1xuICAgIGNvbnN0IGRlbGV0ZUJ0biA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkX19kZWwtYnRuJyk7XG4gICAgZGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4gdGFza0RlbGV0ZShldmVudCkpO1xuICAgIGNvbnN0IHNhdmVCdG4gPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZF9fYWRkLWJ0bicpO1xuICAgIHNhdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB0YXNrVXBkYXRlKGV2ZW50KSlcbn1cblxuZnVuY3Rpb24gaW5kZXhGaW5kZXIoZXZlbnQpIHtcbiAgICBsZXQgdGFyZ2V0VUlEID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5jYXJkJykuZGF0YXNldC5pZDtcbiAgICBsZXQgVGFyZ2V0T2JqSW5kZXggPSB0YXNrLmRlZmF1bHRUb0RvLnRhc2tzLmZpbmRJbmRleChvYmogPT4gb2JqLnVpZCA9PSB0YXJnZXRVSUQpXG4gICAgcmV0dXJuIFRhcmdldE9iakluZGV4O1xufVxuXG5mdW5jdGlvbiB0YXNrVXBkYXRlKGV2ZW50KSB7XG4gICAgbGV0IGluZGV4ID0gaW5kZXhGaW5kZXIoZXZlbnQpO1xuICAgIGNvbnN0IGNhcmQgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZTtcbiAgICBjb25zdCB0aXRsZUlucHV0ID0gY2FyZC5xdWVyeVNlbGVjdG9yKCcuY2FyZF9fdG9kby10aXRsZScpLnZhbHVlO1xuICAgIGNvbnN0IGRlc2NJbnB1dCA9IGNhcmQucXVlcnlTZWxlY3RvcignLmNhcmRfX3RvZG8tZGVzY3JpcHRpb24nKS52YWx1ZTtcbiAgICBjb25zdCBkdWVEYXRlU2VsID0gY2FyZC5xdWVyeVNlbGVjdG9yKCcuY2FyZF9fdG9kby1kdWVEYXRlJykudmFsdWU7XG4gICAgY29uc3QgcHJpb3JpdHlTZWwgPSBjYXJkLnF1ZXJ5U2VsZWN0b3IoJy5jYXJkX190b2RvLXByaW9yaXR5JykudmFsdWVcbiAgICBjb25zdCBwcm9qZWN0SW5wdXQgPSBjYXJkLnF1ZXJ5U2VsZWN0b3IoJy5jYXJkX190b2RvLXByb2plY3QnKS52YWx1ZVxuICAgIHRhc2suZGVmYXVsdFRvRG8uZWRpdChpbmRleCwgdGl0bGVJbnB1dCwgZGVzY0lucHV0LCBkdWVEYXRlU2VsLCBwcmlvcml0eVNlbCwgcHJvamVjdElucHV0KVxuICAgIHJlbmRlcihBcnJheVRvUmVuZGVyKVxuICAgIGNvbnNvbGUubG9nKEFycmF5VG9SZW5kZXIpXG5cbn1cblxuZnVuY3Rpb24gdGFza0RlbGV0ZShldmVudCkge1xuICAgIGxldCBpbmRleCA9IGluZGV4RmluZGVyKGV2ZW50KVxuICAgIHRhc2suZGVmYXVsdFRvRG8uZGVsZXRlKGluZGV4KVxuICAgIHJlbmRlcihBcnJheVRvUmVuZGVyKVxufVxuXG5mdW5jdGlvbiBjcmVhdGVDYXJkKCkge1xuICAgIGxldCBuZXdUYXNrT2JqZWN0ID0gdGFzay5Ub0RvRmFjdG9yeSgpXG4gICAgY29uc29sZS5sb2cobmV3VGFza09iamVjdClcbiAgICB0YXNrLmRlZmF1bHRUb0RvLmFkZChuZXdUYXNrT2JqZWN0KVxuICAgIGNvbnNvbGUubG9nKHRhc2suZGVmYXVsdFRvRG8udGFza3MpXG4gICAgcmVuZGVyKEFycmF5VG9SZW5kZXIpXG59XG5cbmZ1bmN0aW9uIGxvYWREYXRhbGlzdChkYXRhbGlzdCA9IHByb2plY3RMaXN0RWwpIHtcbiAgICBjb25zdCBDdXJyZW50TGlzdERpc3BsYXkgPSBwcm9qZWN0U2VsZWN0RWwudmFsdWU7XG4gICAgZGF0YWxpc3QuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBkYXRhbGlzdC5hcHBlbmRDaGlsZChuZXcgT3B0aW9uKCdBbGwnLCAnQWxsJykpO1xuICAgIHRhc2suZGVmYXVsdFRvRG8ucHJvamVjdExpc3QoKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIGRhdGFsaXN0LmFwcGVuZENoaWxkKG5ldyBPcHRpb24oZWxlbWVudCwgZWxlbWVudCwpKTtcbiAgICB9KTtcbiAgICBwcm9qZWN0U2VsZWN0RWwuaW5uZXJIVE1MID0gZGF0YWxpc3QuaW5uZXJIVE1MXG4gICAgcHJvamVjdFNlbGVjdEVsLnZhbHVlID0gQ3VycmVudExpc3REaXNwbGF5O1xuICAgIGNvbnNvbGUubG9nKHRhc2suZGVmYXVsdFRvRG8ucHJvamVjdExpc3QoKSlcblxufVxuXG5cbmV4cG9ydCB7IGNyZWF0ZUNhcmQgfSIsImZ1bmN0aW9uIGFkZGVyKHsgdGFza3MgfSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGFkZDogKG9iaikgPT4gdGFza3MucHVzaChvYmopXG4gICAgfVxufTtcblxuZnVuY3Rpb24gZGVsZXRlcih7IHRhc2tzIH0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBkZWxldGU6IChpbmRleCkgPT4gdGFza3Muc3BsaWNlKGluZGV4LCAxKVxuICAgIH1cbn07XG5cbmZ1bmN0aW9uIGVkaXRvcih7IHRhc2tzIH0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBlZGl0OiAoaW5kZXgsIG5ld3RpdGxlLCBuZXdEZXNjLCBuZXdEdWUsIG5ld1ByaW9yaXR5LCBuZXdQcm9qZWN0KSA9PiB7XG4gICAgICAgICAgICB0YXNrc1tpbmRleF0udGl0bGUgPSBuZXd0aXRsZTtcbiAgICAgICAgICAgIHRhc2tzW2luZGV4XS5kZXNjcmlwdGlvbiA9IG5ld0Rlc2M7XG4gICAgICAgICAgICB0YXNrc1tpbmRleF0uZHVlRGF0ZSA9IG5ld0R1ZTtcbiAgICAgICAgICAgIHRhc2tzW2luZGV4XS5wcmlvcml0eSA9IG5ld1ByaW9yaXR5O1xuICAgICAgICAgICAgdGFza3NbaW5kZXhdLnByb2plY3QgPSBuZXdQcm9qZWN0O1xuICAgICAgICB9XG5cbiAgICB9XG59O1xuXG5mdW5jdGlvbiBwcm9qZWN0TGlzdEdlbmVyYXRvcih7IHRhc2tzIH0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwcm9qZWN0TGlzdDogKCkgPT4gWy4uLm5ldyBTZXQodGFza3MubWFwKChvYmopID0+IG9iai5wcm9qZWN0KSldXG4gICAgfVxufTtcblxuZnVuY3Rpb24gZmlsdGVyZWRMaXN0R2VuZXJhdG9yKHsgdGFza3MgfSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGZpbHRlckxpc3Q6IChwcm9qZWN0TmFtZSkgPT4gdGFza3MuZmlsdGVyKChvYmopID0+IG9iai5wcm9qZWN0ID09IHByb2plY3ROYW1lKVxuICAgIH1cbn1cblxuZXhwb3J0IHsgYWRkZXIsIGRlbGV0ZXIsIGVkaXRvciwgcHJvamVjdExpc3RHZW5lcmF0b3IsIGZpbHRlcmVkTGlzdEdlbmVyYXRvciB9IiwiaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSAndXVpZCc7XG5pbXBvcnQgeyBhZGRlciwgZGVsZXRlciwgZWRpdG9yLCBwcm9qZWN0TGlzdEdlbmVyYXRvciwgZmlsdGVyZWRMaXN0R2VuZXJhdG9yIH0gZnJvbSAnLi90YXNrTWV0aG9kcydcblxuZnVuY3Rpb24gVG9Eb0ZhY3RvcnkodGl0bGUgPSAnJywgZGVzY3JpcHRpb24gPSAnJywgZHVlRGF0ZSA9ICcnLCBwcmlvcml0eSA9ICdOb3JtYWwnLCBwcm9qZWN0ID0gJ1VuYXNzaWduZWQnKSB7XG4gICAgbGV0IHRvRG8gPSB7XG4gICAgICAgIHRpdGxlLFxuICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgZHVlRGF0ZSxcbiAgICAgICAgcHJpb3JpdHksXG4gICAgICAgIHByb2plY3QsXG4gICAgICAgIHVpZDogdXVpZHY0KCksXG4gICAgfVxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHRvRG8pXG59XG5cbmZ1bmN0aW9uIEFycmF5RmFjdG9yeSgpIHtcbiAgICBjb25zdCB0YXNrQXJyYXkgPSB7IHRhc2tzOiBbXSB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgLi4udGFza0FycmF5LFxuICAgICAgICAuLi5hZGRlcih0YXNrQXJyYXkpLFxuICAgICAgICAuLi5kZWxldGVyKHRhc2tBcnJheSksXG4gICAgICAgIC4uLmVkaXRvcih0YXNrQXJyYXkpLFxuICAgICAgICAuLi5wcm9qZWN0TGlzdEdlbmVyYXRvcih0YXNrQXJyYXkpLFxuICAgICAgICAuLi5maWx0ZXJlZExpc3RHZW5lcmF0b3IodGFza0FycmF5KVxuICAgIH1cbn07XG4vLyBTYXZlcyBhbGwgVGFzayBPYmplY3RzXG5jb25zdCBkZWZhdWx0VG9EbyA9IEFycmF5RmFjdG9yeSgpXG5cblxuZXhwb3J0IHsgZGVmYXVsdFRvRG8sIFRvRG9GYWN0b3J5IH1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICogYXMgRG9tIGZyb20gJy4vZG9tTW9kdWxlcydcblxuY29uc3QgbmV3VG9Eb0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXdfX3RvRG8tYnRuJyk7XG5uZXdUb0RvQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgRG9tLmNyZWF0ZUNhcmQpXG5cblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=