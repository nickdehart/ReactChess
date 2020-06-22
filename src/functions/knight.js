export default function (piece, board) {
  let possible = [
    { x: piece.x + 2, y: piece.y + 1 },
    { x: piece.x + 2, y: piece.y - 1 },
    { x: piece.x - 2, y: piece.y + 1 },
    { x: piece.x - 2, y: piece.y - 1 },
    { x: piece.x + 1, y: piece.y + 2 },
    { x: piece.x + 1, y: piece.y - 2 },
    { x: piece.x - 1, y: piece.y + 2 },
    { x: piece.x - 1, y: piece.y - 2 },
  ];

  let moves = [];
  for (let i = 0; i < possible.length; i++) {
    let x = possible[i].x;
    let y = possible[i].y;
    if (x < 8 && x > -1 && y < 8 && y > -1 && board[x][y].team !== piece.team)
      moves.push(possible[i]);
  }
  return moves;
}
