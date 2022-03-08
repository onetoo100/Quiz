export class UI {
  constructor() {}

  /**
   *
   * @param {string} question receive the question to render on the page
   */
  showQuestion(question) {
    const title = document.querySelector(".title");
    title.textContent = question;
  }

  /**
   *
   * @param {string[]} choices
   * @param {function} callback
   */
  showChoices(choices, callback) {
    const containerChoices = document.querySelector(".choices");
    /* LimpiarHTML */
    containerChoices.textContent = "";
    for (let i = 0; i < choices.length; i++) {
      const buttonChoice = document.createElement("button");
      buttonChoice.classList.add("btn");
      buttonChoice.textContent = choices[i];
      containerChoices.appendChild(buttonChoice);

      buttonChoice.addEventListener("click", () => {
        callback(choices[i]);
      });
    }
  }

  /**
   *
   * @param {number} score
   * @param {number} total
   */
  showScore(score, total) {
    let percent = Math.round((score * 100) / total);
    let comment = "";
    percent <= 30
      ? (comment = "Que bruto!")
      : percent > 30 && percent <= 70
      ? (comment = "No sabe mucho, pero estas aprobado")
      : (comment = "Que crack!, GENIO!");

    const scoreStyle = `
    <h1>Result</h1>
    <h2>Your Score: ${score}</h2>
    <h1>${comment}</h1>`;
    const element = document.querySelector(".container");
    element.innerHTML = scoreStyle;
  }

  /**
   *
   * @param {number} currentIndex the current question index
   * @param {number} total the total of questions we have
   */
  showProgress(currentIndex, total) {
    const element = document.querySelector(".progress");
    element.innerHTML = `Question ${currentIndex} of ${total}`;
  }
}
