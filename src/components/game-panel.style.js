import styled from "styled-components";

const StyledPanel = styled.div`
   display: flex;
   flex-direction: column;
   width: 30%;
   text-align: center;

   p {
      font-size: 36px;
   }

   button {
      margin-top: 4rem;
      width: 50%;
      padding: 0.3rem;
      align-self: center;
      font-size: 20px;
   }

   label {
      font-size: 20px;
   }
   select {
      margin-top: 0.65rem;
      width: 50%;
      padding: 0.3rem;
      align-self: center;
      font-size: 20px;
   }
`;

export default StyledPanel;
