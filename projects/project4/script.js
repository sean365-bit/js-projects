"use strict";
const form = document.getElementById("form");
const errorColor = "hsl(0, 100%, 66%)";

const inputFile = document.getElementById("input__file");
const dropArea = document.getElementById("drop__area");
const imgView = document.getElementById("img__container");
const imgViewPerfil = document.getElementById("img__container__perfil");
const imgLogo = document.getElementById("img__logo");
const overlayEffect = document.querySelector(".result");

const nameError = document.getElementById("name__error");
const emailError = document.getElementById("email__error");
const githubError = document.getElementById("github__error");
const nameOfPerson = document.getElementById("perfil__info__p");
const githubUser = document.getElementById("perfil__info__github");
const userEmail = document.getElementById("email__result");
const nameResultTittle = document.getElementById("name__result");

const uploadError = document.getElementById("upload__error");
uploadError.textContent = "Upload your photo(JPG or PNG, max size: 500KB).";

/* Show day and year */
document.getElementById(
  "date__time"
).textContent = `${new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
})} / Austin TX`;

/* Managing photo */
inputFile.addEventListener("change", uploadImage);

function uploadImage() {
  const file = inputFile.files[0];
  uploadError.textContent = "Upload your photo(JPG or PNG, max size: 500KB).";

  let imgLink = URL.createObjectURL(file);
  imgView.style.backgroundImage = `url(${imgLink})`;
  imgViewPerfil.style.backgroundImage = `url(${imgLink})`;
  imgLogo.style.visibility = "hidden";
}

dropArea.addEventListener("dragover", function (e) {
  e.preventDefault();
});

dropArea.addEventListener("drop", function (e) {
  e.preventDefault();

  if (e.dataTransfer.files.length > 0) {
    inputFile.files = e.dataTransfer.files;
    uploadImage();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateForm();
});

/* Validate input form */
function validateForm() {
  const fullName = document.getElementById("full__name").value.trim();
  const email = document.getElementById("email").value.trim();
  const githubUserName = document
    .getElementById("github__username")
    .value.trim();

  nameError.textContent = "";
  emailError.textContent = "";
  githubError.textContent = "";
  nameOfPerson.textContent = "";
  githubUser.textContent = "";
  userEmail.textContent = "";
  nameResultTittle.textContent = "";

  let isValid = true;

  if (fullName === "") {
    setErrorMessage(nameError, "This field is required");
    isValid = false;
  }

  if (!inputFile.files.length) {
    setErrorMessage(uploadError, "This field is required");
    isValid = false;
  }

  if (email === "" || !isValidEmail(email)) {
    setErrorMessage(emailError, "Please enter a valid email address");
    isValid = false;
  }

  if (githubUserName === "") {
    setErrorMessage(githubError, "This field is required");
    isValid = false;
  }

  if (isValid) {
    nameOfPerson.textContent = fullName;
    nameResultTittle.textContent = fullName;
    userEmail.textContent = email;
    githubUser.textContent = githubUserName;

    overlayEffect.classList.add("show__overlay");
    form.classList.add("hidden");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

/* Helper function for email */
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

/* Helper function for setting errors */
function setErrorMessage(element, message) {
  element.textContent = message;
}
