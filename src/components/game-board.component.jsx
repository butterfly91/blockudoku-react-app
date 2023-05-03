import StyledBoard from "./game-board.style";
import { StyledBoardCell } from "./one-cell.style";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { boardCellSize } from "../css-variables";

const GameBoard = ({
   board,
   createEmptyBoard,
   draggedPiece,
   checkIfFits,
   pieceDragEnd,
   makeAMove,
}) => {
   const [fittingBoard, setFittingBoard] = useState(createEmptyBoard());
   const cellRefs = useRef([]);

   useEffect(() => {
      if (!draggedPiece) {
         setFittingBoard(createEmptyBoard());
         return;
      }
      let { piece, pieceCoordinates, id, isDropped } = draggedPiece;
      let cellCoordinates = cellRefs.current.map((cell, id) => {
         let rect = cell.getBoundingClientRect();
         return {
            x: rect.left,
            y: rect.top,
            id,
         };
      });
      let cell = cellCoordinates.find((coord) => {
         return (
            Math.abs(pieceCoordinates.x - coord.x) <= boardCellSize &&
            Math.abs(pieceCoordinates.y - coord.y) <= boardCellSize
         );
      });
      if (!cell) {
         setFittingBoard(createEmptyBoard());
         if (isDropped) pieceDragEnd();
         return;
      }
      let i = Math.floor(cell.id / 9);
      let j = cell.id % 9;
      if (checkIfFits(piece, i, j)) {
         if (!isDropped) {
            const newFittingBoard = createEmptyBoard();
            for (let _i = 0; _i < piece.length; _i++) {
               for (let _j = 0; _j < piece[0].length; _j++) {
                  newFittingBoard[i + _i][j + _j] |= piece[_i][_j];
               }
            }
            setFittingBoard(newFittingBoard);
         } else {
            makeAMove(id, i, j);
            setFittingBoard(createEmptyBoard());
            pieceDragEnd();
         }
      } else {
         setFittingBoard(createEmptyBoard());
      }
   }, [draggedPiece]);

   const getCellState = (i, j) => {
      if (fittingBoard[i][j]) return "fitting";
      else if (!board[i][j]) return "empty";
      else return "filled";
   };

   return (
      <StyledBoard>
         {Array(9)
            .fill()
            .map((_, i) => {
               return Array(9)
                  .fill()
                  .map((_, j) => {
                     return (
                        <StyledBoardCell
                           ref={(cell) => (cellRefs.current[i * 9 + j] = cell)}
                           i={i}
                           j={j}
                           state={getCellState(i, j)}
                           key={`${i},${j}`}
                        ></StyledBoardCell>
                     );
                  });
            })}
      </StyledBoard>
   );
};

export default GameBoard;
