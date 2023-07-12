import React, { useEffect, useState } from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import { Board } from './models/Board';
import { Player } from './models/Player';
import { Colors } from './models/Colors';
import LostFigures from './components/LostFigures';

function App() {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  }

  function switchPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
  }

  return (
    <div className="app">
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        switchPlayer={switchPlayer}
      />
      <div>
        <LostFigures
          title="Белые фигуры"
          figures={board.lostWhiteFigures}
        />
        <LostFigures
          title="Черные фигуры"
          figures={board.lostBlackFigures}
        />
      </div>
    </div>
  );
}

export default App;
