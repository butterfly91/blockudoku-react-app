import React, { useEffect, useRef } from "react";
import { useState } from "react";
import GameBoard from "./game-board.component";
import GamePanel from "./game-panel.component";
import StyledGameContainer from "./game.style";
import GamePieces from "./game-pieces.component";
import { easyPieces, normalPieces, difficultPieces } from "../all-pieces";

const allPieces = easyPieces.concat(normalPieces).concat(difficultPieces);

const TheGame = () => {
   const [gameMode, setGameMode] = useState("difficult");
   const gameModeRef = useRef("difficult");

   let lastPieceIndex;
   if (gameMode === "easy") lastPieceIndex = easyPieces.length;
   else if (gameMode === "normal")
      lastPieceIndex = easyPieces.length + normalPieces.length;
   else if (gameMode === "difficult") lastPieceIndex = allPieces.length;

   const createEmptyBoard = () => {
      return Array(9)
         .fill(0)
         .map(() => Array(9).fill(0));
   };
   const randomPiece = () => {
      let num = Math.floor(Math.random() * lastPieceIndex);
      return allPieces[num];
   };
   const generateNewPieces = (number = 3) => {
      return Array(number)
         .fill()
         .map(() => randomPiece());
   };

   const [board, setBoard] = useState(createEmptyBoard());
   const [score, setScore] = useState(0);
   const [pieces, setPieces] = useState(generateNewPieces());
   const [draggedPiece, setDraggedPiece] = useState(null);

   const rotateArray = (array) => {
      let n = array.length;
      let m = array[0].length;
      let newArray = Array(m)
         .fill(0)
         .map(() => Array(n).fill(0));
      for (let i = 0; i < m; i++) {
         for (let j = 0; j < n; j++) {
            newArray[i][j] = array[j][m - i - 1];
         }
      }
      return newArray;
   };

   const rotatePiece = (index) => {
      pieces[index] = rotateArray(pieces[index]);
      return pieces.slice();
   };
   const onPieceClickHandler = (pieceId) => {
      setPieces(rotatePiece(pieceId));
   };
   const onNewGameHandler = () => {
      setBoard(createEmptyBoard());
      setScore(0);
      setPieces(generateNewPieces());
      setGameMode(gameModeRef.current);
   };
   const checkIfFits = (piece, _i, _j) => {
      if (_i < 0 || _j < 0 || _i > 8 || _j > 8) return false;
      for (let i = _i; i < _i + piece.length; i++) {
         if (i > 8) return false;
         for (let j = _j; j < _j + piece[0].length; j++) {
            if (j > 8) return false;
            if (piece[i - _i][j - _j] && board[i][j]) return false;
         }
      }
      return true;
   };

   const checkIfGameOver = () => {
      if (pieces.length === 0) return false;
      for (let i = 0; i < 9; i++) {
         for (let j = 0; j < 9; j++) {
            for (let piece of pieces) {
               if (checkIfFits(piece, i, j)) return false;
            }
         }
      }
      return true;
   };

   const deleteCompleted = (board) => {
      let updatedBoard = board.map((x) => x.slice());
      for (let i = 0; i < 9; i++) {
         let fullRow = board[i].every((x) => x === 1);
         if (fullRow) updatedBoard[i].fill(0);
      }
      for (let j = 0; j < 9; j++) {
         let fullColumn = board.map((x) => x[j]).every((x) => x === 1);
         if (fullColumn) {
            for (let i = 0; i < 9; i++) updatedBoard[i][j] = 0;
         }
      }
      let startingPoints = [
         [0, 0],
         [0, 3],
         [0, 6],
         [3, 0],
         [3, 3],
         [3, 6],
         [6, 0],
         [6, 3],
         [6, 6],
      ];
      for (let point of startingPoints) {
         let _i = point[0];
         let _j = point[1];
         let squareFull = true;
         for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
               if (!board[_i + i][_j + j]) squareFull = false;
            }
         }
         if (squareFull) {
            for (let i = 0; i < 3; i++) {
               for (let j = 0; j < 3; j++) {
                  updatedBoard[_i + i][_j + j] = 0;
               }
            }
         }
      }
      return updatedBoard;
   };

   const makeAMove = (pieceIndex, i, j) => {
      let piece = pieces[pieceIndex];
      let updatedBoard = board.map((x) => x.slice());
      if (!checkIfFits(piece, i, j)) return;
      let addToScore = 0;
      for (let x = 0; x < piece.length; x++) {
         for (let y = 0; y < piece[x].length; y++) {
            addToScore += piece[x][y];
            updatedBoard[i + x][j + y] |= piece[x][y];
         }
      }
      setScore(score + addToScore);
      setPieces(pieces.filter((_, id) => id !== pieceIndex));
      updatedBoard = deleteCompleted(updatedBoard);
      setBoard(updatedBoard);
   };
   const pieceDragUpdate = (piece, pieceCoordinates, id, isDropped = false) => {
      setDraggedPiece({ piece, pieceCoordinates, id, isDropped });
   };

   const pieceDragEnd = () => {
      setDraggedPiece(null);
   };

   const difficultyChange = (event) => {
      gameModeRef.current = event.target.value;
      console.log(gameModeRef);
   };

   if (pieces.length === 0) {
      setPieces(generateNewPieces());
   }

   if (checkIfGameOver()) {
      console.log("game over");
   }

   return (
      <StyledGameContainer>
         <GamePanel
            score={score}
            onNewGameHandler={onNewGameHandler}
            onChangeHandler={difficultyChange}
            gameMode={gameMode}
         ></GamePanel>
         <GameBoard
            board={board}
            createEmptyBoard={createEmptyBoard}
            checkIfFits={checkIfFits}
            draggedPiece={draggedPiece}
            pieceDragEnd={pieceDragEnd}
            makeAMove={makeAMove}
         ></GameBoard>
         <GamePieces
            pieces={pieces}
            onPieceClickHandler={onPieceClickHandler}
            pieceDragUpdate={pieceDragUpdate}
         ></GamePieces>
      </StyledGameContainer>
   );
};

export default TheGame;
