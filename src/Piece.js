import React from "react";

function Piece({ getMovements, piece }) {
  return (
    <button
      style={{ border: "none", backgroundColor: "inherit" }}
      onClick={() => getMovements(piece)}
    >
      <img
        className="Piece"
        src={`${process.env.PUBLIC_URL}/chesspieces/${piece.team}${piece.type}.png`}
        alt={`${piece.team}${piece.type}`}
      />
    </button>
  );
}

export default Piece;
