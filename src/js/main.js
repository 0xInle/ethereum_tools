const buttons = document.querySelectorAll('.header__btn');
const inputField = document.querySelector('.main__inp');
const exampleText = document.querySelector('.main__example-text');

// Функция для обрезки адреса и добавления многоточия в центре
function formatAddress(address) {
  const maxLength = 67;

  if (address.length > maxLength) {
    const halfLength = Math.floor(maxLength / 2);
    return address.slice(0, halfLength) + '...' + address.slice(address.length - halfLength);
  }

  return address;
}

// Обработчик для кнопок
function setFocusAndPlaceholder(button) {
  buttons.forEach(btn => btn.classList.remove('active'));

  button.classList.add('active');

  const placeholderText = button.getAttribute('data-placeholder');
  inputField.placeholder = placeholderText;

  const fullAddress = button.getAttribute('data-example');

  exampleText.textContent = formatAddress(fullAddress);

  exampleText.setAttribute('data-full-address', fullAddress);

  inputField.value = '';
}

document.addEventListener('DOMContentLoaded', () => {
  setFocusAndPlaceholder(buttons[0]);
  buttons[0].focus();
});

buttons.forEach(button => {
  button.addEventListener('click', () => {
    setFocusAndPlaceholder(button);
  });

  button.addEventListener('focus', () => {
    setFocusAndPlaceholder(button);
  });
});

// Заполнение инпута по клику на примерный адрес
exampleText.addEventListener('click', function() {
  const fullAddress = exampleText.getAttribute('data-full-address');

  inputField.value = fullAddress;
});

// Лоадер + оповещение об ошибке
const submitButton = document.querySelector('.main__btn');
const errorButton = document.querySelector('.main__btn-error');
const searchBox = document.querySelector('.main__search-box'); // Блок поиска

// Повторный вызов
let isLoading = false;

// Функция запуска лоадера и проверки адреса
function checkAddress() {
  if (isLoading) return;
  isLoading = true;

  errorButton.style.display = 'none'; // Скрываем ошибку перед проверкой
  searchBox.classList.remove('error'); // Убираем красный стиль перед проверкой
  inputField.classList.remove('error'); // Убираем красный текст в инпуте

  // Заменяем крестик на лоадер
  clearButton.innerHTML = `<svg class="loader" viewBox="0 0 50 50">
    <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-dasharray="90, 150" stroke-linecap="round"></circle>
  </svg>`;

  setTimeout(() => {
    // Возвращаем крестик после загрузки
    clearButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
    </svg>`;

    const isValid = Math.random() > 0.5; // 50% шанс валидности

    if (!isValid) {
      console.error("❌ Ошибка: адрес не валиден");
      errorButton.style.display = 'block'; // Показываем ошибку
      searchBox.classList.add('error'); // Добавляем класс для красного бордера
      inputField.classList.add('error'); // Добавляем класс для красного текста в инпуте
    } else {
      console.log("✅ Адрес валиден");
      errorButton.style.display = 'none'; // Прячем ошибку
      searchBox.classList.remove('error'); // Убираем красный стиль
      inputField.classList.remove('error'); // Убираем красный текст в инпуте
    }

    isLoading = false; // Сбрасываем флаг после завершения проверки
  }, 1000);
}


// Очищение инпута
const clearButton = document.querySelector('.main__btn-x');

clearButton.addEventListener('click', () => {
  inputField.value = '';
  searchBox.classList.remove('error'); // Убираем ошибку при очистке
  inputField.classList.remove('error'); // Убираем красный текст
});

// Обработка нажатия на кнопку "Get Info"
submitButton.addEventListener('click', () => {
  if (inputField.value.trim() !== '') {
    checkAddress();
  }
});

// Обработка нажатия Enter в инпуте
inputField.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && inputField.value.trim() !== '') {
    event.preventDefault(); // Чтобы форма не отправлялась
    checkAddress();
  }
});
