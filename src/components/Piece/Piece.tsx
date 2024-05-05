import classes             from './Piece.module.css';
import { Cell, BoardType } from '@/types/common';
import { Pieces, Teams }   from '@/types/enums';
import { getImage }        from "@/utilities/imageUtils";
import { pawn }            from "@/utilities/pawn";
import { rook }            from "@/utilities/rook";
import { bishop }          from "@/utilities/bishop";
import { queen }           from "@/utilities/queen";
import { knight }          from "@/utilities/knight";
import { king }            from "@/utilities/king";


interface PieceProps {
    piece: Cell,
    board: BoardType, 
    setBoard: React.Dispatch<React.SetStateAction<BoardType>>, 
    setActive: React.Dispatch<React.SetStateAction<Cell | null>>, 
    turn: Teams, 
    gameOver: boolean
}


export function Piece({ piece, board, setBoard, setActive, turn, gameOver }: PieceProps) {

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

        setBoard(b => 
            b.map((row) => 
                row.map((cell) => {
                    const foundMovement = movements.find(({ x, y }) => cell.x === x && cell.y === y);
                    return { ...cell, highlight: foundMovement ? true : false };
                })
            )
        )
        
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
