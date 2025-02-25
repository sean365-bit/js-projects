"use strict";
const form = document.getElementById("form");

const dropArea = document.getElementById("drop__area");
const inputFile = document.getElementById("input__file");
const imgView = document.getElementById("img__contiainer");

const imgViewPerfil = document.getElementById("img__contiainer__perfil");
const imgLogo = document.getElementById("img__logo");
const overlayEffect = document.querySelector(".result");
const dissapearEffect = document.querySelector(".content__Code");

inputFile.addEventListener("change", uploadImage);

function uploadImage() {
  let imgLink = URL.createObjectURL(inputFile.files[0]);
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
  const guthubError = document.getElementById("github__error");
  const nameOfPerson = document.getElementById("perfil__info__p");
  const githubUser = document.getElementById("perfil__info__github");
  const userEmail = document.getElementById("email__result");
  const nameResultTittle = document.getElementById("name__result");

  nameError.textContent = "";
  emailError.textContent = "";
  guthubError.textContent = "";
  nameOfPerson.textContent = "";
  githubUser.textContent = "";
  userEmail.textContent = "";
  nameResultTittle.textContent = "";

  let isValid = true;

  if (fullName === "") {
    nameError.textContent = "This field is required";
    isValid = false;
  }

  if (email === "") {
    emailError.textContent = "Please enter a valid email address";
    isValid = false;
  }

  if (githubUserName === "") {
    guthubError.textContent = "This field is required";
    isValid = false;
  }

  if (isValid) {
    overlayEffect.style.display = "flex";
    dissapearEffect.style.visibility = "hidden";
    console.log(fullName, email, githubUserName);

    nameOfPerson.textContent = fullName;
    nameResultTittle.textContent = fullName;
    userEmail.textContent = email;
    githubUser.textContent = githubUserName;
  }
}
