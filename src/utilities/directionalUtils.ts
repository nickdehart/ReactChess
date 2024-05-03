import { Cell, BoardType } from '@/types/common';
import { Teams } from '@/types/enums';
import { BOARD_SIZE } from '@/types/constants';


export function getNorthCell({ x, y }: Cell, board: BoardType) :Cell | undefined {
    if(y-1 < 0) return undefined;
    return board[y-1][x];
}

export function getSouthCell({ x, y }: Cell, board: BoardType) :Cell | undefined {
    if(y+1 >= BOARD_SIZE) return undefined;
    return board[y+1][x];
}

export function getEastCell({ x, y }: Cell, board: BoardType) :Cell | undefined {
    if(x+1 >= BOARD_SIZE) return undefined;
    return board[y][x+1];
}

export function getWestCell({ x, y }: Cell, board: BoardType) :Cell | undefined {
    if(x-1 < 0) return undefined;
    return board[y][x-1];
}

export function getNorthEastCell({ x, y }: Cell, board: BoardType) :Cell | undefined {
    if(y-1 < 0) return undefined;
    if(x+1 >= BOARD_SIZE) return undefined;
    return board[y-1][x+1];
}

export function getNorthWestCell({ x, y }: Cell, board: BoardType) :Cell | undefined {
    if(y-1 < 0) return undefined;
    if(x-1 < 0) return undefined;
    return board[y-1][x-1];
}

export function getSouthEastCell({ x, y }: Cell, board: BoardType) :Cell | undefined {
    if(y+1 >= BOARD_SIZE) return undefined;
    if(x+1 >= BOARD_SIZE) return undefined;
    return board[y+1][x+1];
}

export function getSouthWestCell({ x, y }: Cell, board: BoardType) :Cell | undefined {
    if(y+1 >= BOARD_SIZE) return undefined;
    if(x-1 < 0) return undefined;
    return board[y+1][x-1];
}

export function getNorthCells(piece: Cell, board: BoardType, team: Teams) :Cell[] {
    const north = getNorthCell(piece, board);
    if(north && north.team !== team && north.team !== Teams.EMPTY) // occupied other team cell
        return [north];
    else if(north && north.team === Teams.EMPTY) // unoccupied cell
        return [north, ...getNorthCells(north, board, team)];
    return [];
}

export function getSouthCells(piece: Cell, board: BoardType, team: Teams) :Cell[] {
    const south = getSouthCell(piece, board);
    if(south && south.team !== team && south.team !== Teams.EMPTY) // occupied other team cell
        return [south];
    else if(south && south.team === Teams.EMPTY) // unoccupied cell
        return [south, ...getSouthCells(south, board, team)];
    return [];
}

export function getEastCells(piece: Cell, board: BoardType, team: Teams) :Cell[] {
    const east = getEastCell(piece, board);
    if(east && east.team !== team && east.team !== Teams.EMPTY) // occupied other team cell
        return [east];
    else if(east && east.team === Teams.EMPTY) // unoccupied cell
        return [east, ...getEastCells(east, board, team)];
    return [];
}

export function getWestCells(piece: Cell, board: BoardType, team: Teams) :Cell[] {
    const west = getWestCell(piece, board);
    if(west && west.team !== team && west.team !== Teams.EMPTY) // occupied other team cell
        return [west];
    else if(west && west.team === Teams.EMPTY) // unoccupied cell
        return [west, ...getWestCells(west, board, team)];
    return [];
}

export function getNorthEastCells(piece: Cell, board: BoardType, team: Teams) :Cell[] {
    const northeast = getNorthEastCell(piece, board);
    if(northeast && northeast.team !== team && northeast.team !== Teams.EMPTY) // occupied other team cell
        return [northeast];
    else if(northeast && northeast.team === Teams.EMPTY) // unoccupied cell
        return [northeast, ...getNorthEastCells(northeast, board, team)];
    return [];
}


export function getNorthWestCells(piece: Cell, board: BoardType, team: Teams) :Cell[] {
    const northwest = getNorthWestCell(piece, board);
    if(northwest && northwest.team !== team && northwest.team !== Teams.EMPTY) // occupied other team cell
        return [northwest];
    else if(northwest && northwest.team === Teams.EMPTY) // unoccupied cell
        return [northwest, ...getNorthWestCells(northwest, board, team)];
    return [];
}


export function getSouthEastCells(piece: Cell, board: BoardType, team: Teams) :Cell[] {
    const southeast = getSouthEastCell(piece, board);
    if(southeast && southeast.team !== team && southeast.team !== Teams.EMPTY) // occupied other team cell
        return [southeast];
    else if(southeast && southeast.team === Teams.EMPTY) // unoccupied cell
        return [southeast, ...getSouthEastCells(southeast, board, team)];
    return [];
}


export function getSouthWestCells(piece: Cell, board: BoardType, team: Teams) :Cell[] {
    const southwest = getSouthWestCell(piece, board);
    if(southwest && southwest.team !== team && southwest.team !== Teams.EMPTY) // occupied other team cell
        return [southwest];
    else if(southwest && southwest.team === Teams.EMPTY) // unoccupied cell
        return [southwest, ...getSouthWestCells(southwest, board, team)];
    return [];
}
