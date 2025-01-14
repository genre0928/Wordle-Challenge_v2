let row = 0;
let attempt = 0;
let challengeTime = 5;
// const answer = "OLIVE";

function typingKeyboard() {
  const handleKeydown = (e) => {
    let key;
    if (e.type === "keydown") {
      key = e.key.toUpperCase();
    } else if (e.type === "click") {
      key = e.target.dataset.key;
    }
    const checkAnswer = async () => {
      // 반복문으로 하나씩 돌려서 정답이랑 대조한 뒤 클래스값 추가하는걸로
      // 만약 모두 맞으면 정답 스택 쌓기
      // 반복문 종료 후에 스택 갯수보고 정답으로 할 지 row, attempt 수 조정할 지 판단하도록
      // for문 조건 2, 3번째 속성 반대로함 병신
      const res = await fetch("/answer");
      const resJson = await res.json();
      const answer = await resJson.answer;

      for (i = 0; i < 5; i++) {
        const alpha = document.querySelector(
          `.main__game-main__answer-boxes__box[data-index='${row}${i}']`
        );
        let keyAlpha = document.querySelector(
          `div[data-key=${alpha.innerText}]`
        );
        let alphaCorrect = answer.includes(alpha.innerText);
        let alphaIndex = answer.indexOf(alpha.innerText);
        if (alphaCorrect === true && alphaIndex === i) {
          alpha.className += " correct";
          keyAlpha.className = `main__game-keyboard__key correct`;
        } else if (alphaCorrect === true && alphaIndex !== i) {
          alpha.className += " include";
          keyAlpha.className = `main__game-keyboard__key include`;
        }
      }
      let endGame = document.querySelectorAll(
        `div[data-index^='${row}'].correct`
      ).length;

      if (endGame === 5) {
        console.log("게임 끝");
        return;
      } else {
        row++;
        attempt = 0;
        document.querySelector(
          ".main__game-info__chance-time"
        ).innerText = `남은 횟수 : ${--challengeTime}회`;
      }
    };

    if (
      (attempt !== 0 && e.key === "Backspace") ||
      e.target.dataset.key === "Backspace"
    ) {
      attempt--;
      document.querySelector(
        `.main__game-main__answer-boxes__box[data-index='${row}${attempt}']`
      ).innerText = "";
    } else if (
      (attempt === 5 && e.key === "Enter") ||
      e.target.dataset.key === "ENTER"
    ) {
      checkAnswer();
    } else if (
      (attempt < 5 && e.keyCode >= 65 && e.keyCode <= 90) ||
      /^[A-Z]$/.test(e.target.dataset.key)
    ) {
      document.querySelector(
        `.main__game-main__answer-boxes__box[data-index='${row}${attempt}']`
      ).innerText = key;
      attempt++;
    }
  };
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("click", handleKeydown);
}

typingKeyboard();
window.onload = () => {
  document.querySelector(
    ".main__game-info__chance-time"
  ).innerText = `남은 횟수 : ${challengeTime}회`;
};
