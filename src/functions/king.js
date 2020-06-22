export default function (piece, board) {
  let possible = [
    { x: piece.x, y: piece.y + 1 }, // east
    { x: piece.x + 1, y: piece.y + 1 }, // southeast
    { x: piece.x + 1, y: piece.y }, // south
    { x: piece.x + 1, y: piece.y - 1 }, // southwest
    { x: piece.x, y: piece.y - 1 }, // west
    { x: piece.x - 1, y: piece.y - 1 }, // northwest
    { x: piece.x - 1, y: piece.y }, // north
    { x: piece.x - 1, y: piece.y + 1 }, //northeast
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
