import React from "react";
import StyledGamePieces from "./game-pieces.style";
import Piece from "./one-piece.component";

const GamePieces = ({ pieces, ...props }) => {
   return (
      <StyledGamePieces>
         {pieces.map((piece, i) => {
            return <Piece key={i} piece={piece} index={i} {...props}></Piece>;
         })}
      </StyledGamePieces>
   );
};

export default GamePieces;
