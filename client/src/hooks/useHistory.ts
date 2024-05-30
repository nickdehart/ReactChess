import { useContext } from "react";
import { HistoryStore, HistoryType } from "@/store/history";
import { HistoryActions } from "@/types/enums";

interface useHistoryReturnValue {
    history: HistoryType[];
    add: (payload: HistoryType) => void;
    reset: () => void;
}

export function useHistory() :useHistoryReturnValue {
    const history = useContext(HistoryStore.State);
    const dispatch = useContext(HistoryStore.Dispatch);

    const add = (payload: HistoryType) => {
        dispatch({ type: HistoryActions.ADD, payload });
    }

    const reset = () => {
        dispatch({ type: HistoryActions.RESET })
    }

    return { history, add, reset };
}
