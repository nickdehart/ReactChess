import { Teams, GameActions } from '@/types/enums';
import { GameType, GameAction, InitialState } from './game';


export function reducer(state: GameType, action: GameAction) :GameType {
    const { type, payload } = action;
    const { active, target, lostPiece, gameOverStatus } = payload || {};


    switch(type) {
        case GameActions.CHANGE_TURN:
            return {
                ...state,
                turn: state.turn === Teams.WHITE ? Teams.BLACK : Teams.WHITE
            }

        case GameActions.UPDATE_ACTIVE:
            if(active || active === null) return { ...state, active };
            break;

        case GameActions.UPDATE_TARGET:
            if(target || target === null) return { ...state, target };
            break;

        case GameActions.UPDATE_LOST_WHITE_PIECES:
            if(lostPiece) return { ...state, lostWhitePieces: [...state.lostWhitePieces, lostPiece] };
            break;

        case GameActions.UPDATE_LOST_BLACK_PIECES:
            if(lostPiece) return { ...state, lostBlackPieces: [...state.lostBlackPieces, lostPiece] };
            break;

        case GameActions.UPDATE_GAME_OVER_STATUS:
            if(gameOverStatus) return { ...state, gameOverStatus };
            break;

        case GameActions.RESET:
            return InitialState;

    }
    return state;
}
