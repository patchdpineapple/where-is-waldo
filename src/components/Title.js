import React from "react";
import "./Title.css";
import logo from "../images/waldo_logo.png";

function Title({toggleShowTitle, toggleShowGame}) {
    const onStart = () => {
        toggleShowTitle();
        toggleShowGame();
    }
  return (
    <div className="Title">
      <div className="title-contents">
          <div className="title-logo-container">
              <img className="title-logo" src={logo} alt="Where's Waldo Logo" />
        </div>
        <button className="btn btn-start" onClick={onStart}>START</button>
      </div>
    </div>
  );
}

export default Title;
