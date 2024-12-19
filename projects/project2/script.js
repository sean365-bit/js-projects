console.log("This is Project 2");

const form = document.getElementById("form");
const mortgageAmount = document.getElementById("mortgage-amount");
const mortgageTerm = document.getElementById("mortgage-term");
const mortgageRate = document.getElementById("mortgage-rate");

// Example usage
const principal = 300000; // Mortgage amount in dollars
const annualInterestRate = 5.25; // Annual interest rate in percentage
const years = 25; // Mortgage term in years

const monthlyRepayment = calculateMonthlyRepayment(
  principal,
  annualInterestRate,
  years
);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log(`${monthlyRepayment}`);
});

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

// £
