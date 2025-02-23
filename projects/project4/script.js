"use strict";
const form = document.getElementById("form");

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

  nameError.textContent = "";
  emailError.textContent = "";
  guthubError.textContent = "";

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
    console.log(fullName, email, githubUserName);
  }
}
