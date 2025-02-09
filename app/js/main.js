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
// document.addEventListener('DOMContentLoaded', () => {
//   const inputField = document.querySelector('.main__inp');
//   const clearButton = document.querySelector('.main__btn-x');
//   const exampleText = document.querySelector('.main__example');
//   const buttons = document.querySelectorAll('.header__btn');
//   const searchBox = document.querySelector('.main__search-box');

//   if (!inputField || !clearButton || !buttons.length || !exampleText || !searchBox) {
//     console.error('Ошибка: Один из элементов не найден.');
//     return;
//   }

//   // Функция для установки активной кнопки и обновления плейсхолдера
//   function setActiveButton(clickedButton) {
//     buttons.forEach(button => button.classList.remove('active'));
//     clickedButton.classList.add('active');

//     // Устанавливаем placeholder
//     const placeholderText = clickedButton.getAttribute('data-placeholder');
//     inputField.placeholder = placeholderText;

//     // Очищаем поле при смене кнопки
//     inputField.value = '';
//     inputField.dataset.activeButton = clickedButton.getAttribute('data-placeholder');

//     // Сбрасываем красное выделение при смене кнопки, если поле пустое
//     if (inputField.value.trim() === '') {
//       searchBox.classList.remove('error');
//     }
//   }

//   // Устанавливаем фокус на первую кнопку после полной загрузки страницы
//   setTimeout(() => {
//     const firstButton = buttons[0];
//     if (firstButton) {
//       setActiveButton(firstButton);
//       firstButton.focus(); // Гарантируем фокус после загрузки
//     }
//   }, 0); // Используем setTimeout, чтобы дать браузеру время на рендер

//   // Обработчик для кнопок переключения
//   buttons.forEach(button => {
//     button.addEventListener('click', () => {
//       setActiveButton(button);
//     });
//   });

//   // Очищение инпута при нажатии на крестик
//   clearButton.addEventListener('click', () => {
//     inputField.value = ''; // Очищаем input
//     searchBox.classList.remove('error'); // Сбрасываем красный бордер
//   });

//   // Клик по example вставляет примерный адрес в input и переносит фокус на input
//   exampleText.addEventListener('click', () => {
//     const activeButton = document.querySelector('.header__btn.active');
//     if (activeButton) {
//       inputField.value = activeButton.getAttribute('data-example');
//       inputField.focus(); // Переносим фокус в input
//     }
//   });

//   // Сохраняем выделение кнопки при взаимодействии с инпутом
//   inputField.addEventListener('focus', () => {
//     const activeButtonPlaceholder = inputField.dataset.activeButton;
//     buttons.forEach(button => {
//       if (button.getAttribute('data-placeholder') === activeButtonPlaceholder) {
//         button.classList.add('active');
//       }
//     });
//   });
// });

// // 2. Валидация инпута и ответов
// document.addEventListener('DOMContentLoaded', () => {
//   const inputField = document.querySelector('.main__inp');
//   const submitButton = document.querySelector('.main__btn');
//   const clearButton = document.querySelector('.main__btn-x');
//   const alertIcon = document.querySelector('.main__svg-allert');
//   const searchBox = document.querySelector('.main__search-box');

//   let isLoading = false; // Флаг для предотвращения повторных запросов

//   function showLoader() {
//     const loader = `<svg class="loader" viewBox="0 0 50 50">
//       <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-dasharray="90, 150" stroke-linecap="round"></circle>
//     </svg>`;
//     clearButton.innerHTML = loader;
//     clearButton.style.display = 'block';
//   }

//   function hideLoader() {
//     clearButton.style.display = 'none';
//   }

//   function checkAddress() {
//     if (isLoading) return;
//     isLoading = true;

//     showLoader();
//     searchBox.classList.remove('error');
//     alertIcon.style.display = 'none';

//     setTimeout(() => {
//       const isValid = Math.random() > 0.5;
//       hideLoader();

//       if (isValid) {
//         console.log("✅ Адрес валиден");
//         searchBox.classList.remove('error');
//         clearButton.style.display = 'block';
//         clearButton.innerHTML = `<svg class="main__svg-x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
//           <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
//         </svg>`;
//       } else {
//         console.log("❌ Ошибка: адрес не валиден");
//         searchBox.classList.add('error');
//         alertIcon.style.display = 'block';
//         setTimeout(() => {
//           alertIcon.style.display = 'none';
//           clearButton.style.display = 'block';
//           clearButton.innerHTML = `<svg class="main__svg-x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
//             <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
//           </svg>`;
//         }, 3000);
//       }

//       isLoading = false;
//     }, 1000);
//   }

//   submitButton.addEventListener('click', () => {
//     if (inputField.value.trim() === '') {
//       searchBox.classList.add('error'); // Меняем бордер на красный
//     } else {
//       checkAddress();
//     }
//   });

//   inputField.addEventListener('keydown', (event) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       if (inputField.value.trim() === '') {
//         searchBox.classList.add('error'); // Меняем бордер на красный
//       } else {
//         checkAddress();
//       }
//     }
//   });

//   clearButton.addEventListener('click', () => {
//     inputField.value = '';
//     searchBox.classList.remove('error');
//     clearButton.style.display = 'block';
//     clearButton.innerHTML = `<svg class="main__svg-x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
//       <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
//     </svg>`;
//     inputField.focus();
//   });

//   alertIcon.addEventListener('mouseover', () => {
//     alertIcon.style.display = 'none';
//     clearButton.style.display = 'block';
//     clearButton.innerHTML = `<svg class="main__svg-x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
//       <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
//     </svg>`;
//   });
// });

// 1. Нажатие на кнопки и замена текста в плейсхолдере

document.addEventListener('DOMContentLoaded', () => {
  const inputField = document.querySelector('.main__inp');
  const clearButton = document.querySelector('.main__btn-x');
  const exampleText = document.querySelector('.main__example');
  const buttons = document.querySelectorAll('.header__btn');
  const searchBox = document.querySelector('.main__search-box');
  const alertIcon = document.querySelector('.main__svg-allert');
  const submitButton = document.querySelector('.main__btn');
  let isLoading = false; // Флаг для предотвращения повторных запросов
  let alertTimeout; // Таймер для иконки ошибки

  // Проверка на наличие всех необходимых элементов
  if (!inputField || !clearButton || !buttons.length || !exampleText || !searchBox || !alertIcon) {
    console.error('Ошибка: Один из элементов не найден.');
    return;
  }

  // Функция для установки активной кнопки и обновления плейсхолдера
  function setActiveButton(clickedButton) {
    buttons.forEach(button => button.classList.remove('active'));
    clickedButton.classList.add('active');

    // Устанавливаем placeholder
    const placeholderText = clickedButton.getAttribute('data-placeholder');
    inputField.placeholder = placeholderText;

    // Очищаем поле при смене кнопки
    inputField.value = '';
    inputField.dataset.activeButton = clickedButton.getAttribute('data-placeholder');

    // Сбрасываем красное выделение при смене кнопки, если поле пустое
    if (inputField.value.trim() === '') {
      searchBox.classList.remove('error');
    }

    // Скрываем иконку ошибки сразу при переключении кнопки
    alertIcon.style.display = 'none';

    // Показываем кнопку с крестиком сразу
    clearButton.style.display = 'block';
    clearButton.innerHTML = `<svg class="main__svg-x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>`;

    // Если был активен таймер на 3 секунды, сбрасываем его
    if (alertTimeout) {
      clearTimeout(alertTimeout);
    }
  }

  // Устанавливаем фокус на первую кнопку после полной загрузки страницы
  setTimeout(() => {
    const firstButton = buttons[0];
    if (firstButton) {
      setActiveButton(firstButton);
      firstButton.focus(); // Гарантируем фокус после загрузки
    }
  }, 0); // Используем setTimeout, чтобы дать браузеру время на рендер

  // Обработчик для кнопок переключения
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      setActiveButton(button);
    });
  });

  // Очищение инпута при нажатии на крестик
  clearButton.addEventListener('click', () => {
    inputField.value = ''; // Очищаем input
    searchBox.classList.remove('error'); // Сбрасываем красный бордер
  });

  // Клик по example вставляет примерный адрес в input и переносит фокус на input
  exampleText.addEventListener('click', () => {
    const activeButton = document.querySelector('.header__btn.active');
    if (activeButton) {
      inputField.value = activeButton.getAttribute('data-example');
      inputField.focus(); // Переносим фокус в input
    }
  });

  // Сохраняем выделение кнопки при взаимодействии с инпутом
  inputField.addEventListener('focus', () => {
    const activeButtonPlaceholder = inputField.dataset.activeButton;
    buttons.forEach(button => {
      if (button.getAttribute('data-placeholder') === activeButtonPlaceholder) {
        button.classList.add('active');
      }
    });
  });

  // Функция для отображения лоадера
  function showLoader() {
    const loader = `<svg class="loader" viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-dasharray="90, 150" stroke-linecap="round"></circle>
    </svg>`;
    clearButton.innerHTML = loader;
    clearButton.style.display = 'block';
  }

  // Функция для скрытия лоадера
  function hideLoader() {
    clearButton.style.display = 'none';
  }

  // 2. Валидация адреса и лоадер
  function checkAddress() {
    if (isLoading) return;
    isLoading = true;
    showLoader();
    searchBox.classList.remove('error');
    alertIcon.style.display = 'none';
    setTimeout(() => {
      const isValid = Math.random() > 0.5; // Для примера случайная проверка

      hideLoader();
      if (isValid) {
        console.log("✅ Адрес валиден");
        searchBox.classList.remove('error');
        clearButton.style.display = 'block';
        clearButton.innerHTML = `<svg class="main__svg-x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>`;
      } else {
        console.log("❌ Ошибка: адрес не валиден");
        searchBox.classList.add('error');
        alertIcon.style.display = 'block';

        // Запуск таймера для скрытия иконки через 3 секунды
        alertTimeout = setTimeout(() => {
          alertIcon.style.display = 'none';
          clearButton.style.display = 'block';
          clearButton.innerHTML = `<svg class="main__svg-x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>`;
        }, 3000);
      }
      isLoading = false;
    }, 1000);
  }

  // Обработчик на кнопку отправки
  submitButton.addEventListener('click', () => {
    if (inputField.value.trim() === '') {
      searchBox.classList.add('error'); // Меняем бордер на красный
    } else {
      checkAddress();
    }
  });

  // Обработчик для нажатия Enter
  inputField.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (inputField.value.trim() === '') {
        searchBox.classList.add('error'); // Меняем бордер на красный
      } else {
        checkAddress();
      }
    }
  });

  // Клик по иконке ошибки — мышь над иконкой
  alertIcon.addEventListener('mouseover', () => {
    alertIcon.style.display = 'none';
    clearButton.style.display = 'block';
    clearButton.innerHTML = `<svg class="main__svg-x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>`;
  });
});

// 3. Запросы к апи

const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.get('/api/ethereum', async (req, res) => {
  try {
    const response = await fetch('https://api.ecdsa.ru/ethereum');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: 'Ошибка при запросе к API'
    });
  }
});
app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
/******/ })()
;
//# sourceMappingURL=main.js.map