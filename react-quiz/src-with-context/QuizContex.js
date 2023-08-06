import { createContext, useContext, useEffect, useReducer } from "react";

const SECONDS_PER_QUESTION = 30;
const initialState = {
  questions: [],

  // loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        status: "loading",
      };
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaing: state.questions.lenght * SECONDS_PER_QUESTION,
      };

    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return {
        ...state,
        questions: state.questions,
        status: "ready",
      };

    case "tick":
      return {
        ...state,
        secondsRemaing: state.secondsRemaing - 1,
        status: state.secondsRemaing === 0 ? "finish" : state.status,
      };

    default:
      throw new Error("Action is Unknow");
  }
}

const QuizContext = createContext();

function QuizProvider({ children }) {
  // userReducer to manage the states
  const [
    { questions, status, index, answer, points, highscore, secondsRemaing },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPossiblePoints = questions.reduce(
    (cum, curr) => cum + curr.points,
    0
  );
  const numQuestions = questions.length;
  console.log("Numeber of quiz questions :" + numQuestions);

  useEffect(() => {
    async function fetchQuestions() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch("http://localhost:8080/questions");
        const data = await res.json();
        console.log(data);
        dispatch({ type: "dataReceived", payload: data });
      } catch {
        dispatch({
          type: "dataFailed",
          payload: "Failed to load Questions",
        });
      }
    }
    fetchQuestions();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaing,
        numQuestions,
        maxPossiblePoints,

        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("QuizContext was used outside QuizcontextProvider ");
  }
  return context;
}

export { QuizProvider, useQuiz };
