import classes from './PromotionModal.module.css';
import { Modal } from "@/components/Modal";
import { getImage } from "@/utilities/imageUtils";
import { Cell } from '@/types/common';
import { Pieces, ActionTypes } from '@/types/enums';
import { useBoard } from '@/hooks/useBoard';


interface PromotionModalProps {
    active: Cell,
    target: Cell,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>, 
    handleTurnChange(): void,
}


export function PromotionModal({ active, target, open, setOpen, handleTurnChange }: PromotionModalProps) {
    const [, dispatch] = useBoard();

    function onClose() {
        setOpen(false);
    }

    function handlePromotion(promotion: Pieces) {
        dispatch({ type: ActionTypes.PROMOTION, payload: { active, target, promotion } });
        handleTurnChange();
        onClose();
    }

    const promotionPieces = [
        Pieces.QUEEN,
        Pieces.ROOK,
        Pieces.BISHOP,
        Pieces.KNIGHT
    ]

    const images = promotionPieces.map((piece) => getImage(piece, active.team));

    return (
        <Modal open={open} onClose={onClose} title="Select a Promotion!" closable={false} maskClosable={false} footer={false}>
            <div className={classes.promotionContainer}>
                {images.map((src, idx) => 
                    <button className={classes.button} onClick={() => handlePromotion(promotionPieces[idx])} key={`${promotionPieces[idx]}-promotion-btn`}>
                        <img className={classes.piece} src={src} alt={`${promotionPieces[idx]} Promotion`} />
                    </button>
                )}
            </div>
        </Modal>
    );
}
