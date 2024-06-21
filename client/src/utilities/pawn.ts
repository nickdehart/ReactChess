import { Cell, BoardType, MovementType } from '@/types/common';
import { Teams, Pieces } from '@/types/enums';
import { PAWN_BLACK_START, PAWN_WHITE_START } from '@/types/constants';
import { getSouthCell, getSouthWestCell, getSouthEastCell, getNorthCell, getNorthWestCell, getNorthEastCell } from './directionalUtils';


/**
 * Checks to see if a target is a valid cell for a pawn to move.
 * @param target 
 * @returns {boolean}
 */
function isUnoccupied(target: Cell | undefined) :boolean {
    if(target && target.type === Pieces.EMPTY) return true;
    return false;
}


/**
 * Checks to see if a target is a valid cell for a pawn to attack.
 * @param target 
 * @param team - attacking team
 * @returns {boolean}
 */
function isValidAttack(target: Cell | undefined, team: Teams) :boolean {
    if(target && target.type !== Pieces.EMPTY && target.team !== team) return true;
    return false;
}


/**
 * Find possible pawn moves which are different based on team.
 * @param piece - piece trying to move
 * @param board - current working board
 * @returns - an array of possible movement locations for a pawn
 */
export function pawn(piece: Cell, board: BoardType) :MovementType[] {
    const moves :MovementType[] = [];

    if (piece.team === Teams.BLACK) {
        // BLACK TEAM

        const southCell = getSouthCell(piece, board);

        // move is out of bounds
        if (!southCell) return moves;

        if (isUnoccupied(southCell))
            moves.push({ y: southCell.y, x: southCell.x });

        // still in starting position
        if (piece.y === PAWN_BLACK_START) {

            const secondSouthCell = getSouthCell(southCell, board);
            if (secondSouthCell && isUnoccupied(southCell) && isUnoccupied(secondSouthCell))
                moves.push({ y: secondSouthCell.y, x: secondSouthCell.x });
        }

        // check for possible southwest attack
        const southwestCell = getSouthWestCell(piece, board);
        if (southwestCell && isValidAttack(southwestCell, Teams.BLACK))
            moves.push({ x: southwestCell.x, y: southwestCell.y });

        // check for possible southeast attack
        const southeastCell = getSouthEastCell(piece, board);
        if (southeastCell && isValidAttack(southeastCell, Teams.BLACK))
            moves.push({ x: southeastCell.x, y: southeastCell.y });

    } else {
        // WHITE TEAM

        const northCell = getNorthCell(piece, board);

        // move is out of bounds
        if (!northCell) return moves;

        if (isUnoccupied(northCell))
            moves.push({ y: northCell.y, x: northCell.x });

        // still in starting position
        if (piece.y === PAWN_WHITE_START) {

            const secondNorthCell = getNorthCell(northCell, board);
            if (secondNorthCell && isUnoccupied(northCell) && isUnoccupied(secondNorthCell)) 
                moves.push({ y: secondNorthCell.y, x: secondNorthCell.x });
        }

        // check for possible northwest attack
        const northwestCell = getNorthWestCell(piece, board);
        if (northwestCell && isValidAttack(northwestCell, Teams.WHITE))
            moves.push({ x: northwestCell.x, y: northwestCell.y });

        // check for possible northeast attack
        const northeastCell = getNorthEastCell(piece, board);
        if (northeastCell && isValidAttack(northeastCell, Teams.WHITE))
            moves.push({ x: northeastCell.x, y: northeastCell.y });

    }

    return moves;
}
