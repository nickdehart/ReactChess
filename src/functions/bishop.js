export default function (piece, board) {
  let moves = [];

  // southeast
  for (let x = piece.x + 1; x < 8; x++) {
    let y = Math.abs(x - piece.x) + piece.y;
    if (y < 8)
      if (!board[x][y].team) moves.push({ x: x, y: y });
      else if (board[x][y].team !== piece.team) {
        moves.push({ x: x, y: y });
        break;
      } else {
        break;
      }
  }

  // southwest
  for (let x = piece.x + 1; x < 8; x++) {
    let y = piece.y - Math.abs(x - piece.x);
    if (y > -1)
      if (!board[x][y].team) moves.push({ x: x, y: y });
      else if (board[x][y].team !== piece.team) {
        moves.push({ x: x, y: y });
        break;
      } else {
        break;
      }
  }

  // northeast
  for (let x = piece.x - 1; x > -1; x--) {
    let y = Math.abs(x - piece.x) + piece.y;
    if (y < 8)
      if (!board[x][y].team) moves.push({ x: x, y: y });
      else if (board[x][y].team !== piece.team) {
        moves.push({ x: x, y: y });
        break;
      } else {
        break;
      }
  }

  // southwest
  for (let x = piece.x - 1; x > -1; x--) {
    let y = piece.y - Math.abs(x - piece.x);
    if (y > -1)
      if (!board[x][y].team) moves.push({ x: x, y: y });
      else if (board[x][y].team !== piece.team) {
        moves.push({ x: x, y: y });
        break;
      } else {
        break;
      }
  }

  return moves;
}
