console.log("This is Project 1");

const buttonSubmit = document.querySelector(".submitButton");
const displayMessageDiv = document.querySelector(".displayMessage");

// Function to check if the form is filled out
function isFormValid() {
  const inputs = document.querySelectorAll("input[required]");
  for (let input of inputs) {
    if (!input.value.trim()) {
      return false;
    }
  }
  return true;
}

// Function to display success message
function displayMessage() {
  if (isFormValid()) {
    displayMessageDiv.style.display = "flex";
  }
}

// Add event listener to the button
buttonSubmit.addEventListener("click", displayMessage);
