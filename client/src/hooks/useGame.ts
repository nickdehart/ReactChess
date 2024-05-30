import { useContext } from "react";
import { GameStore, GameType } from "@/store/game";
import { GameActions } from "@/types/enums";
import { Cell } from "@/types/common";

interface useGameReturnValue {
    game: GameType;
    changeTurn: () => void;
    setActive: (active: GameType['active']) => void;
    setTarget: (target: GameType['target']) => void;
    setLostWhitePieces: (lostPiece: Cell) => void;
    setLostBlackPieces: (lostPiece: Cell) => void;
    setGameOverStatus: (gameOverStatus: boolean) => void;
    reset: () => void;
}

export function useGame() :useGameReturnValue {
    const game = useContext(GameStore.State);
    const dispatch = useContext(GameStore.Dispatch);

    const changeTurn = () => {
        dispatch({ type: GameActions.CHANGE_TURN });
    }

    const setActive = (active: GameType['active']) => {
        dispatch({ type: GameActions.UPDATE_ACTIVE, payload: { active } })
    }

    const setTarget = (target: GameType['target']) => {
        dispatch({ type: GameActions.UPDATE_TARGET, payload: { target } })
    }

    const setLostWhitePieces = (lostPiece: Cell) => {
        dispatch({ type: GameActions.UPDATE_LOST_WHITE_PIECES, payload: { lostPiece } })
    }

    const setLostBlackPieces = (lostPiece: Cell) => {
        dispatch({ type: GameActions.UPDATE_LOST_BLACK_PIECES, payload: { lostPiece } })
    }

    const setGameOverStatus = (gameOverStatus: boolean) => {
        dispatch({ type: GameActions.UPDATE_GAME_OVER_STATUS, payload: { gameOverStatus } })
    }

    const reset = () => {
        dispatch({ type: GameActions.RESET })
    }

    return {
        game,
        changeTurn,
        setActive,
        setTarget,
        setLostWhitePieces,
        setLostBlackPieces,
        setGameOverStatus,
        reset
    };
}
