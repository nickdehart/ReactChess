import { Cell, BoardType, MovementType } from '@/types/common';
import { getSouthCells, getWestCells, getEastCells, getNorthCells } from './directionalUtils';

/**
 * Traverses the board in all cardinal directions to find possible rook moves.
 * @param piece - piece trying to move
 * @param board - current working board
 * @returns - an array of possible movement locations for a rook
 */
export function rook(piece: Cell, board: BoardType) :MovementType[] {
    return [
        ...getNorthCells(piece, board, piece.team), 
        ...getSouthCells(piece, board, piece.team),
        ...getEastCells(piece, board, piece.team),
        ...getWestCells(piece, board, piece.team), 
    ];
}
