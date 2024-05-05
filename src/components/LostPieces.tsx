import { useId } from 'react';
import { createUseStyles } from 'react-jss';
import { Cell } from '@/types/common';
import { getImage } from "@/utilities/imageUtils";

const useStyles = createUseStyles({
    span: { width: "100%" },
    img: { maxWidth: "30px" },
})

export function LostPieces({ pieces }: { pieces: Cell[] }) {
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
