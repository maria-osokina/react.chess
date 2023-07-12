import React, { FC, useEffect, useState } from 'react';
import { Board } from '../models/Board';
import CellComponent from './CellComponent';
import { Cell } from '../models/Cell';
import { Player } from '../models/Player';

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    switchPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard, currentPlayer, switchPlayer }) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            switchPlayer();
            setSelectedCell(null);
            updateBoard();
        }
        else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }
        }
    }

    function highlightCells() {
        board.highlightCells(selectedCell);
        updateBoard();
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    useEffect(() => {
        highlightCells();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCell]);

    return (
        <div>
            <h3 style={{marginBottom: 8}}>Ходит: { currentPlayer?.color }</h3>
            <div className="board">
                {board.cells.map((row, index) =>
                    <React.Fragment key={index}>
                        {row.map((cell) =>
                            <CellComponent
                                cell={cell}
                                key={cell.id}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                                click={click}
                            />
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

export default BoardComponent;
