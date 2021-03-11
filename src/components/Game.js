import React from "react";
import "./Game.css";
import logo from "../images/waldo_logo.png";
import game_image from "../images/waldo_beach.jpg";

function Game() {
  return (
    <div className="Game">
      <div className="game-status-bar">
        <div className="game-logo-container">
          <img className="game-logo" src={logo} alt="Where's Waldo Logo" />
        </div>
        <div className="time-container">
          <h2>00:00</h2>
        </div>
        <div className="characters-container">
            <div className="character" />
            <div className="character" />
            <div className="character" />
        </div>
      </div>

      <div className="game-image-container">
        <img
          className="game-image"
          src={game_image}
          alt="Where's Waldo at the Beach"
          draggable={false}
        />
      </div>
    </div>
  );
}

export default Game;
