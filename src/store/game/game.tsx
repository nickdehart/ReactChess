import { ReactNode, createContext, useReducer } from "react";
import { Cell } from "@/types/common";
import { GameActions, Teams } from "@/types/enums";
import { reducer } from "./game.reducer";

export interface GameType {
    turn: Teams,
    active: Cell | null,
    target: Cell | null,
    lostWhitePieces: Cell[],
    lostBlackPieces: Cell[],
    gameOverStatus: boolean,
}

export interface GameAction {
    type: GameActions;
    payload?: {
        active?: GameType['active'],
        target?: GameType['target'],
        lostPiece?: Cell,
        gameOverStatus?: GameType['gameOverStatus'],
    };
}

export const InitialState: GameType = {
    turn: Teams.WHITE,
    active: null,
    target: null,
    lostWhitePieces: [],
    lostBlackPieces: [],
    gameOverStatus: false,
}


const State = createContext<GameType>(InitialState);
const Dispatch = createContext<React.Dispatch<GameAction>>(()=>{});

function Provider({ children }: { children: ReactNode }) :ReactNode {

    const[state, dispatch] = useReducer(reducer, InitialState);

    return (
        <State.Provider value={state}>
            <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
        </State.Provider>
    )
}

export const GameStore = { State, Dispatch, Provider };
