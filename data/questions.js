import { Question } from "../models/Question.js";
import { data } from "./data.js";

/* All the questions we get from 'data' we will sweep and return new array */
export const _questions = data.map(
  (q) => new Question(q.question, q.choices, q.answer)
);
