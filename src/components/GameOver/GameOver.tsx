import classes from './GameOver.module.css';
import { Teams } from '@/types/enums';
import { Modal } from "@/components/Modal";


export function GameOver({ gameOver, turn }: { gameOver: boolean, turn: Teams }) {

    if(gameOver)
        return (
            <Modal open={gameOver} header={false} closable={false} maskClosable={false} footer={false} modalClassName={classes.gameOverModal}>
                <div className={classes.gameOver}>
                    <h1>GAME OVER</h1>
                    <h2>{turn === Teams.WHITE ? "Black" : "White"} Team Wins!</h2>
                </div>
            </Modal>
        );
    return <></>;
}
