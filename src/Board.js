import React from "react";
import Piece from "./Piece";

function Board() {
  const [board, setBoard] = React.useState([]);

  React.useEffect(() => {
    setBoard(placePieces());
  }, []);

  const placePieces = () => {
    let starting = [];
    for (let row = 0; row < 8; row++) {
      starting.push([]);
      for (let col = 0; col < 8; col++) {
        starting[row].push({
          x: row,
          y: col,
          type: "",
          team: "",
          active: false,
        });
        if (row === 1 || row === 6) {
          starting[row][col].type = "P";
          if (row === 1) {
            starting[row][col].team = "b";
          } else {
            starting[row][col].team = "w";
          }
        } else if (row === 0 || row === 7) {
          switch (col) {
            case 0:
              starting[row][col].type = "R";
              break;
            case 1:
              starting[row][col].type = "N";
              break;
            case 2:
              starting[row][col].type = "B";
              break;
            case 3:
              starting[row][col].type = "Q";
              break;
            case 5:
              starting[row][col].type = "B";
              break;
            case 6:
              starting[row][col].type = "N";
              break;
            case 7:
              starting[row][col].type = "R";
              break;
            default:
              starting[row][col].type = "K";
          }
          if (row === 0) {
            starting[row][col].team = "b";
          } else {
            starting[row][col].team = "w";
          }
        }
      }
    }
    return starting;
  };

  return (
    <table>
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
                  style={{
                    backgroundColor: background,
                    border: col.active ? "1px solid red" : "none",
                  }}
                >
                  {col.type && (
                    <Piece board={board} setBoard={setBoard} piece={col} />
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Board;
