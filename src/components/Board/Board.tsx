import classes      from './Board.module.css';
import { Piece }    from "@/components/Piece";
import { useBoard } from "@/hooks/useBoard";
import { Cell }     from '@/types/common';


export function Board({ handleMove }: { handleMove: (target: Cell)=>void }) {
    const { board } = useBoard();

    return (
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
                                {col.type !== null && <Piece piece={col} />}
                            </td>
                        )}

                    </tr>
                ))}
            </tbody>
        </table>
    );
}
