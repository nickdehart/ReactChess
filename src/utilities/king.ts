import { Cell, BoardType, MovementType } from '@/types/common';
import { getNorthCell, getSouthCell, getEastCell, getWestCell, getSouthEastCell, getSouthWestCell, getNorthEastCell, getNorthWestCell } from './directionalUtils';

/**
 * Find possible king moves based on a list of possible moves.
 * @param piece - piece trying to move
 * @param board - current working board
 * @returns - an array of possible movement locations for a king
 */
export function king(piece: Cell, board: BoardType) :MovementType[] {

    const possible :(Cell | undefined)[] = [
        getNorthCell(piece, board),
        getSouthCell(piece, board),
        getEastCell(piece, board),
        getWestCell(piece, board),
        getNorthEastCell(piece, board),
        getNorthWestCell(piece, board),
        getSouthEastCell(piece, board),
        getSouthWestCell(piece, board),
    ];

    let moves :MovementType[] = [];
    possible.forEach((p) => {
        if(p && p.team !== piece.team) moves.push({ x: p.x, y: p.y })
    })

    return moves;
}
