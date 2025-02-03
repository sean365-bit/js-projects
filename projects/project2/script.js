// console.log("This is Project 2");

const form = document.getElementById("form");
const resetButton = document.getElementById("reset-button");
const overlay = document.querySelector(".overlay");
const startButton = document.getElementById("startOverlay");
const stopButton = document.getElementById("stopOverlay");
const repaymentResults = document.getElementById("repaymentResults");
const totalResults = document.getElementById("totalResults");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateForm();

  function validateForm() {
    const mortgageAmount = document
      .getElementById("mortgage-amount")
      .value.trim();
    const mortgageTerm = document.getElementById("mortgage-term").value.trim();
    const mortgageRate = document.getElementById("mortgage-rate").value.trim();
    const mortgageType = document.querySelector(
      'input[name="mortgage-type"]:checked'
    );

    const monthlyRepayment = calculateMonthlyRepayment(
      mortgageAmount,
      mortgageRate,
      mortgageTerm
    );

    const mortgageAmountErr = document.getElementById("mortgage-amount-error");
    const mortgageTermErr = document.getElementById("mortgage-term-error");
    const mortgageRateErr = document.getElementById("mortgage-rate-error");
    const mortgageTypeErr = document.getElementById("mortgage-type-error");

    mortgageAmountErr.textContent = "";
    mortgageTermErr.textContent = "";
    mortgageRateErr.textContent = "";
    mortgageTypeErr.textContent = "";

    let isValid = true;

    if (mortgageAmount === "") {
      mortgageAmountErr.textContent = "This field is required";
      isValid = false;
    } else if (isNaN(mortgageAmount) || Number(mortgageAmount) <= 0) {
      mortgageAmountErr.textContent = "Please enter a valid positive number";
      isValid = false;
    }

    if (mortgageTerm === "") {
      mortgageTermErr.textContent = "This field is required";
      isValid = false;
    } else if (isNaN(mortgageTerm) || Number(mortgageTerm) <= 0) {
      mortgageTermErr.textContent = "Please enter a valid positive number";
      isValid = false;
    }

    if (mortgageRate === "") {
      mortgageRateErr.textContent = "This field is required";
      isValid = false;
    } else if (isNaN(mortgageRate) || Number(mortgageRate) <= 0) {
      mortgageRateErr.textContent = "Please enter a valid positive number";
      isValid = false;
    }

    if (!mortgageType) {
      mortgageTypeErr.textContent = "This field is required";
      isValid = false;
    }

    if (isValid) {
      // Add the 'active' class to start the overlay effect
      overlay.classList.add("active");

      if (mortgageType.value === "repayment") {
        repaymentResults.textContent = `£ ${monthlyRepayment[0]}`;
        totalResults.textContent = `£ ${monthlyRepayment[1]}`;
      }

      if (mortgageType.value === "interest") {
        repaymentResults.textContent = ``;
        totalResults.textContent = `£ ${monthlyRepayment[2]}`;
      }

      console.log(monthlyRepayment);
      //console.log(`Your montly repayment:  ${monthlyRepayment[0]}`);
      // console.log(`Total repay over the term:  ${monthlyRepayment[1]}`);
      console.log(`${monthlyRepayment[2]}`);

      return true;
    } else {
      return false;
    }
  }
});

resetButton.addEventListener("click", () => {
  overlay.classList.remove("active");
  document.getElementById("mortgage-amount-error").textContent = "";
  document.getElementById("mortgage-term-error").textContent = "";
  document.getElementById("mortgage-rate-error").textContent = "";
  document.getElementById("mortgage-type-error").textContent = "";

  document.getElementById("mortgage-amount").value = "";
  document.getElementById("mortgage-term").value = "";
  document.getElementById("mortgage-rate").value = "";

  const radioButtons = document.getElementsByName("mortgage-type");
  for (let radio of radioButtons) {
    radio.checked = false;
  }
});

// Mortgage Logic
function calculateMonthlyRepayment(principal, annualInterestRate, years) {
  let monthlyRepaymentResult, totalRepayment, interestOnly;
  // Convert annual interest rate to monthly and percentage to decimal
  const monthlyInterestRate = annualInterestRate / 100 / 12;

  // Total number of payments
  const totalPayments = years * 12;

  // Mortgage formula
  const monthlyRepayment =
    (principal * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));

  // results
  monthlyRepaymentResult = monthlyRepayment;
  const monthlyRepaymentResultFormatted = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(monthlyRepaymentResult);

  totalRepayment = monthlyRepayment * (years * 12);
  const totalRepaymentFormatted = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalRepayment);

  interestOnly = (monthlyInterestRate * principal).toFixed(2);

  return [
    monthlyRepaymentResultFormatted,
    totalRepaymentFormatted,
    interestOnly,
  ];
}
