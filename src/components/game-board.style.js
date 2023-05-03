import styled from "styled-components";
import { boardCellSize } from "../css-variables";

const StyledBoard = styled.div`
   display: grid;
   margin-top: 2rem;
   grid-template-rows: repeat(9, ${boardCellSize}px);
   grid-template-columns: repeat(9, ${boardCellSize}px);
   width: 50%;
   justify-self: center;
`;

export default StyledBoard;
