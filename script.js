let video = document.querySelector("video");
let recordBtnCont = document.querySelector(".record-btn-cont");
let recordBtn = document.querySelector(".record-btn");
let captureBtnCont = document.querySelector(".capture-btn-cont");
let captureBtn = document.querySelector(".capture-btn");
let recordFlag = false;
let recorder;
let chunks = []; //media data in chunks

let contraints = {
  video: true,
  audio: true,
};

// navigator -> global object -provide by window -> gives browser info
navigator.mediaDevices.getUserMedia(contraints).then((stream) => {
  video.srcObject = stream;

  recorder = new MediaRecorder(stream);
  //Always empty chucks array before starting

  recorder.addEventListener("start", (e) => {
    chunks = [];
  });
  recorder.addEventListener("dataavailable", (e) => {
    chunks.push(e.data);
  });

  recorder.addEventListener("stop", (e) => {
    //conversion of media chucks data to video
    let blob = new Blob(chunks, { type: "video/mp4" });
    let videoURL = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = videoURL;
    a.download = "stream.mp4";
    a.click();
  });
});

recordBtnCont.addEventListener("click", (e) => {
  if (!recorder) {
    return;
  }

  recordFlag = !recordFlag;

  if (recordFlag) {
    //start
    recorder.start();
    recordBtn.classList.add("scale-record");
    startTimer();
  } else {
    //stop
    recorder.stop();
    recordBtn.classList.remove("scale-record");
    stopTimer();
  }
});

let timerID;
let counter = 0; // Represents total seconds
let timer = document.querySelector(".timer");
function startTimer() {
  timer.style.display = "block";
  function displayTimer() {
    let totalSeconds = counter;
    let hours = Number.parseInt(totalSeconds / 3600);
    totalSeconds = totalSeconds % 3600; // with remaining value
    let minutes = Number.parseInt(totalSeconds / 60);
    totalSeconds = totalSeconds % 60; // with remaining value
    let seconds = totalSeconds;
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    timer.innerText = `${hours}:${minutes}:${seconds}`;

    counter++;
  }

  timerID = setInterval(displayTimer, 1000);
}

function stopTimer() {
  clearInterval(timerID);
  timer.innerText = "00:00:00";
  timer.style.display = "none";
}
