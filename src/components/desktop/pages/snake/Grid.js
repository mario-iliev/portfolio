import styled from "styled-components/macro";
import { useState, useEffect } from "react";
import cn from "classnames";

import sounds from "../../../../_constants/sounds";
import useAudio from "../../../hooks/useAudio";

const Grid = ({ config, setConfig }) => {
  const [grid, setGrid] = useState([]);
  const playGridReveal = useAudio({ url: sounds.grid_reveal, volume: 0.2 });
  const { boardSize, frameLoaded, snakeSize, gameOver, gameWin } = config;
  const lines = boardSize / snakeSize;

  useEffect(() => {
    if (frameLoaded) {
      const gridLines = [];

      for (let i = 1; i < lines; i++) {
        gridLines.push(
          <Line
            className="line horizontal"
            style={{ top: snakeSize * i }}
            onAnimationEnd={({ animationName }) => {
              if (i === lines - 1 && animationName === "expandWidth") {
                setConfig({ gridLoaded: true });
              }
            }}
            key={`hor-${i}`}
          />
        );
      }

      for (let i = 1; i < lines; i++) {
        gridLines.push(<Line className="line vertical" style={{ left: snakeSize * i }} key={`ver-${i}`} />);
      }

      setGrid(gridLines);
      playGridReveal();
    }
  }, [frameLoaded, lines, snakeSize, setConfig, playGridReveal]);

  return (
    <Wrap
      className={cn({ playing: !gameOver && !gameWin, "game-over": gameOver, "game-win": gameWin })}
      boardSize={boardSize}
    >
      {grid}
    </Wrap>
  );
};

export default Grid;

const Wrap = styled.div`
  position: absolute;
  top: 45px;
  left: 50%;
  transform: translateX(-50%);
  margin-left: -1px;
  width: ${({ boardSize }) => boardSize}px;
  height: ${({ boardSize }) => boardSize}px;
  transition-property: opacity, background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &.playing {
    .line {
      opacity: 0.3;
      background-color: #fff;
    }
  }

  &.game-over {
    .line {
      opacity: 1;
      background-color: #b30000;
    }
  }

  &.game-win {
    .line {
      opacity: 1;
      background-color: #5c7a00;
    }
  }
`;

const Line = styled.div`
  position: absolute;

  &.horizontal {
    width: 0px;
    height: 1px;
    animation: expandWidth 0.6s linear forwards;
    animation-delay: 0.6s;
  }

  &.vertical {
    width: 1px;
    height: 0px;
    animation: expandHeight 0.6s linear forwards;
  }
`;
