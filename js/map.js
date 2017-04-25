'use strict';

// Создание массива элементов

var nearbyAds = [];

var randomInteger = function (min, max) {
  return Math.floor(Math.random() * max) + min;
};

var getAvatar = function (id) {
  return 'img/avatars/user0' + id + '.png';
};

var typeTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var getTitle = function () {
  var i = randomInteger(0, typeTitle.length - 1);
  return typeTitle[i];
};

var typeHouse = ['flat', 'house', 'bungalo'];
var getTypeHouse = function () {
  var i = randomInteger(0, typeHouse.length - 1);
  return typeHouse[i];
};

var typeTime = ['12:00', '13:00', '14:00'];
var getTimeCheckin = function () {
  var i = randomInteger(0, typeTime.length - 1);
  return typeTime[i];
};
var getTimeCheckout = function () {
  var i = randomInteger(0, typeTime.length - 1);
  return typeTime[i];
};

var typeFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var newTypeFeatures = [];

var getFeatures = function () {

  var i = randomInteger(1, typeFeatures.length);

  for (var j = 0; j < i; j++) {
    var k = randomInteger(0, typeFeatures.length - 1);
    var chooseFeature = typeFeatures[k];
    if (newTypeFeatures.indexOf(chooseFeature) <= -1) {
      newTypeFeatures.push(typeFeatures[k]);
    }
  }
  return newTypeFeatures;
};

var getLocation = function (locX, locY) {
  return locX + ', ' + locY;
};

for (var id = 0; id < 8; id++) {

  var locationX = randomInteger(300, 900);
  var locationY = randomInteger(100, 500);

  var idAvatar = id + 1;

  nearbyAds[id] = {
    author: {
      avatar: getAvatar(idAvatar)                   // строка, адрес изображения вида img/avatars/user{{xx}}.png, где xx это число от 1 до 8 с ведущим нулем. Например 01, 02 и т. д. Адреса изображений не повторяются
    },
    offer: {
      title: getTitle(),                            // строка, заголовок предложения, одно из фиксированных значений "Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде". Значения не должны повторяться.
      address: getLocation(locationX, locationY),   // строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}"
      price: randomInteger(1000, 1000000),          // число, случайная цена от 1000 до 1000000
      type: getTypeHouse(),                         // строка с одним из трех фиксированных значений: flat, house или bungalo
      rooms: randomInteger(1, 5),                   // число, случайное количество комнат от 1 до 5
      guests: randomInteger(1, 20),                 // число, случайное количество гостей, которое можно разместить
      checkin: getTimeCheckin(),                    // строка с одним из трех фиксированных значений: 12:00, 13:00 или 14:00
      checkout: getTimeCheckout(),                  // строка с одним из трех фиксированных значений: 12:00, 13:00 или 14:00
      features: getFeatures(),                      // массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"
      description: '',                              // пустая строка
      photos: []                                    // пустой массив
    },
    location: {
      x: locationX,                                 // случайное число, координата x метки на карте в блоке .tokyo__pin-map от 300 до 900,
      y: locationY                                  // случайное число, координата y метки на карте в блоке .tokyo__pin-map от 100 до 500
    }
  };
}

// Создание DOM элементов

var drawPin = document.createDocumentFragment();            // создал пустой DocumentFragment

for (var i = 0; i < nearbyAds.length; i++) {

  var pin = document.createElement('div');                   // создаю div
  pin.className = 'pin';                                     // добавляю класс pin
  pin.style.left = (nearbyAds[i].location.x - 28) + 'px';           // добавляю атрибуты
  pin.style.top = nearbyAds[i].location.y + 'px';

  var pinAvatar = document.createElement('img');             // создаю img
  pin.appendChild(pinAvatar);                                // помещаю его внутрь pin
  pinAvatar.src = nearbyAds[i].author.avatar;                // добавляю атрибуты
  pinAvatar.className = 'rounded';
  pinAvatar.width = '40';
  pinAvatar.height = '40';
  pinAvatar.style.pointerEvents = 'none';
  pinAvatar.tabIndex = 0;                         // добавил для фокуса module4-task1
  drawPin.appendChild(pin);               // добавляю всё из pin в DocumentFragment
}

var tokyoMap = document.querySelector('.tokyo__pin-map');               // нашёл .tokyo__pin-map
tokyoMap.appendChild(drawPin);                                          // добавляю получившийся фрагмент в .tokyo__pin-map

// пункт 4. Работаю с шаблоном #lodge-template

function renderLodgeContent(x) {

  var lodge = document.querySelector('#lodge-template').content.cloneNode(true);          // копирую id="lodge-template"

  lodge.querySelector('.lodge__title').textContent = nearbyAds[x].offer.title;               // Вывожу заголовок объявления offer.title в блок .lodge__title
  lodge.querySelector('.lodge__address').textContent = nearbyAds[x].offer.address;           // Вывожу адрес offer.address в блок lodge__address

  function changeType(type) {                                                             // Перевожу тип жилья с анг на рус
    switch (type) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      default:
        return '';
    }
  }

  lodge.querySelector('.lodge__type').textContent = changeType(nearbyAds[x].offer.type);      // Вывожу тип жилья offer.type в блок lodge__type на русском языке
  lodge.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + nearbyAds[x].offer.guests + ' гостей в ' + nearbyAds[x].offer.rooms + ' комнатах';        // Вывожу количество гостей и комнат offer.rooms и offer.guests в блок .lodge__rooms-and-guests
  lodge.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + nearbyAds[x].offer.checkin + ', выезд до ' + nearbyAds[x].offer.checkout;             // Вывожу время заезда и выезда offer.checkin и offer.checkout в блок .lodge__checkin-time

  function lodgeFeatures() {                                                   // создаю span с правильным классом
    var codeFeatures = '';
    for (i = 0; i < newTypeFeatures.length; i++) {
      codeFeatures += '<span class="feature__image feature__image--' + newTypeFeatures[i] + '"></span>';
    }
    return codeFeatures;
  }

  lodge.querySelector('.lodge__features').innerHTML = lodgeFeatures(nearbyAds[x].offer.features);        // В блок .lodge__features вывожу все удобства в квартире из массива {{offer.features}} пустыми спанами
  lodge.querySelector('.lodge__description').textContent = nearbyAds[x].offer.description;                // В блок .lodge__description вывожу описание объекта offer.description

  return lodge;
}

var dialog = document.querySelector('.dialog__panel');                                                 // нахожу div с классом dialog__panel
dialog.innerHTML = '';                                                                        // очищаю его

dialog.appendChild(renderLodgeContent(0));                                                  // заполняю его данными из массива данными первого объекта

document.querySelector('.dialog__title').firstElementChild.src = nearbyAds[0].author.avatar;               // Меняю src у аватарки пользователя — изображения, которое записано в .dialog__title — на значения поля author.avatar отрисовываемого объекта.
document.querySelector('.dialog__close').tabIndex = 0;
// .......................module4-task1

var activePin = function (pinEl) {                                                        // функция добавления класса pin--active
  pinEl.classList.add('pin--active');
};

var deactivePin = function (pinEl) {                                                     // функция удаления класса pin--active
  pinEl.classList.remove('pin--active');
};

var deactiveAllPin = function () {                                                        // функция удаления класса pin--active у всех дивов
  for (var j = 1; j < elementPins.length; j++) {
    deactivePin(elementPins[j]);
  }
};

var numberActivePin = function () {                                                       // функция поиска активного пина
  for (var m = 0; m < elementPins.length; m++) {
    if (elementPins[m].classList.value === 'pin pin--active') {
      var p = m - 1;
    }
  }
  return p;
};

var showLodgeContent = function () {                                                      // функция выводит описание выбранного пина
  document.getElementById('offer-dialog').style.display = 'block';                        // делаю видным весь блок с описанием
  dialog.innerHTML = '';
  var numberIdActivePin = numberActivePin();
  dialog.appendChild(renderLodgeContent(numberIdActivePin));
};

var showLodgeAvatar = function () {                                                       // функция выводит аватар выбранного пина
  var numberIdActivePin = numberActivePin();
  document.querySelector('.dialog__title').firstElementChild.src = nearbyAds[numberIdActivePin].author.avatar;
};

var clickHandler = function (evt) {                                                    // деактивируем все активные пины, и активируем по клику
  deactiveAllPin();
  activePin(evt.target);
  showLodgeContent();                                                                    // выводим описание пина по клику
  showLodgeAvatar();                                                                     // выводим аватар по клику
};

var enterHandler = function (evt) {                                                    // деактивируем все активные пины, и активируем по enter
  if (evt.keyCode === 13) {
    deactiveAllPin();
    activePin(evt.target.parent);
    showLodgeContent();                                                                    // выводим описание пина по enter
    showLodgeAvatar();                                                                     // выводим аватар по enter
  }
};

var elementPins = document.querySelectorAll('.pin');                                      // нахожу все дивы с классом pin

for (var k = 1; k < elementPins.length; k++) {                                            // назначаем обработчик всем найденным дивам
  var elementPin = elementPins[k];
  elementPin.addEventListener('click', clickHandler);                                     // обработчик по клику
  elementPin.addEventListener('keydown', enterHandler);                                   // обработчик по enter
}

var clickCloseHandler = function (evt) {                                                     // При клике на элемент .dialog__close объявление скрывается и деактивируется элемент .pin, который был помечен как активный
  document.getElementById('offer-dialog').style.display = 'none';                         // делаю не видным весь блок с описанием
  deactiveAllPin();
};

var enterCloseHandler = function (evt) {                                                     // При нажатии enter на элемент .dialog__close объявление скрывается и деактивируется элемент .pin, который был помечен как активный
  if (evt.keyCode === 13) {
    document.getElementById('offer-dialog').style.display = 'none';                         // делаю не видным весь блок с описанием
    deactiveAllPin();
  }
};

var dialogCloseButton = document.querySelector('.dialog__close');
dialogCloseButton.addEventListener('click', clickCloseHandler);                           // обработчик по клику на закрытие
dialogCloseButton.addEventListener('keydown', enterCloseHandler);                         // обработчик по enter на закрытие

var dialogClose = function (evt) {                                                       // закрытие по esc
  if (evt.keyCode === 27) {
    document.getElementById('offer-dialog').style.display = 'none';
    deactiveAllPin();
  }
};
document.addEventListener('keydown', dialogClose);                                   // обработчик на закрытие по esc

// ***************************module4-task2

var form = document.querySelector('.notice__form');                                  // находим форму

var title = form.querySelector('#title');                                            // находим в форме поле для заголовка

title.required = true;                                                               // Обязательное поле
title.minLength = 30;                                                                // Минимальная длина — 30 символов
title.maxLength = 100;                                                               // Макcимальная длина — 100 символов

var price = form.querySelector('#price');                                            // находим в форме поле для цены

price.required = true;                                                               // Обязательное поле
price.type = 'number';                                                               // Числовое поле
price.min = 0;                                                                       // Минимальное значение — 0
price.max = 1000000;                                                                 // Максимальное значение — 1000000
price.value = 1000;                                                                  // Значение — 1000 по умолчанию

var time = form.querySelector('#time');                                              // Находим селект time
var timeout = form.querySelector('#timeout');                                        // Находим селект timeout

var autoSelect = function (selectValue1, selectValue2) {                             // Функция автозамены значения в селекте, в засивисимости от выбранного значения в другом по порядковому номеру
  var changeValue = function () {
    for (i = 0; i < selectValue1.length; i++) {
      if (selectValue1.options[i].selected === true) {                               // Если выбрано i-ое значение у первого селекта
        selectValue2.options[i].selected = true;                                     // то присвоить такое же и второму
      }
    }
  };
  selectValue1.addEventListener('change', changeValue);                              // Добавляем слушателя на первый параметр функции на изменение
};

autoSelect(time, timeout);                                                           // Запускаю функцию для изменения значений timeout в зависимости от выбранных time
autoSelect(timeout, time);                                                           // Запускаю функцию для изменения значений time в зависимости от выбранных timeout

var type = form.querySelector('#type');                                              // Находим селект типа жилья

var minPrices = [1000, 0, 10000];                                                    // Минимальные цены для типов жилья

var changePrice = function () {
  if (type.options[1].selected === true) {                                           // Если выбран 'Лачуга', то цена 0
    price.value = minPrices[1];
  }
  if (type.options[0].selected === true) {                                           // Если выбран 'Квартира', то цена 1000
    price.value = minPrices[0];
  }
  if (type.options[2].selected === true) {                                           // Если выбран 'Дворец', то цена 10000
    price.value = minPrices[2];
  }
};

type.addEventListener('change', changePrice);                                         // Добавляем слушателя для селекта type на изменение

var roomNumber = form.querySelector('#room_number');                                  // Находим селект кол-ва комнат

var capacity = form.querySelector('#capacity');                                       // Находим селект кол-ва гостей

capacity.options[1].selected = true;                                                  // Задаю значение "не для гостей", чтобы соответствовало кол-ву комнат = 1 комната

var changeCapacity = function () {                                                    // Функция замены кол-ва гостей от выбранного кол-ва комнат
  if (roomNumber.options[1].selected) {                                               // 2 комнаты для 3 гостей
    capacity.options[0].selected = true;
  }
  if (roomNumber.options[2].selected) {                                               // 100 комнат для 3 гостей
    capacity.options[0].selected = true;
  }
  if (roomNumber.options[0].selected === true) {                                      // 1 комната не для гостей
    capacity.options[1].selected = true;
  }
};

roomNumber.addEventListener('change', changeCapacity);                                 // Добавляем слушателя для селекта roomNumber на изменение

// Проверка формы на валидность, отправка и очистка

var submit = form.querySelector('.form__submit');                                      // Нахожу кнопку отправить

var validNumber = function (boxNumber, minNumber, maxNumber) {                         // Функция проверки числового поля
  if (boxNumber.value < minNumber || boxNumber.value > maxNumber) {                    // Если значение меньше минимального или больше максимального
    boxNumber.style.borderColor = 'red';                                               // возвращает false и красит инпут в красный
    return false;
  } else {
    boxNumber.style.borderColor = '';                                                  // иначе true
    return true;
  }
};

var validTitle = function (boxText, minText, maxText) {                                // Функция проверки текстового поля
  if (boxText.value.length < minText || boxText.value.length > maxText) {              // Если длина текста меньше минимального или больше максимального
    boxText.style.borderColor = 'red';                                                 // возвращает false и красит инпут в красный
    return false;
  } else {
    boxText.style.borderColor = '';                                                    // иначе true
    return true;
  }
};

var getValidForm = function () {                                                       // Функция запускает функции для проверки поля "Цена за ночь" и "Заголовок"
  var getValidNumber = validNumber(price, price.min, price.max);
  var getValidTitle = validTitle(title, title.minLength, title.maxLength);
  return getValidNumber && getValidTitle;                                              // и возвращает либо true либо false
};

var submitForm = function () {
  if (getValidForm()) {                                                                // Если форма валидна, то получаем true и выполняем функции ниже
    form.submit();                                                                     // Отправка формы
    form.reset();                                                                      // Очищаем форму
    capacity.options[1].selected = true;                                               // Задаю значение "не для гостей", чтобы соответствовало кол-ву комнат = 1 комната
    price.value = 1000;                                                                // Исходное значение цены 1000
  }
};

var enterSubmitForm = function (evt) {
  if (evt.keyCode === 13) {
    submitForm();
  }
};

submit.addEventListener('click', submitForm);                                          // Добавляю слушателя на кнопку по клику
document.addEventListener('keydown', enterSubmitForm);                                 // Добавляю слушателя на кнопку по enter
