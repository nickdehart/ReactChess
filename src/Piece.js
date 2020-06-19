import React from "react";

function Piece({ board, setBoard, piece }) {
  const pawn = () => {
    if (piece.team === "b") {
      if (piece.x + 1 > 7) return [];
      if (piece.x === 1) {
        if (board[piece.x + 1][piece.y].type) return [];
        else if (board[piece.x + 2][piece.y].type)
          return [{ x: piece.x + 1, y: piece.y }];
        return [
          { x: piece.x + 1, y: piece.y },
          { x: piece.x + 2, y: piece.y },
        ];
      }
      if (board[piece.x + 1][piece.y].type) return [];
      return [{ x: piece.x + 1, y: piece.y }];
    } else {
      if (piece.x - 1 < 0) return [];
      if (piece.x === 6) {
        if (board[piece.x - 1][piece.y].type) return [];
        else if (board[piece.x - 2][piece.y].type)
          return [{ x: piece.x - 1, y: piece.y }];
        return [
          { x: piece.x - 1, y: piece.y },
          { x: piece.x - 2, y: piece.y },
        ];
      }
      if (board[piece.x - 1][piece.y].type) return [];
      return [{ x: piece.x - 1, y: piece.y }];
    }
  };

  const getMovements = () => {
    let movements;
    switch (piece.type) {
      case "P":
        movements = pawn();
        break;
      default:
        console.log("default");
    }
    console.log(movements);
    for (let i = 0; i < movements.length; i++) {
      board[movements[i].x][movements[i].y].active = true;
    }
    setBoard(board);
  };

  return (
    <img
      className="Piece"
      onClick={getMovements}
      src={`${process.env.PUBLIC_URL}/chesspieces/${piece.team}${piece.type}.png`}
      alt={`${piece.team}${piece.type}`}
    />
  );
}

export default Piece;
