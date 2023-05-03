import React, { useState, useEffect, useRef } from "react";
import { StyledPiece, PseudoPiece } from "./one-piece.style";
import { StyledPieceCell } from "./one-cell.style";

const isTouch = matchMedia("(hover: none)").matches;

const Piece = ({ piece, onPieceClickHandler, index, pieceDragUpdate }) => {
   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
   const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
   const [isDragged, setIsDragged] = useState(false);
   const [isMouseDown, setIsMouseDown] = useState(false);
   //const pieceDroppedRef = useRef(false);

   const handleWindowMouseMove = (event) => {
      setMousePosition({
         x: event.clientX,
         y: event.clientY,
      });
   };
   const handleWindowTouchMove = (event) => {
      setMousePosition({
         x: event.touches[0].clientX,
         y: event.touches[0].clientY,
      });
   };

   const piecePosition = () => {
      return {
         x: mousePosition.x + mouseOffset.x,
         y: mousePosition.y + mouseOffset.y,
      };
   };

   let dragTimeout = null;

   useEffect(() => {
      if (!isMouseDown) return;
      setIsDragged(true);
      if (!isTouch) {
         window.addEventListener("mousemove", handleWindowMouseMove);
         return () => {
            window.removeEventListener("mousemove", handleWindowMouseMove);
         };
      } else {
         window.addEventListener("touchmove", handleWindowTouchMove);
         return () => {
            window.removeEventListener("touchmove", handleWindowTouchMove);
         };
      }
   }, [isMouseDown]);

   const calculateClasses = () => {
      if (isDragged) return "isDragged";
      else return "";
   };

   const pseudoClasses = () => {
      if (isDragged) return "isDragged";
      else return "";
   };

   const onMouseDownHandler = (event) => {
      if (!isTouch) {
         setMousePosition({
            x: event.clientX,
            y: event.clientY,
         });
      } else {
         setMousePosition({
            x: event.touches[0].clientX,
            y: event.touches[0].clientY,
         });
      }
      setIsMouseDown(true);
      let rect = event.target.parentElement.getBoundingClientRect();
      setMouseOffset({
         x: rect.left - event.clientX,
         y: rect.top - event.clientY,
      });
   };

   const onClickHandler = () => {
      return;
      //if (isDragged) return;
      //onPieceClickHandler(index);
   };

   useEffect(() => {
      if (isDragged) {
         pieceDragUpdate(piece, piecePosition(), index);
      }
   }, [mousePosition]);

   const onMouseUpHandler = () => {
      pieceDragUpdate(piece, piecePosition(), index, true);
      setIsMouseDown(false);
      setIsDragged(false);
   };

   const width = piece.length;
   const height = piece[0].length;

   const getPieceCells = () => {
      return Array(width)
         .fill()
         .map((_, i) => {
            return Array(height)
               .fill()
               .map((_, j) => {
                  return (
                     <StyledPieceCell
                        key={`${i},${j}`}
                        i={i}
                        j={j}
                        state={isDragged ? "isDragged" : ""}
                        className={piece[i][j] ? "" : "empty"}
                     ></StyledPieceCell>
                  );
               });
         });
   };
   return (
      <>
         <StyledPiece
            w={width}
            h={height}
            isDragged={isDragged}
            onClick={onClickHandler}
            className={calculateClasses()}
            onMouseDown={onMouseDownHandler}
            onTouchStart={onMouseDownHandler}
            onMouseUp={onMouseUpHandler}
            onTouchEnd={onMouseDownHandler}
            piecePosition={piecePosition()}
         >
            {getPieceCells()}
         </StyledPiece>
         <PseudoPiece className={pseudoClasses()}></PseudoPiece>
      </>
   );
};

export default Piece;
