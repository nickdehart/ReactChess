import classes             from './Piece.module.css';
import { useBoard }        from '@/hooks/useBoard';
import { getImage }        from "@/utilities/imageUtils";
import { pawn }            from "@/utilities/pawn";
import { rook }            from "@/utilities/rook";
import { bishop }          from "@/utilities/bishop";
import { queen }           from "@/utilities/queen";
import { knight }          from "@/utilities/knight";
import { king }            from "@/utilities/king";
import { Cell }            from '@/types/common';
import { Pieces, Teams, ActionTypes } from '@/types/enums';


interface PieceProps {
    piece: Cell,
    setActive: React.Dispatch<React.SetStateAction<Cell | null>>, 
    turn: Teams, 
    gameOver: boolean
}


export function Piece({ piece, setActive, turn, gameOver }: PieceProps) {
    const [board, dispatch] = useBoard();

    const getMovements = (piece: Cell) => {
        if (piece.team !== turn || gameOver) return;
        let movements = [];
        switch (piece.type) {
            case Pieces.PAWN  : movements = pawn(piece, board);   break;
            case Pieces.ROOK  : movements = rook(piece, board);   break;
            case Pieces.BISHOP: movements = bishop(piece, board); break;
            case Pieces.QUEEN : movements = queen(piece, board);  break;
            case Pieces.KNIGHT: movements = knight(piece, board); break;
            default:  movements = king(piece, board);
        }

        dispatch({ type: ActionTypes.HIGHLIGHT, payload: { movements } });
        setActive(piece);
    };

    const imgSrc = getImage(piece.type, piece.team);
    if(imgSrc)
        return (
            <button className={classes.button} onClick={() => getMovements(piece)}>
                <img className={classes.piece} src={imgSrc} alt={`${piece.team} ${piece.type}`} />
            </button>
        );
    return <></>;
}
