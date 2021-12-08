"use strict";
const adv = document.querySelector(".adv");
const books = document.querySelectorAll(".books");
const bookList = document.querySelectorAll(".book");
const book3Title = bookList[4].querySelector("a");
const book2 = bookList[0].querySelector("ul");
const book2Li = book2.querySelectorAll("li");
const book5 = bookList[5].querySelector("ul");
const book5Li = book5.querySelectorAll("li");
const book6 = bookList[2].querySelector("ul");
const book6Li = book6.querySelectorAll("li");
const book6NewElm = document.createElement("li");

books[0].prepend(bookList[1]);
books[0].append(bookList[3]);
books[0].append(bookList[5]);
books[0].append(bookList[2]);

document.body.style.backgroundImage = "url(./image/adv.jpg)";

book3Title.innerHTML = "Книга 3. this и Прототипы Объектов";

adv.remove();

book2.append(book2Li[2]);
book2.append(book2Li[10]);
book2.prepend(book2Li[8]);
book2.prepend(book2Li[6]);
book2.prepend(book2Li[3]);
book2.prepend(book2Li[1]);
book2.prepend(book2Li[0]);

book5.prepend(book5Li[7]);
book5.prepend(book5Li[6]);
book5.prepend(book5Li[2]);
book5.prepend(book5Li[4]);
book5.prepend(book5Li[3]);
book5.prepend(book5Li[9]);
book5.prepend(book5Li[1]);
book5.prepend(book5Li[0]);

book6NewElm.innerHTML = "Глава 8: За пределами ES6";
book6.append(book6NewElm);
book6.append(book6Li[9]);
