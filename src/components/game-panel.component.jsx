import React from "react";
import Panel from "./game-panel.style";

const GamePanel = ({ score, onNewGameHandler, onChangeHandler, gameMode }) => {
   return (
      <Panel>
         <p>Счёт: {score}</p>
         <label htmlFor="difficulty-select">Сложность:</label>
         <select
            name=""
            id="difficulty-select"
            onChange={onChangeHandler}
            defaultValue={gameMode}
         >
            <option value="easy">Просто</option>
            <option value="normal">Нормально</option>
            <option value="difficult">Сложно</option>
         </select>

         <button onClick={onNewGameHandler}>Новая игра</button>
      </Panel>
   );
};

export default GamePanel;
