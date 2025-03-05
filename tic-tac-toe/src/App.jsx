import Players from "./Components/Players";
import GameBoard from "./Components/GameBoard";
import { useState } from "react";
import { act } from "react";
import Log from "./Components/Log";

function App() {
  const[activePlayer,setActivePalyer]  = useState('X');
  function handleSelectSquare(){
    setActivePalyer((currPlayer)=>currPlayer==='X'?'O':"X");
  }  
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
        <Players  name= "Players 1" move="X" isActive={activePlayer==='X'}/>
        <Players  name= "Players 2" move="O" isActive={activePlayer==='O'}/>
        </ol>
        <div id="game-board">
          <GameBoard onSelectPlayer={handleSelectSquare} activePlayerSymbol={activePlayer}/>
        </div>
      </div>
      <Log/>
    </main>
  );
}

export default App;