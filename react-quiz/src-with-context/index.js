import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//import App from "./AppWithContext";
import AppWithContext from "./AppWithContext";
import { QuizProvider } from "./QuizContex";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QuizProvider>
      <AppWithContext />
    </QuizProvider>
  </React.StrictMode>
);
