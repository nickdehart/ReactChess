import { ReactNode, CSSProperties } from 'react';
import classes from './Row.module.css';

export function Row({ children=<></>, className="", style }: { children?: ReactNode, className?: string, style?: CSSProperties }) {
    return (
        <div className={`${classes.row} ${className}`} style={style}>
            {children}
        </div>
    );
}
