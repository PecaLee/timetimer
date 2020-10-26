const form = document.querySelector("#form"),
  slider = form.querySelector("#slider"),
  sliderValue = form.querySelector("#sliderValue");

function getValue() {
  const v = slider.value;
  return v;
}

function paintValue() {
  const v = getValue();
  sliderValue.innerHTML = v;
}

function init() {
  paintValue();
  slider.addEventListener("mousedown", setInterval(paintValue));
}

init();
