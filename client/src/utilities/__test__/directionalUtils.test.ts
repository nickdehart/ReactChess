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

/**
 * Get a random integer in a range from min to max inclusive.
 * @param min 
 * @param max 
 * @returns 
 */
function randomIntFromInterval(min: number, max: number) :number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

interface randomPlaceArgs { overrides?: Partial<Cell>, xMin?: number, xMax?: number, yMin?: number, yMax?: number }
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

type directionFn = ({ x, y }: Cell, board: BoardType) => Cell | undefined;

/**
 * Test a known boundary. Example: get north cell while on northermost row
 * @param board 
 * @param fn - function being tested
 * @param overrides - override random position to be at the edge
 */
function boundaryTest(fn: directionFn, overrides: randomPlaceArgs['overrides']) {
    // test outer boundary
    const board :BoardType = init();
    const invalidPlace :Cell = randomPlace({ overrides });
    const invalidCell = fn(invalidPlace, board);
    expect(invalidCell).toBe(undefined)
}

/**
 * Test a known good move
 * @param fn - function being tested
 * @param xFn - x output of fn
 * @param yFn - y output of fn 
 * @param args - randomPlace args to ensure move is valid
 */
function validityTest({ fn, xFn, yFn, args}: { fn: directionFn, xFn?: (x: number)=>number, yFn?: (y: number)=>number, args: randomPlaceArgs }) {
    // test known good move
    const board :BoardType = init();
    const place :Cell = randomPlace(args);
    const validCell = fn(place, board);
    expect(validCell).toBeDefined();
    if(!validCell) throw new Error("[validityTest]: Valid Cell is undefined.")
    expect(validCell.x).toBe(xFn ? xFn(place.x) : place.x);
    expect(validCell.y).toBe(yFn ? yFn(place.y) : place.y);
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
    const board :BoardType = init();
    const boundaryPlace = {
        x: 4,
        y: 0,
        type: Pieces.QUEEN,
        team: Teams.WHITE,
        highlight: false,
        hasMoved: false, 
    }
    const boundaryCells = getNorthCells(boundaryPlace, board, boundaryPlace.team);
    expect(boundaryCells.length).toBe(0);

    const place :Cell = {
        x: 4,
        y: 5,
        type: Pieces.QUEEN,
        team: Teams.WHITE,
        highlight: false,
        hasMoved: false, 
    }
    const cells = getNorthCells(place, board, place.team);
    expect(cells.length).toBe(4);
    cells.forEach((cell, idx) => {
        expect(cell.x).toBe(place.x);
        expect(cell.y).toBe(place.y-(idx+1));
    })
})

test('getEastCells()', () => {
    const board :BoardType = init();
    const boundaryPlace = {
        x: 7,
        y: 5,
        type: Pieces.QUEEN,
        team: Teams.WHITE,
        highlight: false,
        hasMoved: false, 
    }
    const boundaryCells = getEastCells(boundaryPlace, board, boundaryPlace.team);
    expect(boundaryCells.length).toBe(0);

    const place :Cell = {
        x: 3,
        y: 5,
        type: Pieces.QUEEN,
        team: Teams.WHITE,
        highlight: false,
        hasMoved: false, 
    }
    const cells = getEastCells(place, board, place.team);
    expect(cells.length).toBe(4);
    cells.forEach((cell, idx) => {
        expect(cell.x).toBe(place.x+idx+1);
        expect(cell.y).toBe(place.y);
    })
})

test('getSouthCells()', () => {
    const board :BoardType = init();
    const boundaryPlace = {
        x: 4,
        y: 7,
        type: Pieces.QUEEN,
        team: Teams.BLACK,
        highlight: false,
        hasMoved: false, 
    }
    const boundaryCells = getSouthCells(boundaryPlace, board, boundaryPlace.team);
    expect(boundaryCells.length).toBe(0);

    const place :Cell = {
        x: 4,
        y: 2,
        type: Pieces.QUEEN,
        team: Teams.BLACK,
        highlight: false,
        hasMoved: false, 
    }
    const cells = getSouthCells(place, board, place.team);
    expect(cells.length).toBe(4);
    cells.forEach((cell, idx) => {
        expect(cell.x).toBe(place.x);
        expect(cell.y).toBe(place.y+idx+1);
    })
})

test('getWestCells()', () => {
    const board :BoardType = init();
    const boundaryPlace = {
        x: 0,
        y: 4,
        type: Pieces.QUEEN,
        team: Teams.WHITE,
        highlight: false,
        hasMoved: false, 
    }
    const boundaryCells = getWestCells(boundaryPlace, board, boundaryPlace.team);
    expect(boundaryCells.length).toBe(0);

    const place :Cell = {
        x: 4,
        y: 5,
        type: Pieces.QUEEN,
        team: Teams.WHITE,
        highlight: false,
        hasMoved: false, 
    }
    const cells = getWestCells(place, board, place.team);
    expect(cells.length).toBe(4);
    cells.forEach((cell, idx) => {
        expect(cell.x).toBe(place.x-(idx+1));
        expect(cell.y).toBe(place.y);
    })
})

test('getNorthEastCells()', () => {
    const board :BoardType = init();
    const boundaryPlace = {
        x: 7,
        y: 0,
        type: Pieces.QUEEN,
        team: Teams.WHITE,
        highlight: false,
        hasMoved: false, 
    }
    const boundaryCells = getNorthEastCells(boundaryPlace, board, boundaryPlace.team);
    expect(boundaryCells.length).toBe(0);

    const place :Cell = {
        x: 3,
        y: 5,
        type: Pieces.QUEEN,
        team: Teams.WHITE,
        highlight: false,
        hasMoved: false, 
    }
    const cells = getNorthEastCells(place, board, place.team);
    expect(cells.length).toBe(4);
    cells.forEach((cell, idx) => {
        expect(cell.x).toBe(place.x+idx+1);
        expect(cell.y).toBe(place.y-(idx+1));
    })
})

test('getNorthWestCells()', () => {
    const board :BoardType = init();
    const boundaryPlace = {
        x: 0,
        y: 0,
        type: Pieces.QUEEN,
        team: Teams.WHITE,
        highlight: false,
        hasMoved: false, 
    }
    const boundaryCells = getNorthWestCells(boundaryPlace, board, boundaryPlace.team);
    expect(boundaryCells.length).toBe(0);

    const place :Cell = {
        x: 4,
        y: 5,
        type: Pieces.QUEEN,
        team: Teams.WHITE,
        highlight: false,
        hasMoved: false, 
    }
    const cells = getNorthWestCells(place, board, place.team);
    expect(cells.length).toBe(4);
    cells.forEach((cell, idx) => {
        expect(cell.x).toBe(place.x-(idx+1));
        expect(cell.y).toBe(place.y-(idx+1));
    })
})

test('getSouthEastCells()', () => {
    const board :BoardType = init();
    const boundaryPlace = {
        x: 7,
        y: 7,
        type: Pieces.QUEEN,
        team: Teams.WHITE,
        highlight: false,
        hasMoved: false, 
    }
    const boundaryCells = getSouthEastCells(boundaryPlace, board, boundaryPlace.team);
    expect(boundaryCells.length).toBe(0);

    const place :Cell = {
        x: 3,
        y: 2,
        type: Pieces.QUEEN,
        team: Teams.BLACK,
        highlight: false,
        hasMoved: false, 
    }
    const cells = getSouthEastCells(place, board, place.team);
    expect(cells.length).toBe(4);
    cells.forEach((cell, idx) => {
        expect(cell.x).toBe(place.x+idx+1);
        expect(cell.y).toBe(place.y+idx+1);
    })
})

test('getSouthWestCells()', () => {
    const board :BoardType = init();
    const boundaryPlace = {
        x: 0,
        y: 7,
        type: Pieces.QUEEN,
        team: Teams.WHITE,
        highlight: false,
        hasMoved: false, 
    }
    const boundaryCells = getSouthWestCells(boundaryPlace, board, boundaryPlace.team);
    expect(boundaryCells.length).toBe(0);

    const place :Cell = {
        x: 4,
        y: 2,
        type: Pieces.QUEEN,
        team: Teams.WHITE,
        highlight: false,
        hasMoved: false, 
    }
    const cells = getSouthWestCells(place, board, place.team);
    expect(cells.length).toBe(4);
    cells.forEach((cell, idx) => {
        expect(cell.x).toBe(place.x-(idx+1));
        expect(cell.y).toBe(place.y+idx+1);
    })
})
