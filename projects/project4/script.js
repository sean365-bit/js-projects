"use strict";
const form = document.getElementById("form");
const errorColor = "hsl(0, 100%, 66%)";
const normalColor = "hsl(252, 6%, 83%)";

const dropArea = document.getElementById("drop__area");
const inputFile = document.getElementById("input__file");
const imgView = document.getElementById("img__container");
const imgViewPerfil = document.getElementById("img__container__perfil");
const imgLogo = document.getElementById("img__logo");
const overlayEffect = document.querySelector(".result");
const uploadError = document.getElementById("upload__error");
uploadError.textContent = "Upload your photo(JPG or PNG, max size: 500KB).";

const options = { year: "numeric", month: "long", day: "numeric" };
const formattedDate = new Date().toLocaleDateString("en-US", options);

const dateAndTime = document.getElementById("date__time");
dateAndTime.textContent = `${formattedDate} / Austin TX`;

inputFile.addEventListener("change", uploadImage);

function uploadImage() {
  const file = inputFile.files[0];

  if (!file) return;

  const allowedTypes = ["image/jpeg", "image/png"];
  const maxSize = 500 * 1024;

  if (!allowedTypes.includes(file.type)) {
    uploadError.style.color = errorColor;
    uploadError.textContent = "Only JPG or PNG files are allowed.";
    return;
  }

  if (file.size > maxSize) {
    uploadError.style.color = errorColor;
    uploadError.textContent =
      "File too large. Please upload a photo under 500KB.";
    return;
  }

  uploadError.textContent = "Upload your photo(JPG or PNG, max size: 500KB).";
  uploadError.style.color = normalColor;

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
  inputFile.files = e.dataTransfer.files;
  uploadImage();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateForm();
});

function validateForm() {
  const fullName = document.getElementById("full__name").value.trim();
  const email = document.getElementById("email").value.trim();
  const githubUserName = document
    .getElementById("github__username")
    .value.trim();

  const nameError = document.getElementById("name__error");
  const emailError = document.getElementById("email__error");
  const githubError = document.getElementById("github__error");
  const nameOfPerson = document.getElementById("perfil__info__p");
  const githubUser = document.getElementById("perfil__info__github");
  const userEmail = document.getElementById("email__result");
  const nameResultTittle = document.getElementById("name__result");

  nameError.textContent = "";
  emailError.textContent = "";
  githubError.textContent = "";
  nameOfPerson.textContent = "";
  githubUser.textContent = "";
  userEmail.textContent = "";
  nameResultTittle.textContent = "";

  let isValid = true;

  if (fullName === "") {
    nameError.textContent = "This field is required";
    isValid = false;
  }

  if (!inputFile.files.length) {
    uploadError.style.color = errorColor;
    uploadError.textContent = "This field is required";
    isValid = false;
  }

  if (email === "") {
    emailError.textContent = "Please enter a valid email address";
    isValid = false;
  }

  if (githubUserName === "") {
    githubError.textContent = "This field is required";
    isValid = false;
  }

  if (isValid) {
    overlayEffect.style.display = "flex";
    form.style.visibility = "hidden";

    nameOfPerson.textContent = fullName;
    nameResultTittle.textContent = fullName;
    userEmail.textContent = email;
    githubUser.textContent = githubUserName;
  }
}
