import { useContext } from "react";
import { BoardStore } from "@/store/board";
import { BoardStateType, BoardAction } from "@/store/board";

export function useBoard() :[BoardStateType, React.Dispatch<BoardAction>] {
    const BoardState = useContext(BoardStore.State);
    const BoardDispatch = useContext(BoardStore.Dispatch);
    return [BoardState, BoardDispatch];
}
