import { mouseTouchChange } from "./mouse_event.js";
import { speak } from "./voice.js";
import { wakeLockStart, wakeLockStop } from "./keep_wake.js";
import { bleSearch, bleDisconnect, sendModeEvent } from "./bluetooth.js";
import { log } from "./utils.js";
// import { creatNewChart, changeSensorChart } from "./chart.js";
import { lock, positionBarCal, startPoint, unlock } from "./animation_erase.js";

mouseTouchChange();
// creatNewChart();

let voiceState = "Ring";
var startButton = document.getElementById("myButton");
var modeButton = document.getElementById("bleButton");
startButton.addEventListener("click", toggleColor);
modeButton.addEventListener("click", toggleColorBle);

// 紀錄起始位置，將X移動距離和畫面X做比較，大於筏值即可解鎖
var lockScreen = document.getElementById("lock-screen");
lockScreen.addEventListener("mousedown", startPoint);
lockScreen.addEventListener("mousemove", positionBarCal, false);
lockScreen.addEventListener("mouseup", unlock);

document.getElementById("btn-lock").addEventListener("click", lock)

// // 測試按鈕 
// document.getElementById("btn-front").addEventListener("click", function () {
//   speak("直走");
// })
// document.getElementById("btn-none").addEventListener("click", function () {
//   speak("無搜尋到導盲磚");
// })
// document.getElementById("btn-left").addEventListener("click", function () {
//   speak("靠左前行");
// })
// document.getElementById("btn-right").addEventListener("click", function () {
//   speak("靠右前行");
// })
document.getElementById("btn-height").addEventListener("click", function () {
  if(voiceState == "Ring"){
    document.getElementById('b_mp3').play();
  }else{
    speak("注意高低差");
  }
})
// document.getElementById("btn-obstacle").addEventListener("click", function () {
//   speak("注意障礙物");
// })
document.getElementById("btn-GuideBrick").addEventListener("click", function () {
  if(voiceState == "Ring"){
    document.getElementById('a_mp3').play();
  }else{
    speak("發現導盲磚");
  }
})
// document.getElementById("btn-Crosswalk").addEventListener("click", function () {
//   speak("發現斑馬線");
// })

function toggleColor() {
  if (startButton.classList.contains("btn-primary")) {
    onStartButtonClick();
  } else {
    onStopButtonClick();
  }
}

function toggleColorBle() {
  if (modeButton.classList.contains("btn-warning")) {
    modeButton.classList.remove("btn-warning");
    modeButton.classList.add("btn-info");
    modeButton.innerHTML = "切換語音";
    voiceState = "Ring";
    // sendModeEvent("input off");

  } else {
    modeButton.classList.remove("btn-info");
    modeButton.classList.add("btn-warning");
    modeButton.innerHTML = "切換鈴聲";
    voiceState = "Voice";
    // sendModeEvent("output off");

  }
}

async function onStartButtonClick() {
  wakeLockStart();
  startButton.classList.remove("btn-primary");
  startButton.classList.add("btn-danger");
  startButton.innerHTML = "點擊結束";
  bleSearch();
}

async function onStopButtonClick() {
  wakeLockStop();
  startButton.classList.remove("btn-danger");
  startButton.classList.add("btn-primary");
  startButton.innerHTML = "點擊開始";

  try {
    bleDisconnect();

  } catch (error) {
    console.error(error)
    log('Argh! ' + error);
  }
}

// var select = document.getElementById('dataChart');
// 當選取選單時，設定要顯示的圖表類型
// select.addEventListener('change', changeSensorChart);
