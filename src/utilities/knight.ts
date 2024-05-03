import { Cell, BoardType, MovementType } from '@/types/common';
import { BOARD_SIZE } from '@/types/constants';

/**
 * Find possible knight moves based on a list of possible moves.
 * @param piece - piece trying to move
 * @param board - current working board
 * @returns - an array of possible movement locations for a knight
 */
export function knight(piece: Cell, board: BoardType) :MovementType[] {
    const possible :MovementType[] = [
        { y: piece.y + 2, x: piece.x + 1 },
        { y: piece.y + 2, x: piece.x - 1 },
        { y: piece.y - 2, x: piece.x + 1 },
        { y: piece.y - 2, x: piece.x - 1 },
        { y: piece.y + 1, x: piece.x + 2 },
        { y: piece.y + 1, x: piece.x - 2 },
        { y: piece.y - 1, x: piece.x + 2 },
        { y: piece.y - 1, x: piece.x - 2 },
    ];

    let moves :MovementType[] = [];
    possible.forEach(({ x, y }) => {
        if (x < BOARD_SIZE && x > -1 && y < BOARD_SIZE && y > -1 && board[y][x].team !== piece.team)
            moves.push({ x, y });
    })
    return moves;
}
