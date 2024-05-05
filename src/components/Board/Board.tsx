import { useState }        from "react";
import { useStyles }       from './Board.styles';

import { Piece }           from "@/components/Piece";
import { LostPieces }      from "@/components/LostPieces";
import { GameOver }        from "@/components/GameOver";
import { init }            from "@/utilities/init";
import { Cell, BoardType } from '@/types/common';
import { Pieces, Teams }   from '@/types/enums';


export function Board() {
    const classes = useStyles();

    const [board, setBoard] = useState<BoardType>(init());
    const [turn, setTurn] = useState<Teams>(Teams.WHITE);
    const [active, setActive] = useState<Cell | null>(null);
    const [lostWPieces, setLostWPieces] = useState<Cell[]>([]);
    const [lostBPieces, setLostBPieces] = useState<Cell[]>([]);
    const [gameOver, setGameOver] = useState<boolean>(false);

    const handleReset = () => {
        setBoard(init());
        setLostWPieces([]);
        setLostBPieces([]);
        setTurn(Teams.WHITE);
        setGameOver(false);
    }

    const handleMove = (target: Cell) => {
        // only an active piece can move
        if(!active) return;

        if (target.type === Pieces.KING) setGameOver(true);
        const targetPosition = board[target.y][target.x];

        // Push lost pieces
        if(target.team === Teams.WHITE) setLostWPieces(w => [ ...w, target]);
        if(target.team === Teams.BLACK) setLostBPieces(b => [ ...b, target]);

        setBoard(b => 
            b.map((row) => 
                row.map((cell) => {

                    // reset source position back to empty
                    const isSource :boolean = cell.x === active.x && cell.y === active.y;
                    if(isSource)
                        return { ...cell, type: Pieces.EMPTY, team: Teams.EMPTY, highlight: false };

                    // set target to the new piece
                    const isTarget :boolean = cell.x === targetPosition.x && cell.y === targetPosition.y;
                    if(isTarget)
                        return { ...cell, type: active.type, team: active.team, highlight: false };

                    // make sure no cells are left highlighted
                    return { ...cell, highlight: false };
                })
            )
        )

        setActive(null);
        if (turn === Teams.WHITE) setTurn(Teams.BLACK);
        else setTurn(Teams.WHITE);
    };

    return (
        <section className={classes.section}>

            <GameOver gameOver={gameOver} turn={turn} />

            <LostPieces pieces={lostWPieces} />

            <table className={classes.table}>
                <thead>
                    <tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th><th>H</th></tr>
                </thead>

                <tbody>
                    {board.map((row, rowIndex) => (
                        <tr key={`row-${rowIndex}`}>

                            <td><b>{rowIndex + 1}</b></td>

                            {row.map((col, colIndex) => 
                                <td
                                    key={`col-${colIndex}`}
                                    onClick={col.highlight ? () => handleMove(col) : () => {}}
                                    className={`${classes.cell} ${col.highlight ? classes.cellHighlight : classes.cellNoHighlight}`}
                                >
                                    {col.type !== null && 
                                        <Piece 
                                            piece={col} 
                                            board={board} 
                                            setBoard={setBoard} 
                                            setActive={setActive} 
                                            turn={turn} 
                                            gameOver={gameOver} 
                                        />
                                    }
                                </td>
                            )}

                        </tr>
                    ))}
                </tbody>
            </table>

            <LostPieces pieces={lostBPieces} />

            <button className={classes.newGameBtn} onClick={handleReset}>Start New Game</button>

        </section>
    );
}
