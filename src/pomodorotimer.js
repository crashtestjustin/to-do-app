export function expandPomodoroTimer(e) {
  const timerDiv = document.querySelector(".timer-div");
  const expandArrow = document.querySelector(".expand-arrow");
  timerDiv.style.maxHeight =
    timerDiv.style.maxHeight === "0px" ? `${content.scrollHeight}px` : "0";

  if (timerDiv.style.maxHeight !== "0px") {
    expandArrow.style.transform = "rotate(90deg)";
  } else {
    expandArrow.style.removeProperty("transform");
  }
}

export function interpretTimerClick(e) {
  const clickedBtn = e.target;
  if (clickedBtn.classList.contains("start-pomodoro")) {
    console.log("START");
    pomodoroTimer("START");
  }
  if (clickedBtn.classList.contains("end-pomodoro")) {
    console.log("END");
    pomodoroTimer("END");
  }
}

let interval = null;
let timerAlert = null;
function pomodoroTimer(inputParam) {
  const timer = document.querySelector(".pomodoro-timer");

  if (inputParam === "START") {
    let seconds = 0;
    let minutes = 25;
    let hours = 0;

    if (interval !== null) {
      clearInterval(interval);
    }

    interval = setInterval(() => {
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
        let blinkMode = "light";
        clearInterval(interval);
        timerAlert = setInterval(() => {
          if (blinkMode === "light") {
            timer.style.color = "var(--secondary-bg-color)";
            timer.style.backgroundColor = "var(--header-bg)";
            blinkMode = "dark";
          } else {
            timer.style.color = "var(--header-bg)";
            timer.style.backgroundColor = "var(--secondary-bg-color)";
            blinkMode = "light";
          }
        }, 250);
      }

      const time = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      timer.textContent = time;
    }, 1000);
  }
  if (inputParam === "END") {
    clearInterval(interval);
    interval = null;
    clearInterval(timerAlert);
    timer.style.color = "var(--header-bg)";
    timer.style.backgroundColor = "var(--secondary-bg-color)";
    timer.textContent = "00:25:00";
  }
}
