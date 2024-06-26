import { expect, test } from 'vitest';
import { init } from '../init';
import { BoardType, Cell } from '@/types/common';
import { Pieces, Teams } from '@/types/enums';
import { BOARD_SIZE } from '@/types/constants';

/**
 * Run tests for a row of empty pieces
 * @param row 
 * @param rowIndex 
 */
function testEmptyRow(row: Cell[], rowIndex: number) {
    row.forEach((col, colIndex) => {
        const { x, y, type, team, highlight, hasMoved } = col;
        expect(x).toBe(colIndex);
        expect(y).toBe(rowIndex);
        expect(type).toBe(Pieces.EMPTY);
        expect(team).toBe(Teams.EMPTY);
        expect(highlight).toBe(false);
        expect(hasMoved).toBe(false);
    })
}

/**
 * Run tests for a row of pawns
 * @param row 
 * @param rowIndex 
 * @param team 
 */
function testPawnRow(row: Cell[], rowIndex: number, team: Teams.WHITE | Teams.BLACK) {
    row.forEach((col, colIndex) => {
        const { x, y, type, team: colTeam, highlight, hasMoved } = col;
        expect(x).toBe(colIndex);
        expect(y).toBe(rowIndex);
        expect(type).toBe(Pieces.PAWN);
        expect(colTeam).toBe(team);
        expect(highlight).toBe(false);
        expect(hasMoved).toBe(false);
    })
}

/**
 * Run tests for first and last rows
 * @param row 
 * @param rowIndex 
 * @param team 
 */
function testKingRow(row: Cell[], rowIndex: number, team: Teams.WHITE | Teams.BLACK) {
    row.forEach((col, colIndex) => {
        const { x, y, type, team: colTeam, highlight, hasMoved } = col;
        expect(x).toBe(colIndex);
        expect(y).toBe(rowIndex);
        expect(colTeam).toBe(team);
        expect(highlight).toBe(false);
        expect(hasMoved).toBe(false);

        switch(colIndex) {
            case 0: 
            case 7: expect(type).toBe(Pieces.ROOK); break;
            case 1: 
            case 6: expect(type).toBe(Pieces.KNIGHT); break;
            case 2: 
            case 5: expect(type).toBe(Pieces.BISHOP); break;
            case 3: expect(type).toBe(Pieces.QUEEN); break;
            default: expect(type).toBe(Pieces.KING);
        }
    })
}


test('init()', () => {
    const board :BoardType = init();
    expect(board).toBeDefined();
    expect(board.length).toBe(BOARD_SIZE);
    board.forEach((row, idx) => {
        expect(row.length).toBe(BOARD_SIZE);
        switch(idx) {
            case 0: testKingRow(row, idx, Teams.BLACK); break;
            case 1: testPawnRow(row, idx, Teams.BLACK); break;
            case 6: testPawnRow(row, idx, Teams.WHITE); break;
            case 7: testKingRow(row, idx, Teams.WHITE); break;
            default: testEmptyRow(row, idx);
        }
    })
})
