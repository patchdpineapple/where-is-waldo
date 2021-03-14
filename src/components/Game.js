import React, { useState, useEffect } from "react";
import "./Game.css";
import logo from "../images/waldo_logo.png";
import game_image from "../images/waldo_beach.jpg";
import waldo from "../images/waldo_face.png";
import odlaw from "../images/odlaw_face.png";
import wizard from "../images/wizard_face.png";
import characters from "../data/characters.js";

function Complete() {
  //this component will show when the game is over
  return (
    <div className="Complete">
      <h1 className="msg-complete">Nice! You found them all!</h1>
    </div>
  );
}

function Popup({
  coordsX,
  coordsY,
  onClosePopup,
  handleFoundCharacter,
  found,
}) {
  //this component will show when the user clicks on the image
  let marginTop = 100 + 1;
  let marginLeft = (window.innerWidth - 1024) / 2 - 7;

  const onSelectCharacter = (e, charname) => {
    //check coordinates if valid.
    e.stopPropagation();
    console.log("left:", marginLeft, "top:", marginTop);
    const character = characters[charname];
    let checkX = coordsX - marginLeft;
    let checkY = coordsY - marginTop;
    let validX, validY;

    if (checkX >= character.x && checkX <= character.x + 40) validX = true;
    else validX = false;

    if (checkY >= character.y && checkY <= character.y + 60) validY = true;
    else validY = false;

    onClosePopup(e);

    //if x and y coordinate is valid show correct feedback, else show popup to try again
    if (validX && validY) {
      handleFoundCharacter(charname);
    } else return alert("That's not " + charname + " keep searching");
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

function Game({ handleReturnToTitle }) {
  //this is the main gameplay component
  const [showPopup, setShowPopup] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [foundWaldo, setFoundWaldo] = useState(false);
  const [foundOdlaw, setFoundOdlaw] = useState(false);
  const [foundWizard, setFoundWizard] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  /* toggle functions*/
  const toggleShowPopup = (e) => {
    //toggle popup menu
    e.stopPropagation();
    setShowPopup(!showPopup);
  };

  const toggleShowComplete = () => {
    setShowComplete(!showComplete);
  };

  const resetGame = () => {
    //reset character portraits, time all screens
    setShowComplete(false);
    setFoundWaldo(false);
    setFoundOdlaw(false);
    setFoundWizard(false);
    handleReturnToTitle();
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

    // if(tempWaldo && tempOdlaw && tempWizard){
    //   setShowComplete(true);
    //   return alert("Good job! You found them all!");
    // }else {
    //   return alert("Nice! You found " + charName + "!");
  };

  const handleClickImage = (e) => {
    //records new picked coordinate and opens popup menu
    console.clear();
    console.log(e);
    console.log("coordinates", e.pageX, e.pageY);
    setCoords({ x: e.pageX, y: e.pageY });
    setShowPopup(true);
  };

  useEffect(() => {
    if (handleCompleteGame()) {
      setShowComplete(true);
    }
  });

  return (
    <div className="Game">
      {showComplete && <Complete />}
      <div
        className="game-status-bar"
        onClick={(e) => {
          console.clear();
          console.log(e);
          console.log("Page", e.pageX, e.pageY);
          console.log("Screen", e.screenX, e.screenY);
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
        <div className="time-container">
          <strong>00:00</strong>
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
