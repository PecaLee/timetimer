"use strict";

const form = document.querySelector("#form"),
  slider = form.querySelector("#slider"),
  sliderValue = form.querySelector("#sliderValue");

const remainTime = document.querySelector(".remainTime");

let SWITCH = false;

function getValue() {
  const v = slider.value;
  return v;
}

function paintValue() {
  const v = getValue();
  sliderValue.innerHTML = v;
}

function rePaintValue() {
  SWITCH = false;
  setInterval(paintValue);
}

function setTimer() {
  SWITCH = true;
  const time = getValue();
  let setTime = time * 60;
  const min = parseInt(setTime / 60);
  const sec = setTime % 60;
  remainTime.innerHTML = `${min} : ${sec < 10 ? "0" + sec : sec}`;
}

function timeTimer() {
  const time = getValue();
  let setTime = time * 60;
  let intervalTimer;
  if (SWITCH == true) {
    intervalTimer = setInterval(timer, 1000);
  } else {
    clearInterval(intervalTimer);
  }
  function timer() {
    --setTime;
    const min = parseInt(setTime / 60);
    const sec = setTime % 60;
    remainTime.innerHTML = `${min} : ${sec < 10 ? "0" + sec : sec}`;
  }
}

function init() {
  paintValue();
  slider.addEventListener("mousedown", rePaintValue);
  slider.addEventListener("mouseup", setTimer);
  slider.addEventListener("mouseup", timeTimer);
}

init();
