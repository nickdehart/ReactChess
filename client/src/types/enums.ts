export enum Teams {
    WHITE = "WHITE",
    BLACK = "BLACK",
    EMPTY = "EMPTY"
}

export enum Pieces {
    PAWN = "PAWN",
    ROOK = "ROOK",
    BISHOP = "BISHOP",
    QUEEN = "QUEEN",
    KNIGHT = "KNIGHT",
    KING = "KING",
    EMPTY = "EMPTY"
}

export enum Columns {
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H
}

export enum Rows {
    ONE,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT
}

export enum BoardActions {
    STANDARD = "STANDARD",
    CASTLE = "CASTLE",
    PROMOTION = "PROMOTION",
    RESET = "RESET",
    HIGHLIGHT = "HIGHLIGHT"
}

export enum GameActions {
    CHANGE_TURN = "CHANGE_TURN",
    UPDATE_ACTIVE = "UPDATE_ACTIVE",
    UPDATE_TARGET = "UPDATE_TARGET",
    UPDATE_LOST_WHITE_PIECES = "UPDATE_LOST_WHITE_PIECES",
    UPDATE_LOST_BLACK_PIECES = "UPDATE_LOST_BLACK_PIECES",
    UPDATE_GAME_OVER_STATUS = "UPDATE_GAME_OVER_STATUS",
    RESET = "RESET",
}

export enum HistoryActions {
    ADD = "ADD",
    RESET = "RESET",
}

export enum FenBlackMap {
    PAWN = "p",
    ROOK = "r",
    BISHOP = "b",
    QUEEN = "q",
    KNIGHT = "n",
    KING = "k",
    EMPTY = "EMPTY"
}

export enum FenWhiteMap {
    PAWN = "P",
    ROOK = "R",
    BISHOP = "B",
    QUEEN = "Q",
    KNIGHT = "N",
    KING = "K",
    EMPTY = "EMPTY"
}
