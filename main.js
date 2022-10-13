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


const toDolist = document.querySelector('.list__container')


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
    _tasksModules_js__WEBPACK_IMPORTED_MODULE_0__.loadDatalist()
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
    render(_tasksModules_js__WEBPACK_IMPORTED_MODULE_0__.defaultToDo.tasks)
    console.log(_tasksModules_js__WEBPACK_IMPORTED_MODULE_0__.defaultToDo.tasks)

}

function taskDelete(event) {
    let index = indexFinder(event)
    _tasksModules_js__WEBPACK_IMPORTED_MODULE_0__.defaultToDo["delete"](index)
    render(_tasksModules_js__WEBPACK_IMPORTED_MODULE_0__.defaultToDo.tasks)
}

function createCard() {
    let newTaskObject = _tasksModules_js__WEBPACK_IMPORTED_MODULE_0__.ToDoFactory()
    console.log(newTaskObject)
    _tasksModules_js__WEBPACK_IMPORTED_MODULE_0__.defaultToDo.add(newTaskObject)
    console.log(_tasksModules_js__WEBPACK_IMPORTED_MODULE_0__.defaultToDo.tasks)
    render(_tasksModules_js__WEBPACK_IMPORTED_MODULE_0__.defaultToDo.tasks)
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
/* harmony export */   "editor": () => (/* binding */ editor)
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



/***/ }),

/***/ "./src/tasksModules.js":
/*!*****************************!*\
  !*** ./src/tasksModules.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ToDoFactory": () => (/* binding */ ToDoFactory),
/* harmony export */   "defaultToDo": () => (/* binding */ defaultToDo),
/* harmony export */   "loadDatalist": () => (/* binding */ loadDatalist)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _taskMethods__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskMethods */ "./src/taskMethods.js");



function ToDoFactory(title = '', description = '', dueDate = '', priority = 'Normal', project = 'Default') {
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
        ...(0,_taskMethods__WEBPACK_IMPORTED_MODULE_0__.editor)(taskArray)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsaUVBQWU7QUFDZjtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDSEQsaUVBQWUsY0FBYyxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxHQUFHLHlDQUF5Qzs7Ozs7Ozs7Ozs7Ozs7QUNBcEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU8sd0RBQVE7QUFDZjtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUVBQWUsU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQ1M7QUFDTjtBQUNzQjs7QUFFakQ7QUFDQSxNQUFNLDZEQUFpQjtBQUN2QixXQUFXLDZEQUFpQjtBQUM1Qjs7QUFFQTtBQUNBLGlEQUFpRCwrQ0FBRyxLQUFLOztBQUV6RDtBQUNBLG1DQUFtQzs7QUFFbkM7QUFDQTs7QUFFQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsU0FBUyw4REFBZTtBQUN4Qjs7QUFFQSxpRUFBZSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7QUM1QmM7O0FBRS9CO0FBQ0EscUNBQXFDLHNEQUFVO0FBQy9DOztBQUVBLGlFQUFlLFFBQVE7Ozs7Ozs7Ozs7Ozs7OztBQ052QixhQUFhLDBCQUEwQjtBQUNHOztBQUUxQzs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsWUFBWTtBQUNqRCx3RkFBd0YsY0FBYztBQUN0RywrR0FBK0csb0JBQW9CO0FBQ25JO0FBQ0EsdURBQXVELGdCQUFnQixJQUFJLGdCQUFnQjtBQUMzRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsaUJBQWlCLElBQUksaUJBQWlCO0FBQzdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RkFBd0YsZ0JBQWdCO0FBQ3hHLHVDQUF1QyxZQUFZO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMLElBQUksMERBQWlCO0FBQ3JCOztBQUVBO0FBQ0EsaUVBQWlFLE9BQU87QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUJBQXlCLHlFQUFnQztBQUN6RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDhEQUFxQjtBQUN6QixXQUFXLCtEQUFzQjtBQUNqQyxnQkFBZ0IsK0RBQXNCOztBQUV0Qzs7QUFFQTtBQUNBO0FBQ0EsSUFBSSxtRUFBdUI7QUFDM0IsV0FBVywrREFBc0I7QUFDakM7O0FBRUE7QUFDQSx3QkFBd0IseURBQWdCO0FBQ3hDO0FBQ0EsSUFBSSw2REFBb0I7QUFDeEIsZ0JBQWdCLCtEQUFzQjtBQUN0QyxXQUFXLCtEQUFzQjtBQUNqQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0VBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixPQUFPO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2Qm9DO0FBQ2tCOztBQUV0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsZ0RBQU07QUFDbkI7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQSxXQUFXLG1EQUFLO0FBQ2hCLFdBQVcscURBQU87QUFDbEIsV0FBVyxvREFBTTtBQUNqQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7Ozs7Ozs7VUNwQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05tQzs7QUFFbkM7QUFDQSxxQ0FBcUMsbURBQWMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvZG9hcHAvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL25hdGl2ZS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG9hcHAvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwid2VicGFjazovL29kaW4tdG9kb2FwcC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcm5nLmpzIiwid2VicGFjazovL29kaW4tdG9kb2FwcC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovL29kaW4tdG9kb2FwcC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvYXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92YWxpZGF0ZS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG9hcHAvLi9zcmMvZG9tTW9kdWxlcy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG9hcHAvLi9zcmMvdGFza01ldGhvZHMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvYXBwLy4vc3JjL3Rhc2tzTW9kdWxlcy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG9hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXRvZG9hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXRvZG9hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXRvZG9hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcmFuZG9tVVVJRCA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5yYW5kb21VVUlEICYmIGNyeXB0by5yYW5kb21VVUlELmJpbmQoY3J5cHRvKTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgcmFuZG9tVVVJRFxufTsiLCJleHBvcnQgZGVmYXVsdCAvXig/OlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9fDAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCkkL2k7IiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gSW4gdGhlIGJyb3dzZXIgd2UgdGhlcmVmb3JlXG4vLyByZXF1aXJlIHRoZSBjcnlwdG8gQVBJIGFuZCBkbyBub3Qgc3VwcG9ydCBidWlsdC1pbiBmYWxsYmFjayB0byBsb3dlciBxdWFsaXR5IHJhbmRvbSBudW1iZXJcbi8vIGdlbmVyYXRvcnMgKGxpa2UgTWF0aC5yYW5kb20oKSkuXG5sZXQgZ2V0UmFuZG9tVmFsdWVzO1xuY29uc3Qgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBybmcoKSB7XG4gIC8vIGxhenkgbG9hZCBzbyB0aGF0IGVudmlyb25tZW50cyB0aGF0IG5lZWQgdG8gcG9seWZpbGwgaGF2ZSBhIGNoYW5jZSB0byBkbyBzb1xuICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0byBpbXBsZW1lbnRhdGlvbi5cbiAgICBnZXRSYW5kb21WYWx1ZXMgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pO1xuXG4gICAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY3J5cHRvLmdldFJhbmRvbVZhbHVlcygpIG5vdCBzdXBwb3J0ZWQuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQjZ2V0cmFuZG9tdmFsdWVzLW5vdC1zdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbn0iLCJpbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG4vKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cblxuY29uc3QgYnl0ZVRvSGV4ID0gW107XG5cbmZvciAobGV0IGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4LnB1c2goKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnNsaWNlKDEpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgLy8gTm90ZTogQmUgY2FyZWZ1bCBlZGl0aW5nIHRoaXMgY29kZSEgIEl0J3MgYmVlbiB0dW5lZCBmb3IgcGVyZm9ybWFuY2VcbiAgLy8gYW5kIHdvcmtzIGluIHdheXMgeW91IG1heSBub3QgZXhwZWN0LiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkL3B1bGwvNDM0XG4gIHJldHVybiAoYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV0pLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgY29uc3QgdXVpZCA9IHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwiaW1wb3J0IG5hdGl2ZSBmcm9tICcuL25hdGl2ZS5qcyc7XG5pbXBvcnQgcm5nIGZyb20gJy4vcm5nLmpzJztcbmltcG9ydCB7IHVuc2FmZVN0cmluZ2lmeSB9IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgaWYgKG5hdGl2ZS5yYW5kb21VVUlEICYmICFidWYgJiYgIW9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmF0aXZlLnJhbmRvbVVVSUQoKTtcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuIHVuc2FmZVN0cmluZ2lmeShybmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjQ7IiwiaW1wb3J0IFJFR0VYIGZyb20gJy4vcmVnZXguanMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgUkVHRVgudGVzdCh1dWlkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7IiwiLy8gaW1wb3J0cyAge2RlZmF1bHRUb0RvLCBUb0RvRmFjdG9yeX0gZnJvbSB0YXNrTW9kdWxlc1xuaW1wb3J0ICogYXMgdGFzayBmcm9tICcuL3Rhc2tzTW9kdWxlcy5qcyc7XG5cbmNvbnN0IHRvRG9saXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3RfX2NvbnRhaW5lcicpXG5cblxuZnVuY3Rpb24gcmVuZGVyKHByb2plY3RBcnJheSkge1xuICAgIHRvRG9saXN0LmlubmVySFRNTCA9ICcnO1xuICAgIHByb2plY3RBcnJheS5mb3JFYWNoKHRhc2tPYmogPT4ge1xuICAgICAgICBsZXQgY2FyZEh0bWwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCIgZGF0YS1pZD1cIiR7dGFza09iai51aWR9XCI+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJjYXJkX190b2RvLXRpdGxlXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlRpdGxlLi4uXCIgdmFsdWU9XCIke3Rhc2tPYmoudGl0bGV9XCI+XG4gICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCJjYXJkX190b2RvLWRlc2NyaXB0aW9uXCIgY29scz1cIjMwXCIgcm93cz1cIjVcIiBwbGFjZWhvbGRlcj1cIldyaXRlIGEgZGVzY3JpcHRpb24uLi5cIj4ke3Rhc2tPYmouZGVzY3JpcHRpb259PC90ZXh0YXJlYT5cbiAgICAgICAgICAgIDxzZWxlY3QgbmFtZT1cImR1ZS1kYXRlXCIgY2xhc3M9XCJjYXJkX190b2RvLWR1ZURhdGVcIj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHN0eWxlPVwiZGlzcGxheTogbm9uZVwiIHZhbHVlPVwiJHt0YXNrT2JqLmR1ZURhdGV9XCI+JHt0YXNrT2JqLmR1ZURhdGV9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIk5vd1wiPk5vdzwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJUb2RheVwiPlRvZGF5PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlRvbW9ycm93XCI+VG9tb3Jyb3c8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiU29tZXRpbWVcIj5Tb21ldGltZTwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICA8c2VsZWN0IG5hbWU9XCJwcmlvcml0eVwiIGNsYXNzPVwiY2FyZF9fdG9kby1wcmlvcml0eVwiPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gc3R5bGU9XCJkaXNwbGF5OiBub25lXCIgdmFsdWU9XCIke3Rhc2tPYmoucHJpb3JpdHl9XCI+JHt0YXNrT2JqLnByaW9yaXR5fTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJMb3dcIj5Mb3c8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTm9ybWFsXCI+Tm9ybWFsPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkhpZ2hcIj5IaWdoPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlVyZ2VudFwiPlVyZ2VudDwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJjYXJkX190b2RvLXByb2plY3RcIiB0eXBlPVwidGV4dFwiIGxpc3Q9XCJwcm9qZWN0cy1saXN0XCIgdmFsdWU9XCIke3Rhc2tPYmoucHJvamVjdH1cIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZF9fdG9kby1pZFwiPiR7dGFza09iai51aWR9PC9wPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNhcmRfX2FkZC1idG5cIj5TYXZlPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY2FyZF9fZGVsLWJ0blwiPkRlbGV0ZTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5gO1xuICAgICAgICB0b0RvbGlzdC5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlcmJlZ2luXCIsIGNhcmRIdG1sLnRyaW0oKSk7XG4gICAgICAgIHNldEJpbmRpbmdzKHRhc2tPYmoudWlkKVxuXG4gICAgfSlcbiAgICB0YXNrLmxvYWREYXRhbGlzdCgpXG59XG5cbmZ1bmN0aW9uIHNldEJpbmRpbmdzKGRhdGFJZCkge1xuICAgIGNvbnN0IGNhcmRFbGVtZW50ID0gdG9Eb2xpc3QucXVlcnlTZWxlY3RvcihgLmNhcmRbZGF0YS1pZD1cIiR7ZGF0YUlkfVwiXWApO1xuICAgIGNvbnN0IGRlbGV0ZUJ0biA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkX19kZWwtYnRuJyk7XG4gICAgZGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4gdGFza0RlbGV0ZShldmVudCkpO1xuICAgIGNvbnN0IHNhdmVCdG4gPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZF9fYWRkLWJ0bicpO1xuICAgIHNhdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB0YXNrVXBkYXRlKGV2ZW50KSlcbn1cblxuZnVuY3Rpb24gaW5kZXhGaW5kZXIoZXZlbnQpIHtcbiAgICBsZXQgdGFyZ2V0VUlEID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5jYXJkJykuZGF0YXNldC5pZDtcbiAgICBsZXQgVGFyZ2V0T2JqSW5kZXggPSB0YXNrLmRlZmF1bHRUb0RvLnRhc2tzLmZpbmRJbmRleChvYmogPT4gb2JqLnVpZCA9PSB0YXJnZXRVSUQpXG4gICAgcmV0dXJuIFRhcmdldE9iakluZGV4O1xufVxuXG5mdW5jdGlvbiB0YXNrVXBkYXRlKGV2ZW50KSB7XG4gICAgbGV0IGluZGV4ID0gaW5kZXhGaW5kZXIoZXZlbnQpO1xuICAgIGNvbnN0IGNhcmQgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZTtcbiAgICBjb25zdCB0aXRsZUlucHV0ID0gY2FyZC5xdWVyeVNlbGVjdG9yKCcuY2FyZF9fdG9kby10aXRsZScpLnZhbHVlO1xuICAgIGNvbnN0IGRlc2NJbnB1dCA9IGNhcmQucXVlcnlTZWxlY3RvcignLmNhcmRfX3RvZG8tZGVzY3JpcHRpb24nKS52YWx1ZTtcbiAgICBjb25zdCBkdWVEYXRlU2VsID0gY2FyZC5xdWVyeVNlbGVjdG9yKCcuY2FyZF9fdG9kby1kdWVEYXRlJykudmFsdWU7XG4gICAgY29uc3QgcHJpb3JpdHlTZWwgPSBjYXJkLnF1ZXJ5U2VsZWN0b3IoJy5jYXJkX190b2RvLXByaW9yaXR5JykudmFsdWVcbiAgICBjb25zdCBwcm9qZWN0SW5wdXQgPSBjYXJkLnF1ZXJ5U2VsZWN0b3IoJy5jYXJkX190b2RvLXByb2plY3QnKS52YWx1ZVxuICAgIHRhc2suZGVmYXVsdFRvRG8uZWRpdChpbmRleCwgdGl0bGVJbnB1dCwgZGVzY0lucHV0LCBkdWVEYXRlU2VsLCBwcmlvcml0eVNlbCwgcHJvamVjdElucHV0KVxuICAgIHJlbmRlcih0YXNrLmRlZmF1bHRUb0RvLnRhc2tzKVxuICAgIGNvbnNvbGUubG9nKHRhc2suZGVmYXVsdFRvRG8udGFza3MpXG5cbn1cblxuZnVuY3Rpb24gdGFza0RlbGV0ZShldmVudCkge1xuICAgIGxldCBpbmRleCA9IGluZGV4RmluZGVyKGV2ZW50KVxuICAgIHRhc2suZGVmYXVsdFRvRG8uZGVsZXRlKGluZGV4KVxuICAgIHJlbmRlcih0YXNrLmRlZmF1bHRUb0RvLnRhc2tzKVxufVxuXG5mdW5jdGlvbiBjcmVhdGVDYXJkKCkge1xuICAgIGxldCBuZXdUYXNrT2JqZWN0ID0gdGFzay5Ub0RvRmFjdG9yeSgpXG4gICAgY29uc29sZS5sb2cobmV3VGFza09iamVjdClcbiAgICB0YXNrLmRlZmF1bHRUb0RvLmFkZChuZXdUYXNrT2JqZWN0KVxuICAgIGNvbnNvbGUubG9nKHRhc2suZGVmYXVsdFRvRG8udGFza3MpXG4gICAgcmVuZGVyKHRhc2suZGVmYXVsdFRvRG8udGFza3MpXG59XG5cbmV4cG9ydCB7IGNyZWF0ZUNhcmQgfSIsImZ1bmN0aW9uIGFkZGVyKHsgdGFza3MgfSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGFkZDogKG9iaikgPT4gdGFza3MucHVzaChvYmopXG4gICAgfVxufTtcblxuZnVuY3Rpb24gZGVsZXRlcih7IHRhc2tzIH0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBkZWxldGU6IChpbmRleCkgPT4gdGFza3Muc3BsaWNlKGluZGV4LCAxKVxuICAgIH1cbn07XG5cbmZ1bmN0aW9uIGVkaXRvcih7IHRhc2tzIH0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBlZGl0OiAoaW5kZXgsIG5ld3RpdGxlLCBuZXdEZXNjLCBuZXdEdWUsIG5ld1ByaW9yaXR5LCBuZXdQcm9qZWN0KSA9PiB7XG4gICAgICAgICAgICB0YXNrc1tpbmRleF0udGl0bGUgPSBuZXd0aXRsZTtcbiAgICAgICAgICAgIHRhc2tzW2luZGV4XS5kZXNjcmlwdGlvbiA9IG5ld0Rlc2M7XG4gICAgICAgICAgICB0YXNrc1tpbmRleF0uZHVlRGF0ZSA9IG5ld0R1ZTtcbiAgICAgICAgICAgIHRhc2tzW2luZGV4XS5wcmlvcml0eSA9IG5ld1ByaW9yaXR5O1xuICAgICAgICAgICAgdGFza3NbaW5kZXhdLnByb2plY3QgPSBuZXdQcm9qZWN0O1xuICAgICAgICB9XG5cbiAgICB9XG59O1xuXG5leHBvcnQgeyBhZGRlciwgZGVsZXRlciwgZWRpdG9yIH0iLCJpbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJztcbmltcG9ydCB7IGFkZGVyLCBkZWxldGVyLCBlZGl0b3IgfSBmcm9tICcuL3Rhc2tNZXRob2RzJ1xuXG5mdW5jdGlvbiBUb0RvRmFjdG9yeSh0aXRsZSA9ICcnLCBkZXNjcmlwdGlvbiA9ICcnLCBkdWVEYXRlID0gJycsIHByaW9yaXR5ID0gJ05vcm1hbCcsIHByb2plY3QgPSAnRGVmYXVsdCcpIHtcbiAgICBsZXQgdG9EbyA9IHtcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICBkdWVEYXRlLFxuICAgICAgICBwcmlvcml0eSxcbiAgICAgICAgcHJvamVjdCxcbiAgICAgICAgdWlkOiB1dWlkdjQoKSxcbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24odG9Ebylcbn1cblxuZnVuY3Rpb24gQXJyYXlGYWN0b3J5KCkge1xuICAgIGNvbnN0IHRhc2tBcnJheSA9IHsgdGFza3M6IFtdIH1cbiAgICByZXR1cm4ge1xuICAgICAgICAuLi50YXNrQXJyYXksXG4gICAgICAgIC4uLmFkZGVyKHRhc2tBcnJheSksXG4gICAgICAgIC4uLmRlbGV0ZXIodGFza0FycmF5KSxcbiAgICAgICAgLi4uZWRpdG9yKHRhc2tBcnJheSlcbiAgICB9XG59O1xuXG5jb25zdCBwcm9qZWN0TGlzdERhdGFMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RzLWxpc3QnKTtcblxuZnVuY3Rpb24gbG9hZERhdGFsaXN0KGFyciA9IGRlZmF1bHRUb0RvLnRhc2tzLCBkYXRhbGlzdCA9IHByb2plY3RMaXN0RGF0YUxpc3QpIHtcbiAgICBkYXRhbGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGNvbnN0IHByb2plY3RzTGlzdCA9IFsuLi5uZXcgU2V0KGFyci5tYXAoKG9iaikgPT4gb2JqLnByb2plY3QpKV1cbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0c0xpc3QpXG4gICAgcHJvamVjdHNMaXN0LmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZGF0YWxpc3QuYXBwZW5kQ2hpbGQobmV3IE9wdGlvbihlbGVtZW50LCBlbGVtZW50LCkpO1xuICAgIH0pO1xufVxuXG5jb25zdCBkZWZhdWx0VG9EbyA9IEFycmF5RmFjdG9yeSgpXG5cbmV4cG9ydCB7IGRlZmF1bHRUb0RvLCBUb0RvRmFjdG9yeSwgbG9hZERhdGFsaXN0IH0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIERvbSBmcm9tICcuL2RvbU1vZHVsZXMnXG5cbmNvbnN0IG5ld1RvRG9CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3X190b0RvLWJ0bicpO1xubmV3VG9Eb0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIERvbS5jcmVhdGVDYXJkKVxuXG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9