// console.log("This is Project 2");
const form = document.getElementById("form");
const RESET_BUTTON = document.getElementById("reset-button");
const overlay = document.querySelector(".overlay");
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

    const monthlyRepayment = getRepaymentDetails({
      principal: mortgageAmount,
      annualInterestRate: mortgageRate,
      years: mortgageTerm,
    });

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
      overlay.classList.add("active");

      if (mortgageType.value === "repayment") {
        repaymentResults.textContent = `£ ${monthlyRepayment.monthlyRepayment}`;
        totalResults.textContent = `£ ${monthlyRepayment.totalRepayment}`;
      }

      if (mortgageType.value === "interest") {
        repaymentResults.textContent = ``;
        totalResults.textContent = `£ ${monthlyRepayment.interestOnly}`;
      }
      return true;
    } else {
      return false;
    }
  }
});

function getRepaymentDetails({ principal, annualInterestRate, years }) {
  const monthlyRepayment = calculateMonthlyRepayment({
    principal,
    annualInterestRate,
    years,
  });

  const totalRepayment = calculateTotalRepayment(monthlyRepayment, years);
  const interestOnly = calculateInterestOnly(principal, annualInterestRate);

  return {
    monthlyRepayment: formatCurrency(monthlyRepayment),
    totalRepayment: formatCurrency(totalRepayment),
    interestOnly: formatCurrency(interestOnly),
  };
}

function calculateMonthlyRepayment({ principal, annualInterestRate, years }) {
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const totalPayments = years * 12;

  return (
    (principal * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -totalPayments))
  );
}

function calculateTotalRepayment(monthlyRepayment, years) {
  return monthlyRepayment * years * 12;
}

function calculateInterestOnly(principal, annualInterestRate) {
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  return (monthlyInterestRate * principal).toFixed(2);
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

RESET_BUTTON.addEventListener("click", () => {
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
