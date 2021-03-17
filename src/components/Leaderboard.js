import React from "react";
import highscores from "../data/highscores";
import "./Leaderboard.css";

function Scores({ index, name, time }) {
  return (
    <div className="Scores">
      <p className="msg-name">{`${index + 1}. ${name}`}</p>
      <p className="msg-time">{`${time}`}</p>
    </div>
  );
}

function Leaderboard({ handleReturnToTitle, handleShowLeaderboard }) {
  const handleReplay = () => {
    handleShowLeaderboard();
    handleReturnToTitle();
  };

  return (
    <div className="Leaderboard">
      <h1 className="msg-top-score">TOP SCORES</h1>
      <div className="score-list">
        {highscores.map((score, i) => {
          return (
            <Scores key={i} index={i} name={score.name} time={score.time} />
          );
        })}
      </div>
      <button className="btn btn-top-replay" onClick={handleReplay}>
        Play again
      </button>
    </div>
  );
}

export default Leaderboard;
