import classes from './PromotionModal.module.css';
import { Modal } from "@/components/Modal";
import { getImage } from "@/utilities/imageUtils";
import { Pieces } from '@/types/enums';
import { useBoard } from '@/hooks/useBoard';
import { useGame } from '@/hooks/useGame';


interface PromotionModalProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>, 
}

export function PromotionModal({ open, setOpen }: PromotionModalProps) {
    const { promote } = useBoard();
    const { game } = useGame();
    const { active, target } = game;

    function onClose() {
        setOpen(false);
    }

    function handlePromotion(promotion: Pieces) {
        if(active && target) {
            promote({ active, target, promotion });
            onClose();
        }
    }

    const promotionPieces = [
        Pieces.QUEEN,
        Pieces.ROOK,
        Pieces.BISHOP,
        Pieces.KNIGHT
    ]

    const images = active ? promotionPieces.map((piece) => getImage(piece, active.team)) : [];

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
