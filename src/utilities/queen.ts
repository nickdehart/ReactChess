import { Cell, BoardType, MovementType } from '@/types/common';
import { rook } from "./rook";
import { bishop } from "./bishop";

/**
 * Find possible queen moves, which is just a combination of rook and bishop moves.
 * @param piece - piece trying to move
 * @param board - current working board
 * @returns - an array of possible movement locations for a queen
 */
export function queen(piece: Cell, board: BoardType) :MovementType[] {
    return [...rook(piece, board), ...bishop(piece, board)];
}
