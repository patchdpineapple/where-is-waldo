import React, { useState, useEffect } from "react";
import "./Timer.css";

function Timer({ handleStartTime, elapsedTime }) {
  useEffect(() => {
    // handleStartTime();
  });

  /* time to string */
  let diffInHrs = elapsedTime / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 1000;  
  let ms = Math.floor(diffInMs);

  let formattedHH = hh.toString().padStart(2, "0");
  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  let formattedMS = ms.toString().padStart(2, "0");

  /* alt */
  let centiseconds = ("0" + (Math.floor(elapsedTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(elapsedTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(elapsedTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(elapsedTime / 3600000)).slice(-2);


  /* render */
  return (
    <div className="Timer">
      <span id="time">
  {/* {minutes}:{seconds}:{centiseconds} */}
  00:00:00
      </span>
    </div>
  );
}

export default Timer;
