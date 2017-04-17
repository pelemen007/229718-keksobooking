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
  return 'location.' + locX + ', location.' + locY + '';
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

  var pin = document.createElement('div').cloneNode(true);                   // создаю div
  pin.className = 'pin';                                     // добавляю класс pin
  pin.style.left = (nearbyAds[i].location.x - 28) + 'px';           // добавляю атрибуты
  pin.style.top = nearbyAds[i].location.y + 'px';

  var pinAvatar = document.createElement('img');             // создаю img
  pin.appendChild(pinAvatar);                                // помещаю его внутрь pin
  pinAvatar.src = nearbyAds[i].author.avatar;                // добавляю атрибуты
  pinAvatar.className = 'rounded';
  pinAvatar.width = '40';
  pinAvatar.height = '40';
  drawPin.appendChild(pin);                                    // добавляю всё из pin в DocumentFragment
}

var tokyoMap = document.querySelector('.tokyo__pin-map');               // нашёл .tokyo__pin-map
tokyoMap.appendChild(drawPin);                                          // добавляю получившийся фрагмент в .tokyo__pin-map

// пункт 4. Работаю с шаблоном #lodge-template

function renderLodgeContent(nearbyAds) {

  var lodge = document.querySelector('#lodge-template').content.cloneNode(true);          // копирую id="lodge-template"

  lodge.querySelector('.lodge__title').textContent = nearbyAds.offer.title;               // Вывожу заголовок объявления offer.title в блок .lodge__title
  lodge.querySelector('.lodge__address').textContent = nearbyAds.offer.address;           // Вывожу адрес offer.address в блок lodge__address

  function changeType(type) {                                                             // Перевожу тип жилья с анг на рус
    switch (type) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      default: return '';
    }
  }

  lodge.querySelector('.lodge__type').textContent = changeType(nearbyAds.offer.type);      // Вывожу тип жилья offer.type в блок lodge__type на русском языке
  lodge.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + nearbyAds.offer.guests + ' гостей в ' + nearbyAds.offer.rooms + ' комнатах';        // Вывожу количество гостей и комнат offer.rooms и offer.guests в блок .lodge__rooms-and-guests
  lodge.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + nearbyAds.offer.checkin + ', выезд до ' + nearbyAds.offer.checkout;             // Вывожу время заезда и выезда offer.checkin и offer.checkout в блок .lodge__checkin-time

  function lodgeFeatures(newTypeFeatures) {                                                   // создаю span с правильным классом
    var codeFeatures = '';
    for (i = 0; i < newTypeFeatures.length; i++) {
      codeFeatures += '<span class="feature__image feature__image--' + newTypeFeatures[i] + '"></span>';
    }
    return codeFeatures;
  }

  lodge.querySelector('.lodge__features').innerHTML = lodgeFeatures(nearbyAds.offer.features);        // В блок .lodge__features вывожу все удобства в квартире из массива {{offer.features}} пустыми спанами
  lodge.querySelector('.lodge__description').textContent = nearbyAds.offer.description;                // В блок .lodge__description вывожу описание объекта offer.description

  return lodge;
}

var dialog = document.querySelector('.dialog__panel');                                                 // нахожу div с классом dialog__panel
dialog.innerHTML = '';                                                                                 // очищаю его
dialog.appendChild(renderLodgeContent(nearbyAds[0]));                                                  // заполняю его данными из массива данными первого объекта

document.querySelector('.dialog__title').firstElementChild.src = nearbyAds[0].author.avatar;               // Меняю src у аватарки пользователя — изображения, которое записано в .dialog__title — на значения поля author.avatar отрисовываемого объекта.
