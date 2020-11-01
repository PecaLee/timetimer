"use strict";

const timer = document.querySelector(".timer"),
  form = timer.querySelector("#form"),
  remainTime = document.querySelector(".remainTime");

const slider = form.querySelector("#slider"),
  sliderValue = form.querySelector("#sliderValue");

let SWITCH = false;

let SETTEDTIME, RUNALARM, NOW;

function getValue() {
  const alarmTime = slider.value;
  sliderValue.innerHTML = alarmTime;
  return alarmTime;
}

function initTimer() {
  const alarmTime = getValue();
  const setTime = alarmTime * 60;
  const min = parseInt(setTime / 60),
    sec = setTime % 60;
  remainTime.innerHTML = `${min} : ${sec < 10 ? "0" + sec : sec}`;
}

function runAlarm() {
  --NOW;
  const min = parseInt(NOW / 60),
    sec = NOW % 60;
  remainTime.innerHTML = `${min} : ${sec < 10 ? "0" + sec : sec}`;
  slider.value = min;
}

function drawTimer() {
  if (SWITCH == false) {
    clearInterval(RUNALARM);
    SETTEDTIME = setInterval(initTimer, 100);
  } else {
    clearInterval(SETTEDTIME);
    NOW = getValue() * 60;
    RUNALARM = setInterval(runAlarm, 1000);
  }
}

function setTimer() {
  SWITCH = false;
  drawTimer();
}

function runTimer() {
  SWITCH = true;
  drawTimer();
}

function init() {
  slider.addEventListener("mousedown", setTimer);
  slider.addEventListener("mouseup", runTimer);
}

init();
