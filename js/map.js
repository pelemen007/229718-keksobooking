'use strict';

var nearbyAds = [];

  var randomInteger = function(min, max) {
    return Math.floor(Math.random()*max)+min;
  };

  var getAvatar = function (id) {
    return 'img/avatars/user0'+id+'.png';
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
    var i = randomInteger(0, typeFeatures.length - 1);
    return typeFeatures[i];
  };

  var getLocation = function (locationX, locationY) {
    return 'location.'+locationX+', location.'+locationY+'';
  };

  for (var id = 0; id < 8; id++) {

    var locationX = randomInteger(300, 900);
    var locationY = randomInteger(100, 500);

    var idAvatar = id + 1;

    nearbyAds[id] = {
      "author": {
        "avatar": getAvatar(idAvatar)                          //строка, адрес изображения вида img/avatars/user{{xx}}.png, где xx это число от 1 до 8 с ведущим нулем. Например 01, 02 и т. д. Адреса изображений не повторяются
      },
      "offer": {
        "title": getTitle(),                            // строка, заголовок предложения, одно из фиксированных значений "Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде". Значения не должны повторяться.
        "address": getLocation(),                       //строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}"
        "price": randomInteger(1000, 1000000),          //число, случайная цена от 1000 до 1 000 000
        "type": getTypeHouse(),                         //"type": строка с одним из трех фиксированных значений: flat, house или bungalo
        "rooms": randomInteger(1, 5),                   //число, случайное количество комнат от 1 до 5
        "guests": randomInteger(1, 20),                 //число, случайное количество гостей, которое можно разместить
        "checkin": getTimeCheckin(),                    //строка с одним из трех фиксированных значений: 12:00, 13:00 или 14:00
        "checkout": getTimeCheckout(),                  //строка с одним из трех фиксированных значений: 12:00, 13:00 или 14:00
        "features": getFeatures(),                      //массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"
        "description": '',                              //пустая строка
        "photos": []                                    //пустой массив
      },
      "location": {
        "x": locationX,                                 //случайное число, координата x метки на карте в блоке .tokyo__pin-map от 300 до 900,
        "y": locationY                                  //случайное число, координата y метки на карте в блоке .tokyo__pin-map от 100 до 500
      }
    };
  }

