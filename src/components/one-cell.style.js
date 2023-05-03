import styled, { css } from "styled-components";
import {
   boldLine,
   thinLine,
   cellBorderColor,
   filledCellColor,
   usedCellColor,
   fittingCellColor,
} from "../css-variables";

const cellColor = (state) => {
   if (state === "empty") return "white";
   else if (state === "filled") return filledCellColor;
   else if (state === "fitting") return fittingCellColor;
   else if (state === "used") return usedCellColor;
};

const commonProperties = css`
   transition: background-color 0.2s;
`;

export const StyledBoardCell = styled.div`
   border-top: ${({ i, _ }) => (i % 3 === 0 ? boldLine : thinLine)} solid
      ${cellBorderColor};
   border-bottom: ${({ i, _ }) => (i % 3 === 2 ? boldLine : thinLine)} solid
      ${cellBorderColor};
   border-left: ${({ _, j }) => (j % 3 === 0 ? boldLine : thinLine)} solid
      ${cellBorderColor};
   border-right: ${({ _, j }) => (j % 3 === 2 ? boldLine : thinLine)} solid
      ${cellBorderColor};
   background-color: ${({ state }) => cellColor(state)};
   ${commonProperties}
`;

export const StyledPieceCell = styled.span`
   border: ${thinLine} solid ${cellBorderColor};
   background-color: ${({ state }) =>
      state === "used" ? usedCellColor : filledCellColor};
   &.empty {
      border: 0;
      opacity: 0;
   }
   ${commonProperties}
`;
