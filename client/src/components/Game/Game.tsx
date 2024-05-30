import { useEffect, useState } from "react";
import classes             from './Game.module.css';

import { Board }           from "@/components/Board";
import { LostPieces }      from "@/components/LostPieces";
import { History }         from "@/components/History";
import { GameOverModal }   from "@/components/GameOverModal";
import { PromotionModal }  from "@/components/PromotionModal";
import { useBoard }        from "@/hooks/useBoard";
import { useGame }         from "@/hooks/useGame";
import { useHistory }      from "@/hooks/useHistory";
import { Cell }            from '@/types/common';
import { Pieces, Teams, Columns, Rows } from '@/types/enums';
import { post } from "@/utilities/post";


export function Game() {

    const { board, castle, move } = useBoard();
    const { game, setTarget, setLostWhitePieces, setLostBlackPieces, setGameOverStatus } = useGame();
    const { add } = useHistory();
    const { turn, active, gameOverStatus } = game;
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if(turn === Teams.BLACK) {
            post(import.meta.env.VITE_CHESS_ENGINE, { board })
        }
    }, [turn, board])


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

        add({ origin: active, destination: target});

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
    }


    return (
        <section className={classes.section}>

            <History />
            <Board handleMove={handleMove} />
            <LostPieces />

            <GameOverModal gameOver={gameOverStatus} turn={turn} />
            <PromotionModal open={open} setOpen={setOpen} />

        </section>
    );
}
