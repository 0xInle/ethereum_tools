document.addEventListener('DOMContentLoaded', () => {
  const inputField = document.querySelector('.main__inp');
  const clearButton = document.querySelector('.main__btn-x');
  const exampleText = document.querySelector('.main__example');
  const buttons = document.querySelectorAll('.header__btn');
  const searchBox = document.querySelector('.main__search-box');
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
  if (!inputField || !clearButton || !buttons.length || !exampleText || !searchBox) {
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
    // Снимаем активность с всех кнопок
    buttons.forEach(button => button.classList.remove('active'));
    clickedButton.classList.add('active');

    // Обновляем плейсхолдер
    const placeholderText = clickedButton.getAttribute('data-placeholder');
    inputField.placeholder = placeholderText;

    // Очищаем активное поле ввода и сбрасываем активную кнопку
    inputField.value = '';
    inputField.dataset.activeButton = clickedButton.getAttribute('data-placeholder');

    // Очищаем все другие инпуты, которые могут быть заполнены
    inputFields.forEach(input => input.value = '');

    // Очищаем все тексты в блоках (если они есть)
    const spanElements = document.querySelectorAll('.main__span');
    spanElements.forEach(span => span.textContent = ''); // Очистка названий полей

    // Убираем ошибку, если поле пустое
    if (inputField.value.trim() === '') {
      searchBox.classList.remove('error');
    }

    // Показать крестик после очищения
    clearButton.style.display = 'block';
    clearButton.innerHTML = `<svg class="main__svg-x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>`;

    // Очищаем сообщение об ошибке, если оно было
    const errorMessage = document.querySelector('.main__error');
    if (errorMessage) {
      errorMessage.style.display = 'none';
    }

    // Изменение названий полей в зависимости от активной кнопки
    if (clickedButton.getAttribute('data-example') === "0xf0b1a4a35f7640d3cebd29b2813b3dff5b686e498d7060846ad4564dae6cd675") {
      // Кнопка Tx Hash → RSZ
      spanElements[0].textContent = 'R:';  // Address -> R
      spanElements[1].textContent = 'S:';  // Compressed -> S
      spanElements[2].textContent = 'Z:';  // Uncompressed -> Z
    } else {
      // Восстанавливаем первоначальные названия
      spanElements[0].textContent = 'Address:';
      spanElements[1].textContent = 'Compressed:';
      spanElements[2].textContent = 'Uncompressed:';
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
      setActiveButton(button); // Вызов функции для изменения состояния кнопки и текста полей

      // Скрываем блок ошибки при переключении кнопок
      const errorMessage = document.querySelector('.main__error');
      if (errorMessage) {
        errorMessage.style.display = 'none'; // Скрыть ошибку при переключении
      }

      // Также очищаем ошибки на поле и на кнопке
      searchBox.classList.remove('error');

      // Если нужно, можно сбросить состояние, например, сбросить введенное значение в поле
      inputField.value = ''; // Очищаем значение input (если необходимо)
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

    // Устанавливаем поля только для чтения снова после очистки
    const inputFields = document.querySelectorAll('.main__inp-content');
    inputFields.forEach(inputField => {
      inputField.setAttribute('readonly', true); // Устанавливаем поля в состояние только для чтения
    });

    // Устанавливаем фокус обратно на инпут
    inputField.focus();
  });

  // Клик по example вставляет примерный адрес в input и переносит фокус на input
  exampleText.addEventListener('click', () => {
    const activeButton = document.querySelector('.header__btn.active');
    if (activeButton) {
      // Убираем ошибку перед вставкой текста
      searchBox.classList.remove('error');
      const errorMessage = document.querySelector('.main__error');
      if (errorMessage) {
        errorMessage.style.display = 'none';
      }

      // Вставляем новый адрес
      inputField.value = activeButton.getAttribute('data-example');
      inputField.focus();

      // Теперь проверим, если поле пустое, то снова добавим ошибку
      if (inputField.value.trim() === '') {
        searchBox.classList.add('error');
        if (errorMessage) {
          errorMessage.style.display = 'block';
        }
      }
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

    const errorMessage = document.querySelector('.main__error');
    if (errorMessage) errorMessage.style.display = 'none'; // Скрываем ошибку перед проверкой

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
      } else {
        console.log("Ошибка: адрес не валиден");
        searchBox.classList.add('error');

        if (errorMessage) {
          errorMessage.textContent = "Failed to process request";
          errorMessage.style.display = 'block';
        }

        // В случае ошибки делаем поля только для чтения
        const inputFields = document.querySelectorAll('.main__inp-content');
        inputFields.forEach(inputField => {
          inputField.setAttribute('readonly', true);
        });
      }

      // Всегда показываем крестик после завершения лоадера
      clearButton.style.display = 'block';
      clearButton.innerHTML = `<svg class="main__svg-x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>`;

      isLoading = false;
    }, 1000);
  }

  const addressInput = document.querySelector('.main__inp'); // Поле ввода адреса (для его отслеживания)

  // Обработчик для поля ввода адреса
  addressInput.addEventListener('input', () => {
    // Если пользователь начал вводить, сбрасываем ошибку
    if (addressInput.value.trim() !== '') {
      searchBox.classList.remove('error'); // Убираем ошибку, если есть
      const errorMessage = document.querySelector('.main__error');
      if (errorMessage) {
        errorMessage.style.display = 'none'; // Скрываем сообщение об ошибке
      }
    }
  });

  // Обработчик на кнопку отправки
  submitButton.addEventListener('click', () => {
    const isFieldEmpty = inputField.value.trim() === '';

    // Если поле пустое и ошибка ещё не добавлена
    if (isFieldEmpty && !searchBox.classList.contains('error')) {
      searchBox.classList.add('error');
    } else if (!isFieldEmpty) {
      // Если поле не пустое, удаляем ошибку
      searchBox.classList.remove('error');
      clearFields();
      checkAddress();
    }

    // Переносим фокус на поле ввода
    inputField.focus();
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
});

// Функция для заполнения полей при ответе
function fillFieldsWithValidResponse(response) {
  const inputFields = document.querySelectorAll('.main__inp-content');

  // Заполнение значений в поля
  inputFields[0].value = response.address;
  inputFields[1].value = response.public_key.compressed;
  inputFields[2].value = response.public_key.uncompressed;

  // После успешного ответа делаем поля только для чтения
  inputFields.forEach(inputField => {
    inputField.setAttribute('readonly', true);
  });
}

// Закрытие клавиатуры при нажатии на кнопку
const submitButton = document.querySelector('.main__btn');
const inputField = document.querySelector('.main__inp');

submitButton.addEventListener('click', () => {
  inputField.blur();
});

// Закрытие клавиатуры при нажатии Enter
inputField.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    inputField.blur();
  }
});
