import { useState }        from "react";
import classes             from './Board.module.css';

import { Piece }           from "@/components/Piece";
import { LostPieces }      from "@/components/LostPieces";
import { GameOver }        from "@/components/GameOver";
import { PromotionModal }  from "@/components/PromotionModal";
import { useBoard }        from "@/hooks/useBoard";
import { useGame }         from "@/hooks/useGame";
import { Cell }            from '@/types/common';
import { Pieces, Teams, Columns, Rows } from '@/types/enums';


export function Board() {

    const { board, castle, move } = useBoard();
    const { game, setTarget, setLostWhitePieces, setLostBlackPieces, setGameOverStatus } = useGame();
    const { turn, active, lostWhitePieces, lostBlackPieces, gameOverStatus } = game;
    const [open, setOpen] = useState<boolean>(false);


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

        if (target.type === Pieces.KING) setGameOverStatus(true);

        // Push lost pieces
        if(target.team === Teams.WHITE) setLostWhitePieces(target);
        if(target.team === Teams.BLACK) setLostBlackPieces(target);

        // Update board and change turns
        if(isCastleMove(target)) castle({ target, active });
        else if(isPromotion(target)) {
            setOpen(true);
            setTarget(target);
            return;
        }
        else move({ target, active });
    };


    return (
        <section className={classes.section}>

            <GameOver gameOver={gameOverStatus} turn={turn} />

            <LostPieces pieces={lostWhitePieces} />

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
                                    {col.type !== null && <Piece piece={col} />}
                                </td>
                            )}

                        </tr>
                    ))}
                </tbody>
            </table>

            <LostPieces pieces={lostBlackPieces} />

            {/* <button className={classes.newGameBtn} onClick={handleReset}>Start New Game</button> */}

            <PromotionModal open={open} setOpen={setOpen} />

        </section>
    );
}
