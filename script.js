"use strict";

//=============================================================================================

let title, screens, adaptive, service1, servicePrice1, service2, servicePrice2;
let screenPrice = 0;
let servicePercentPrice = 0;
let rollback = 15;
let fullPrice = 0;
let allServicePrices = 0;

//=============================================================================================

//-------------------------------
const asking = function () {
  title = getTitle(
    prompt("Как называется ваш проект?", " КаЛьКулятор Верстки  ")
  );
  screens = prompt(
    "Какие типы экранов нужно разработать?",
    "Простые, Сложные, Адаптивные"
  );
  adaptive = confirm("Нужен ли адаптив на сайте?");
  screenPrice = getScreenPrice();
  getAllServicePrices();
};
//-------------------------------
const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};
//-------------------------------
let getScreenPrice = function () {
  let value;
  do {
    value = prompt("Сколько будет стоить данная работа?", "15000");
  } while (!isNumber(value));
  return parseFloat(value);
};
//-------------------------------
let getAllServicePrices = function () {
  for (let i = 0; i < 2; i++) {
    if (i == 0) {
      service1 = prompt(
        "Какой дополнительный тип услуги нужен?",
        "Обратная связь"
      );
      do {
        servicePrice1 = prompt("Сколько это будет стоить?");
      } while (!isNumber(servicePrice1));
      servicePrice1 = parseFloat(servicePrice1);
    } else if (i == 1) {
      service2 = prompt(
        "Какой дополнительный тип услуги нужен?",
        "Подключение телеграм бота"
      );
      do {
        servicePrice2 = prompt("Сколько это будет стоить?");
      } while (!isNumber(servicePrice2));
      servicePrice2 = parseFloat(servicePrice2);
    }
  }
  return servicePrice1 + servicePrice2;
};
//-------------------------------
let getTitle = function (inpString) {
  let firstSmb;
  inpString = inpString.trim();
  inpString = inpString.toLowerCase();
  firstSmb = inpString[0].toUpperCase();
  inpString = firstSmb + inpString.slice(1);
  return inpString;
};
//-------------------------------
let getServicePercentPrices = function (fullPrice, rollback) {
  return Math.ceil(fullPrice - fullPrice * (rollback / 100));
};
//-------------------------------
let screensArray = function (inputString) {
  let stringArray = [];
  inputString.split(",").forEach((element) => {
    element = element.trim();
    stringArray.push(element);
  });
  return stringArray;
};
//-------------------------------
function showTypeOf(variable) {
  return typeof variable;
}
//-------------------------------
function getRollbackMessage(fullPrice) {
  if (fullPrice >= 30000) {
    return "Даем скидку в 10%";
  } else if (fullPrice >= 15000 && fullPrice < 30000) {
    return "Даем скидку в 5%";
  } else if (fullPrice >= 0 && fullPrice < 15000) {
    return "Скидка не предусмотрена";
  } else {
    return "Что то пошло не так";
  }
}

//=============================================================================================

asking();
fullPrice = screenPrice + servicePrice1 + servicePrice2;

//=============================================================================================

console.log(showTypeOf(title));
console.log(showTypeOf(screenPrice));
console.log(showTypeOf(adaptive));
console.log(screens);
console.log(screensArray(screens));
console.log(getRollbackMessage(fullPrice));
console.log(getServicePercentPrices(fullPrice, rollback));
