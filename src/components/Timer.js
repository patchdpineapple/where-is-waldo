import React, { useEffect } from "react";
import "./Timer.css";

function Timer({ time, timerOn,startTimer, pauseTimer }) {
  useEffect(() => {
   if(timerOn) {
   startTimer();
   }else {
    pauseTimer();
   }
  }, [timerOn]);

 



  
  /* render */
  return (
    <div className="Timer">
      <span id="time">{time}</span>
    </div>
  );
}

export default Timer;
