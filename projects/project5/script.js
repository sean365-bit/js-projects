console.log("this is pj 5");

const originalPrices = [8, 12, 16, 24, 36];
let priceOptions = [...originalPrices];
const pageviews = ["10K", "50K", "100K", "500K", "1M"];
const slider = document.getElementById("slider");
const rangeValue = document.getElementById("value");
const pageViews = document.querySelector(".page_views");
const checkBox = document.getElementById("checkbox");

checkBox.addEventListener("change", function () {
  console.log(checkBox.checked);

  priceOptions = checkBox.checked
    ? originalPrices.map((num) => num * 0.75) // Apply 25% discount
    : [...originalPrices]; // Reset prices

  updateSlider(); // Update the price display when the checkbox changes
});

function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max));
}

function updateSlider() {
  const value = clamp(parseInt(slider.value), 0, priceOptions.length - 1);

  // Update price
  rangeValue.textContent = `$${priceOptions[value].toFixed(2)}`;

  // Update pageviews
  pageViews.textContent = `${pageviews[value]} PAGEVIEWS`;

  // Update slider background
  const percentage = ((value - slider.min) / (slider.max - slider.min)) * 100;
  slider.style.background = `linear-gradient(90deg, hsl(174, 77%, 80%) ${percentage}%, hsl(224, 65%, 95%) ${percentage}%)`;

  // Animate price change
  requestAnimationFrame(() => {
    rangeValue.style.transform = "scale(1.5)";
    rangeValue.style.opacity = "0.7";
    setTimeout(() => {
      rangeValue.style.transform = "scale(1)";
      rangeValue.style.opacity = "1";
    }, 150);
  });
}

// Attach event listener
slider.addEventListener("input", updateSlider);
updateSlider();
