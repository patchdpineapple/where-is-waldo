import React, { useState, useEffect } from "react";
import highscores from "../data/highscores";
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
  // let scoresList = highscores.sort((a, b) => {return a.total-b.total});

  // let filteredScores = scoresList.slice(0,10);

  const [displayScores, setDisplayScores] = useState([]);
//  let displayScores = [];

  // const getScores = async () => {
  //   let captureScores = [];
  //   let filteredScores = await db.collection('highscores')
  // .orderBy('total', 'asc')
  // .limit(10);

  // filteredScores.get().then((snapshot) => {
  //   snapshot.docs.forEach( (doc) => {
  //     captureScores.push({id:doc.id, name: doc.data().name, time: doc.data().time, total: doc.data().total});
  //   })
  // });
  // setDisplayScores(captureScores);
  // }

  const handleReplay = () => {
    handleShowLeaderboard();
    handleReturnToTitle();
  };

  useEffect( ()=>{
    const getScores = async () => {
      let captureScores = [];
      let filteredScores = await db.collection('highscores')
    .orderBy('total', 'asc')
    .limit(10);
  
    await filteredScores.get().then((snapshot) => {
      snapshot.docs.forEach( (doc) => {
        captureScores.push({id:doc.id, name: doc.data().name, time: doc.data().time, total: doc.data().total});
      })
    });
    setDisplayScores(captureScores);
    }
     getScores();
  },[]);

  return (
    <div className="Leaderboard">{console.log("render leaderboards")}
      <h1 className="msg-top-score">TOP SCORES</h1>
      <div className="score-list">
        {
        // filteredScores.map((score, i) => {
        //   return (
        //     <Scores key={i} index={i} name={score.name} time={score.time} />
        //   );
        // })
        
        }
        {
        displayScores.map((score, i) => {
          return (
            <Scores key={score.id} index={i} name={score.name} time={score.time} />
          );
        })
        }{console.log(displayScores)}
      </div>
      <button className="btn btn-top-replay" onClick={handleReplay}>
        Play again
      </button>
    </div>
  );
}

export default Leaderboard;
