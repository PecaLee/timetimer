"use strict";

const timer = document.querySelector(".timer"),
  form = timer.querySelector("#form"),
  remainTime = document.querySelector(".remainTime");

const slider = form.querySelector("#slider"),
  sliderValue = form.querySelector("#sliderValue");

let SWITCH = false;

let SETTEDTIME, RUNALARM, NOW;

function getValue() {
  const alarmTime = parseInt(slider.value / 60);
  sliderValue.innerHTML = `You set the timer for ${
    alarmTime == 60 ? "1 hour." : alarmTime + " min."
  }`;
  return alarmTime;
}

function initTimer() {
  const alarmTime = getValue();
  const setTime = alarmTime;
  const min = parseInt(setTime / 60),
    sec = setTime % 60;
  remainTime.innerHTML = `${min} : ${sec < 10 ? "0" + sec : sec}`;
}

function runAlarm() {
  --NOW;
  if (NOW <= 0) {
    clearInterval(RUNALARM);
    remainTime.innerHTML = "It's over, Take a break.";
    const audioFile = new Audio("src/alarmSound.wav");
    audioFile.volume = 1;
    audioFile.play();
  } else {
    const min = parseInt(NOW / 60),
      sec = NOW % 60;
    remainTime.innerHTML = `${min} : ${sec < 10 ? "0" + sec : sec}`;
    slider.value = NOW;
  }
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
  slider.addEventListener("pointerdown", setTimer);
  slider.addEventListener("pointerup", runTimer);
}

init();
