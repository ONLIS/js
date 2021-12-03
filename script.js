"use strict";

//=============================================================================================

let appData = {
  title: "",
  screens: "",
  screenPrice: 0,
  servicePercentPrice: 0,
  rollback: 15,
  fullPrice: 0,
  allServicePrices: 0,
  adaptive: true,
  service1: "",
  servicePrice1: 0,
  service2: "",
  servicePrice2: 0,
  asking: function () {
    appData.title = appData.getTitle(
      prompt("Как называется ваш проект?", " КаЛьКулятор Верстки  ")
    );
    appData.screens = prompt(
      "Какие типы экранов нужно разработать?",
      "Простые, Сложные, Адаптивные"
    );
    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    appData.screenPrice = appData.getScreenPrice();
    appData.getAllServicePrices();
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  getScreenPrice: function () {
    let value;
    do {
      value = prompt("Сколько будет стоить данная работа?", "15000");
    } while (!appData.isNumber(value));
    return parseFloat(value);
  },
  getScreenPrice: function () {
    let value;
    do {
      value = prompt("Сколько будет стоить данная работа?", "15000");
    } while (!appData.isNumber(value));
    return parseFloat(value);
  },
  getAllServicePrices: function () {
    for (let i = 0; i < 2; i++) {
      if (i == 0) {
        appData.service1 = prompt(
          "Какой дополнительный тип услуги нужен?",
          "Обратная связь"
        );
        do {
          appData.servicePrice1 = prompt("Сколько это будет стоить?");
        } while (!appData.isNumber(appData.servicePrice1));
        appData.servicePrice1 = parseFloat(appData.servicePrice1);
      } else if (i == 1) {
        appData.service2 = prompt(
          "Какой дополнительный тип услуги нужен?",
          "Подключение телеграм бота"
        );
        do {
          appData.servicePrice2 = prompt("Сколько это будет стоить?");
        } while (!appData.isNumber(appData.servicePrice2));
        appData.servicePrice2 = parseFloat(appData.servicePrice2);
      }
    }
    appData.getFullPrice();
  },
  getTitle: function (inpString) {
    let firstSmb;
    inpString = inpString.trim();
    inpString = inpString.toLowerCase();
    firstSmb = inpString[0].toUpperCase();
    inpString = firstSmb + inpString.slice(1);
    return inpString;
  },
  getServicePercentPrices: function (fp, rb) {
    return Math.ceil(fp - fp * (rb / 100));
  },
  screensArray: function (inputString) {
    let stringArray = [];
    inputString.split(",").forEach((element) => {
      element = element.trim();
      stringArray.push(element);
    });
    return stringArray;
  },
  showTypeOf: function (variable) {
    return typeof variable;
  },
  getFullPrice: function () {
    appData.fullPrice =
      appData.screenPrice + appData.servicePrice1 + appData.servicePrice2;
  },
  getRollbackMessage: function (fullPrice) {
    if (fullPrice >= 30000) {
      return "Даем скидку в 10%";
    } else if (fullPrice >= 15000 && fullPrice < 30000) {
      return "Даем скидку в 5%";
    } else if (fullPrice >= 0 && fullPrice < 15000) {
      return "Скидка не предусмотрена";
    } else {
      return "Что то пошло не так";
    }
  },
  start: function () {
    appData.asking();
    appData.logger();
  },
  logger: function () {
    console.log(appData.showTypeOf(appData.title));
    console.log(appData.showTypeOf(appData.screenPrice));
    console.log(appData.showTypeOf(appData.adaptive));
    console.log(appData.screens);
    console.log(appData.screensArray(appData.screens));
    console.log(appData.getRollbackMessage(appData.fullPrice));
    console.log(
      appData.getServicePercentPrices(appData.fullPrice, appData.rollback)
    );
    for (var prop in appData) {
      console.log(prop + " = " + appData[prop]);
    }
  },
};

//=============================================================================================
//=============================================================================================
appData.start();
//=============================================================================================
