console.log("This is Project 1");
const form = document.getElementById("form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const textArea = document.getElementById("message");
const checkMark = document.getElementById("agreeToContact");
const selectedQueryType = document.querySelectorAll('input[name="queryType"]');
const testing = document.getElementById("testing");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (checkInputs()) {
    document.querySelector(".displayMessage").style.display = "flex";
  }
});

function checkInputs() {
  let formIsValid = true;

  formIsValid = validateField(
    firstName,
    "This Field is required",
    (value) => value !== ""
  );
  formIsValid = validateField(
    lastName,
    "This Field is required",
    (value) => value !== ""
  );
  formIsValid = validateField(
    email,
    "Please enter a valid email address",
    isEmail
  );
  formIsValid = validateField(
    textArea,
    "This Field is required",
    (value) => value !== ""
  );

  const selectedQuery = Array.from(selectedQueryType).find(
    (radio) => radio.checked
  );
  if (!selectedQuery) {
    setErrorFor(testing, "Please select a query type");
    formIsValid = false;
  } else {
    setSuccessFor(testing);
  }

  if (!checkMark.checked) {
    setErrorFor(
      checkMark,
      "To Submit this form, please consent to being contacted"
    );
    formIsValid = false;
  } else {
    setSuccessFor(checkMark);
  }

  return formIsValid;
}

function validateField(field, errorMessage, validationFn) {
  const value = field.value.trim();
  if (validationFn(value)) {
    setSuccessFor(field);
    return true;
  } else {
    setErrorFor(field, errorMessage);
    return false;
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.innerText = message;
  formControl.className = "form-group error";
  input.setAttribute("aria-invalid", "true");
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-group success";
  input.removeAttribute("aria-invalid");
}

function isEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
