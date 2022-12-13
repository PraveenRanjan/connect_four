'use strict';

const player1 = 1;
const player2 = 2;

const initBoard = () => {
  // Create a blank 6x7 matrix
  let board = [];
  for (let r = 0; r < 7; r++) {
    let row = [];
    for (let c = 0; c < 7; c++) {
      row.push(null);
    }
    board.push(row);
  }
  const data = {
    board,
    currentPlayer: player1,
    message: '',
    gameOver: false,
  };
  return data;
};

const checkVertical = (board) => {
  // Check only if row is 3 or greater
  for (let r = 3; r < 7; r++) {
    for (let c = 0; c < 7; c++) {
      if (board[r][c]) {
        if (
          board[r][c] === board[r - 1][c] &&
          board[r][c] === board[r - 2][c] &&
          board[r][c] === board[r - 3][c]
        ) {
          return board[r][c];
        }
      }
    }
  }
};

const checkHorizontal = (board) => {
  // Check only if column is 3 or less
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 4; c++) {
      if (board[r][c]) {
        if (
          board[r][c] === board[r][c + 1] &&
          board[r][c] === board[r][c + 2] &&
          board[r][c] === board[r][c + 3]
        ) {
          return board[r][c];
        }
      }
    }
  }
};

const checkDiagonalRight = (board) => {
  // Check only if row is 3 or greater AND column is 3 or less
  for (let r = 3; r < 7; r++) {
    for (let c = 0; c < 4; c++) {
      if (board[r][c]) {
        if (
          board[r][c] === board[r - 1][c + 1] &&
          board[r][c] === board[r - 2][c + 2] &&
          board[r][c] === board[r - 3][c + 3]
        ) {
          return board[r][c];
        }
      }
    }
  }
};

const checkDiagonalLeft = (board) => {
  // Check only if row is 3 or greater AND column is 3 or greater
  for (let r = 3; r < 7; r++) {
    for (let c = 3; c < 7; c++) {
      if (board[r][c]) {
        if (
          board[r][c] === board[r - 1][c - 1] &&
          board[r][c] === board[r - 2][c - 2] &&
          board[r][c] === board[r - 3][c - 3]
        ) {
          return board[r][c];
        }
      }
    }
  }
};

const checkDraw = (board) => {
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 7; c++) {
      if (board[r][c] === null) {
        return null;
      }
    }
  }
  
  return 'draw';
};

const checkAll = (board) => {
  return (
    checkVertical(board) ||
    checkDiagonalRight(board) ||
    checkDiagonalLeft(board) ||
    checkHorizontal(board) ||
    checkDraw(board)
  );
};

const togglePlayer = (currentPlayer) => {
  return currentPlayer === player1 ? player2 : player1;
};

const playGame = (boardData, c) => {
  const { board, gameOver, currentPlayer } = boardData;
  if (!gameOver) {
    // Place piece on board
    for (let r = 6; r >= 0; r--) {
      if (!board[r][c]) {
        board[r][c] = currentPlayer;
        break;
      }
    }
    // Check status of board
    let result = checkAll(board);   
    if (result === player1) {
      return {
        ...boardData,
        board,
        gameOver: true,
        message: 'Player 1 (red) wins!',
      };
      
    } else if (result === player2) {      
      return {
        ...boardData,
        board,
        gameOver: true,
        message: 'Player 2 (yellow) wins!',
      };
    } else if (result === 'draw') {      
      return { ...boardData, board, gameOver: true, message: 'Draw game.' };
    } else {      
      return { ...boardData, currentPlayer: togglePlayer(currentPlayer) };
    }
  } else {    
    return { ...boardData, message: 'Game over. Please start a new game.' };
  }
};

module.exports = {
  initBoard,
  playGame,
};
