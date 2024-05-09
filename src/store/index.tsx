import { ReactNode } from "react";
import { BoardStore } from "./board";

const providers = [BoardStore.Provider];

interface StoreProps {
    children: ReactNode,
}

export const Store = ({ children: initial }: StoreProps) =>
    providers.reduce((children, Provider) => 
        <Provider>{children}</Provider>, initial)
