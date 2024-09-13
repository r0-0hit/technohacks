let timer;

//selecting buttons
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const restartButton = document.getElementById('restart-button');

//selecting display
const displayHour = document.getElementById('display-hours')
const displayMinutes = document.getElementById('display-minutes')
const displaySeconds = document.getElementById('display-seconds')

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
restartButton.addEventListener('click', restartTimer);

const hours = parseInt(document.getElementById('hours').value) || 0;
const minutes = parseInt(document.getElementById('minutes').value) || 0;
const seconds = parseInt(document.getElementById('seconds').value) || 0;
const totalSeconds = hours * 3600 + minutes * 60 + seconds;
let countdown = totalSeconds;

function restart() {
    countdown = totalSeconds;
}

function startTimer() {
    if (!(countdown)) restart();
        
    startButton.disabled = true;
    stopButton.disabled = false;
    restartButton.disabled = false;

    if (totalSeconds <= 0) return;

    timer = setInterval(() => {
        countdown--;
        updateDisplay(countdown);

        if (countdown <= 0) {
            clearInterval(timer);
            startButton.disabled = false;
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    startButton.disabled = false;
    stopButton.disabled = true;
}

function restartTimer() {
    clearInterval(timer);
    startButton.disabled = false;
    stopButton.disabled = true;
    restartButton.disabled = false;
    updateDisplay(0);
    restart();
    startTimer();
}

function updateDisplay(seconds) {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');

    displayHour.innerText = `${hrs}`
    displayMinutes.innerText = `${mins}`
    displaySeconds.innerText = `${secs}`
}