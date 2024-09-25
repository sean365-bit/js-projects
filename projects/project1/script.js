console.log("This is Project 1");

const form = document.getElementById("form");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const textArea = document.getElementById("message");
const checkMark = document.getElementById("agreeToContact");

const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

function checkInputs() {
  // get the values from the inputs
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const emailValue = email.value.trim();
  const textAreaValue = textArea.value.trim();
  const checkMarkValue = checkMark.checked;

  let myArr = [];

  if (firstNameValue === "") {
    setErrorFor(firstName, "This Field is required");
  } else {
    setSuccessFor(firstName);
    myArr.push(1);
  }

  if (lastNameValue === "") {
    setErrorFor(lastName, "This Field is required");
  } else {
    setSuccessFor(lastName);
    myArr.push(1);
  }

  if (emailValue === "") {
    setErrorFor(email, "This Field is required");
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "Please enter a valid email address");
  } else {
    setSuccessFor(email);
    myArr.push(1);
  }

  if (textAreaValue === "") {
    setErrorFor(textArea, "This Field is required");
  } else {
    setSuccessFor(textArea);
    myArr.push(1);
  }

  if (!checkMarkValue) {
    setErrorFor(
      checkMark,
      "To Submit this form, please consent to being contacted"
    );
  } else {
    setSuccessFor(checkMark);
    myArr.push(1);
  }

  /*
  if (!queryTypeValue) {
    setErrorFor(queryType, "Please select a query type");
  } else {
    setSuccessFor(queryType);
    myArr.push(1);
  }
*/

  if (myArr.length >= 5) {
    console.log("form submited");
    document.querySelector(".displayMessage").style.display = "flex";
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  // add error message inside small
  small.innerText = message;

  // add error class
  formControl.className = "form-group error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-group success";
}

function isEmail(email) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
