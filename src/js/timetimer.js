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

function drawRemainTime(v) {
  const min = parseInt(v / 60),
    sec = v % 60;
  const now = `${min} : ${sec < 10 ? "0" + sec : sec}`;
  remainTime.innerHTML = now;
  return now;
}

function initTimer() {
  const alarmTime = getValue() * 60;
  drawRemainTime(alarmTime);
}

function runAlarm() {
  --NOW;
  if (NOW <= 0) {
    clearInterval(RUNALARM);
    remainTime.innerHTML = "It's over, Take a break.";
    const audioFile = new Audio("src/alarmSound.wav");
    audioFile.volume = 1;
    audioFile.play();
    slider.className = "burnedOff";
  } else {
    drawRemainTime(NOW);
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
  slider.addEventListener("pointerup", function () {
    slider.className = "";
  });
}

init();
