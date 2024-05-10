import { BoardType } from '@/types/common';
import { Pieces, Teams, Columns, BoardActions } from '@/types/enums';
import { init } from "@/utilities/init";
import { BoardAction } from './board';


export function reducer(state: BoardType, action: BoardAction) :BoardType {
    const { type, payload } = action;
    const { active, target, promotion, movements } = payload || {};

    if(type === BoardActions.RESET) return init();

    if(type === BoardActions.HIGHLIGHT && movements) {
        return state.map((row) => 
            row.map((cell) => {
                const foundMovement = movements.find(({ x, y }) => cell.x === x && cell.y === y);
                return { ...cell, highlight: foundMovement ? true : false };
            })
        )
    }

    if(!active || !target) return state;
    const targetPosition = state[target.y][target.x];

    return state.map((row) => 
        row.map((cell) => {

            const isSource :boolean = cell.x === active.x && cell.y === active.y;
            const isTarget :boolean = cell.x === targetPosition.x && cell.y === targetPosition.y;

            // always set source piece to empty
            if(isSource) return { ...cell, type: Pieces.EMPTY, team: Teams.EMPTY, highlight: false };

            // always set target piece, either to source piece type, or promotion piece type
            if(type === BoardActions.PROMOTION && isTarget && promotion)
                return { ...cell, type: promotion, team: active.team, highlight: false, hasMoved: true };
            if(isTarget) return { ...cell, type: active.type, team: active.team, highlight: false, hasMoved: true };

            // handle moving rook around during castle
            if(type === BoardActions.CASTLE && cell.y === target.y) {
                // remove right rook from H[1|8]
                if(target.x === Columns.G && cell.x === Columns.H)
                    return { ...cell, type: Pieces.EMPTY, team: Teams.EMPTY, highlight: false };

                // put right rook into new F[1|8]
                if(target.x === Columns.G && cell.x === Columns.F)
                    return { ...cell, type: Pieces.ROOK, team: active.team, highlight: false, hasMoved: true };

                // remove left rook from H[1|8]
                if(target.x === Columns.C && cell.x === Columns.A)
                    return { ...cell, type: Pieces.EMPTY, team: Teams.EMPTY, highlight: false };

                // put left rook into new F[1|8]
                if(target.x === Columns.C && cell.x === Columns.D)
                    return { ...cell, type: Pieces.ROOK, team: active.team, highlight: false, hasMoved: true };
            }

            // turn hightlight off
            return { ...cell, highlight: false };

        })
    )

}
