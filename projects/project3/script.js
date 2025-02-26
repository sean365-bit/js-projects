"use strict";
console.log("This is Project 3");

const form = document.getElementById("form");

const displayName = document.getElementById("display-credit-name");
const displayNumber = document.getElementById("display-credit-number");
const displayDate = document.getElementById("display-credit-date");
const displayCvc = document.getElementById("display-credit-cvc");
const overlay = document.querySelector(".overlay");
const resetButton = document.getElementById("reset-button");

displayName.textContent = "JANE APPLESSED";
displayNumber.textContent = "0000 0000 0000 0000";
displayDate.textContent = "00/00";
displayCvc.textContent = "000";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateForm();
});

function validateForm() {
  const cardHolder = document.getElementById("card-holder").value.trim();
  const cardNumber = document.getElementById("card-number").value.trim();
  const month = document.getElementById("exp-month").value.trim();
  const year = document.getElementById("exp-year").value.trim();
  const cvc = document.getElementById("cvc").value.trim();

  const nameError = document.getElementById("name-error");
  const numberError = document.getElementById("number-error");
  const dateError = document.getElementById("date-error");
  const cvcError = document.getElementById("cvc-error");

  nameError.textContent = "";
  numberError.textContent = "";
  dateError.textContent = "";
  cvcError.textContent = "";

  let formattedNumber = cardNumber.replace(/(\d{4})/g, "$1 ").trim();

  let isValid = true;

  if (cardHolder === "") {
    nameError.textContent = "This field is required";
    isValid = false;
  }

  if (cardNumber === "") {
    numberError.textContent = "This field is required";
    isValid = false;
  } else if (isNaN(cardNumber) || Number(cardNumber) <= 0) {
    numberError.textContent = "Wrong format, numbers only";
    isValid = false;
  }

  if (month === "" || year === "") {
    dateError.textContent = "This field is required";
    isValid = false;
  } else if (isNaN(month) || Number(month) <= 0) {
    dateError.textContent = "Wrong format, numbers only";
    isValid = false;
  }

  if (cvc === "") {
    cvcError.textContent = "This field is required";
    isValid = false;
  } else if (isNaN(cvc) || Number(cvc) <= 0) {
    cvcError.textContent = "Wrong format, numbers only";
    isValid = false;
  }

  if (isValid) {
    overlay.classList.add("active");
    displayName.textContent = cardHolder.toUpperCase();
    displayNumber.textContent = formattedNumber;
    displayDate.textContent = `${month}/${year}`;
    displayCvc.textContent = cvc;
  }
}

resetButton.addEventListener("click", () => {
  overlay.classList.remove("active");

  displayName.textContent = "JANE APPLESSED";
  displayNumber.textContent = "0000 0000 0000 0000";
  displayDate.textContent = "00/00";
  displayCvc.textContent = "000";

  document.getElementById("card-holder").value = "";
  document.getElementById("card-number").value = "";
  document.getElementById("exp-month").value = "";
  document.getElementById("exp-year").value = "";
  document.getElementById("cvc").value = "";
});
