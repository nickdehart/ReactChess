import { Cell, BoardType, MovementType } from '@/types/common';
import { Pieces, Columns } from '@/types/enums';
import { 
    getNorthCell, 
    getSouthCell, 
    getEastCell, 
    getWestCell, 
    getSouthEastCell, 
    getSouthWestCell, 
    getNorthEastCell, 
    getNorthWestCell, 
    getEastCells, 
    getWestCells 
} from './directionalUtils';


/**
 * Determines possible casle moves for a king.
 * @param piece 
 * @param board 
 * @returns - an array of possible castle moves for a king
 */
function getCastleMoves(piece: Cell, board: BoardType) :MovementType[] {
    let moves :MovementType[] = [];

    if(!piece.hasMoved) {

        // castle right
        const eastCells = getEastCells(piece, board, piece.team);
        const Hpiece = board[piece.y][Columns.H];
        if(eastCells.length === 2 && Hpiece.team === piece.team && Hpiece.type === Pieces.ROOK && !(Hpiece.hasMoved)) {
            // The two spaces right of the king must be empty
            // H[1|8] must be a rook of the same team
            // neither the king or rook could have previously moved
            moves.push({ y: piece.y, x: Columns.G })
        }

        // castle left
        const westCells = getWestCells(piece, board, piece.team);
        const Apiece = board[piece.y][Columns.A];
        if(westCells.length === 3 && Apiece.team === piece.team && Apiece.type === Pieces.ROOK && !(Apiece.hasMoved)) {
            // The three spaces left of the king must be empty
            // A[1|8] must be a rook of the same team
            // neither the king or rook could have previously moved
            moves.push({ y: piece.y, x: Columns.C })
        }
    }

    return moves;
}


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

    return [...moves, ...getCastleMoves(piece, board)];
}
