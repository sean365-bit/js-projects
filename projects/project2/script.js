console.log("This is Project 2");

const form = document.getElementById("form");
const resetButton = document.getElementById("reset-button");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateForm();

  function validateForm() {
    const mortgageAmount = document.getElementById("mortgage-amount").value;
    const mortgageTerm = document.getElementById("mortgage-term").value;
    const mortgageRate = document.getElementById("mortgage-rate").value;

    //
    const mortgageAmountErr = document.getElementById("mortgage-amount-error");
    const mortgageTermErr = document.getElementById("mortgage-term-error");
    const mortgageRateErr = document.getElementById("mortgage-rate-error");

    //
    mortgageAmountErr.textContent = "";
    mortgageTermErr.textContent = "";
    mortgageRateErr.textContent = "";

    let isValid = true;

    if (mortgageAmount === "") {
      mortgageAmountErr.textContent = "This field is required";
      isValid = false;
    }

    if (mortgageTerm === "") {
      mortgageTermErr.textContent = "This field is required";
      isValid = false;
    }

    if (mortgageRate === "") {
      mortgageRateErr.textContent = "This field is required";
      isValid = false;
    }

    if (isValid) {
      alert("Form submitted successfully!");
      return true;
    } else {
      return false;
    }
  }
});

resetButton.addEventListener("click", () => {
  document.getElementById("mortgage-amount-error").textContent = "";
  document.getElementById("mortgage-term-error").textContent = "";
  document.getElementById("mortgage-rate-error").textContent = "";

  document.getElementById("mortgage-amount").value = "";
  document.getElementById("mortgage-term").value = "";
  document.getElementById("mortgage-rate").value = "";
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

/*
// Example usage
const principal = 300000; // Mortgage amount in dollars
const annualInterestRate = 5.25; // Annual interest rate in percentage
const years = 25; // Mortgage term in years

const monthlyRepayment = calculateMonthlyRepayment(
  principal,
  annualInterestRate,
  years
);
*/

/*
// 2 
form.addEventListener("submit", (e) => {
  e.preventDefault();
  /*
  //   console.log(`${monthlyRepayment}`);
  console.log(`Your montly repayment:  ${monthlyRepayment[0]}`);
  console.log(`Total repay over the term:  ${monthlyRepayment[1]}`);
  console.log(`${monthlyRepayment[2]}`); */
/*
  const mortgageAmountValue = mortgageAmount.value.trim();

  console.log(mortgageAmountValue);
});
*/

// £
