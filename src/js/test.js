// 1. Нажатие на кнопки и замена текста в плейсхолдере

document.addEventListener('DOMContentLoaded', () => {
  const inputField = document.querySelector('.main__inp');
  const clearButton = document.querySelector('.main__btn-x');
  const exampleText = document.querySelector('.main__example');
  const buttons = document.querySelectorAll('.header__btn');

  if (!inputField || !clearButton || !buttons.length || !exampleText) {
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
});


// document.addEventListener('DOMContentLoaded', () => {
//   const inputField = document.querySelector('.main__inp');
//   const clearButton = document.querySelector('.main__btn-x');
//   const exampleText = document.querySelector('.main__example');
//   const buttons = document.querySelectorAll('.header__btn');

//   if (!inputField || !clearButton || !buttons.length || !exampleText) {
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
//   });

//   // Клик по example вставляет примерный адрес в input и переносит фокус на input
//   exampleText.addEventListener('click', () => {
//     const activeButton = document.querySelector('.header__btn.active');
//     if (activeButton) {
//       inputField.value = activeButton.getAttribute('data-example');
//       inputField.focus(); // Переносим фокус в input
//     }
//   });
// });

// 2. Валидация адреса и лоадер
// document.addEventListener('DOMContentLoaded', () => {
//   const inputField = document.querySelector('.main__inp');
//   const submitButton = document.querySelector('.main__btn');
//   const clearButton = document.querySelector('.main__btn-x');
//   const alertIcon = document.querySelector('.main__svg-allert');
//   const searchBox = document.querySelector('.main__search-box');

//   let isLoading = false; // Флаг для предотвращения повторных запросов

//   // Функция для отображения лоадера
//   function showLoader() {
//     const loader = `<svg class="loader" viewBox="0 0 50 50">
//       <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-dasharray="90, 150" stroke-linecap="round"></circle>
//     </svg>`;
//     clearButton.innerHTML = loader; // Вставляем лоадер в кнопку
//     clearButton.style.display = 'block'; // Показываем кнопку с лоадером
//   }

//   // Функция для скрытия лоадера
//   function hideLoader() {
//     clearButton.style.display = 'none'; // Скрываем кнопку с лоадером
//   }

//   // Функция для проверки валидности адреса
//   function checkAddress() {
//     if (isLoading) return; // Если идет запрос, выходим
//     isLoading = true;

//     // Показываем лоадер
//     showLoader();

//     // Прячем ошибку и алерт
//     searchBox.classList.remove('error');
//     alertIcon.style.display = 'none';

//     setTimeout(() => {
//       // Проверяем валидность (для теста случайно)
//       const isValid = Math.random() > 0.5;

//       // Скрываем лоадер
//       hideLoader();

//       if (isValid) {
//         console.log("✅ Адрес валиден");
//         searchBox.classList.remove('error');
//         clearButton.style.display = 'block'; // Показываем крестик
//         clearButton.innerHTML = `<svg class="main__svg-x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
//           <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
//         </svg>`; // Иконка крестика
//       } else {
//         console.log("❌ Ошибка: адрес не валиден");
//         searchBox.classList.add('error');
//         alertIcon.style.display = 'block'; // Показываем иконку алерта

//         setTimeout(() => {
//           alertIcon.style.display = 'none'; // Скрываем иконку алерта через 3 секунды
//           clearButton.style.display = 'block'; // Показываем крестик
//           clearButton.innerHTML = `<svg class="main__svg-x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
//             <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
//           </svg>`; // Иконка крестика
//         }, 3000);
//       }

//       // Восстановление состояния через 1 секунду
//       isLoading = false; // Сбрасываем флаг после завершения
//     }, 1000); // Имитация задержки запроса (1 секунда)
//   }

//   // Обработчик нажатия кнопки "Get Info"
//   submitButton.addEventListener('click', () => {
//     if (inputField.value.trim() !== '') {
//       checkAddress();
//     }
//   });

//   // Обработчик нажатия клавиши Enter в инпуте
//   inputField.addEventListener('keydown', (event) => {
//     if (event.key === 'Enter' && inputField.value.trim() !== '') {
//       event.preventDefault(); // Чтобы форма не отправлялась
//       checkAddress();
//     }
//   });

//   // Очищение инпута при нажатии на кнопку крестик
//   clearButton.addEventListener('click', () => {
//     inputField.value = ''; // Очищаем input
//     searchBox.classList.remove('error'); // Убираем красный бордер
//     clearButton.style.display = 'block'; // Показываем крестик
//     clearButton.innerHTML = `<svg class="main__svg-x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
//     <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
//   </svg>`; // Иконка крестика
//     inputField.focus(); // Устанавливаем фокус на input
//   });

//   // Добавляем обработчик наведения на иконку алерта
//   alertIcon.addEventListener('mouseover', () => {
//     alertIcon.style.display = 'none'; // Скрываем иконку алерта при наведении
//     clearButton.style.display = 'block'; // Показываем крестик
//     clearButton.innerHTML = `<svg class="main__svg-x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
//       <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
//     </svg>`; // Иконка крестика
//   });
// });
document.addEventListener('DOMContentLoaded', () => {
  const inputField = document.querySelector('.main__inp');
  const submitButton = document.querySelector('.main__btn');
  const clearButton = document.querySelector('.main__btn-x');
  const alertIcon = document.querySelector('.main__svg-allert');
  const searchBox = document.querySelector('.main__search-box');

  let isLoading = false; // Флаг для предотвращения повторных запросов

  function showLoader() {
    const loader = `<svg class="loader" viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-dasharray="90, 150" stroke-linecap="round"></circle>
    </svg>`;
    clearButton.innerHTML = loader;
    clearButton.style.display = 'block';
  }

  function hideLoader() {
    clearButton.style.display = 'none';
  }

  function checkAddress() {
    if (isLoading) return;
    isLoading = true;

    showLoader();
    searchBox.classList.remove('error');
    alertIcon.style.display = 'none';

    setTimeout(() => {
      const isValid = Math.random() > 0.5;
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
        setTimeout(() => {
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

  submitButton.addEventListener('click', () => {
    if (inputField.value.trim() === '') {
      searchBox.classList.add('error'); // Меняем бордер на красный
    } else {
      checkAddress();
    }
  });

  inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (inputField.value.trim() === '') {
        searchBox.classList.add('error'); // Меняем бордер на красный
      } else {
        checkAddress();
      }
    }
  });

  clearButton.addEventListener('click', () => {
    inputField.value = '';
    searchBox.classList.remove('error');
    clearButton.style.display = 'block';
    clearButton.innerHTML = `<svg class="main__svg-x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>`;
    inputField.focus();
  });

  alertIcon.addEventListener('mouseover', () => {
    alertIcon.style.display = 'none';
    clearButton.style.display = 'block';
    clearButton.innerHTML = `<svg class="main__svg-x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>`;
  });
});











// document.addEventListener('DOMContentLoaded', () => {
//   const inputField = document.querySelector('.main__inp');
//   const clearButton = document.querySelector('.main__btn-x');
//   const exampleText = document.querySelector('.main__example');
//   const buttons = document.querySelectorAll('.header__btn');
//   const searchBox = document.querySelector('.main__search-box');
//   const alertIcon = document.querySelector('.main__svg-allert');
//   const submitButton = document.querySelector('.main__btn');

//   let isLoading = false; // Флаг для предотвращения повторных запросов
//   let alertTimeout; // Таймер для иконки ошибки

//   // Проверка на наличие всех необходимых элементов
//   if (!inputField || !clearButton || !buttons.length || !exampleText || !searchBox || !alertIcon) {
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

//     // Скрываем иконку ошибки сразу при переключении кнопки
//     alertIcon.style.display = 'none';

//     // Показываем кнопку с крестиком сразу
//     clearButton.style.display = 'block';
//     clearButton.innerHTML = `<svg class="main__svg-x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
//       <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
//     </svg>`;

//     // Если был активен таймер на 3 секунды, сбрасываем его
//     if (alertTimeout) {
//       clearTimeout(alertTimeout);
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

//   // Функция для отображения лоадера
//   function showLoader() {
//     const loader = `<svg class="loader" viewBox="0 0 50 50">
//       <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-dasharray="90, 150" stroke-linecap="round"></circle>
//     </svg>`;
//     clearButton.innerHTML = loader;
//     clearButton.style.display = 'block';
//   }

//   // Функция для скрытия лоадера
//   function hideLoader() {
//     clearButton.style.display = 'none';
//   }

//   // 2. Валидация адреса и лоадер

//   function checkAddress() {
//     if (isLoading) return;
//     isLoading = true;

//     showLoader();
//     searchBox.classList.remove('error');
//     alertIcon.style.display = 'none';

//     // Замена этого блока на реальный запрос к API
//     // -------------------------------------------------------
//     // Для тестов мы просто генерируем случайный результат
//     // Замена на реальный запрос (для теста можно использовать фиксированный ответ)
//     setTimeout(() => {
//       const isValid = Math.random() > 0.5; // Для примера случайная проверка

//       hideLoader();

//       if (isValid) {
//         console.log("✅ Адрес валиден");

//         // Пример успешного ответа от API
//         const apiResponse = {
//           "address": "0x1406854d149e081ac09cb4ca560da463f3123059",
//           "public_key": {
//             "compressed": "03a34f5673c9e98d2f8b5a4c7b6c8d9e0f1a2b3c4d5e6f70819283746556473829",
//             "uncompressed": "04a34f5673c9e98d2f8b5a4c7b6c8d9e0f1a2b3c4d5e6f70819283746556473829b8f7e6d5c4b3a2f1e0d9c8b7a6b5a4f3e2d1c0b9a8b7c6d5e4f3g2h1"
//           }
//         };

//         // Заполнение полей с успешными данными
//         fillFieldsWithValidResponse(apiResponse);

//         // Отображение иконки и кнопки
//         searchBox.classList.remove('error');
//         clearButton.style.display = 'block';
//         clearButton.innerHTML = `<svg class="main__svg-x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
//       <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
//     </svg>`;
//       } else {
//         console.log("❌ Ошибка: адрес не валиден");
//         searchBox.classList.add('error');
//         alertIcon.style.display = 'block';

//         // Запуск таймера для скрытия иконки через 3 секунды
//         alertTimeout = setTimeout(() => {
//           alertIcon.style.display = 'none';
//           clearButton.style.display = 'block';
//           clearButton.innerHTML = `<svg class="main__svg-x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
//         <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
//       </svg>`;
//         }, 3000);
//       }

//       isLoading = false;
//     }, 1000);
//     // -------------------------------------------------------

//     // Если убрать блок с тестами и вместо этого сделать настоящий запрос к API,
//     // все остальное будет работать корректно.
//     //
//     // Пример замены:
//     // fetch('URL_вашего_API')
//     //   .then(response => response.json())
//     //   .then(data => {
//     //     if (data.isValid) {
//     //       // Ваш код при валидном ответе
//     //     } else {
//     //       // Ваш код при ошибке
//     //     }
//     //   })
//     //   .catch(error => {
//     //     console.error('Ошибка при запросе к API:', error);
//     //   });
//   }

//   // Обработчик на кнопку отправки
//   submitButton.addEventListener('click', () => {
//     if (inputField.value.trim() === '') {
//       searchBox.classList.add('error'); // Меняем бордер на красный
//     } else {
//       checkAddress(); // Проверка адреса
//     }
//   });

//   // Обработчик для нажатия Enter
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

//   // Клик по иконке ошибки — мышь над иконкой
//   alertIcon.addEventListener('mouseover', () => {
//     alertIcon.style.display = 'none';
//     clearButton.style.display = 'block';
//     clearButton.innerHTML = `<svg class="main__svg-x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
//       <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
//     </svg>`;
//   });
// });

// // 3. Заполнение полей при ответе
// function fillFieldsWithValidResponse(response) {
//   const inputFields = document.querySelectorAll('.main__inp-content'); // Находим все поля ввода

//   // Поле 1 - Address (для адреса)
//   // Поле 2 - Compressed (для сжимаемого ключа)
//   // Поле 3 - Uncompressed (для не сжимаемого ключа)

//   if (inputFields.length >= 3) {
//     inputFields[0].value = response.address; // Вставляем адрес в первое поле
//     inputFields[1].value = response.public_key.compressed; // Вставляем сжимаемый ключ во второе поле
//     inputFields[2].value = response.public_key.uncompressed; // Вставляем не сжимаемый ключ в третье поле

//     // Устанавливаем поля как readonly (только для чтения)
//     inputFields.forEach(inputField => inputField.setAttribute('readonly', true));
//   } else {
//     console.error("Недостаточно полей ввода на странице!");
//   }
// }









// document.addEventListener('DOMContentLoaded', () => {
//   const inputField = document.querySelector('.main__inp');
//   const clearButton = document.querySelector('.main__btn-x');
//   const exampleText = document.querySelector('.main__example');
//   const buttons = document.querySelectorAll('.header__btn');
//   const searchBox = document.querySelector('.main__search-box');
//   const alertIcon = document.querySelector('.main__svg-allert');
//   const submitButton = document.querySelector('.main__btn');
//   const inputFields = document.querySelectorAll('.main__inp-content'); // Находим все поля ввода

//   // Кнопки копирования
//   const copyButtons = document.querySelectorAll('.main__inp-btn'); // Исправлено на правильный селектор
//   const copyCheckIcon = copyButtons.length > 0 ? copyButtons[0].querySelector('.copy-check') : null;

//   // Добавляем обработчик для кнопок копирования
//   copyButtons.forEach(button => {
//     button.addEventListener('click', () => {
//       const inputElement = button.previousElementSibling; // Находим поле ввода
//       const textToCopy = inputElement.value;

//       if (textToCopy.trim() !== '') {
//         // Копируем текст в буфер обмена
//         navigator.clipboard.writeText(textToCopy).then(() => {
//           // Логируем успешное копирование
//           console.log("✅ Текст скопирован в буфер обмена!");
//         }).catch(err => {
//           console.error('Ошибка при копировании текста: ', err);
//         });
//       }
//     });
//   });

//   let isLoading = false; // Флаг для предотвращения повторных запросов
//   let alertTimeout; // Таймер для иконки ошибки

//   // Проверка на наличие всех необходимых элементов
//   if (!inputField || !clearButton || !buttons.length || !exampleText || !searchBox || !alertIcon) {
//     console.error('Ошибка: Один из элементов не найден.');
//     return;
//   }

//   // Функция для очистки всех полей ввода (адрес, сжимаемый и не сжимаемый ключи)
//   function clearFields() {
//     inputFields.forEach(inputField => {
//       inputField.value = ''; // Очищаем значения полей
//       inputField.removeAttribute('readonly'); // Убираем атрибут readonly
//     });
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

//     // Скрываем иконку ошибки сразу при переключении кнопки
//     alertIcon.style.display = 'none';

//     // Показываем кнопку с крестиком сразу
//     clearButton.style.display = 'block';
//     clearButton.innerHTML = `<svg class="main__svg-x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
//       <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
//     </svg>`;

//     // Если был активен таймер на 3 секунды, сбрасываем его
//     if (alertTimeout) {
//       clearTimeout(alertTimeout);
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
//     clearFields(); // Очищаем все другие поля ввода
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

//   // Функция для отображения лоадера
//   function showLoader() {
//     const loader = `<svg class="loader" viewBox="0 0 50 50">
//       <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-dasharray="90, 150" stroke-linecap="round"></circle>
//     </svg>`;
//     clearButton.innerHTML = loader;
//     clearButton.style.display = 'block';
//   }

//   // Функция для скрытия лоадера
//   function hideLoader() {
//     clearButton.style.display = 'none';
//   }

//   // 2. Валидация адреса и лоадер
//   function checkAddress() {
//     if (isLoading) return;
//     isLoading = true;

//     showLoader();
//     searchBox.classList.remove('error');
//     alertIcon.style.display = 'none';

//     const errorMessage = document.querySelector('.main__error'); // Находим блок ошибки
//     if (errorMessage) errorMessage.style.display = 'none'; // Скрываем ошибку перед проверкой

//     // Замена этого блока на реальный запрос к API
//     setTimeout(() => {
//       const isValid = Math.random() > 0.5; // Для примера случайная проверка

//       hideLoader();

//       if (isValid) {
//         console.log("✅ Адрес валиден");
//         if (errorMessage) errorMessage.style.display = 'none'; // Скрываем сообщение об ошибке

//         // Пример успешного ответа от API
//         const apiResponse = {
//           "address": "0x1406854d149e081ac09cb4ca560da463f3123059",
//           "public_key": {
//             "compressed": "03a34f5673c9e98d2f8b5a4c7b6c8d9e0f1a2b3c4d5e6f70819283746556473829",
//             "uncompressed": "04a34f5673c9e98d2f8b5a4c7b6c8d9e0f1a2b3c4d5e6f70819283746556473829b8f7e6d5c4b3a2f1e0d9c8b7a6b5a4f3e2d1c0b9a8b7c6d5e4f3g2h1"
//           }
//         };

//         // Заполнение полей с успешными данными
//         fillFieldsWithValidResponse(apiResponse);

//         // Отображение иконки и кнопки
//         searchBox.classList.remove('error');
//         clearButton.style.display = 'block';
//         clearButton.innerHTML = `<svg class="main__svg-x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
//           <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
//         </svg>`;
//       } else {
//         console.log("❌ Ошибка: адрес не валиден");
//         searchBox.classList.add('error');
//         alertIcon.style.display = 'block';

//         if (errorMessage) {
//           errorMessage.textContent = "Ответ от APY с ошибкой"; // Устанавливаем текст ошибки
//           errorMessage.style.display = 'block'; // Показываем ошибку
//         }

//         // Запуск таймера для скрытия иконки через 3 секунды
//         alertTimeout = setTimeout(() => {
//           alertIcon.style.display = 'none';
//           clearButton.style.display = 'block';
//           clearButton.innerHTML = `<svg class="main__svg-x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
//             <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
//           </svg>`;
//         }, 3000);
//       }

//       isLoading = false;
//     }, 1000);
// }

//   // Обработчик на кнопку отправки
//   submitButton.addEventListener('click', () => {
//     if (inputField.value.trim() === '') {
//       searchBox.classList.add('error'); // Меняем бордер на красный
//     } else {
//       clearFields(); // Очистка полей перед новым запросом
//       checkAddress(); // Проверка адреса
//     }
//   });

//   // Обработчик для нажатия Enter
//   inputField.addEventListener('keydown', (event) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       if (inputField.value.trim() === '') {
//         searchBox.classList.add('error'); // Меняем бордер на красный
//       } else {
//         clearFields(); // Очистка полей перед новым запросом
//         checkAddress();
//       }
//     }
//   });

//   // Клик по иконке ошибки — мышь над иконкой
//   alertIcon.addEventListener('mouseover', () => {
//     alertIcon.style.display = 'none';
//     clearButton.style.display = 'block';
//     clearButton.innerHTML = `<svg class="main__svg-x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
//       <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
//     </svg>`;
//   });
// });

// // 3. Заполнение полей при ответе
// function fillFieldsWithValidResponse(response) {
//   const inputFields = document.querySelectorAll('.main__inp-content'); // Находим все поля ввода

//   // Поле 1 - Address (для адреса)
//   // Поле 2 - Compressed (для сжимаемого ключа)
//   // Поле 3 - Uncompressed (для не сжимаемого ключа)

//   if (inputFields.length >= 3) {
//     inputFields[0].value = response.address; // Вставляем адрес в первое поле
//     inputFields[1].value = response.public_key.compressed; // Вставляем сжимаемый ключ во второе поле
//     inputFields[2].value = response.public_key.uncompressed; // Вставляем не сжимаемый ключ в третье поле

//     // Устанавливаем поля как readonly (только для чтения)
//     inputFields.forEach(inputField => inputField.setAttribute('readonly', true));
//   } else {
//     console.error("Недостаточно полей ввода на странице!");
//   }
// }
