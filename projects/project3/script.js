"use strict";
console.log("This is Project 3");

const form = document.getElementById("form");

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
    console.log(`${cardHolder}`);
    console.log(`${cardNumber}`);
  }
}

/* 
 if (isValid) {
    console.log(`${cardHolder}`);
    console.log(`${cardNumber}`);
  }
    */
