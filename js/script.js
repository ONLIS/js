"use strict";

//=============================================================================================
const pageTitle = document.getElementsByTagName("h1")[0];
const btnCalc = document.getElementsByClassName("handler_btn")[0];
const btnReset = document.getElementsByClassName("handler_btn")[1];
const btnPlus = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");
const inputRange = document.querySelector(".rollback input[type=range]");
const spanRangeVal = document.querySelector(".rollback .range-value");
const totalInput = document.getElementsByClassName("total-input")[0];
const totalCountInput = document.getElementsByClassName("total-input")[1];
const totalCountOtherInput = document.getElementsByClassName("total-input")[2];
const totalFullCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];
let screens = [];

let appData = {
  title: "",
  screens: [],
  screensPrice: 0,
  servicePercentPrice: 0,
  rollback: 15,
  fullPrice: 0,
  allServicesPrice: 0,
  adaptive: true,
  services: {},

  start: function () {
    appData.asking();
    appData.getFullPrice();
    appData.getServicePercentPrice();
    appData.logger();
  },

  asking: function () {
    appData.getTitle();
    for (let i = 0; i < 3; i++) {
      let name = "";
      let price = 0;
      do {
        name = prompt("Какие типы экранов нужно разработать?", "Простые");
      } while (appData.isNumber(name));
      do {
        price = prompt("Сколько стоит разработка данного типа экрана?", 5000);
      } while (!appData.isNumber(price));
      price = parseFloat(price);
      appData.screens.push({ id: i, name, price });
    }
    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    for (let i = 0; i < 2; i++) {
      let name = "";
      do {
        name = prompt(
          "Какой дополнительный тип услуги нужен?",
          "Обратная связь"
        );
      } while (appData.isNumber(name));

      if (appData.services[name] !== undefined) {
        name += " " + i;
      }
      let price = 0;
      do {
        price = prompt("Сколько это будет стоить?");
      } while (!appData.isNumber(price));
      price = parseFloat(price);
      appData.services[name] = price;
    }
  },

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  getTitle: function () {
    let inpString = "";
    do {
      inpString = prompt(
        "Как называется ваш проект?",
        " КаЛьКулятор Верстки  "
      );
    } while (appData.isNumber(inpString));
    let firstSmb;
    inpString = inpString.trim();
    inpString = inpString.toLowerCase();
    firstSmb = inpString[0].toUpperCase();
    inpString = firstSmb + inpString.slice(1);
    appData.title = inpString;
  },

  getFullPrice: function () {
    let screensSum = 0;
    for (let key in appData.services) {
      appData.allServicesPrice += appData.services[key];
    }
    appData.screensPrice = appData.screens.reduce(function (
      screensSum,
      currentValue
    ) {
      return screensSum + currentValue.price;
    },
    0);
    appData.fullPrice = appData.screensPrice + appData.allServicesPrice;
  },

  getServicePercentPrice: function () {
    appData.servicePercentPrice = Math.ceil(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
    );
  },

  getRollbackMessage: function () {
    if (appData.fullPrice >= 30000) {
      return "Даем скидку в 10%";
    } else if (appData.fullPrice >= 15000 && appData.fullPrice < 30000) {
      return "Даем скидку в 5%";
    } else if (appData.fullPrice >= 0 && appData.fullPrice < 15000) {
      return "Скидка не предусмотрена";
    } else {
      return "Что то пошло не так";
    }
  },

  showTypeOf: function (variable) {
    return typeof variable;
  },

  logger: function () {
    console.log(appData.showTypeOf(appData.title));
    console.log(appData.showTypeOf(appData.screenPrice));
    console.log(appData.showTypeOf(appData.adaptive));
    console.log(appData.screens);
    console.log(appData.services);
    console.log(appData.fullPrice);
    console.log(appData.getRollbackMessage());
    console.log(appData.servicePercentPrice);
    for (var prop in appData) {
      console.log(prop + " = " + appData[prop]);
    }
  },
};

//=============================================================================================
//=============================================================================================
document.querySelectorAll(".screen").forEach(function (item) {
  screens.push(item);
});

appData.start();
//=============================================================================================
