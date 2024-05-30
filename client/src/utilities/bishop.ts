import { Cell, BoardType, MovementType } from '@/types/common';
import { getSouthEastCells, getSouthWestCells, getNorthEastCells, getNorthWestCells } from './directionalUtils';


/**
 * Traverses the board diagonally in all directions to find possible bishop moves.
 * @param piece - piece trying to move
 * @param board - current working board
 * @returns - an array of possible movement locations for a bishop
 */
export function bishop(piece: Cell, board: BoardType) :MovementType[] {

    return [
        ...getNorthEastCells(piece, board, piece.team), 
        ...getNorthWestCells(piece, board, piece.team), 
        ...getSouthEastCells(piece, board, piece.team), 
        ...getSouthWestCells(piece, board, piece.team)
    ];
}
