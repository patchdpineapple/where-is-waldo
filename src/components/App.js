import React, {useState} from "react";
import './App.css';
import Title from './Title';
import Game from './Game';

function App() {
  const [showTitle, setShowTitle] = useState(true);
  const [showGame, setShowGame] = useState(false);

  /*toggle functions */
  const toggleShowTitle = () => {
    setShowTitle(!showTitle);
  };

  const toggleShowGame = () => {
    setShowGame(!showGame);
  };

  const handleReturnToTitle = () => {
    setShowTitle(!showTitle);
    setShowGame(!showGame);
  };


  return (
    <div className="App">
      {showTitle && <Title toggleShowTitle={toggleShowTitle} toggleShowGame={toggleShowGame} />}
      {showGame && <Game handleReturnToTitle={handleReturnToTitle} />}
    </div>
  );
}

export default App;
