import React, { useState, useEffect } from "react";
import "./Leaderboard.css";
import firebase from "firebase/app";
import "firebase/firestore";
import db from "../index.js";

function Scores({ index, name, time }) {
  return (
    <div className="Scores">
      <p className="msg-name">{`${index + 1}. ${name}`}</p>
      <p className="msg-time">{`${time}`}</p>
    </div>
  );
}

function Leaderboard({ handleReturnToTitle, handleShowLeaderboard }) {
  const [displayScores, setDisplayScores] = useState([]);

  const handleReplay = () => {
    //close leaderboard and return to title screen
    handleShowLeaderboard();
    handleReturnToTitle();
  };

  useEffect(() => {
    //retrieve top 10 scores recorded from database then set state for display
    const getScores = async () => {
      let captureScores = [];
      let filteredScores = await db
        .collection("highscores")
        .orderBy("total", "asc")
        .limit(10);

      await filteredScores.get().then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          captureScores.push({
            id: doc.id,
            name: doc.data().name,
            time: doc.data().time,
            total: doc.data().total,
          });
        });
      });
      setDisplayScores(captureScores);
    };
    getScores();
  }, []);

  return (
    <div className="Leaderboard">
      <h1 className="msg-top-score">TOP SCORES</h1>
      <div className="score-list">
        {displayScores.map((score, i) => {
          return (
            <Scores
              key={score.id}
              index={i}
              name={score.name}
              time={score.time}
            />
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
