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
    this.addTitle();
    inputRange.value = this.rollback;
    spanRangeVal.textContent = inputRange.value + "%";
    inputRange.addEventListener("input", this.getRollback);
    btnCalc.addEventListener("click", this.start);
    btnReset.addEventListener("click", this.reset);
    btnPlus.addEventListener("click", this.addScreenBlock);
    otherItemsPercent.forEach((item) => {
      let input = item.querySelector("input[type=text]");
      input.disabled = false;
    });
    otherItemsNumber.forEach((item) => {
      let input = item.querySelector("input[type=text]");
      input.disabled = false;
    });
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
      appData.blockItems();
    } else {
      alert("Пожалуйста, заполните все поля");
    }
  },
  addScreens: function () {
    this.screens = [];
    screens.forEach((screen, index) => {
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
    this.fullPrice = 0;
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
    screens = document.querySelectorAll(".screen");
  },

  addServices: function () {
    this.servicesNumber = {};
    this.servicesPercent = {};

    otherItemsPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });
    otherItemsNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addPrices: function () {
    this.screensPrice = 0;
    this.servicePricesNumber = 0;
    this.servicePricesPercent = 0;

    for (let screen of this.screens) {
      this.screensPrice += +screen.price;
    }

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += +this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent +=
        +this.screensPrice * (this.servicesPercent[key] / 100);
    }

    this.fullPrice =
      this.screensPrice + this.servicePricesNumber + this.servicePricesPercent;

    this.servicePercentPrice = Math.ceil(
      this.fullPrice - this.fullPrice * (this.rollback / 100)
    );
  },
  getRollback: function () {
    this.rollback = inputRange.value;
    spanRangeVal.textContent = inputRange.value + "%";
    if (this.fullPrice > 0) {
      this.servicePercentPrice = Math.ceil(
        this.fullPrice - this.fullPrice * (this.rollback / 100)
      );
      totalCountRollback.value = this.servicePercentPrice;
    }
  },
  showResult: function () {
    let totalScreens = 0;
    totalInput.value = this.screensPrice;
    totalCountOtherInput.value =
      this.servicePricesNumber + this.servicePricesPercent;
    totalFullCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
    for (let screen of this.screens) {
      totalScreens += +screen.count;
    }
    totalCountInput.value = totalScreens;
  },
  blockItems: function () {
    screens.forEach((item) => {
      item.querySelector("select").disabled = true;
      item.querySelector("input").disabled = true;
    });
    otherItemsPercent.forEach((item) => {
      let input = item.querySelector("input[type=text]");
      input.disabled = true;
    });
    otherItemsNumber.forEach((item) => {
      let input = item.querySelector("input[type=text]");
      input.disabled = true;
    });
    btnCalc.style.display = "none";
    btnReset.style.display = "block";
  },
  reset: function () {
    otherItemsPercent.forEach((item) => {
      let input = item.querySelector("input[type=text]");
      input.disabled = false;
    });
    otherItemsNumber.forEach((item) => {
      let input = item.querySelector("input[type=text]");
      input.disabled = false;
    });
    btnReset.style.display = "none";
    btnCalc.style.display = "block";
    screens.forEach((item, index) => {
      if (index == 0) {
        let select = item.querySelector("select");
        let input = item.querySelector("input");
        select[0].selected = true;
        input.value = "";
      } else if (index >= 1) {
        item.remove();
      }
    });
    screens = document.querySelectorAll(".screen");
    screens.forEach((item) => {
      item.querySelector("select").disabled = false;
      item.querySelector("input").disabled = false;
    });
    document.querySelectorAll(".custom-checkbox").forEach((item) => {
      item.checked = false;
    });
    totalInput.value = 0;
    totalCountOtherInput.value = 0;
    totalFullCount.value = 0;
    totalCountRollback.value = 0;
    totalCountInput.value = 0;
    this.allData = true;
    this.screensPrice = 0;
    this.servicePercentPrice = 0;
    this.rollback = 15;
    inputRange.value = this.rollback;
    spanRangeVal.textContent = inputRange.value + "%";
    this.fullPrice = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.adaptive = true;
    this.servicesNumber = {};
    this.servicesPercent = {};
  },
};

//=============================================================================================
//=============================================================================================
appData.init();
//=============================================================================================
