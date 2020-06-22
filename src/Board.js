import React from "react";
import Piece from "./Piece";
import setup from "./functions/setup";
import pawn from "./functions/pawn";
import rook from "./functions/rook";
import bishop from "./functions/bishop";
import queen from "./functions/queen";
import knight from "./functions/knight";
import king from "./functions/king";

function Board() {
  const [board, setBoard] = React.useState([]);
  const [turn, setTurn] = React.useState("w");
  const [active, setActive] = React.useState(null);
  const [lost, setLost] = React.useState({ b: [], w: [] });
  const [gameOver, setGameOver] = React.useState(false);

  React.useEffect(() => {
    setBoard(setup());
  }, []);

  const getMovements = (piece) => {
    if (piece.team !== turn || gameOver) return;

    let movements = [];
    switch (piece.type) {
      case "P":
        movements = pawn(piece, board);
        break;
      case "R":
        movements = rook(piece, board);
        break;
      case "B":
        movements = bishop(piece, board);
        break;
      case "Q":
        movements = queen(piece, board);
        break;
      case "N":
        movements = knight(piece, board);
        break;
      default:
        movements = king(piece, board);
    }
    // console.log(movements);
    for (let x in board) for (let y in board[x]) board[x][y].active = false;
    for (let i = 0; i < movements.length; i++) {
      board[movements[i].x][movements[i].y].active = true;
    }
    setBoard(board);
    setActive(piece);
  };

  const handleMove = (target) => {
    if (target.type === "K") setGameOver(true);
    if (board[target.x][target.y].type)
      lost[board[target.x][target.y].team].push({ ...target });
    board[target.x][target.y].type = active.type;
    board[target.x][target.y].team = active.team;
    board[active.x][active.y].type = null;
    board[active.x][active.y].team = null;
    for (let x in board) for (let y in board[x]) board[x][y].active = false;
    setBoard(board);
    setActive(null);
    setLost(lost);
    if (turn === "w") setTurn("b");
    else setTurn("w");
  };

  return (
    <div
      style={{
        width: "90%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      {gameOver && (
        <div
          style={{
            position: "absolute",
            borderRadius: "10% 10%",
            border: "3px solid",
            backgroundColor: "white",
            padding: "20px 60px 20px 60px",
            transform: "translate(100%, 100%)",
          }}
        >
          <h1>GAME OVER</h1>
          <h4>{turn === "w" ? "Black" : "White"} Team Wins!</h4>
        </div>
      )}
      <div style={{ width: "20%" }}>
        {lost.w.map((item, index) => (
          <img
            key={`w-lost-${index}`}
            style={{ maxWidth: "30px" }}
            src={`${process.env.PUBLIC_URL}/chesspieces/${item.team}${item.type}.png`}
            alt={`${item.team}${item.type}`}
          />
        ))}
      </div>
      <table style={{ minWidth: "510px" }}>
        <thead>
          <tr>
            <th></th>
            <th>A</th>
            <th>B</th>
            <th>C</th>
            <th>D</th>
            <th>E</th>
            <th>F</th>
            <th>G</th>
            <th>H</th>
          </tr>
        </thead>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              <td>
                <b>{rowIndex + 1}</b>
              </td>
              {row.map((col, colIndex) => {
                let modifier = rowIndex % 2 === 0 ? 1 : 0;
                let background = colIndex % 2 === modifier ? "#61dafb" : "#fff";
                return (
                  <td
                    key={`col-${colIndex}`}
                    onClick={col.active ? () => handleMove(col) : () => {}}
                    style={{
                      backgroundColor: background,
                      border: col.active
                        ? "1px solid red"
                        : "1px solid transparent",
                    }}
                  >
                    {col.type && (
                      <Piece
                        board={board}
                        getMovements={getMovements}
                        piece={col}
                      />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ width: "20%" }}>
        {lost.b.map((item, index) => (
          <img
            key={`b-lost-${index}`}
            style={{ maxWidth: "30px" }}
            src={`${process.env.PUBLIC_URL}/chesspieces/${item.team}${item.type}.png`}
            alt={`${item.team}${item.type}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Board;
