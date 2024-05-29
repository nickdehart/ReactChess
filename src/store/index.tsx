import { ReactNode } from "react";
import { GameStore } from "./game";
import { BoardStore } from "./board";
import { HistoryStore } from "./history";


const providers = [GameStore.Provider, BoardStore.Provider, HistoryStore.Provider];

interface StoreProps {
    children: ReactNode,
}

export const Store = ({ children: initial }: StoreProps) =>
    providers.reduce((children, Provider) => 
        <Provider>{children}</Provider>, initial)
