// @ts-check
import { Question } from "./Question.js";

export class Quiz {
  /**
   *
   * @param {Question[]} questions all the questions from the class
   */
  constructor(questions) {
    this.questions = questions;
  }

  index = 0;
  score = 0;

  /**
   *
   * @returns {Question} return the index question to show
   */
  getQuestion() {
    return this.questions[this.index];
  }

  /**
   *
   * @param {string} answer
   * @param {string} counter
   */
  checkGuess(answer, counter = "") {
    if (counter !== "") {
      if (this.getQuestion().getCorrectanswer(answer)) this.score++;
      this.index++;
    } else {
      this.index++;
    }
  }

  /**
   *
   * @returns {boolean}
   */
  isEnded() {
    return this.questions.length === this.index;
  }
}
