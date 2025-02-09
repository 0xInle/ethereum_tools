document.addEventListener('DOMContentLoaded', () => {
  const inputField = document.querySelector('.main__inp');
  const clearButton = document.querySelector('.main__btn-x');
  const exampleText = document.querySelector('.main__example');
  const buttons = document.querySelectorAll('.header__btn');
  const searchBox = document.querySelector('.main__search-box');
  const alertIcon = document.querySelector('.main__svg-allert');
  const submitButton = document.querySelector('.main__btn');
  const inputFields = document.querySelectorAll('.main__inp-content');

  // // Функция смены иконок
  document.querySelectorAll('.main__inp-btn').forEach(button => {
    button.addEventListener('click', () => {
      const copyIcon = button.querySelector('.main__icon-copy');
      const checkIcon = button.querySelector('.copy-check');

      // Показываем иконку галочки, скрываем иконку копии
      copyIcon.style.display = 'none';
      checkIcon.style.display = 'inline';

      // Через 3 секунды возвращаем всё обратно
      setTimeout(() => {
        copyIcon.style.display = 'inline';
        checkIcon.style.display = 'none';
      }, 1000);
    });
  });

  // Кнопки копирования
  const copyButtons = document.querySelectorAll('.main__inp-btn');

  // Добавляем обработчик для кнопок копирования
  copyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const inputElement = button.previousElementSibling;
      const textToCopy = inputElement.value;

      if (textToCopy.trim() !== '') {
        navigator.clipboard.writeText(textToCopy).then(() => {
          console.log("Текст скопирован в буфер обмена!");
        }).catch(err => {
          console.error('Ошибка при копировании текста: ', err);
        });
      }
    });
  });

  let isLoading = false;
  let alertTimeout;

  // Проверка на наличие всех необходимых элементов
  if (!inputField || !clearButton || !buttons.length || !exampleText || !searchBox || !alertIcon) {
    console.error('Ошибка: Один из элементов не найден.');
    return;
  }

  // Функция для очистки всех полей ввода
  function clearFields() {
    inputFields.forEach(inputField => {
      inputField.value = '';
      inputField.removeAttribute('readonly');
    });
  }

  // Функция для установки активной кнопки и обновления плейсхолдера
  function setActiveButton(clickedButton) {
    buttons.forEach(button => button.classList.remove('active'));
    clickedButton.classList.add('active');

    const placeholderText = clickedButton.getAttribute('data-placeholder');
    inputField.placeholder = placeholderText;

    inputField.value = '';
    inputField.dataset.activeButton = clickedButton.getAttribute('data-placeholder');

    if (inputField.value.trim() === '') {
      searchBox.classList.remove('error');
    }

    alertIcon.style.display = 'none';

    clearButton.style.display = 'block';
    clearButton.innerHTML = `<svg class="main__svg-x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>`;

    if (alertTimeout) {
      clearTimeout(alertTimeout);
    }
  }

  // Устанавливаем фокус на первую кнопку
  setTimeout(() => {
    const firstButton = buttons[0];
    if (firstButton) {
      setActiveButton(firstButton);
      firstButton.focus();
    }
  }, 0);

  // Обработчик для кнопок переключения
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      setActiveButton(button);

      // Скрываем блок ошибки при переключении кнопок
      const errorMessage = document.querySelector('.main__error');
      if (errorMessage) {
        errorMessage.style.display = 'none'; // Скрыть ошибку при переключении
      }

      // Также очищаем ошибки на поле и на кнопке
      searchBox.classList.remove('error');
      alertIcon.style.display = 'none'; // Скрываем иконку ошибки
    });
  });

  // Очищение инпута и скрытие блока с ошибкой при нажатии на крестик
  clearButton.addEventListener('click', () => {
    inputField.value = ''; // Очищаем input
    searchBox.classList.remove('error'); // Сбрасываем красный бордер
    clearFields(); // Очищаем все другие поля ввода

    // Скрываем блок ошибки при нажатии на крестик
    const errorMessage = document.querySelector('.main__error');
    if (errorMessage) {
      errorMessage.style.display = 'none'; // Скрыть ошибку при клике на крестик
    }

    // Устанавливаем фокус обратно на инпут
    inputField.focus();
  });

  // Клик по example вставляет примерный адрес в input и переносит фокус на input
  exampleText.addEventListener('click', () => {
    const activeButton = document.querySelector('.header__btn.active');
    if (activeButton) {
      inputField.value = activeButton.getAttribute('data-example');
      inputField.focus();
    }
  });

  // Добавляем обработчик для клавиши Enter
  exampleText.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { // Проверяем, была ли нажата клавиша Enter
      const activeButton = document.querySelector('.header__btn.active');
      if (activeButton) {
        inputField.value = activeButton.getAttribute('data-example');
        inputField.focus();
      }
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

  // Валидация адреса и лоадер
  function checkAddress() {
    if (isLoading) return;
    isLoading = true;

    showLoader();
    searchBox.classList.remove('error');
    alertIcon.style.display = 'none';

    const errorMessage = document.querySelector('.main__error');
    if (errorMessage) errorMessage.style.display = 'none'; // Скрываем ошибку перед проверкой

    // Тестовый код для заполнения полей
    // Заменить на реальный запрос API
    setTimeout(() => {
      const isValid = Math.random() > 0.5;

      hideLoader();

      if (isValid) {
        console.log("Адрес валиден");
        if (errorMessage) errorMessage.style.display = 'none';

        const apiResponse = {
          "address": "0x1406854d149e081ac09cb4ca560da463f3123059",
          "public_key": {
            "compressed": "03a34f5673c9e98d2f8b5a4c7b6c8d9e0f1a2b3c4d5e6f70819283746556473829",
            "uncompressed": "04a34f5673c9e98d2f8b5a4c7b6c8d9e0f1a2b3c4d5e6f70819283746556473829b8f7e6d5c4b3a2f1e0d9c8b7a6b5a4f3e2d1c0b9a8b7c6d5e4f3g2h1"
          }
        };

        fillFieldsWithValidResponse(apiResponse);

        searchBox.classList.remove('error');
        clearButton.style.display = 'block';
        clearButton.innerHTML = `<svg class="main__svg-x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>`;
      } else {
        console.log("Ошибка: адрес не валиден");
        searchBox.classList.add('error');
        alertIcon.style.display = 'block';

        if (errorMessage) {
          errorMessage.textContent = "Ответ от APY с ошибкой";
          errorMessage.style.display = 'block';
        }

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
      searchBox.classList.add('error');
    } else {
      clearFields();
      checkAddress();
    }
  });

  // Обработчик для нажатия Enter
  inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (inputField.value.trim() === '') {
        searchBox.classList.add('error');
      } else {
        clearFields();
        checkAddress();
      }
    }
  });

  // Клик по иконке ошибки — скрываем ошибку
  alertIcon.addEventListener('mouseover', () => {
    alertIcon.style.display = 'none';
    clearButton.style.display = 'block';
    clearButton.innerHTML = `<svg class="main__svg-x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>`;
  });
});

// Функция для заполнения полей при ответе
function fillFieldsWithValidResponse(response) {
  const inputFields = document.querySelectorAll('.main__inp-content');

  if (inputFields.length >= 3) {
    inputFields[0].value = response.address;
    inputFields[1].value = response.public_key.compressed;
    inputFields[2].value = response.public_key.uncompressed;

    inputFields.forEach(inputField => inputField.setAttribute('readonly', true));
  } else {
    console.error("Недостаточно полей ввода на странице!");
  }
}
