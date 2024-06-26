import { expect, test } from 'vitest';
import { init } from '../init';
import { Cell, BoardType } from '@/types/common';
import { Pieces, Teams } from '@/types/enums';
import { 
    getNorthCell, 
    getEastCell, 
    getSouthCell, 
    getWestCell,
    getNorthEastCell,
    getNorthWestCell,
    getSouthEastCell,
    getSouthWestCell,
    getNorthCells,
    getEastCells,
    getSouthCells,
    getWestCells,
    getNorthEastCells,
    getNorthWestCells,
    getSouthEastCells,
    getSouthWestCells,
} from "../directionalUtils"; 

const board :BoardType = init();

interface randomPlaceArgs { overrides?: Partial<Cell>, xMin?: number, xMax?: number, yMin?: number, yMax?: number }

type directionFn = ({ x, y }: Cell, board: BoardType) => Cell | undefined;
type directionFnMultiple = (piece: Cell, board: BoardType, team: Teams)=>Cell[];

type xyFn = (xy: number)=>number
type xyFnMultiple = (xy: number, index: number)=>number

/**
 * Get a random integer in a range from min to max inclusive.
 * @param min 
 * @param max 
 * @returns 
 */
function randomIntFromInterval(min: number, max: number) :number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Get a random cell on a board, randomness can be overridden with args.
 * @param overrides - cell obj overrides
 * @param xMin - min random x
 * @param xMax - max random x
 * @param yMin - min random y
 * @param yMax - max random y
 * @returns Cell
 */
function randomPlace(args?: randomPlaceArgs) :Cell {
    const { overrides={}, xMin=0, xMax=7, yMin=0, yMax=7 } = args || {};
    return {
        x: randomIntFromInterval(xMin, xMax),
        y: randomIntFromInterval(yMin, yMax),
        type: Pieces.EMPTY,
        team: Teams.EMPTY,
        highlight: false,
        hasMoved: false, 
        ...overrides
    }
}

/**
 * Test a known boundary. Example: get north cell while on northermost row
 * @param fn - function being tested
 * @param overrides - override random position to be at the edge
 */
function boundaryTest(fn: directionFn, overrides: randomPlaceArgs['overrides']) {
    // test outer boundary
    const invalidPlace :Cell = randomPlace({ overrides });
    const invalidCell = fn(invalidPlace, board);
    expect(invalidCell).toBe(undefined)
}

/**
 * Test a known good singular move
 * @param fn - function being tested
 * @param xFn - x output of fn
 * @param yFn - y output of fn 
 * @param args - randomPlace args to ensure move is valid
 */
function validityTest({ fn, xFn, yFn, args}: { fn: directionFn, xFn?: xyFn, yFn?: xyFn, args: randomPlaceArgs }) {
    // test known good move
    const place :Cell = randomPlace(args);
    const validCell = fn(place, board);
    expect(validCell).toBeDefined();
    if(!validCell) throw new Error("[validityTest]: Valid Cell is undefined.")
    expect(validCell.x).toBe(xFn ? xFn(place.x) : place.x);
    expect(validCell.y).toBe(yFn ? yFn(place.y) : place.y);
}

/**
 * Test a known boundary. Example: get north cell while on northermost row
 * @param fn 
 * @param overrides 
 */
function boundaryTestMultiple(fn: directionFnMultiple, overrides: randomPlaceArgs['overrides']) {
    const boundaryPlace :Cell = randomPlace({ overrides });
    const boundaryCells = fn(boundaryPlace, board, boundaryPlace.team);
    expect(boundaryCells.length).toBe(0);
}

/**
 * Test a known good multiple move
 * @param fn - function being tested
 * @param xFn - x output of fn
 * @param yFn - y output of fn 
 * @param overrides - randomPlace overrides
 */
function validityTestMultiple({ fn, xFn, yFn, overrides, len=4 }: { fn: directionFnMultiple, xFn?: xyFnMultiple, yFn?: xyFnMultiple, overrides: randomPlaceArgs['overrides'], len?: number }) {
    const place :Cell = randomPlace({ overrides });
    const cells = fn(place, board, place.team);
    expect(cells.length).toBe(len);
    cells.forEach((cell, idx) => {
        expect(cell.x).toBe(xFn ? xFn(place.x, idx) : place.x);
        expect(cell.y).toBe(yFn ? yFn(place.y, idx) : place.y);
    })
}


test('getNorthCell()', () => {
    boundaryTest(getNorthCell, { y: 0 });
    validityTest({ fn: getNorthCell, yFn: y=>y-1, args: { yMin: 1 }});
})

test('getEastCell()', () => {
    boundaryTest(getEastCell, { x: 7 });
    validityTest({ fn: getEastCell, xFn: x=>x+1, args: { xMax: 6 }});
})

test('getSouthCell()', () => {
    boundaryTest(getSouthCell, { y: 7 });
    validityTest({ fn: getSouthCell, yFn: y=>y+1, args: { yMax: 6 }});
})

test('getWestCell()', () => {
    boundaryTest(getWestCell, { x: 0 });
    validityTest({ fn: getWestCell, xFn: x=>x-1, args: { xMin: 1 }});
})

test('getNorthEastCell()', () => {
    boundaryTest(getNorthEastCell, { y: 0, x: 7 });
    validityTest({ fn: getNorthEastCell, xFn: x=>x+1, yFn: y=>y-1, args: { yMin: 1, xMax: 6 }});
})

test('getNorthWestCell()', () => {
    boundaryTest(getNorthWestCell, { y: 0, x: 0 });
    validityTest({ fn: getNorthWestCell, xFn: x=>x-1, yFn: y=>y-1, args: { yMin: 1, xMin: 1 }});
})

test('getSouthEastCell()', () => {
    boundaryTest(getSouthEastCell, { y: 7, x: 7 });
    validityTest({ fn: getSouthEastCell, xFn: x=>x+1, yFn: y=>y+1, args: { yMax: 6, xMax: 6 }});
})

test('getSouthWestCell()', () => {
    boundaryTest(getSouthWestCell, { y: 7, x: 0 });
    validityTest({ fn: getSouthWestCell, xFn: x=>x-1, yFn: y=>y+1, args: { yMax: 6, xMin: 1 }});
})

test('getNorthCells()', () => {
    boundaryTestMultiple(getNorthCells, { y: 0, x: 4, type: Pieces.QUEEN, team: Teams.WHITE });
    validityTestMultiple({
        fn: getNorthCells,
        yFn: (y, i)=>y-(i+1),
        len: 4,
        overrides: { y: 5, x: 4, type: Pieces.QUEEN, team: Teams.WHITE }
    });
})

test('getEastCells()', () => {
    boundaryTestMultiple(getEastCells, { y: 5, x: 7, type: Pieces.QUEEN, team: Teams.WHITE });
    validityTestMultiple({
        fn: getEastCells,
        xFn: (x, i)=>x+i+1,
        len: 4,
        overrides: { y: 5, x: 3, type: Pieces.QUEEN, team: Teams.WHITE }
    });
})

test('getSouthCells()', () => {
    boundaryTestMultiple(getSouthCells, { y: 7, x: 4, type: Pieces.QUEEN, team: Teams.BLACK });
    validityTestMultiple({
        fn: getSouthCells,
        yFn: (y, i)=>y+i+1,
        len: 4,
        overrides: { y: 2, x: 4, type: Pieces.QUEEN, team: Teams.BLACK }
    });
})

test('getWestCells()', () => {
    boundaryTestMultiple(getWestCells, { y: 4, x: 0, type: Pieces.QUEEN, team: Teams.WHITE });
    validityTestMultiple({
        fn: getWestCells,
        xFn: (x, i)=>x-(i+1),
        len: 4,
        overrides: { y: 5, x: 4, type: Pieces.QUEEN, team: Teams.WHITE }
    });
})

test('getNorthEastCells()', () => {
    boundaryTestMultiple(getNorthEastCells, { y: 0, x: 7, type: Pieces.QUEEN, team: Teams.WHITE });
    validityTestMultiple({
        fn: getNorthEastCells,
        xFn: (x, i)=>x+i+1,
        yFn: (y, i)=>y-(i+1),
        len: 4,
        overrides: { y: 5, x: 3, type: Pieces.QUEEN, team: Teams.WHITE }
    });
})

test('getNorthWestCells()', () => {
    boundaryTestMultiple(getNorthWestCells, { y: 0, x: 0, type: Pieces.QUEEN, team: Teams.WHITE });
    validityTestMultiple({
        fn: getNorthWestCells,
        xFn: (x, i)=>x-(i+1),
        yFn: (y, i)=>y-(i+1),
        len: 4,
        overrides: { y: 5, x: 4, type: Pieces.QUEEN, team: Teams.WHITE }
    });
})

test('getSouthEastCells()', () => {
    boundaryTestMultiple(getSouthEastCells, { y: 7, x: 7, type: Pieces.QUEEN, team: Teams.BLACK });
    validityTestMultiple({
        fn: getSouthEastCells,
        xFn: (x, i)=>x+i+1,
        yFn: (y, i)=>y+i+1,
        len: 4,
        overrides: { y: 2, x: 3, type: Pieces.QUEEN, team: Teams.BLACK }
    });
})

test('getSouthWestCells()', () => {
    boundaryTestMultiple(getSouthWestCells, { y: 7, x: 0, type: Pieces.QUEEN, team: Teams.BLACK });
    validityTestMultiple({
        fn: getSouthWestCells,
        xFn: (x, i)=>x-(i+1),
        yFn: (y, i)=>y+i+1,
        len: 4,
        overrides: { y: 2, x: 4, type: Pieces.QUEEN, team: Teams.BLACK }
    });
})
