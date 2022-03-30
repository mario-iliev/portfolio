import { useState, useCallback } from "react";
import styled from "styled-components/macro";

import SnakeGame from "./SnakeGame";
import Grid from "./Grid";

const Snake = () => {
  const [config, setPageConfig] = useState({
    snakeSize: 20,
    boardSize: 500,
    snakeSpeed: 125,
    paused: false,
    gameOver: false,
    gameWin: false,
    frameLoaded: false,
    gridLoaded: false,
    showExplosion: false,
  });

  const setConfig = useCallback(obj => setPageConfig(prev => ({ ...prev, ...obj })), []);

  return (
    <Wrap boardSize={config.boardSize}>
      <SnakeGame config={config} setConfig={setConfig} />
      <Grid config={config} setConfig={setConfig} />
    </Wrap>
  );
};

export default Snake;

const Wrap = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 10;
  margin: ${({ boardSize }) => `-${boardSize / 2 + 50}px 0 0 -${boardSize / 2}px`};
`;
