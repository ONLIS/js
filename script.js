"use strict";

let title = prompt("Как называется ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать?");
let screenPrice = +prompt("Сколько будет стоить данная работа?");
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");

let servicePercentPrice = 0;
let rollback = 15;
let fullPrice = 0;
let allServicePrices = 0;

let getAllServicePrices = function (price1, price2) {
  return price1 + price2;
};
let getTitle = function (title) {
  let firstSmb;
  title = title.trim();
  title = title.toLowerCase();
  firstSmb = title[0].toUpperCase();
  title = firstSmb + title.slice(1);
  return title;
};
let getServicePercentPrices = function (fullPrice, rollback) {
  return Math.ceil(fullPrice - fullPrice * (rollback / 100));
};
let screensArray = function (inputString) {
  let stringArray = [];
  inputString.split(",").forEach((element) => {
    element = element.trim();
    stringArray.push(element);
  });
  return stringArray;
};
function getFullPrice(basePrice, servicePrice) {
  return basePrice + servicePrice;
}
function showTypeOf(variable) {
  return typeof variable;
}
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

fullPrice = screenPrice + servicePrice1 + servicePrice2;

console.log(showTypeOf(title));
console.log(showTypeOf(screenPrice));
console.log(showTypeOf(adaptive));
console.log(screens);
console.log(screensArray(screens));
console.log(getRollbackMessage(fullPrice));
console.log(getServicePercentPrices(fullPrice, rollback));
