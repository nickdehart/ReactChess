import classes from './Header.module.css';
import { useBoard } from '@/hooks/useBoard';

export function Header() {
    const { reset } = useBoard();
    return (
        <header className={classes.header}>
            <h1>React Chess</h1>
            <button onClick={() => reset()}>New Game</button>
        </header>
    )
}
