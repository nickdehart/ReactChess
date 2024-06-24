import { CSSProperties, ReactNode } from 'react';
import classes from './Col.module.css';

interface ColProps {
    span?: number, 
    xs?: number, 
    s?: number, 
    m?: number, 
    l?: number, 
    xl?: number, 
    children?: ReactNode, 
    className?: string,
    style?: CSSProperties
}
export function Col({ span=12, xs, s, m, l, xl, children=<></>, className="", style }: ColProps) {
    return (
        <div 
            style={style}
            className={`
                ${classes[`col-xs-${xs || span}`]}
                ${classes[`col-s-${s || span}`]}
                ${classes[`col-m-${m || span}`]}
                ${classes[`col-l-${l || span}`]}
                ${classes[`col-xl-${xl || span}`]}
                ${className}
            `}
        >
            {children}
        </div>
    );
}
