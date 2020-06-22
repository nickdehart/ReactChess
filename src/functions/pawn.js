export default function (piece, board) {
  let moves = [];
  if (piece.team === "b") {
    // BLACK TEAM
    // move out of bounds
    if (piece.x + 1 > 7) return moves;

    // still in starting position
    if (piece.x === 1) {
      if (
        !board[piece.x + 1][piece.y].type &&
        !board[piece.x + 2][piece.y].type
      ) {
        moves.push({ x: piece.x + 1, y: piece.y });
        moves.push({ x: piece.x + 2, y: piece.y });
      } else if (!board[piece.x + 1][piece.y].type)
        moves.push({ x: piece.x + 1, y: piece.y });
    } else if (!board[piece.x + 1][piece.y].type)
      // not in starting position
      moves.push({ x: piece.x + 1, y: piece.y });

    // check for possible attacks
    if (
      piece.y - 1 > -1 &&
      board[piece.x + 1][piece.y - 1].type &&
      board[piece.x + 1][piece.y - 1].team !== "b"
    )
      moves.push({ x: piece.x + 1, y: piece.y - 1 });
    if (
      piece.y + 1 < 8 &&
      board[piece.x + 1][piece.y + 1].type &&
      board[piece.x + 1][piece.y + 1].team !== "b"
    )
      moves.push({ x: piece.x + 1, y: piece.y + 1 });
  } else {
    // WHITE TEAM
    // move out of bounds
    if (piece.x - 1 < 0) return moves;

    // still in starting position
    if (piece.x === 6) {
      if (
        !board[piece.x - 1][piece.y].type &&
        !board[piece.x - 2][piece.y].type
      ) {
        moves.push({ x: piece.x - 1, y: piece.y });
        moves.push({ x: piece.x - 2, y: piece.y });
      } else if (!board[piece.x - 1][piece.y].type)
        moves.push({ x: piece.x - 1, y: piece.y });
    } else if (!board[piece.x - 1][piece.y].type)
      // not in starting position
      moves.push({ x: piece.x - 1, y: piece.y });

    // check for possible attacks
    if (
      piece.y - 1 > -1 &&
      board[piece.x - 1][piece.y - 1].type &&
      board[piece.x - 1][piece.y - 1].team !== "w"
    )
      moves.push({ x: piece.x - 1, y: piece.y - 1 });
    if (
      piece.y + 1 < 8 &&
      board[piece.x - 1][piece.y + 1].type &&
      board[piece.x - 1][piece.y + 1].team !== "w"
    )
      moves.push({ x: piece.x - 1, y: piece.y + 1 });
  }
  return moves;
}
