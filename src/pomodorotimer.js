export function expandPomodoroTimer(e) {
  const timerDiv = document.querySelector(".timer-div");
  timerDiv.style.maxHeight =
    timerDiv.style.maxHeight === "0px" ? `${content.scrollHeight}px` : "0";
}

export function interpretTimerClick(e) {
  const clickedBtn = e.target;
  if (clickedBtn.classList.contains("start-pomodoro")) {
    console.log("START");
    pomodoroTimer("START");
  }
  if (clickedBtn.classList.contains("end-pomodoro")) {
    console.log("END");
  }
}

function pomodoroTimer(inputParam) {
  const timer = document.querySelector(".pomodoro-timer");

  if (inputParam === "START") {
    let seconds = 0;
    let minutes = 25;
    let hours = 0;

    const interval = setInterval(() => {
      seconds--;

      if (seconds === -1) {
        minutes--;
        seconds = 59;
      }

      if (minutes === -1) {
        hours--;
        minutes = 59;
      }

      if (hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(interval);
      }

      const time = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      timer.textContent = time;
      console.log(timer);
    }, 1000);
  } else {
    timer.textContent = "00:25:00";
  }
}
