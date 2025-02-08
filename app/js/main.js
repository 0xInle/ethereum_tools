/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
const mainBtn = document.querySelector('.main__btn');
const mainContent = document.querySelector('.main__content');
const mainSearch = document.querySelector('.main__search');
mainBtn.addEventListener('click', function () {
  mainContent.style.display = 'flex';
});
const inpBtn = document.querySelectorAll('.main__inp-btn');
inpBtn.forEach(button => {
  button.addEventListener('click', function () {
    const li = this.closest('li');
    const input = li.querySelector('.main__inp-content');
    const copyIcon = this.querySelector('.main__icon-copy');
    const okIcon = this.querySelector('.main__icon-ok');
    input.select();
    document.execCommand('copy');
    copyIcon.style.display = 'none';
    okIcon.style.display = 'inline';
    setTimeout(() => {
      copyIcon.style.display = 'inline';
      okIcon.style.display = 'none';
    }, 500);
  });
});
/******/ })()
;
//# sourceMappingURL=main.js.map