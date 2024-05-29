import { useContext } from "react";
import { useGame } from '@/hooks/useGame';
import { BoardStore } from "@/store/board";
import { BoardActionPayload } from "@/store/board";
import { BoardActions } from "@/types/enums";
import { BoardType } from "@/types/common";
import { useHistory } from "./useHistory";


interface useBoardReturnType {
    board: BoardType;
    move: (payload: {
        active: BoardActionPayload['active'];
        target: BoardActionPayload['target'];
    }) => void;
    promote: (payload: {
        active: BoardActionPayload['active'];
        target: BoardActionPayload['target'];
        promotion: BoardActionPayload['promotion'];
    }) => void;
    castle: (payload: {
        active: BoardActionPayload['active'];
        target: BoardActionPayload['target'];
    }) => void;
    reset: () => void;
    highlight: (movements: BoardActionPayload['movements']) => void;
}


export function useBoard() :useBoardReturnType {
    const board = useContext(BoardStore.State);
    const dispatch = useContext(BoardStore.Dispatch);
    const { changeTurn, setActive, setTarget, reset: gameReset } = useGame();
    const { reset: historyReset } = useHistory();

    const handleTurnChange = () => {
        setActive(null);
        setTarget(null);
        changeTurn();
    }

    const move = (payload: { active: BoardActionPayload['active'], target: BoardActionPayload['target'] }) => {
        dispatch({ type: BoardActions.STANDARD, payload });
        handleTurnChange();
    }

    const promote = (payload: { active: BoardActionPayload['active'], target: BoardActionPayload['target'], promotion: BoardActionPayload['promotion'] }) => {
        dispatch({ type: BoardActions.PROMOTION, payload });
        handleTurnChange();
    }

    const castle = (payload: { active: BoardActionPayload['active'], target: BoardActionPayload['target'] }) => {
        dispatch({ type: BoardActions.CASTLE, payload })
        handleTurnChange();
    }

    const reset = () => {
        dispatch({ type: BoardActions.RESET });
        gameReset();
        historyReset();
    }

    const highlight = (movements: BoardActionPayload['movements']) => {
        dispatch({ type: BoardActions.HIGHLIGHT, payload: { movements } });
    }

    
    return {
        board,
        move,
        promote,
        castle,
        reset,
        highlight
    };
}
