import { useState }        from "react";
import classes             from './Board.module.css';

import { Piece }           from "@/components/Piece";
import { LostPieces }      from "@/components/LostPieces";
import { GameOver }        from "@/components/GameOver";
import { PromotionModal }  from "@/components/PromotionModal";
import { useBoard }        from "@/hooks/useBoard";
import { Cell }            from '@/types/common';
import { Pieces, Teams, Columns, Rows, ActionTypes } from '@/types/enums';


export function Board() {

    const [board, dispatch] = useBoard();
    const [turn, setTurn] = useState<Teams>(Teams.WHITE);
    const [active, setActive] = useState<Cell | null>(null);
    const [target, setTarget] = useState<Cell | null>(null);
    const [lostWPieces, setLostWPieces] = useState<Cell[]>([]);
    const [lostBPieces, setLostBPieces] = useState<Cell[]>([]);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);


    function handleReset() {
        dispatch({ type: ActionTypes.RESET });
        setLostWPieces([]);
        setLostBPieces([]);
        setTurn(Teams.WHITE);
        setGameOver(false);
    }


    function handleTurnChange() {
        setActive(null);
        setTarget(null);
        if (turn === Teams.WHITE) setTurn(Teams.BLACK);
        else setTurn(Teams.WHITE);
    }


    function isCastleMove(target: Cell) :boolean {
        if(!active) return false;
        if(active.type !== Pieces.KING) return false;

        // castle right
        if(active.y === target.y && active.x === Columns.E && target.x === Columns.G)
            return true;

        // castle left
        if(active.y === target.y && active.x === Columns.E && target.x === Columns.C) 
            return true;

        return false;
    }


    function isPromotion(target: Cell) :boolean {
        if(!active) return false;
        if(active.type !== Pieces.PAWN) return false;

        if(active.team === Teams.WHITE && target.y === Rows.ONE)
            return true;

        if(active.team === Teams.BLACK && target.y === Rows.EIGHT)
            return true;

        return false;
    }


    function handleMove(target: Cell) {
        // only an active piece can move
        if(!active) return;

        if (target.type === Pieces.KING) setGameOver(true);

        // Push lost pieces
        if(target.team === Teams.WHITE) setLostWPieces(w => [ ...w, target]);
        if(target.team === Teams.BLACK) setLostBPieces(b => [ ...b, target]);

        // Update board and change turns
        if(isCastleMove(target)) dispatch({ type: ActionTypes.CASTLE, payload: { target, active } });
        else if(isPromotion(target)) {
            setOpen(true);
            setTarget(target);
            return;
        }
        else dispatch({ type: ActionTypes.STANDARD, payload: { target, active } });
        handleTurnChange();
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

            {active && target &&
                <PromotionModal 
                    active={active}
                    target={target}
                    open={open}
                    setOpen={setOpen}
                    handleTurnChange={handleTurnChange}
                />
            }

        </section>
    );
}
