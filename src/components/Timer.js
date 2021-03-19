import React, { useEffect } from "react";
import "./Timer.css";

function Timer({ time, timerOn, startTimer, pauseTimer }) {
  //timer component

  useEffect(() => {
    //starts/stops the timer depending on state of timer
    if (timerOn) {
      startTimer();
    } else {
      pauseTimer();
    }
  }, [timerOn]);
 
  return (
    <div className="Timer">
      <span id="time">{time}</span>
    </div>
  );
}

export default Timer;
