import classes     from './Piece.module.css';
import { useBoard }from '@/hooks/useBoard';
import { useGame } from "@/hooks/useGame";
import { getImage }from "@/utilities/imageUtils";
import { pawn }    from "@/utilities/pawn";
import { rook }    from "@/utilities/rook";
import { bishop }  from "@/utilities/bishop";
import { queen }   from "@/utilities/queen";
import { knight }  from "@/utilities/knight";
import { king }    from "@/utilities/king";
import { Cell }    from '@/types/common';
import { Pieces }  from '@/types/enums';


export function Piece({ piece }: { piece: Cell }) {
    const { board, highlight } = useBoard();
    const { game, setActive } = useGame();
    const { turn, gameOverStatus } = game;


    const getMovements = (piece: Cell) => {
        if (piece.team !== turn || gameOverStatus) return;
        let movements = [];
        switch (piece.type) {
            case Pieces.PAWN  : movements = pawn(piece, board);   break;
            case Pieces.ROOK  : movements = rook(piece, board);   break;
            case Pieces.BISHOP: movements = bishop(piece, board); break;
            case Pieces.QUEEN : movements = queen(piece, board);  break;
            case Pieces.KNIGHT: movements = knight(piece, board); break;
            default:  movements = king(piece, board);
        }

        highlight(movements);
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
