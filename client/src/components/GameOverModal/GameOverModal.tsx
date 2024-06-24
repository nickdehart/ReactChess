import classes from './GameOverModal.module.css';
import { Modal } from "@/components/ui/Modal";
import { useBoard } from '@/hooks/useBoard';
import { Teams } from '@/types/enums';


export function GameOverModal({ gameOver, turn }: { gameOver: boolean, turn: Teams }) {
    const { reset } = useBoard();

    if(gameOver)
        return (
            <Modal open={gameOver} header={false} closable={false} maskClosable={false} footer={false} modalClassName={classes.gameOverModal}>
                <div className={classes.gameOver}>
                    <h1>GAME OVER</h1>
                    <h2>{turn === Teams.WHITE ? "Black" : "White"} Team Wins!</h2>
                    <button onClick={() => reset()}>New Game</button>
                </div>
            </Modal>
        );
    return <></>;
}
