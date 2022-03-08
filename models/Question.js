export class Question {
  /**
   *
   * @param {string} question the question of the choice
   * @param {string[]} choices an array with all the choices of the question
   * @param {string} answer correct answer
   */
  constructor(question, choices, answer) {
    this.question = question;
    this.choices = choices;
    this.answer = answer;
  }

  /**
   *
   * @param {string} choice get the answer
   * @returns {boolean} return true if the answer received is correct
   */
  getCorrectanswer(answer) {
    return answer === this.answer;
  }
}
