// @ts-nocheck
/* Ts-check nos ayuda a no pasar valores no permitidos en clases o functions.
    El es de typescript, pero se puede usar aqui también.
    ---
    Para importar todo sin necesitar agregar la palabra 'export', podes usar:
    import "./models/question.js"; */
import { _questions } from "./data/questions.js";
import { Quiz } from "./models/Quiz.js";
import { UI } from "./models/UI.js";
/* import { data } from "./data/data.js"; */

/* Global variables */
let timer = document.querySelector(".timer");

function main() {
  const quiz = new Quiz(_questions);
  const ui = new UI();
  render(quiz, ui);
  showCounter(quiz, ui);
}

/**
 *
 * @param {Quiz} quiz
 * @param {UI} ui
 */
function render(quiz, ui) {
  if (quiz.isEnded()) {
    ui.showScore(quiz.score, quiz.questions.length);
  } else {
    ui.showQuestion(quiz.getQuestion().question);
    ui.showChoices(
      quiz.getQuestion().choices,
      (/** @type {string} */ currentChoice) => {
        /* Enter here if you click on any answer, 
          I passed 'nocounter' because it doesn't chek for any answer. */
        quiz.checkGuess(currentChoice, "noCounter");
        render(quiz, ui);
        clearInterval(timer);
        /* after changing the question, call the timer again */
        showCounter(quiz, ui);
      }
    );
    ui.showProgress(quiz.index + 1, quiz.questions.length);
  }
}

/**
 *
 * @param {Quiz} quiz
 * @param {UI} ui
 */
function showCounter(quiz, ui) {
  let counter = document.querySelector(".counter"),
    // @ts-ignore
    timeGauge = document.querySelector(".timegauge");

  const questionTime = 10,
    gaugeWidth = 200,
    gaugeProgressUnit = gaugeWidth / questionTime;

  let count = 0;
  timer = setInterval(() => {
    if (quiz.questions.length === quiz.index) {
      clearInterval(timer);
      return;
    }
    if (count <= questionTime) {
      counter.innerHTML = count;
      let currentGaugeProgress = gaugeProgressUnit * count;
      timeGauge.style.width = currentGaugeProgress + "px";
      currentGaugeProgress >= 90 && currentGaugeProgress <= 150
        ? (timeGauge.style.backgroundColor = "#FFA500")
        : currentGaugeProgress >= 150
        ? (timeGauge.style.backgroundColor = "red")
        : (timeGauge.style.backgroundColor = "green");

      count++;
    } else {
      /* If you don't click any answer before the time end,
        clean the timer, change the color, render the question and choices
        and start the counter another again */
      counter.innerHTML = "0";
      timeGauge.style.backgroundColor = "transparent";
      quiz.checkGuess("");
      render(quiz, ui);
      clearInterval(timer);
      showCounter(quiz, ui);
    }
  }, 1000);
}

main();
