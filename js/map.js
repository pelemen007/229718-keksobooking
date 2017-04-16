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
var getFeatures = function () {

  var i = randomInteger(1, typeFeatures.length);
  var newTypeFeatures = [];
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

var pinMain = document.querySelector('.pin');              // ищу по классу pin и присваиваю всё переменной
var parentPin = pinMain.parentElement;                     // ищу родителя
//console.log(pinMain);
//console.log(parentPin);


for (var i = 0; i < nearbyAds.length; i++) {

  var pin = document.createElement('div');                   // создаю div
  // parentPin.appendChild(pin);                                // кладу его в родителя
  pin.className = "pin";                                     // добавляю класс pin
  pin.style.left = (nearbyAds[i].location.x - 28) + 'px';           // добавляю атрибуты
  pin.style.top = nearbyAds[i].location.y + 'px';

  var pinAvatar = document.createElement('img');             // создаю img
  pin.appendChild(pinAvatar);                                // помещаю его внутрь pin
  pinAvatar.src = nearbyAds[i].author.avatar;                // добавляю атрибуты
  pinAvatar.className = 'rounded';
  pinAvatar.width = '40';
  pinAvatar.height = '40';

}
var pin = pin.cloneNode(true);
console.log(pin);
console.log(pin2);
//
// pin.src.remove(alt);                         // удаляю alt = "Main Pin"
//
// var imgAddress = function (imgNumber) {                    // новые пути для аватаров
//   return 'img/avatars/user0' + imgNumber + '.png';
// };
//
// var getLocationX = function (locXNearbyAds) {
//   return 'location.' + locXNearbyAds + '';
// };
// var getLocationY = function (locYNearbyAds) {
//   return 'location.' + locYNearbyAds + '';
// };
//
// for (var i = 0; i < nearbyAds.length; i++) {
//
//   var locXNearbyAds = nearbyAds[i].location.x;          // обращаюсь к массиву за координатами
//   console.log(locXNearbyAds);
//   var locYNearbyAds = nearbyAds[i].location.y;
//
//   pin.style.left = getLocationX(locXNearbyAds) + 'px';    // добавляю style="left: {{location.x}}px"
//   pin.style.top = getLocationY(locYNearbyAds) + 'px';     // добавляю style="top: {{location.y}}px"
//
//   // pin.appendChild(img);                             ???У меня же создан img т.к. я копировал pin?
//
//   var imgAvatar = pin.getElementsByTagName('img')[i];     // обращаюсь к тегу img
//   var imgNumber = i + 1;
//
//   imgAvatar.src.innerHTML = imgAddress(imgNumber);                  // присваиваю новый адрес аватара
// }
//



// Отрисовываю DOM-элементы

var tokyoMap = document.querySelector('.tokyo__pin-map');               // нашёл .tokyo__pin-map
var drawPin = document.createDocumentFragment();                        // создал пустой DocumentFragment
drawPin.appendChild(pin);                                               // добавляю всё из pin в DocumentFragment
tokyoMap.appendChild(drawPin);                                          // добавляю получившийся фрагмент в .tokyo__pin-map
  console.log(tokyoMap);


  // for (var m = 0; m < nearbyAds.length; m++) {
  //
  //   drawPin.appendChild(pin[m])
  // }

