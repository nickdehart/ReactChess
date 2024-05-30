import { ReactNode, createContext, useReducer } from "react";
import { Cell } from "@/types/common";
import { HistoryActions } from "@/types/enums";
import { reducer } from "./history.reducer";

export interface HistoryType {
    origin: Cell,
    destination: Cell,
}

export interface HistoryAction {
    type: HistoryActions;
    payload?: HistoryType;
}

export const InitialState: HistoryType[] = [];

const State = createContext<HistoryType[]>(InitialState);
const Dispatch = createContext<React.Dispatch<HistoryAction>>(()=>{});

function Provider({ children }: { children: ReactNode }) :ReactNode {

    const[state, dispatch] = useReducer(reducer, InitialState);

    return (
        <State.Provider value={state}>
            <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
        </State.Provider>
    )
}

export const HistoryStore = { State, Dispatch, Provider };
