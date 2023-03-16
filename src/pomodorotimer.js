export function expandPomodoroTimer(e) {
  console.log(e);
  const timerDiv = document.querySelector(".timer-div");
  console.log(timerDiv);
  //   if (timerDiv.style.maxHeight === "0px") {
  //     timerDiv.style.height = `${content.scrollHeight}px`;
  //   } else {
  //     timerDiv.style.height = "0px";
  //   }
  timerDiv.style.maxHeight =
    timerDiv.style.maxHeight === "0px" ? `${content.scrollHeight}px` : "0";
}

function pomodoroTimer() {
  let seconds = 0;
  let minutes = 25;
  let hours = 0;

  const interval = setInterval(() => {
    seconds--;

    const timer = document.querySelector(".pomodoro-timer");

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
    console.log(interval);
    console.log(timer);
  }, 1000);
}
