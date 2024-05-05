import { Teams, Pieces } from "@/types/enums";

interface imgSrcType {
    [Teams.BLACK]: { [key in Pieces]: string },
    [Teams.WHITE]: { [key in Pieces]: string },
}

const imgSrcs :imgSrcType = {
    [Teams.BLACK]: {
        [Pieces.KING]  : "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg",
        [Pieces.QUEEN] : "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg",
        [Pieces.ROOK]  : "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg",
        [Pieces.KNIGHT]: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg",
        [Pieces.BISHOP]: "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg",
        [Pieces.PAWN]  : "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg",
        [Pieces.EMPTY] : ""
    },
    [Teams.WHITE]: {
        [Pieces.KING]  : "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg",
        [Pieces.QUEEN] : "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg",
        [Pieces.ROOK]  : "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg",
        [Pieces.KNIGHT]: "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg",
        [Pieces.BISHOP]: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg",
        [Pieces.PAWN]  : "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg",
        [Pieces.EMPTY] : ""
    }
}

export const getImage = (piece: Pieces, team: Teams) :string => {
    if(team === Teams.EMPTY) return "";
    return imgSrcs[team][piece];
}
