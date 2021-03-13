import React, { useState } from "react";
import "./Game.css";
import logo from "../images/waldo_logo.png";
import game_image from "../images/waldo_beach.jpg";
import waldo from "../images/waldo_face.png";
import odlaw from "../images/odlaw_face.png";
import wizard from "../images/wizard_face.png";
import characters from "../data/characters.js";

function Popup({ coordsX, coordsY, onClosePopup }) {
  let marginTop = 100 + 1;
  let marginLeft;
  if(window.innerWidth >= 1024) {
  marginLeft = (window.innerWidth - 1024) / 2 - 7;
  } else marginLeft = (window.innerWidth - 1024) / 2 - 7;

  const onSelectCharacter = (e, charname) => {
    //check coordinates if valid
    e.stopPropagation();
    console.log("left:", marginLeft, "top:", marginTop);
    const character = characters[charname];
    let checkX = coordsX-marginLeft;
    let checkY = coordsY-marginTop;
    let validX, validY;
   
    if(checkX >= character.x && checkX <= character.x + 40) validX = true;
    else validX = false;

    if(checkY >= character.y && checkY <= character.y + 60) validY = true;
    else validY = false;

    onClosePopup(e);
    
    //if x and y coordinate is valid show correct feedback, else show popup to try again
    if (validX && validY)
      return alert("Nice! You found " + charname + "!");
    else return alert("That's not " + charname + " keep searching");
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
        <button
          className="btn btn-waldo"
          onClick={(e) => onSelectCharacter(e, "Waldo")}
        >
          <img className="btn-face btn-waldo-face" src={waldo} alt="Waldo" />
          Waldo
        </button>
        <button
          className="btn btn-odlaw"
          onClick={(e) => onSelectCharacter(e, "Odlaw")}
        >
          <img className="btn-face btn-odlaw-face" src={odlaw} alt="Odlaw" />
          Odlaw
        </button>
        <button
          className="btn btn-wizard"
          onClick={(e) => onSelectCharacter(e, "Wizard")}
        >
          <img className="btn-face btn-wizard-face" src={wizard} alt="Wizard" />
          Wizard
        </button>
      </div>
    </>
  );
}

function Game({ handleReturnToTitle }) {
  const [showPopup, setShowPopup] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const toggleShowPopup = (e) => {
    //toggle popup menu
    e.stopPropagation();
    setShowPopup(!showPopup);
  };

  const handleClickImage = (e) => {
    //records new picked coordinate and opens popup menu
    console.clear();
    console.log(e);
    console.log("coordinates", e.pageX, e.pageY);
    setCoords({ x: e.pageX, y: e.pageY });
    setShowPopup(true);
  };

  return (
    <div className="Game">
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
            onClick={handleReturnToTitle}
            alt="Where's Waldo Logo"
          />
        </div>
        <div className="time-container">
          <strong>00:00</strong>
        </div>
        <div className="characters-container">
          <div className="character">
            <img className="img-face waldo-face" src={waldo} alt="Waldo" />
          </div>
          <div className="character">
            <img className="img-face odlaw-face" src={odlaw} alt="Odlaw" />
          </div>
          <div className="character">
            <img className="img-face wizard-face" src={wizard} alt="Wizard" />
          </div>
        </div>
      </div>
      <div className="game-image-container">
        {showPopup && (
          <Popup
            coordsX={coords.x}
            coordsY={coords.y}
            onClosePopup={toggleShowPopup}
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
