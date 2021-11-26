const title = "JS Education";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 10560;
let rollback = 15;
let fullPrice = 99574.35;
const adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log(
  "Стоимость верстки экранов " + screenPrice + " рублей/ долларов/гривен/юани"
);
console.log(
  "Стоимость разработки сайта " + fullPrice + " рублей/ долларов/гривен/юани"
);
console.log(screens.toLowerCase().split(","));
console.log(fullPrice * (rollback / 100));
