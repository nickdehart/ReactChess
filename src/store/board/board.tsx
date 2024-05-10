import { ReactNode, createContext, useReducer } from "react";
import { BoardType, Cell } from "@/types/common";
import { Pieces, BoardActions } from "@/types/enums";
import { reducer } from "./board.reducer";
import { init } from "@/utilities/init";
import { MovementType } from '@/types/common';

export interface BoardActionPayload {
    active?: Cell,
    target?: Cell,
    promotion?: Pieces,
    movements?: MovementType[]
}

export interface BoardAction {
    type: BoardActions;
    payload?: BoardActionPayload;
}

const State = createContext<BoardType>(init());
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
