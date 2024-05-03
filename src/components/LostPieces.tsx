import { useId } from 'react';
import { createUseStyles } from 'react-jss';
import { Cell } from '@/types/common';
import { Pieces, Teams } from '@/types/enums';

const useStyles = createUseStyles({
    span: { width: "100%" },
    img: { maxWidth: "30px" },
})

export function LostPieces({ pieces, getImage }: { pieces: Cell[], getImage: (piece: Pieces, team: Teams) => string }) {
    const id = useId();
    const classes = useStyles();

    return (
        <span className={classes.span}>
            {pieces.map(({ team, type }: Cell, index: number) => 
                <img key={`${id}-lost-${index}`} className={classes.img} src={getImage(type, team)} alt={`${team} ${type}`} />
            )}
        </span>
    );
}
