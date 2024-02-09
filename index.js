const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const recordBtn = document.getElementById("recordBtn");
const resetBtn = document.getElementById("resetBtn");
const records = document.getElementById("records");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function start(){
    if(!isRunning){
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
        recordBtn.disabled = false;
    }
}

function stop(){
    if(isRunning){
        clearInterval(timer);
        isRunning = false;
        recordBtn.disabled = true;
    }
}

function record(){
    const recordItem = document.createElement("p");
    recordItem.classList.add("record");
    recordItem.textContent = `#${records.children.length + 1} ${display.textContent}`;
    records.appendChild(recordItem);
}

function reset(){
    clearInterval(timer);
    display.textContent = "00:00:00:00";
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    records.innerHTML = "";
    recordBtn.disabled = true;
}

function update(){
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hour = Math.floor(elapsedTime / (1000 * 60 * 60));
    hour = String(hour).padStart(2, 0);

    let minute = Math.floor(elapsedTime / (1000 * 60) % 60);
    minute = String(minute).padStart(2, 0);

    let second = Math.floor(elapsedTime / 1000 % 60);
    second = String(second).padStart(2, 0);

    let millisecond = Math.floor(elapsedTime % 1000 / 10);
    millisecond = String(millisecond).padStart(2, 0);

    display.textContent = `${hour}:${minute}:${second}:${millisecond}`;
}

recordBtn.disabled = true;
