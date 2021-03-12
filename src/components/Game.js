import React, { useState } from "react";
import "./Game.css";
import logo from "../images/waldo_logo.png";
import game_image from "../images/waldo_beach.jpg";
import waldo from "../images/waldo_face.png";
import odlaw from "../images/odlaw_face.png";
import wizard from "../images/wizard_face.png";

function Popup({ coordsX, coordsY, onClosePopup}) {
  return (
    <>
      <div
        className="Popup"
        style={{ position: "absolute", top: coordsY - 30, left: coordsX - 30 }}
        onClick={(e) => {
          console.log('haha');
          onClosePopup(e);
        }}
      ><i class="fas fa-times"></i></div>
      <div className="Popup-menu"
      style={{ position: "absolute", top: coordsY - 30, left: coordsX + 30 }}>
        <button className="btn btn-waldo"><img className="btn-face btn-waldo-face" src={waldo} alt="Waldo" />Waldo</button>
        <button className="btn btn-odlaw"><img className="btn-face btn-odlaw-face" src={odlaw} alt="Odlaw" />Odlaw</button>
        <button className="btn btn-wizard"><img className="btn-face btn-wizard-face" src={wizard} alt="Wizard" />Wizard</button>

      </div>
    </>
  );
}

function Game({ handleReturnToTitle }) {
  const [showPopup, setShowPopup] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const toggleShowPopup = (e) => {
    e.stopPropagation();
    setShowPopup(!showPopup);
  }

  const handleClickImage = (e) => {
    console.log("coordinates", e.pageX, e.pageY)
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
          <h2>00:00</h2>
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
      {showPopup && <Popup coordsX={coords.x} coordsY={coords.y} onClosePopup={toggleShowPopup} />}
    </div>
  );
}

export default Game;
