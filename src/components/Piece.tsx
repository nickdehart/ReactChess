

import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    button: {
        border: "none", 
        backgroundColor: "inherit"
    },
    piece: {
        maxWidth: 40,
        maxHeight: 40
    }
})

interface PieceProps {
    getMovements: (arg: any)=>void,
    piece: any,
    src: any
}

export function Piece({ getMovements, piece, src }: PieceProps) {
    const classes = useStyles();
    if(src)
        return (
            <button className={classes.button} onClick={() => getMovements(piece)}>
                <img className={classes.piece} src={src} alt={`${piece.team} ${piece.type}`} />
            </button>
        );
    return <></>;
}
