"use strict";

const timer = document.querySelector(".timer"),
  info = document.querySelector(".info"),
  form = timer.querySelector("#form"),
  setValue = form.querySelector("#setValue"),
  slider = form.querySelector("#slider"),
  remainTime = document.querySelector(".remainTime");

let SWITCH = false;

let SETTIME, RUNALARM;
let NOW;

//접속 환경 체크.
function isMobile() {
  let isMobile = false;

  const filter = "win16|win32|win64|mac";

  if (navigator.platform) {
    isMobile = filter.indexOf(navigator.platform.toLowerCase()) < 0;
  }

  return isMobile;
}

//슬라이더 벨류값 취득.
function getSliderValue() {
  const sliderValue = slider.value;
  return sliderValue;
}

//설정시간 표시 (분단위)
function drawSetTime() {
  const sliderValue = getSliderValue();
  const setTime = parseInt(sliderValue / 60);
  setValue.innerHTML = `You set the timer for ${
    setTime == 60 ? "1 hour." : setTime + " min."
  }`;
  return setTime;
}

//남은시간 표시 (초단위)
function drawRemainTime(setTime) {
  const min = parseInt(setTime / 60),
    sec = setTime % 60;
  const now = `${min} : ${sec < 10 ? "0" + sec : sec}`;
  remainTime.innerHTML = now;
}

//초기 설정
function initTimer() {
  const setTime = drawSetTime() * 60;
  drawRemainTime(setTime);
  NOW = setTime;
  incenseColor();
}

//소리재생
function playSound() {
  const audioFile = new Audio("src/alarmSound.mp3");
  audioFile.volume = 1;
  audioFile.play();
}

//타이머
function runAlarm() {
  --NOW;
  if (NOW <= 0) {
    clearInterval(RUNALARM);
    remainTime.innerHTML = "It's over, Take a break.";
    playSound();
    slider.classList.add("burnedOut");
  } else {
    drawRemainTime(NOW);
    slider.value = NOW;
  }
  incenseColor();
}

function incenseTimer() {
  if (SWITCH == false) {
    clearInterval(RUNALARM);
    SETTIME = setInterval(initTimer);
    slider.classList.remove("burnedOut");
  } else {
    clearInterval(SETTIME);
    RUNALARM = setInterval(runAlarm, 1000);
  }
}

function setTimer() {
  SWITCH = false;
  incenseTimer();
}

function runTimer() {
  SWITCH = true;
  incenseTimer();
}

//인비저블 클래스 추가
function displayYes() {
  info.classList.remove("displayNone");
}

function displayNone() {
  info.classList.add("displayNone");
}

//사용법 표시
function clickedInfo() {
  localStorage.setItem("clickedInfo", true);
}

function howToUse() {
  const mobile = isMobile();
  const isClicked = JSON.parse(localStorage.getItem("clickedInfo"));
  if (isClicked != true) {
    if (mobile == false) {
      displayYes();
      info.addEventListener("pointerdown", clickedInfo);
      info.addEventListener("pointerdown", displayNone);
    } else {
      displayYes();
      info.addEventListener("touchstart", clickedInfo);
      info.addEventListener("touchstart", displayNone);
    }
  }
}

function init() {
  const mobile = isMobile();
  if (mobile == false) {
    slider.addEventListener("pointerdown", setTimer);
    slider.addEventListener("pointerup", runTimer);
  } else {
    slider.addEventListener("touchstart", setTimer);
    slider.addEventListener("touchend", runTimer);
  }
  howToUse();
}

init();
