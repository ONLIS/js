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
let screens = document.querySelectorAll(".screen");
let appData = {
  title: "",
  screens: [],
  allData: true,
  screensPrice: 0,
  servicePercentPrice: 0,
  rollback: 15,
  fullPrice: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  adaptive: true,
  servicesNumber: {},
  servicesPercent: {},

  init: function () {
    appData.addTitle();
    inputRange.addEventListener("input", appData.getRollback);
    btnCalc.addEventListener("click", appData.start);
    btnPlus.addEventListener("click", appData.addScreenBlock);
  },

  addTitle: function () {
    document.title = pageTitle.textContent;
  },
  start: function () {
    appData.allData = true;
    appData.addScreens();
    if (appData.allData) {
      appData.addServices();
      appData.addPrices();
      appData.showResult();
    } else {
      alert("Пожалуйста, заполните все поля");
    }
  },
  addScreens: function () {
    appData.screens = [];
    screens.forEach(function (screen, index) {
      const select = screen.querySelector("select");
      if (select.selectedIndex === 0) {
        appData.allData = false;
      }
      const input = screen.querySelector("input");
      if (input.value.trim().length === 0) {
        appData.allData = false;
      }
      const selectName = select.options[select.selectedIndex].textContent;
      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });
  },

  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
    screens = document.querySelectorAll(".screen");
  },

  addServices: function () {
    appData.servicesNumber = {};
    appData.servicesPercent = {};

    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });
    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addPrices: function () {
    appData.screensPrice = 0;
    appData.servicePricesNumber = 0;
    appData.servicePricesPercent = 0;

    for (let screen of appData.screens) {
      appData.screensPrice += +screen.price;
    }

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += +appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent +=
        +appData.screensPrice * (appData.servicesPercent[key] / 100);
    }

    appData.fullPrice =
      appData.screensPrice +
      appData.servicePricesNumber +
      appData.servicePricesPercent;

    appData.servicePercentPrice = Math.ceil(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
    );
  },
  getRollback: function () {
    appData.rollback = inputRange.value;
    spanRangeVal.textContent = inputRange.value + "%";
  },
  showResult: function () {
    let totalScreens = 0;
    totalInput.value = appData.screensPrice;
    totalCountOtherInput.value =
      appData.servicePricesNumber + appData.servicePricesPercent;
    totalFullCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePercentPrice;
    for (let screen of appData.screens) {
      totalScreens += +screen.count;
    }
    totalCountInput.value = totalScreens;
  },
};

//=============================================================================================
//=============================================================================================
appData.init();
//=============================================================================================
