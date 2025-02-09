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
