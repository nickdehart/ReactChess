import { useId } from 'react';
import classes from './LostPieces.module.css';
import { useGame } from "@/hooks/useGame";
import { Cell } from '@/types/common';
import { getImage } from "@/utilities/imageUtils";


export function LostPieces() {
    const id = useId();
    const { game } = useGame();
    const { lostWhitePieces, lostBlackPieces } = game;

    const mapPieces = (pieces: Cell[]) => {
        return pieces.map(({ team, type }: Cell, index: number) => 
            <img 
                key={`${id}-lost-white-${index}`} 
                className={classes.img} 
                src={getImage(type, team)} 
                alt={`${team} ${type}`} 
            />
        )
    }

    return (
        <aside className={classes.lostPiecesContainer}>
            <div className={classes.teamWhiteContainer}>
                <b>Taken White Pieces</b>
                <span className={classes.imageContainer}>{mapPieces(lostWhitePieces)}</span>
            </div>
            <div className={classes.teamBlackContainer}>
                <b>Taken Black Pieces</b>
                <span className={classes.imageContainer}>{mapPieces(lostBlackPieces)}</span>
            </div>
        </aside>
    );
}
