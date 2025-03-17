console.log("this is pj 5");

const priceOptions = [8, 12, 16, 24, 36];
const slider = document.getElementById("slider");
const rangeValue = document.getElementById("value");
const pageViews = document.querySelector(".page_views");

pageViews.textContent = "100k PAGEVIEWS";

function updateSlider() {
  const value = parseInt(slider.value);
  console.log(value);

  rangeValue.textContent = `$${priceOptions[value]}.00`;

  // Slider effect
  const percentage = ((value - slider.min) / (slider.max - slider.min)) * 100;
  slider.style.background = `linear-gradient(90deg, hsl(174, 77%, 80%) ${percentage}%, hsl(224, 65%, 95%) ${percentage}%)`;

  // Add animation effect
  rangeValue.style.transform = "scale(1.5)";
  rangeValue.style.opacity = "0.7";

  setTimeout(() => {
    rangeValue.style.transform = "scale(1)";
    rangeValue.style.opacity = "1";
  }, 150);

  // Pageviews

  
}

function pageNumbers(value) {
  const pageviews = ["10K", "50K", "100K", "500K", "1M"];

  return pageviews[value] ? `${pageviews[value]} pageviews` : "Invalid value";
}

console.log(pageNumbers(4));

slider.addEventListener("input", updateSlider);
updateSlider();
