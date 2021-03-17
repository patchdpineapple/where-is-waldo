import React, { useState, useEffect } from "react";
import "./Game.css";
import logo from "../images/waldo_logo.png";
import game_image from "../images/waldo_beach.jpg";
import waldo from "../images/waldo_face.png";
import odlaw from "../images/odlaw_face.png";
import wizard from "../images/wizard_face.png";
import Timer from "./Timer";
import firebase from "firebase/app";
import "firebase/firestore";
import db from "../index.js";
import highscores from "../data/highscores";


let timeoutFindAgain; //used to display Find Again prompt for a certain period of time
let timerInterval;
let elapsedTime;

function Complete({ onPlayAgain, yourTime, totalTime, toggleShowGame, toggleShowComplete, toggleShowLeaderboard}) {
  //this component will show when the game is over

  const handleShowLeaderboard = () => {
    toggleShowComplete();
    toggleShowGame();
    toggleShowLeaderboard();
  }

  return (
    <div className="Complete">
      <div className="complete-container">
        <p className="msg-complete">Nice! You found them all!</p>
        <p className="msg-your-time">Your time: {yourTime}</p>
        <p className="msg-total">{`time in ms: ${totalTime}`}</p>
        <form onSubmit={()=>{
          console.log(`submitted score of ${document.getElementById("playername").value}`);
          highscores.push({
            name: document.getElementById("playername").value,
            time: yourTime,
            total: totalTime
          })
          handleShowLeaderboard();
        }}>
  <label htmlFor="playername" >Input name &nbsp;</label>
          <input type="text" id="playername" name="playername" placeholder="name" maxlength="25" required/>
          <button type="submit" className="btn btn-play-again">
            Submit
          </button>
        </form>
        <div>
          <button className="btn btn-play-again" onClick={onPlayAgain}>
            Play again
          </button>
          <button className="btn btn-play-again" onClick={handleShowLeaderboard}>
            Leaderboards
          </button>
         
        </div>
      </div>
    </div>
  );
}

function FindAgain() {
  return (
    <div className="FindAgain" id="FindAgain">
      KEEP SEARCHING
    </div>
  );
}

function Popup({
  coordsX,
  coordsY,
  onClosePopup,
  handleFoundCharacter,
  found,
  toggleShowFindAgain,
}) {
  //this component will show when the user clicks on the image
  let marginTop = 100 + 1;
  let marginLeft = (window.innerWidth - 1024) / 2 - 7;

  const getCharFromDatabase = async (charname) => {
    let char;

    await db
      .collection("characters")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.id === charname) {
            char = doc.data();
          }
        });
      });

    return char;
  };

  const onSelectCharacter = async (e, charname) => {
    //check coordinates if valid.
    e.stopPropagation();
    onClosePopup(e);
    // console.log("left:", marginLeft, "top:", marginTop);
    const character = await getCharFromDatabase(charname);
    // console.clear();
    // console.log(character);

    // const character = characters[charname];
    let checkX = coordsX - marginLeft;
    let checkY = coordsY - marginTop;
    let validX, validY;

    if (checkX >= character.x && checkX <= character.x + 40) validX = true;
    else validX = false;

    if (checkY >= character.y && checkY <= character.y + 60) validY = true;
    else validY = false;

    //if x and y coordinate is valid show correct feedback, else show popup to try again
    if (validX && validY) {
      handleFoundCharacter(charname);
    } else {
      document.getElementById(
        "FindAgain"
      ).textContent = `That's not ${charname}. Keep searching!`;
      document.getElementById("FindAgain").style.display = "block";
      document.getElementById("FindAgain").style.top = "120px";
      document.getElementById("FindAgain").style.left = (
        window.innerWidth / 2
      ).toString();
      timeoutFindAgain = setTimeout(() => {
        document.getElementById("FindAgain").style.display = "none";
      }, 3000);
      // return alert("That's not " + charname + " keep searching");
    }
  };

  return (
    <>
      <div
        className="Popup"
        style={{
          position: "absolute",
          top: coordsY - marginTop - 30,
          left: coordsX - marginLeft - 30,
        }}
        onClick={(e) => {
          onClosePopup(e);
        }}
      >
        <i className="fas fa-times"></i>
      </div>
      <div
        className="Popup-menu"
        style={{
          position: "absolute",
          top: coordsY - marginTop - 30,
          left: coordsX - marginLeft + 30,
        }}
      >
        {!found.Waldo && (
          <button
            className="btn btn-waldo"
            onClick={(e) => onSelectCharacter(e, "Waldo")}
          >
            <img className="btn-face btn-waldo-face" src={waldo} alt="Waldo" />
            Waldo
          </button>
        )}

        {!found.Odlaw && (
          <button
            className="btn btn-odlaw"
            onClick={(e) => onSelectCharacter(e, "Odlaw")}
          >
            <img className="btn-face btn-odlaw-face" src={odlaw} alt="Odlaw" />
            Odlaw
          </button>
        )}

        {!found.Wizard && (
          <button
            className="btn btn-wizard"
            onClick={(e) => onSelectCharacter(e, "Wizard")}
          >
            <img
              className="btn-face btn-wizard-face"
              src={wizard}
              alt="Wizard"
            />
            Wizard
          </button>
        )}
      </div>
    </>
  );
}

function Game({ handleReturnToTitle, toggleShowGame, toggleShowLeaderboard }) {
  //this is the main gameplay component
  const [showPopup, setShowPopup] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [foundWaldo, setFoundWaldo] = useState(false);
  const [foundOdlaw, setFoundOdlaw] = useState(false);
  const [foundWizard, setFoundWizard] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [showFindAgain, setShowFindAgain] = useState(true);

  /* toggle functions*/
  const toggleShowPopup = (e) => {
    //toggle popup menu
    e.stopPropagation();
    setShowPopup(!showPopup);
  };

  const toggleShowComplete = () => {
    setShowComplete(!showComplete);
  };

  const toggleShowFindAgain = () => {
    setShowFindAgain(!showFindAgain);
  };

  const resetGame = () => {
    //reset character portraits, time all screens
    handleReturnToTitle();
    setShowComplete(false);
    setFoundWaldo(false);
    setFoundOdlaw(false);
    setFoundWizard(false);
    clearTimeout(timeoutFindAgain);
  };

  /* Game logic */
  const handleCompleteGame = () => {
    //checks if all characters are found and display game over screen
    if (foundWaldo && foundOdlaw && foundWizard) {
      return true;
    } else return false;
  };

  const handleFoundCharacter = (charName) => {
    //dims portrait of character on nav bar when found and checks if all characters are found
    let tempWaldo = foundWaldo;
    let tempOdlaw = foundOdlaw;
    let tempWizard = foundWizard;

    switch (charName) {
      case "Waldo":
        tempWaldo = true;
        setFoundWaldo(tempWaldo);
        break;
      case "Odlaw":
        tempOdlaw = true;
        setFoundOdlaw(tempOdlaw);
        break;
      case "Wizard":
        tempWizard = true;
        setFoundWizard(tempWizard);
        break;
      default:
        break;
    }
  };

  const handleClickImage = (e) => {
    //records new picked coordinate and opens popup menu
    // console.clear();
    // console.log(e);
    // console.log("coordinates", e.pageX, e.pageY);
    setCoords({ x: e.pageX, y: e.pageY });
    setShowPopup(true);
  };

  /* TIMER */
  const [timeDisplay, setTimeDisplay] = useState("00:00:00");
  const [timerActive, setTimerActive] = useState(true);
  let startTime;

  function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");

    return `${formattedMM}:${formattedSS}:${formattedMS}`;
  }

  function print(txt) {
    // document.getElementById("time").innerHTML = txt;
    setTimeDisplay(txt);
  }

  function start() {
    console.log("timer started");
    startTime = Date.now();
    timerInterval = setInterval(function printTime() {
      elapsedTime = Date.now() - startTime;
      print(timeToString(elapsedTime));
    }, 10);
    console.log("Interval ID: ", timerInterval);
  }

  function pause() {
    clearInterval(timerInterval);
    console.log("Interval ID: ", timerInterval);
  }

  /* use effect */
  useEffect(() => {
    //checks if game is complete
    if (handleCompleteGame()) {
      setTimerActive(false);
      clearTimeout(timeoutFindAgain);
      setShowComplete(true);
    }
   
  });

  return (
    <div className="Game">
      {showComplete && (
        <Complete
          onPlayAgain={resetGame}
          yourTime={timeDisplay}
          totalTime={elapsedTime}
          toggleShowGame={toggleShowGame}
          toggleShowComplete={toggleShowComplete}
          toggleShowLeaderboard={toggleShowLeaderboard}
        />
      )}
      <div
        className="game-status-bar"
        onClick={(e) => {
          // console.clear();
          // console.log(e);
          // console.log("Page", e.pageX, e.pageY);
          // console.log("Screen", e.screenX, e.screenY);
        }}
      >
        <div className="game-logo-container">
          <img
            className="game-logo"
            src={logo}
            onClick={resetGame}
            alt="Where's Waldo Logo"
          />
        </div>
        <div className="timer-container">
          <Timer
            time={timeDisplay}
            timerOn={timerActive}
            startTimer={start}
            pauseTimer={pause}
          />
        </div>
        <div className="characters-container">
          <div className="character">
            <img
              className={`img-face waldo-face ${foundWaldo ? "img-found" : ""}`}
              src={waldo}
              alt="Waldo"
            />
          </div>
          <div className="character">
            <img
              className={`img-face odlaw-face ${foundOdlaw ? "img-found" : ""}`}
              src={odlaw}
              alt="Odlaw"
            />
          </div>
          <div className="character">
            <img
              className={`img-face waldo-face ${
                foundWizard ? "img-found" : ""
              }`}
              src={wizard}
              alt="Wizard"
            />
          </div>
        </div>
      </div>
      <div className="game-image-container">
        {showFindAgain && <FindAgain />}
        {showPopup && (
          <Popup
            coordsX={coords.x}
            coordsY={coords.y}
            onClosePopup={toggleShowPopup}
            handleFoundCharacter={handleFoundCharacter}
            handleCompleteGame={handleCompleteGame}
            found={{
              Waldo: foundWaldo,
              Odlaw: foundOdlaw,
              Wizard: foundWizard,
            }}
            toggleShowFindAgain={toggleShowFindAgain}
          />
        )}
        <img
          className="game-image"
          src={game_image}
          alt="Where's Waldo at the Beach"
          draggable={false}
          useMap="#waldo-beach"
          onClick={(e) => {
            handleClickImage(e);
          }}
        />
      </div>
    </div>
  );
}

export default Game;
