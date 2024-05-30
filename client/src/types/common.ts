import { Pieces, Teams } from '@/types/enums';

export interface Cell {
    x: number,
    y: number,
    type: Pieces,
    team: Teams,
    highlight: boolean,
    hasMoved: boolean, // only relevant for king/rook castle move
}

export type BoardType = Cell[][];

export interface MovementType {
    y: number;
    x: number;
}
