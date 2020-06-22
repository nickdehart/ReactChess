export default function (piece, board) {
  let moves = [];

  // x values greater than piece.x
  for (let x = piece.x + 1; x < 8; x++) {
    if (!board[x][piece.y].team) moves.push({ x: x, y: piece.y });
    else if (board[x][piece.y].team !== piece.team) {
      moves.push({ x: x, y: piece.y });
      break;
    } else break;
  }

  // x values less than piece.x
  for (let x = piece.x - 1; x > -1; x--) {
    if (!board[x][piece.y].team) moves.push({ x: x, y: piece.y });
    else if (board[x][piece.y].team !== piece.team) {
      moves.push({ x: x, y: piece.y });
      break;
    } else break;
  }

  // y values greater than piece.y
  for (let y = piece.y + 1; y < 8; y++) {
    if (!board[piece.x][y].team) moves.push({ x: piece.x, y: y });
    else if (board[piece.x][y].team !== piece.team) {
      moves.push({ x: piece.x, y: y });
      break;
    } else break;
  }

  // y values less than piece.y
  for (let y = piece.y - 1; y > -1; y--) {
    if (!board[piece.x][y].team) moves.push({ x: piece.x, y: y });
    else if (board[piece.x][y].team !== piece.team) {
      moves.push({ x: piece.x, y: y });
      break;
    } else break;
  }

  return moves;
}
