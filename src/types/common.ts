import { Pieces, Teams } from '@/types/enums';

export interface Cell {
    x: number,
    y: number,
    type: Pieces,
    team: Teams,
    highlight: boolean,
}

export type BoardType = Cell[][];

export interface MovementType {
    y: number;
    x: number;
}
