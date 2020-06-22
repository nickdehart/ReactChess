export default function () {
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
}
