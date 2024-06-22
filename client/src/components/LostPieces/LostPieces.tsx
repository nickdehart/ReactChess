import { useId } from 'react';
import classes from './LostPieces.module.css';
import { useGame } from "@/hooks/useGame";
import { Cell } from '@/types/common';
import { getImage } from "@/utilities/imageUtils";
import { Col } from '../Col';
import { Row } from '../Row';


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
        <Col xs={12} s={12} m={12} l={3} xl={3}>
            <Row className={classes.lostPiecesContainer}>
                <Col className={classes.teamWhiteContainer}>
                    <b>Taken White Pieces</b>
                    <span className={classes.imageContainer}>{mapPieces(lostWhitePieces)}</span>
                </Col>
                <Col className={classes.teamBlackContainer}>
                    <b>Taken Black Pieces</b>
                    <span className={classes.imageContainer}>{mapPieces(lostBlackPieces)}</span>
                </Col>
            </Row>
        </Col>
    );
}
