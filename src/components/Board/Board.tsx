import { useState }        from "react";
import { useStyles }       from './Board.styles';

import BlackBishop         from '@/assets/chesspieces/bB.png';
import BlackKing           from '@/assets/chesspieces/bK.png';
import BlackKnight         from '@/assets/chesspieces/bN.png';
import BlackPawn           from '@/assets/chesspieces/bP.png';
import BlackQueen          from '@/assets/chesspieces/bQ.png';
import BlackRook           from '@/assets/chesspieces/bR.png';
import WhiteBishop         from '@/assets/chesspieces/wB.png';
import WhiteKing           from '@/assets/chesspieces/wK.png';
import WhiteKnight         from '@/assets/chesspieces/wN.png';
import WhitePawn           from '@/assets/chesspieces/wP.png';
import WhiteQueen          from '@/assets/chesspieces/wQ.png';
import WhiteRook           from '@/assets/chesspieces/wR.png';
import { Piece }           from "@/components/Piece";
import { LostPieces }      from "@/components/LostPieces";
import { GameOver }        from "@/components/GameOver";
import { init }            from "@/utilities/init";
import { pawn }            from "@/utilities/pawn";
import { rook }            from "@/utilities/rook";
import { bishop }          from "@/utilities/bishop";
import { queen }           from "@/utilities/queen";
import { knight }          from "@/utilities/knight";
import { king }            from "@/utilities/king";
import { Cell, BoardType } from '@/types/common';
import { Pieces, Teams }   from '@/types/enums';


export function Board() {
    const classes = useStyles();

    const [board, setBoard] = useState<BoardType>(init());
    const [turn, setTurn] = useState<Teams>(Teams.WHITE);
    const [active, setActive] = useState<Cell | null>(null);
    const [lostWPieces, setLostWPieces] = useState<Cell[]>([]);
    const [lostBPieces, setLostBPieces] = useState<Cell[]>([]);
    const [gameOver, setGameOver] = useState<boolean>(false);

    const getImage = (piece: Pieces, team: Teams) => {
        switch(piece) {
            case Pieces.PAWN: 
                if(team === Teams.WHITE) return WhitePawn;
                return BlackPawn;
            case Pieces.ROOK  : 
                if(team === Teams.WHITE) return WhiteRook;
                return BlackRook;
            case Pieces.BISHOP:
                if(team === Teams.WHITE) return WhiteBishop;
                return BlackBishop;
            case Pieces.QUEEN :
                if(team === Teams.WHITE) return WhiteQueen;
                return BlackQueen;
            case Pieces.KNIGHT:
                if(team === Teams.WHITE) return WhiteKnight;
                return BlackKnight;
            case Pieces.KING: 
                if(team === Teams.WHITE) return WhiteKing;
                return BlackKing;
            default: return "";
        }
    }

    const handleReset = () => {
        setBoard(init());
        setLostWPieces([]);
        setLostBPieces([]);
        setTurn(Teams.WHITE);
        setGameOver(false);
    }

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

    const handleMove = (target: Cell) => {
        // only an active piece can move
        if(!active) return;

        if (target.type === Pieces.KING) setGameOver(true);
        const targetPosition = board[target.y][target.x];

        // Push lost pieces
        if(target.team === Teams.WHITE) setLostWPieces(w => [ ...w, target]);
        if(target.team === Teams.BLACK) setLostBPieces(b => [ ...b, target]);

        setBoard(b => 
            b.map((row) => 
                row.map((cell) => {

                    // reset source position back to empty
                    const isSource :boolean = cell.x === active.x && cell.y === active.y;
                    if(isSource)
                        return { ...cell, type: Pieces.EMPTY, team: Teams.EMPTY, highlight: false };

                    // set target to the new piece
                    const isTarget :boolean = cell.x === targetPosition.x && cell.y === targetPosition.y;
                    if(isTarget)
                        return { ...cell, type: active.type, team: active.team, highlight: false };

                    // make sure no cells are left highlighted
                    return { ...cell, highlight: false };
                })
            )
        )

        setActive(null);
        if (turn === Teams.WHITE) setTurn(Teams.BLACK);
        else setTurn(Teams.WHITE);
    };

    return (
        <section className={classes.section}>

            <GameOver gameOver={gameOver} turn={turn} />

            <LostPieces pieces={lostWPieces} getImage={getImage} />

            <table className={classes.table}>
                <thead>
                    <tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th><th>H</th></tr>
                </thead>

                <tbody>
                    {board.map((row, rowIndex) => (
                        <tr key={`row-${rowIndex}`}>

                            <td><b>{rowIndex + 1}</b></td>

                            {row.map((col, colIndex) => 
                                <td
                                    key={`col-${colIndex}`}
                                    onClick={col.highlight ? () => handleMove(col) : () => {}}
                                    className={`${classes.cell} ${col.highlight ? classes.cellHighlight : classes.cellNoHighlight}`}
                                >
                                    {col.type !== null && <Piece getMovements={getMovements} piece={col} src={getImage(col.type, col.team)} />}
                                </td>
                            )}

                        </tr>
                    ))}
                </tbody>
            </table>

            <LostPieces pieces={lostBPieces} getImage={getImage} />

            <button className={classes.newGameBtn} onClick={handleReset}>Start New Game</button>

        </section>
    );
}
