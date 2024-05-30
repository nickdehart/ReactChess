import _ from "lodash";

import king from "./king";
import queen from "./queen";
import bishop from "./bishop";
import knight from "./knight";
import rook from "./rook";
import pawn from "./pawn";

const getMoves = (board) => {
  let newMoves = [];
  for (let x = 0; x < board.length; x++)
    for (let y = 0; y < board[x].length; y++)
      if (board[x][y].team === "b") {
        let m = [];
        switch (board[x][y].type) {
          case "P":
            m = pawn(board[x][y], board);
            break;
          case "R":
            m = rook(board[x][y], board);
            break;
          case "B":
            m = bishop(board[x][y], board);
            break;
          case "Q":
            m = queen(board[x][y], board);
            break;
          case "N":
            m = knight(board[x][y], board);
            break;
          default:
            m = king(board[x][y], board);
        }
        if (m.length > 0) newMoves.push([board[x][y], m]);
      }
  return newMoves;
};

const move = (board, from, to) => {
  board[to.x][to.y].type = from.type;
  board[to.x][to.y].team = from.team;
  board[from.x][from.y].type = null;
  board[from.x][from.y].team = null;
};

const minimaxRoot = function (depth, board, isMaximisingPlayer) {
  let newMoves = getMoves(board);
  let bestMove = -9999;
  let bestPiece = null;
  let bestMoveFound;

  for (let i = 0; i < newMoves.length; i++) {
    for (let k = 0; k < newMoves[i][1].length; k++) {
      let current = _.clone(newMoves[i][0]);
      let newMove = _.clone(newMoves[i][1][k]);
      move(board, current, newMove);
      let value = minimax(depth - 1, board, -10000, 10000, !isMaximisingPlayer);
      move(board, newMove, current);
      if (value >= bestMove) {
        bestMove = value;
        bestPiece = current;
        bestMoveFound = newMove;
      }
    }
  }
  return [bestPiece, bestMoveFound];
};

const minimax = function (depth, board, alpha, beta, isMaximisingPlayer) {
  if (depth === 0) {
    return -evaluateBoard(board);
  }

  let newMoves = getMoves(board);

  if (isMaximisingPlayer) {
    let bestMove = -9999;
    for (let i = 0; i < newMoves.length; i++) {
      for (let k = 0; k < newMoves[i][1].length; k++) {
        let current = _.clone(newMoves[i][0]);
        let newMove = _.clone(newMoves[i][1][k]);
        move(board, current, newMove);
        bestMove = Math.max(
          bestMove,
          minimax(depth - 1, board, alpha, beta, !isMaximisingPlayer)
        );
        move(board, newMove, current);
        alpha = Math.max(alpha, bestMove);
        if (beta <= alpha) {
          return bestMove;
        }
      }
    }
    return bestMove;
  } else {
    let bestMove = 9999;
    for (let i = 0; i < newMoves.length; i++) {
      for (let k = 0; k < newMoves[i][1].length; k++) {
        let current = _.clone(newMoves[i][0]);
        let newMove = _.clone(newMoves[i][1][k]);
        move(board, current, newMove);
        bestMove = Math.min(
          bestMove,
          minimax(depth - 1, board, alpha, beta, !isMaximisingPlayer)
        );
        move(board, newMove, current);
        beta = Math.min(beta, bestMove);
        if (beta <= alpha) {
          return bestMove;
        }
      }
    }
    return bestMove;
  }
};

const evaluateBoard = function (board) {
  let totalEvaluation = 0;
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      totalEvaluation = totalEvaluation + getPieceValue(board[x][y], x, y);
    }
  }
  return totalEvaluation;
};

const reverseArray = function (array) {
  return array.slice().reverse();
};

const pawnEvalWhite = [
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
  [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
  [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
  [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
  [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
  [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
];

const pawnEvalBlack = reverseArray(pawnEvalWhite);

const knightEval = [
  [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
  [-4.0, -2.0, 0.0, 0.0, 0.0, 0.0, -2.0, -4.0],
  [-3.0, 0.0, 1.0, 1.5, 1.5, 1.0, 0.0, -3.0],
  [-3.0, 0.5, 1.5, 2.0, 2.0, 1.5, 0.5, -3.0],
  [-3.0, 0.0, 1.5, 2.0, 2.0, 1.5, 0.0, -3.0],
  [-3.0, 0.5, 1.0, 1.5, 1.5, 1.0, 0.5, -3.0],
  [-4.0, -2.0, 0.0, 0.5, 0.5, 0.0, -2.0, -4.0],
  [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
];

const bishopEvalWhite = [
  [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
  [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 1.0, 1.0, 0.5, 0.0, -1.0],
  [-1.0, 0.5, 0.5, 1.0, 1.0, 0.5, 0.5, -1.0],
  [-1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, -1.0],
  [-1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0],
  [-1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, -1.0],
  [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
];

const bishopEvalBlack = reverseArray(bishopEvalWhite);

const rookEvalWhite = [
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0],
];

const rookEvalBlack = reverseArray(rookEvalWhite);

const evalQueen = [
  [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
  [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
  [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
  [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
  [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
];

const kingEvalWhite = [
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
  [-1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
  [2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0],
  [2.0, 3.0, 1.0, 0.0, 0.0, 1.0, 3.0, 2.0],
];

const kingEvalBlack = reverseArray(kingEvalWhite);

const getPieceValue = function (piece) {
  const getAbsoluteValue = function (piece, isWhite, x, y) {
    if (piece.type === "P") {
      return 10 + (isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x]);
    } else if (piece.type === "R") {
      return 50 + (isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x]);
    } else if (piece.type === "N") {
      return 30 + knightEval[y][x];
    } else if (piece.type === "B") {
      return 30 + (isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x]);
    } else if (piece.type === "Q") {
      return 90 + evalQueen[y][x];
    } else if (piece.type === "K") {
      return 900 + (isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x]);
    }
  };

  let absoluteValue = getAbsoluteValue(
    piece,
    piece.team === "w",
    piece.x,
    piece.y
  );
  return piece.team === "w" ? absoluteValue : -absoluteValue;
};

/* board visualization and games state handling */

const getBestMove = function (board, depth) {
  let d = new Date().getTime();
  let bestMove = minimaxRoot(depth, board, true);
  let d2 = new Date().getTime();
  let moveTime = d2 - d;
  console.log("Move Time", moveTime);

  return bestMove;
};

export default getBestMove;
