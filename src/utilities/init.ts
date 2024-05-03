import { BoardType } from '@/types/common';
import { Pieces, Teams } from '@/types/enums';
import { BOARD_SIZE } from '@/types/constants';

/**
 * Initializes a new chess board
 * @returns 2d array representing the chess board
 */
export function init() :BoardType {

    // get array of nums [0, 1, 2, 3, 4, 5, 6, 7]
    const squares = [...Array(BOARD_SIZE).keys()];
    let board: BoardType = [];

    squares.forEach(row => {

        // push a new second dimension array for every row
        board.push([]);
        
        squares.forEach(col => {

            // push empty position
            board[row].push({
                y: row,
                x: col,
                type: Pieces.EMPTY,
                team: Teams.EMPTY,
                highlight: false,
            });

            if (row === 1 || row === 6) {

                // fill pawn rows
                board[row][col].type = Pieces.PAWN;
                
            } else if (row === 0 || row === 7) {

                // handle first and last row
                switch (col) {
                    case 0:  board[row][col].type = Pieces.ROOK;   break;
                    case 1:  board[row][col].type = Pieces.KNIGHT; break;
                    case 2:  board[row][col].type = Pieces.BISHOP; break;
                    case 3:  board[row][col].type = Pieces.QUEEN;  break;
                    case 5:  board[row][col].type = Pieces.BISHOP; break;
                    case 6:  board[row][col].type = Pieces.KNIGHT; break;
                    case 7:  board[row][col].type = Pieces.ROOK;   break;
                    default: board[row][col].type = Pieces.KING;
                }

            }

            // set team
            if (row < 2) board[row][col].team = Teams.BLACK;
            else if(row > 5) board[row][col].team = Teams.WHITE;
        })
        
    })

    return board;
}
