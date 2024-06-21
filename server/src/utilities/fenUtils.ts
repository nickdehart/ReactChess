
export function validateFEN(fen: string) {
    if((fen.match(/\//g) || []).length !== 7)
        throw new Error("[FEN Validation] - Incorrect row count.")
    if((fen.match(/P/g) || []).length > 8)
        throw new Error("[FEN Validation] - Too many white pawns.")
    if((fen.match(/p/g) || []).length > 8)
        throw new Error("[FEN Validation] - Too many black pawns.")
    if((fen.match(/\s*([rnbqkpRNBQKP1-8]+\/){7}([rnbqkpRNBQKP1-8]+)\s[bw-]\s(([a-hkqA-HKQ]{1,4})|(-))\s(([a-h][36])|(-))\s\d+\s\d+\s*/g) || []).length < 1)
        throw new Error("[FEN Validation] - Incorrect FEN.")
}
