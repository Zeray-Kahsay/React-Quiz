import React from "react";
import { useQuiz } from "./QuizContex";

function Progress() {
  const { index, points, answer, numQuestions, maxPossiblePoints } = useQuiz();
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{index}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points} </strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
