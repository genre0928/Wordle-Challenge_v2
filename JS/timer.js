const time = new Date();

const timer = () => {
  const curtime = new Date();
  const diff = curtime - time;
  const min = Math.floor(diff / 1000 / 60)
    .toString()
    .padStart(2, "0");
  const sec = (Math.floor(diff / 1000) - min * 60).toString().padStart(2, "0");
  document.querySelector(
    ".main__game-info__running-time"
  ).innerText = `경과 시간 : ${min}:${sec}`;
};

const start_time = () => {
  document.querySelector(
    ".main__game-info__start-time"
  ).innerText = `시작 시간 : ${time
    .getHours()
    .toString()
    .padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}:${time
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
};

setTimeout(start_time, 1000);
setInterval(timer, 1000);
