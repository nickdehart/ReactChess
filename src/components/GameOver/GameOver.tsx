import { useStyles } from './GameOver.styles';
import { Teams } from '@/types/enums';


export function GameOver({ gameOver, turn }: { gameOver: boolean, turn: Teams }) {
    const classes = useStyles();

    if(gameOver)
        return (
            <div className={classes.gameOver}>
                <h1>GAME OVER</h1>
                <h4>{turn === Teams.WHITE ? "Black" : "White"} Team Wins!</h4>
            </div>
        );
    return <></>;
}
