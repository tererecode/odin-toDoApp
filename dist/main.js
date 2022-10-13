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


const projectListEl = document.getElementById('projects-list');
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

function loadDatalist(datalist = projectListEl) {
    datalist.innerHTML = "";
    _tasksModules_js__WEBPACK_IMPORTED_MODULE_0__.defaultToDo.projectList().forEach((element) => {
        datalist.appendChild(new Option(element, element,));
    });
    console.log(_tasksModules_js__WEBPACK_IMPORTED_MODULE_0__.defaultToDo.projectList())

}
// function loadDatalist(datalist = projectListEl) {
//     datalist.innerHTML = "";
//     task.generateDatalist().forEach((element) => {
//         datalist.appendChild(new Option(element, element,));
//     });
//     console.log(task.generateDatalist)
//     console.log(task.generateDatalist())

// }



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
        ...(0,_taskMethods__WEBPACK_IMPORTED_MODULE_0__.editor)(taskArray),
        ...(0,_taskMethods__WEBPACK_IMPORTED_MODULE_0__.projectListGenerator)(taskArray)
    }
};

// const generateDatalist = (arr = defaultToDo.tasks) => [...new Set(arr.map((obj) => obj.project))]

const defaultToDo = ArrayFactory()


// export { defaultToDo, ToDoFactory, generateDatalist }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxnREFBTTtBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBLFdBQVcsbURBQUs7QUFDaEIsV0FBVyxxREFBTztBQUNsQixXQUFXLG9EQUFNO0FBQ2pCLFdBQVcsa0VBQW9CO0FBQy9CO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRW1DO0FBQ25DLFlBQVk7Ozs7OztVQy9CWjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTm1DOztBQUVuQztBQUNBLHFDQUFxQyxtREFBYyIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tdG9kb2FwcC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvbmF0aXZlLmpzIiwid2VicGFjazovL29kaW4tdG9kb2FwcC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcmVnZXguanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvYXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvYXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvYXBwLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92NC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG9hcHAvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3ZhbGlkYXRlLmpzIiwid2VicGFjazovL29kaW4tdG9kb2FwcC8uL3NyYy9kb21Nb2R1bGVzLmpzIiwid2VicGFjazovL29kaW4tdG9kb2FwcC8uL3NyYy90YXNrTWV0aG9kcy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG9hcHAvLi9zcmMvdGFza3NNb2R1bGVzLmpzIiwid2VicGFjazovL29kaW4tdG9kb2FwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvZG9hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tdG9kb2FwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tdG9kb2FwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG9kb2FwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCByYW5kb21VVUlEID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLnJhbmRvbVVVSUQgJiYgY3J5cHRvLnJhbmRvbVVVSUQuYmluZChjcnlwdG8pO1xuZXhwb3J0IGRlZmF1bHQge1xuICByYW5kb21VVUlEXG59OyIsImV4cG9ydCBkZWZhdWx0IC9eKD86WzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn18MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwKSQvaTsiLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiBJbiB0aGUgYnJvd3NlciB3ZSB0aGVyZWZvcmVcbi8vIHJlcXVpcmUgdGhlIGNyeXB0byBBUEkgYW5kIGRvIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGZhbGxiYWNrIHRvIGxvd2VyIHF1YWxpdHkgcmFuZG9tIG51bWJlclxuLy8gZ2VuZXJhdG9ycyAobGlrZSBNYXRoLnJhbmRvbSgpKS5cbmxldCBnZXRSYW5kb21WYWx1ZXM7XG5jb25zdCBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJuZygpIHtcbiAgLy8gbGF6eSBsb2FkIHNvIHRoYXQgZW52aXJvbm1lbnRzIHRoYXQgbmVlZCB0byBwb2x5ZmlsbCBoYXZlIGEgY2hhbmNlIHRvIGRvIHNvXG4gIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvIGltcGxlbWVudGF0aW9uLlxuICAgIGdldFJhbmRvbVZhbHVlcyA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0byk7XG5cbiAgICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKCkgbm90IHN1cHBvcnRlZC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCNnZXRyYW5kb212YWx1ZXMtbm90LXN1cHBvcnRlZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xufSIsImltcG9ydCB2YWxpZGF0ZSBmcm9tICcuL3ZhbGlkYXRlLmpzJztcbi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xuXG5jb25zdCBieXRlVG9IZXggPSBbXTtcblxuZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc2xpY2UoMSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0ID0gMCkge1xuICAvLyBOb3RlOiBCZSBjYXJlZnVsIGVkaXRpbmcgdGhpcyBjb2RlISAgSXQncyBiZWVuIHR1bmVkIGZvciBwZXJmb3JtYW5jZVxuICAvLyBhbmQgd29ya3MgaW4gd2F5cyB5b3UgbWF5IG5vdCBleHBlY3QuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQvcHVsbC80MzRcbiAgcmV0dXJuIChieXRlVG9IZXhbYXJyW29mZnNldCArIDBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDNdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA1XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDZdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgN11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA4XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDldXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTNdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTVdXSkudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KGFyciwgb2Zmc2V0ID0gMCkge1xuICBjb25zdCB1dWlkID0gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0KTsgLy8gQ29uc2lzdGVuY3kgY2hlY2sgZm9yIHZhbGlkIFVVSUQuICBJZiB0aGlzIHRocm93cywgaXQncyBsaWtlbHkgZHVlIHRvIG9uZVxuICAvLyBvZiB0aGUgZm9sbG93aW5nOlxuICAvLyAtIE9uZSBvciBtb3JlIGlucHV0IGFycmF5IHZhbHVlcyBkb24ndCBtYXAgdG8gYSBoZXggb2N0ZXQgKGxlYWRpbmcgdG9cbiAgLy8gXCJ1bmRlZmluZWRcIiBpbiB0aGUgdXVpZClcbiAgLy8gLSBJbnZhbGlkIGlucHV0IHZhbHVlcyBmb3IgdGhlIFJGQyBgdmVyc2lvbmAgb3IgYHZhcmlhbnRgIGZpZWxkc1xuXG4gIGlmICghdmFsaWRhdGUodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZ2lmaWVkIFVVSUQgaXMgaW52YWxpZCcpO1xuICB9XG5cbiAgcmV0dXJuIHV1aWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ2lmeTsiLCJpbXBvcnQgbmF0aXZlIGZyb20gJy4vbmF0aXZlLmpzJztcbmltcG9ydCBybmcgZnJvbSAnLi9ybmcuanMnO1xuaW1wb3J0IHsgdW5zYWZlU3RyaW5naWZ5IH0gZnJvbSAnLi9zdHJpbmdpZnkuanMnO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICBpZiAobmF0aXZlLnJhbmRvbVVVSUQgJiYgIWJ1ZiAmJiAhb3B0aW9ucykge1xuICAgIHJldHVybiBuYXRpdmUucmFuZG9tVVVJRCgpO1xuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpOyAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG5cbiAgcm5kc1s2XSA9IHJuZHNbNl0gJiAweDBmIHwgMHg0MDtcbiAgcm5kc1s4XSA9IHJuZHNbOF0gJiAweDNmIHwgMHg4MDsgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG5cbiAgaWYgKGJ1Zikge1xuICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgICBidWZbb2Zmc2V0ICsgaV0gPSBybmRzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBidWY7XG4gIH1cblxuICByZXR1cm4gdW5zYWZlU3RyaW5naWZ5KHJuZHMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2NDsiLCJpbXBvcnQgUkVHRVggZnJvbSAnLi9yZWdleC5qcyc7XG5cbmZ1bmN0aW9uIHZhbGlkYXRlKHV1aWQpIHtcbiAgcmV0dXJuIHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyAmJiBSRUdFWC50ZXN0KHV1aWQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZGF0ZTsiLCIvLyBpbXBvcnRzICB7ZGVmYXVsdFRvRG8sIFRvRG9GYWN0b3J5fSBmcm9tIHRhc2tNb2R1bGVzXG5pbXBvcnQgKiBhcyB0YXNrIGZyb20gJy4vdGFza3NNb2R1bGVzLmpzJztcblxuY29uc3QgcHJvamVjdExpc3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0cy1saXN0Jyk7XG5jb25zdCB0b0RvbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0X19jb250YWluZXInKVxuXG5cbmZ1bmN0aW9uIHJlbmRlcihwcm9qZWN0QXJyYXkpIHtcbiAgICB0b0RvbGlzdC5pbm5lckhUTUwgPSAnJztcbiAgICBwcm9qZWN0QXJyYXkuZm9yRWFjaCh0YXNrT2JqID0+IHtcbiAgICAgICAgbGV0IGNhcmRIdG1sID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiIGRhdGEtaWQ9XCIke3Rhc2tPYmoudWlkfVwiPlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiY2FyZF9fdG9kby10aXRsZVwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJUaXRsZS4uLlwiIHZhbHVlPVwiJHt0YXNrT2JqLnRpdGxlfVwiPlxuICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiY2FyZF9fdG9kby1kZXNjcmlwdGlvblwiIGNvbHM9XCIzMFwiIHJvd3M9XCI1XCIgcGxhY2Vob2xkZXI9XCJXcml0ZSBhIGRlc2NyaXB0aW9uLi4uXCI+JHt0YXNrT2JqLmRlc2NyaXB0aW9ufTwvdGV4dGFyZWE+XG4gICAgICAgICAgICA8c2VsZWN0IG5hbWU9XCJkdWUtZGF0ZVwiIGNsYXNzPVwiY2FyZF9fdG9kby1kdWVEYXRlXCI+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIiB2YWx1ZT1cIiR7dGFza09iai5kdWVEYXRlfVwiPiR7dGFza09iai5kdWVEYXRlfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJOb3dcIj5Ob3c8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiVG9kYXlcIj5Ub2RheTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJUb21vcnJvd1wiPlRvbW9ycm93PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlNvbWV0aW1lXCI+U29tZXRpbWU8L29wdGlvbj5cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPHNlbGVjdCBuYW1lPVwicHJpb3JpdHlcIiBjbGFzcz1cImNhcmRfX3RvZG8tcHJpb3JpdHlcIj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHN0eWxlPVwiZGlzcGxheTogbm9uZVwiIHZhbHVlPVwiJHt0YXNrT2JqLnByaW9yaXR5fVwiPiR7dGFza09iai5wcmlvcml0eX08L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTG93XCI+TG93PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIk5vcm1hbFwiPk5vcm1hbDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJIaWdoXCI+SGlnaDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJVcmdlbnRcIj5VcmdlbnQ8L29wdGlvbj5cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiY2FyZF9fdG9kby1wcm9qZWN0XCIgdHlwZT1cInRleHRcIiBsaXN0PVwicHJvamVjdHMtbGlzdFwiIHZhbHVlPVwiJHt0YXNrT2JqLnByb2plY3R9XCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImNhcmRfX3RvZG8taWRcIj4ke3Rhc2tPYmoudWlkfTwvcD5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJjYXJkX19hZGQtYnRuXCI+U2F2ZTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNhcmRfX2RlbC1idG5cIj5EZWxldGU8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+YDtcbiAgICAgICAgdG9Eb2xpc3QuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYWZ0ZXJiZWdpblwiLCBjYXJkSHRtbC50cmltKCkpO1xuICAgICAgICBzZXRCaW5kaW5ncyh0YXNrT2JqLnVpZClcblxuICAgIH0pXG4gICAgbG9hZERhdGFsaXN0KClcbn1cblxuZnVuY3Rpb24gc2V0QmluZGluZ3MoZGF0YUlkKSB7XG4gICAgY29uc3QgY2FyZEVsZW1lbnQgPSB0b0RvbGlzdC5xdWVyeVNlbGVjdG9yKGAuY2FyZFtkYXRhLWlkPVwiJHtkYXRhSWR9XCJdYCk7XG4gICAgY29uc3QgZGVsZXRlQnRuID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmRfX2RlbC1idG4nKTtcbiAgICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB0YXNrRGVsZXRlKGV2ZW50KSk7XG4gICAgY29uc3Qgc2F2ZUJ0biA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkX19hZGQtYnRuJyk7XG4gICAgc2F2ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHRhc2tVcGRhdGUoZXZlbnQpKVxufVxuXG5mdW5jdGlvbiBpbmRleEZpbmRlcihldmVudCkge1xuICAgIGxldCB0YXJnZXRVSUQgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLmNhcmQnKS5kYXRhc2V0LmlkO1xuICAgIGxldCBUYXJnZXRPYmpJbmRleCA9IHRhc2suZGVmYXVsdFRvRG8udGFza3MuZmluZEluZGV4KG9iaiA9PiBvYmoudWlkID09IHRhcmdldFVJRClcbiAgICByZXR1cm4gVGFyZ2V0T2JqSW5kZXg7XG59XG5cbmZ1bmN0aW9uIHRhc2tVcGRhdGUoZXZlbnQpIHtcbiAgICBsZXQgaW5kZXggPSBpbmRleEZpbmRlcihldmVudCk7XG4gICAgY29uc3QgY2FyZCA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlO1xuICAgIGNvbnN0IHRpdGxlSW5wdXQgPSBjYXJkLnF1ZXJ5U2VsZWN0b3IoJy5jYXJkX190b2RvLXRpdGxlJykudmFsdWU7XG4gICAgY29uc3QgZGVzY0lucHV0ID0gY2FyZC5xdWVyeVNlbGVjdG9yKCcuY2FyZF9fdG9kby1kZXNjcmlwdGlvbicpLnZhbHVlO1xuICAgIGNvbnN0IGR1ZURhdGVTZWwgPSBjYXJkLnF1ZXJ5U2VsZWN0b3IoJy5jYXJkX190b2RvLWR1ZURhdGUnKS52YWx1ZTtcbiAgICBjb25zdCBwcmlvcml0eVNlbCA9IGNhcmQucXVlcnlTZWxlY3RvcignLmNhcmRfX3RvZG8tcHJpb3JpdHknKS52YWx1ZVxuICAgIGNvbnN0IHByb2plY3RJbnB1dCA9IGNhcmQucXVlcnlTZWxlY3RvcignLmNhcmRfX3RvZG8tcHJvamVjdCcpLnZhbHVlXG4gICAgdGFzay5kZWZhdWx0VG9Eby5lZGl0KGluZGV4LCB0aXRsZUlucHV0LCBkZXNjSW5wdXQsIGR1ZURhdGVTZWwsIHByaW9yaXR5U2VsLCBwcm9qZWN0SW5wdXQpXG4gICAgcmVuZGVyKHRhc2suZGVmYXVsdFRvRG8udGFza3MpXG4gICAgY29uc29sZS5sb2codGFzay5kZWZhdWx0VG9Eby50YXNrcylcblxufVxuXG5mdW5jdGlvbiB0YXNrRGVsZXRlKGV2ZW50KSB7XG4gICAgbGV0IGluZGV4ID0gaW5kZXhGaW5kZXIoZXZlbnQpXG4gICAgdGFzay5kZWZhdWx0VG9Eby5kZWxldGUoaW5kZXgpXG4gICAgcmVuZGVyKHRhc2suZGVmYXVsdFRvRG8udGFza3MpXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNhcmQoKSB7XG4gICAgbGV0IG5ld1Rhc2tPYmplY3QgPSB0YXNrLlRvRG9GYWN0b3J5KClcbiAgICBjb25zb2xlLmxvZyhuZXdUYXNrT2JqZWN0KVxuICAgIHRhc2suZGVmYXVsdFRvRG8uYWRkKG5ld1Rhc2tPYmplY3QpXG4gICAgY29uc29sZS5sb2codGFzay5kZWZhdWx0VG9Eby50YXNrcylcbiAgICByZW5kZXIodGFzay5kZWZhdWx0VG9Eby50YXNrcylcbn1cblxuZnVuY3Rpb24gbG9hZERhdGFsaXN0KGRhdGFsaXN0ID0gcHJvamVjdExpc3RFbCkge1xuICAgIGRhdGFsaXN0LmlubmVySFRNTCA9IFwiXCI7XG4gICAgdGFzay5kZWZhdWx0VG9Eby5wcm9qZWN0TGlzdCgpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZGF0YWxpc3QuYXBwZW5kQ2hpbGQobmV3IE9wdGlvbihlbGVtZW50LCBlbGVtZW50LCkpO1xuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKHRhc2suZGVmYXVsdFRvRG8ucHJvamVjdExpc3QoKSlcblxufVxuLy8gZnVuY3Rpb24gbG9hZERhdGFsaXN0KGRhdGFsaXN0ID0gcHJvamVjdExpc3RFbCkge1xuLy8gICAgIGRhdGFsaXN0LmlubmVySFRNTCA9IFwiXCI7XG4vLyAgICAgdGFzay5nZW5lcmF0ZURhdGFsaXN0KCkuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuLy8gICAgICAgICBkYXRhbGlzdC5hcHBlbmRDaGlsZChuZXcgT3B0aW9uKGVsZW1lbnQsIGVsZW1lbnQsKSk7XG4vLyAgICAgfSk7XG4vLyAgICAgY29uc29sZS5sb2codGFzay5nZW5lcmF0ZURhdGFsaXN0KVxuLy8gICAgIGNvbnNvbGUubG9nKHRhc2suZ2VuZXJhdGVEYXRhbGlzdCgpKVxuXG4vLyB9XG5cbmV4cG9ydCB7IGNyZWF0ZUNhcmQgfSIsImZ1bmN0aW9uIGFkZGVyKHsgdGFza3MgfSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGFkZDogKG9iaikgPT4gdGFza3MucHVzaChvYmopXG4gICAgfVxufTtcblxuZnVuY3Rpb24gZGVsZXRlcih7IHRhc2tzIH0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBkZWxldGU6IChpbmRleCkgPT4gdGFza3Muc3BsaWNlKGluZGV4LCAxKVxuICAgIH1cbn07XG5cbmZ1bmN0aW9uIGVkaXRvcih7IHRhc2tzIH0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBlZGl0OiAoaW5kZXgsIG5ld3RpdGxlLCBuZXdEZXNjLCBuZXdEdWUsIG5ld1ByaW9yaXR5LCBuZXdQcm9qZWN0KSA9PiB7XG4gICAgICAgICAgICB0YXNrc1tpbmRleF0udGl0bGUgPSBuZXd0aXRsZTtcbiAgICAgICAgICAgIHRhc2tzW2luZGV4XS5kZXNjcmlwdGlvbiA9IG5ld0Rlc2M7XG4gICAgICAgICAgICB0YXNrc1tpbmRleF0uZHVlRGF0ZSA9IG5ld0R1ZTtcbiAgICAgICAgICAgIHRhc2tzW2luZGV4XS5wcmlvcml0eSA9IG5ld1ByaW9yaXR5O1xuICAgICAgICAgICAgdGFza3NbaW5kZXhdLnByb2plY3QgPSBuZXdQcm9qZWN0O1xuICAgICAgICB9XG5cbiAgICB9XG59O1xuXG5mdW5jdGlvbiBwcm9qZWN0TGlzdEdlbmVyYXRvcih7IHRhc2tzIH0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwcm9qZWN0TGlzdDogKCkgPT4gWy4uLm5ldyBTZXQodGFza3MubWFwKChvYmopID0+IG9iai5wcm9qZWN0KSldXG4gICAgfVxufTtcbmV4cG9ydCB7IGFkZGVyLCBkZWxldGVyLCBlZGl0b3IsIHByb2plY3RMaXN0R2VuZXJhdG9yIH0iLCJpbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJztcbmltcG9ydCB7IGFkZGVyLCBkZWxldGVyLCBlZGl0b3IsIHByb2plY3RMaXN0R2VuZXJhdG9yIH0gZnJvbSAnLi90YXNrTWV0aG9kcydcblxuZnVuY3Rpb24gVG9Eb0ZhY3RvcnkodGl0bGUgPSAnJywgZGVzY3JpcHRpb24gPSAnJywgZHVlRGF0ZSA9ICcnLCBwcmlvcml0eSA9ICdOb3JtYWwnLCBwcm9qZWN0ID0gJ0RlZmF1bHQnKSB7XG4gICAgbGV0IHRvRG8gPSB7XG4gICAgICAgIHRpdGxlLFxuICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgZHVlRGF0ZSxcbiAgICAgICAgcHJpb3JpdHksXG4gICAgICAgIHByb2plY3QsXG4gICAgICAgIHVpZDogdXVpZHY0KCksXG4gICAgfVxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHRvRG8pXG59XG5cbmZ1bmN0aW9uIEFycmF5RmFjdG9yeSgpIHtcbiAgICBjb25zdCB0YXNrQXJyYXkgPSB7IHRhc2tzOiBbXSB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgLi4udGFza0FycmF5LFxuICAgICAgICAuLi5hZGRlcih0YXNrQXJyYXkpLFxuICAgICAgICAuLi5kZWxldGVyKHRhc2tBcnJheSksXG4gICAgICAgIC4uLmVkaXRvcih0YXNrQXJyYXkpLFxuICAgICAgICAuLi5wcm9qZWN0TGlzdEdlbmVyYXRvcih0YXNrQXJyYXkpXG4gICAgfVxufTtcblxuLy8gY29uc3QgZ2VuZXJhdGVEYXRhbGlzdCA9IChhcnIgPSBkZWZhdWx0VG9Eby50YXNrcykgPT4gWy4uLm5ldyBTZXQoYXJyLm1hcCgob2JqKSA9PiBvYmoucHJvamVjdCkpXVxuXG5jb25zdCBkZWZhdWx0VG9EbyA9IEFycmF5RmFjdG9yeSgpXG5cbmV4cG9ydCB7IGRlZmF1bHRUb0RvLCBUb0RvRmFjdG9yeSB9XG4vLyBleHBvcnQgeyBkZWZhdWx0VG9EbywgVG9Eb0ZhY3RvcnksIGdlbmVyYXRlRGF0YWxpc3QgfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICogYXMgRG9tIGZyb20gJy4vZG9tTW9kdWxlcydcblxuY29uc3QgbmV3VG9Eb0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXdfX3RvRG8tYnRuJyk7XG5uZXdUb0RvQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgRG9tLmNyZWF0ZUNhcmQpXG5cblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=