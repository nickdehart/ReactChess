import { useId } from 'react';
import classes from './LostPieces.module.css';
import { Cell } from '@/types/common';
import { getImage } from "@/utilities/imageUtils";


export function LostPieces({ pieces }: { pieces: Cell[] }) {
    const id = useId();

    return (
        <span className={classes.span}>
            {pieces.map(({ team, type }: Cell, index: number) => 
                <img key={`${id}-lost-${index}`} className={classes.img} src={getImage(type, team)} alt={`${team} ${type}`} />
            )}
        </span>
    );
}
