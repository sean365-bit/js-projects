"use strict";
const form = document.getElementById("form");
const errorColor = "hsl(0, 100%, 66%)";
const currentColor = "hsl(252, 6%, 83%)";

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

const uploadImageOptions = document.querySelector(".drag__and__drop__options");
const dragAndDropParagraph = document.querySelector(".upload_paragraph");
const removeButton = document.querySelector(".remove");
const changeImageButton = document.querySelector(".change");

const uploadError = document.getElementById("upload__error");
uploadError.textContent = "Upload your photo(JPG or PNG, max size: 500KB).";
const maxSize = 500 * 1024;

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
removeButton.addEventListener("click", removeImage);

function uploadImage() {
  const file = inputFile.files[0];
  if (!file) return;

  uploadError.textContent = "Upload your photo(JPG or PNG, max size: 500KB).";
  uploadError.style.color = currentColor;

  if (file.size > maxSize) {
    uploadError.style.color = errorColor;
    uploadError.textContent =
      "File too large. Please upload a photo under 500KB";
    return;
  }

  let imgLink = URL.createObjectURL(file);
  imgView.style.backgroundImage = `url(${imgLink})`;
  imgViewPerfil.style.backgroundImage = `url(${imgLink})`;
  imgLogo.style.visibility = "hidden";
}

function removeImage(e) {
  e.preventDefault();
  imgView.style.backgroundImage = "none";
  imgViewPerfil.style.backgroundImage = "none";

  if (imgLogo) imgLogo.style.visibility = "visible";
  inputFile.value = "";
}

changeImageButton.addEventListener("click", (e) => {
  e.preventDefault();
  inputFile.click();
});

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
    uploadError.style.color = errorColor;
    isValid = false;
  } else if (inputFile.files[0].size > maxSize) {
    setErrorMessage(
      uploadError,
      "File too large. Please upload a photo under 500KB"
    );
    uploadError.style.color = errorColor;
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
