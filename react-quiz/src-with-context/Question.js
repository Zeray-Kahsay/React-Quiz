import React from "react";
import Options from "./Options";
import { useQuiz } from "./QuizContex";

const Question = () => {
  const { questions, answer, index, dispatch } = useQuiz();
  const question = questions.at(index);
  return (
    <div className="">
      <h4>{question.question}</h4>
      <Options question={question} answer={answer} dispatch={dispatch} />
    </div>
  );
};

export default Question;
