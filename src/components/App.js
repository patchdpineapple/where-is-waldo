import React, { useState, useRef } from "react";
import "./App.css";
import Title from "./Title";
import Game from "./Game";
import Leaderboard from "./Leaderboard";

function App() {
  const [showTitle, setShowTitle] = useState(true);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showGame, setShowGame] = useState(false);

  /*toggle functions */
  const toggleShowTitle = () => {
    setShowTitle(!showTitle);
  };

  const toggleShowGame = () => {
    setShowGame(!showGame);
  };

  const toggleShowLeaderboard = () => {
    setShowLeaderboard(!showLeaderboard);
  };

  const handleReturnToTitle = () => {
    setShowTitle(!showTitle);
    setShowGame(!showGame);
  };

  return (
    <div className="App">
      {showTitle && (
        <Title
          toggleShowTitle={toggleShowTitle}
          toggleShowGame={toggleShowGame}
        />
      )}
      {showLeaderboard && (
        <Leaderboard
          handleReturnToTitle={handleReturnToTitle}
          handleShowLeaderboard={toggleShowLeaderboard}
        />
      )}
      {showGame && (
        <Game
          handleReturnToTitle={handleReturnToTitle}
          toggleShowGame={toggleShowGame}
          toggleShowLeaderboard={toggleShowLeaderboard}
        />
      )}
    </div>
  );
}

export default App;
