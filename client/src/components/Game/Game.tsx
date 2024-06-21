import { useCallback, useEffect, useState } from "react";
import classes             from './Game.module.css';

import { Board }           from "@/components/Board";
import { LostPieces }      from "@/components/LostPieces";
import { History }         from "@/components/History";
import { GameOverModal }   from "@/components/GameOverModal";
import { PromotionModal }  from "@/components/PromotionModal";
import { useBoard }        from "@/hooks/useBoard";
import { useGame }         from "@/hooks/useGame";
import { useHistory }      from "@/hooks/useHistory";
import { usePrevious }     from "@/hooks/usePrevious";
import { Cell }            from '@/types/common';
import { BOARD_SIZE }      from "@/types/constants";
import { boardToFEN }      from "@/utilities/fenUtils";
import { post }            from "@/utilities/post";
import { Pieces, Teams, Columns, Rows } from '@/types/enums';


export function Game() {

    const { board, castle, move } = useBoard();
    const { game, setTarget, setLostWhitePieces, setLostBlackPieces, setGameOverStatus } = useGame();
    const { add } = useHistory();
    const { turn, active, gameOverStatus } = game;
    const [open, setOpen] = useState<boolean>(false);


    const isCastleMove = useCallback((target: Cell, active: Cell) :boolean => { 
        if(!active) return false;
        if(active.type !== Pieces.KING) return false;

        // castle right
        if(active.y === target.y && active.x === Columns.E && target.x === Columns.G)
            return true;

        // castle left
        if(active.y === target.y && active.x === Columns.E && target.x === Columns.C) 
            return true;

        return false;
    }, [])


    const isPromotion = useCallback((target: Cell, active: Cell) :boolean => {
        if(!active) return false;
        if(active.type !== Pieces.PAWN) return false;

        if(active.team === Teams.WHITE && target.y === Rows.ONE)
            return true;

        if(active.team === Teams.BLACK && target.y === Rows.EIGHT)
            return true;

        return false;
    }, [])


    const handleAIMove = useCallback(({ bestmove }: { bestmove: string }) => {
        const [originCol, originRow, targetCol, targetRow] :string[] = bestmove.split('');

        const active = board[BOARD_SIZE - parseInt(originRow)][Columns[originCol as keyof typeof Columns]]
        const target = board[BOARD_SIZE - parseInt(targetRow)][Columns[targetCol as keyof typeof Columns]]

        add({ origin: active, destination: target });

        if (target.type === Pieces.KING) setGameOverStatus(true);

        // Push lost pieces
        if(target.team === Teams.WHITE) setLostWhitePieces(target);
        if(target.team === Teams.BLACK) setLostBlackPieces(target);

        // Update board and change turns
        if(isCastleMove(target, active)) castle({ target, active });
        else if(isPromotion(target, active)) {
            setOpen(true);
            setTarget(target);
            return;
        }
        else move({ target, active });

    }, [board, castle, isCastleMove, isPromotion, move, setGameOverStatus, setLostBlackPieces, setLostWhitePieces, setTarget, add])


    const prevTurn = usePrevious(turn);
    useEffect(() => {
        if(turn === Teams.BLACK && turn !== prevTurn) {
            post(import.meta.env.VITE_CHESS_ENGINE, { board: boardToFEN(board, turn), level: 1 })
                .then(handleAIMove)
        }
    }, [turn, board, prevTurn, handleAIMove])


    function handleMove(target: Cell) {
        // only an active piece can move
        if(!active) return;

        add({ origin: active, destination: target });

        if (target.type === Pieces.KING) setGameOverStatus(true);

        // Push lost pieces
        if(target.team === Teams.WHITE) setLostWhitePieces(target);
        if(target.team === Teams.BLACK) setLostBlackPieces(target);

        // Update board and change turns
        if(isCastleMove(target, active)) castle({ target, active });
        else if(isPromotion(target, active)) {
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
