import React, { useEffect } from "react";

export const Timer = ({ dispatch, secondsRemaining }) => {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    // Clean-up fn
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="timer">
      {mins < 10 && "0"} {mins}: {seconds < 10 && "0"} {seconds}
    </div>
  );
};
