import rook from "./rook";
import bishop from "./bishop";

export default function (piece, board) {
  let rookMoves = rook(piece, board);
  let bishopMoves = bishop(piece, board);
  return rookMoves.concat(bishopMoves);
}
