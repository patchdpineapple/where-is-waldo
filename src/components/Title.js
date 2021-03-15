import React from "react";
import "./Title.css";
import logo from "../images/waldo_logo.png";

function Title({ toggleShowTitle, toggleShowGame, handleStartTime }) {
  const onStart = () => {
    toggleShowTitle();
    toggleShowGame();
    // handleStartTime();
  };
  return (
    <div className="Title">
      <img className="title-logo" src={logo} alt="Where's Waldo Logo" />
      <button className="btn btn-start" onClick={onStart}>
        START
      </button>
    </div>
  );
}

export default Title;
