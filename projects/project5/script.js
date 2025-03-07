console.log("this is pj 5");

const slider = document.getElementById("slider");
const valueDisplay = document.getElementById("value");

slider.addEventListener("input", () => {
  valueDisplay.textContent = slider.value;

  // Add animation effect
  valueDisplay.style.transform = "scale(1.5)";
  valueDisplay.style.opacity = "0.7";

  setTimeout(() => {
    valueDisplay.style.transform = "scale(1)";
    valueDisplay.style.opacity = "1";
  }, 150);
});
