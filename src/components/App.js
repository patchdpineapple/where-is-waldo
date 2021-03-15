import React, { useState } from "react";
import "./App.css";
import Title from "./Title";
import Game from "./Game";

function App() {
  const [showTitle, setShowTitle] = useState(true);
  const [showGame, setShowGame] = useState(false);

  /*toggle functions */
  const toggleShowTitle = () => {
    setShowTitle(!showTitle);
  };

  const toggleShowGame = () => {
    setShowGame(!showGame);
  };

  const handleReturnToTitle = () => {
    setShowTitle(!showTitle);
    setShowGame(!showGame);
  };

  /* Watch variables and functions */
  const [timerOn, setTimerOn] = useState(false);
  const [timerStart, setTimerStart] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  let timerInterval;

  const startTimer = () => {
    setTimerOn(true);
    setTimerStart(Date.now() - elapsedTime);
    setElapsedTime(elapsedTime);

    timerInterval = setInterval(() => {
        setElapsedTime(Date.now() - timerStart)
    }, 10);
  };

  const stopTimer = () => {
    setTimerOn(false);
    clearInterval(timerInterval);
  };

  const resetTimer = () => {
    stopTimer();
    setTimerStart(0);
    setElapsedTime(0);
  };


  return (
    <div className="App">
      {showTitle && (
        <Title
          toggleShowTitle={toggleShowTitle}
          toggleShowGame={toggleShowGame}
          handleStartTime={startTimer}

        />
      )}
      {showGame && (
        <Game
          handleReturnToTitle={handleReturnToTitle}
          handleStartTime={startTimer}
          handlePauseTime={stopTimer}
          handleResetTime={resetTimer}
          elapsedTime={elapsedTime}
        />
      )}
    </div>
  );
}

export default App;
