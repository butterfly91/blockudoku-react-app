import styled from "styled-components";
import { boardCellSize, scaleFactor } from "../css-variables";

const pieceCellSize = boardCellSize / scaleFactor;

export const StyledPiece = styled.div`
   display: grid;
   height: ${(boardCellSize / scaleFactor) * 5}px;
   grid-template-rows: repeat(${({ w }) => w}, ${pieceCellSize}px);
   grid-template-columns: repeat(${({ h }) => h}, ${pieceCellSize}px);
   &.isDragged {
      transform: scale(${scaleFactor});
      position: fixed;
      top: ${({ piecePosition }) => `${piecePosition.y}px`};
      left: ${({ piecePosition }) => `${piecePosition.x}px`};
   }
`;

export const PseudoPiece = styled.div`
   display: none;
   height: ${(boardCellSize / scaleFactor) * 5}px;
   &.isDragged {
      display: block;
      visibility: hidden;
   }
`;
