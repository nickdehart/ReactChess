
// Fen: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR

import { BoardType } from "@/types/common";
import { FenWhiteMap, FenBlackMap, Teams } from "@/types/enums";
import { BOARD_SIZE } from "@/types/constants";

/**
 * Converts board to standard FEN notation.
 * https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
 * @param board - working board
 * @returns fen string representation of the board
 */
export function boardToFEN(board: BoardType, turn: Teams) {
    let fenString = "";

    board.forEach((row, rowIndex) => {

        let emptyCellCount = 0;
        row.forEach(({ team, type }) => {

            if(team !== Teams.EMPTY && emptyCellCount > 0) {
                fenString += emptyCellCount;
                emptyCellCount = 0;
            }

            switch (team) {
                case Teams.BLACK: fenString += FenBlackMap[type]; break;
                case Teams.WHITE: fenString += FenWhiteMap[type]; break;
                case Teams.EMPTY: emptyCellCount++; break;
            }

        })

        if(emptyCellCount > 0)
            fenString += emptyCellCount;
        if(rowIndex < (BOARD_SIZE-1))
            fenString += "/";
    })

    return `${fenString} ${turn === Teams.BLACK ? "b" : "w"} - - 0 1`;
}
