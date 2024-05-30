import { HistoryActions } from '@/types/enums';
import { HistoryType, HistoryAction, InitialState } from './history';


export function reducer(state: HistoryType[], action: HistoryAction) :HistoryType[] {
    const { type, payload } = action;

    switch(type) {
        case HistoryActions.ADD:
            if(payload) return [ payload, ...state ];
            break;
        case HistoryActions.RESET:
            return InitialState;
    }
    return state;
}
