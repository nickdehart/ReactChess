import classes from './GameOver.module.css';
import { Teams } from '@/types/enums';


export function GameOver({ gameOver, turn }: { gameOver: boolean, turn: Teams }) {

    if(gameOver)
        return (
            <div className={classes.gameOver}>
                <h1>GAME OVER</h1>
                <h4>{turn === Teams.WHITE ? "Black" : "White"} Team Wins!</h4>
            </div>
        );
    return <></>;
}
