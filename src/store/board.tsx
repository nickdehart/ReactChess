import { ReactNode, createContext, useReducer } from "react";
import { BoardType, Cell } from "@/types/common";
import { Pieces, ActionTypes } from "@/types/enums";
import { reducer } from "./board.reducer";
import { init } from "@/utilities/init";
import { MovementType } from '@/types/common';

export type BoardStateType = BoardType;

export interface BoardAction {
    type: ActionTypes;
    payload?: {
        active?: Cell,
        target?: Cell,
        promotion?: Pieces,
        movements?: MovementType[]
    };
}

const State = createContext<BoardStateType>(init());
const Dispatch = createContext<React.Dispatch<BoardAction>>(()=>{});

function Provider({ children }: { children: ReactNode }) :ReactNode {

    const[state, dispatch] = useReducer(reducer, init());

    return (
        <State.Provider value={state}>
            <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
        </State.Provider>
    )
}

export const BoardStore = { State, Dispatch, Provider };
