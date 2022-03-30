import { useState, useEffect, useMemo, useCallback, useRef, version } from "react";
import styled from "styled-components/macro";
import { useStoreMe } from "store-me";
import cn from "classnames";

import useEventListener from "../../../hooks/useEventListener";
import randomBetween from "../../../../utils/randomBetween";
import local_storage from "../../../../utils/local_storage";
import sounds from "../../../../_constants/sounds";
import Sparkles from "../../../common/Sparkles";
import useAudio from "../../../hooks/useAudio";

const keyMap = {
  13: "enter",
  27: "esc",
  32: "space",
  37: "left",
  38: "up",
  39: "right",
  40: "down",
  65: "a",
  68: "d",
  83: "s",
  87: "w",
};

function getInitialConfig(config) {
  const boardSideSize = config.boardSize / config.snakeSize;
  const result = {
    headPosition: {
      x: 0,
      y: Math.floor(boardSideSize / 2),
    },
    foodPosition: {
      x: Math.floor(boardSideSize / 2),
      y: Math.floor(boardSideSize / 2),
    },
    tail: [],
    explosions: [],
    score: 0,
    tailLength: 0,
    paused: false,
    gameOver: false,
    gameWin: false,
    gameStarted: false,
    showExplosion: false,
    animationFrame: null,
    freezeKeyMovement: false,
    moveDirection: "RIGHT",
    highScore: local_storage.get("snakeHighScore") || 0,
    boardEndPosition: boardSideSize - 1,
    boardSideSize,
  };

  result.explosionPosition = result.foodPosition;

  return result;
}

const SnakeGame = ({ config, setConfig }) => {
  const { i18n, lookToGround } = useStoreMe("i18n", "lookToGround");
  const [foodBreakSound, setFoodBreakSound] = useState(false);
  const [, setRender] = useState(0);
  const lastUpdateTimeRef = useRef(0);
  const breakGlass1 = useAudio({ url: sounds.break_1 });
  const breakGlass2 = useAudio({ url: sounds.break_2, volume: 0.4 });
  const breakGlass3 = useAudio({ url: sounds.break_3, volume: 0.3 });
  const breakGlass4 = useAudio({ url: sounds.break_4 });
  const breakGlass5 = useAudio({ url: sounds.break_5 });
  const playGameOver = useAudio({ url: sounds.game_over, volume: 0.3 });
  const playGameReveal = useAudio({ url: sounds.game_reveal, volume: 0.4 });
  const ref = useRef(useMemo(() => getInitialConfig(config), [config]));
  const revealSoundTimeoutRef = useRef();

  function startGame() {
    if (ref.current.gameStarted) {
      ref.current = getInitialConfig(config);
    }

    ref.current.gameStarted = true;
    ref.current.gameOver = false;

    setConfig({ gameOver: false });
    setRender(Date.now());
    initAnimationFrame();
  }

  const endGame = useCallback(() => {
    cancelAnimationFrame(ref.current.animationFrame);
    ref.current.gameOver = true;

    setConfig({ gameOver: true });
    setHighScore();
    setRender(Date.now());
    playGameOver();
  }, [playGameOver, setConfig]);

  const winGame = useCallback(() => {
    cancelAnimationFrame(ref.current.animationFrame);
    ref.current.gameWin = true;

    setConfig({ gameWin: true });
    setHighScore();
    setRender(Date.now());
  }, [setConfig]);

  function pauseGame() {
    cancelAnimationFrame(ref.current.animationFrame);
    ref.current.paused = true;

    setConfig({ paused: true });
    setRender(Date.now());
  }

  function resumeGame() {
    ref.current.paused = false;

    setConfig({ paused: false });
    initAnimationFrame();
    setRender(Date.now());
  }

  function setHighScore() {
    const { score, highScore } = ref.current;

    if (score > highScore) {
      ref.current.highScore = score;
      local_storage.set("snakeHighScore", score);
    }
  }

  const createFood = useCallback(() => {
    const { tail, headPosition, boardSideSize, moveDirection } = ref.current;
    const getNextHeadPosition = {
      LEFT: (x, y) => `${x - 1}${y}`,
      RIGHT: (x, y) => `${x + 1}${y}`,
      UP: (x, y) => `${x}${y - 1}`,
      DOWN: (x, y) => `${x}${y + 1}`,
    };
    const availableCells = [];
    const takenCells = {};

    takenCells[`${headPosition.x}${headPosition.y}`] = true;
    takenCells[getNextHeadPosition[moveDirection](headPosition.x, headPosition.y)] = true;

    tail.forEach(coordinates => {
      takenCells[`${coordinates.x}${coordinates.y}`] = true;
    });

    for (let x = 0; x < boardSideSize; x++) {
      for (let y = 0; y < boardSideSize; y++) {
        !takenCells[`${x}${y}`] && availableCells.push({ x, y });
      }
    }

    if (availableCells.length <= 10) {
      winGame();
    } else {
      ref.current.foodPosition = availableCells[randomBetween(0, availableCells.length - 1)];
    }
  }, [winGame]);

  const moveSnake = useCallback(() => {
    const { foodPosition, boardEndPosition } = ref.current;
    const headPosition = { ...ref.current.headPosition };
    let tail = [...ref.current.tail];
    const applyHeadNextPosition = {
      LEFT: () => headPosition.x--,
      RIGHT: () => headPosition.x++,
      UP: () => headPosition.y--,
      DOWN: () => headPosition.y++,
    };

    applyHeadNextPosition[ref.current.moveDirection]();

    const isFoodEaten = headPosition.x === foodPosition.x && headPosition.y === foodPosition.y;
    let gameOver =
      headPosition.x > boardEndPosition ||
      headPosition.x < 0 ||
      headPosition.y > boardEndPosition ||
      headPosition.y < 0;

    if (isFoodEaten) {
      ref.current.tailLength++;
      ref.current.score += 20;
    }

    if (ref.current.tailLength) {
      tail.push({ ...ref.current.headPosition });

      tail = tail.slice(tail.length - ref.current.tailLength, tail.length);

      for (let i = 0; i < ref.current.tailLength; i++) {
        if (tail[i].x === headPosition.x && tail[i].y === headPosition.y) {
          gameOver = true;
        }
      }
    }

    if (gameOver) {
      endGame();
    } else {
      ref.current.headPosition = headPosition;
      ref.current.tail = tail;

      if (isFoodEaten) {
        ref.current.explosionPosition = ref.current.foodPosition;
        setConfig({ showExplosion: Date.now() });
        setFoodBreakSound(randomBetween(1, 5));
        createFood();
      }
    }
  }, [createFood, endGame, setConfig]);

  const initAnimationFrame = useCallback(
    (time = 0) => {
      ref.current.animationFrame = requestAnimationFrame(initAnimationFrame);

      if (time - lastUpdateTimeRef.current >= config.snakeSpeed) {
        lastUpdateTimeRef.current = time;
        ref.current.freezeKeyMovement = false;

        moveSnake();
        setRender(time);
      }
    },
    [config.snakeSpeed, moveSnake]
  );

  function onKeyPress(e) {
    const { moveDirection, gameOver, gameWin, gameStarted, paused } = ref.current;
    const key = keyMap[e.keyCode];

    function changeDir(direction) {
      if (direction && direction !== moveDirection && !gameOver && !paused) {
        ref.current.freezeKeyMovement = true;
        ref.current.moveDirection = direction;
        lastUpdateTimeRef.current = lastUpdateTimeRef.current - config.snakeSpeed;
      }
    }

    if (key && key !== "esc" && config.gridLoaded && !gameStarted) {
      startGame();
    } else if (key === "esc") {
      if (gameStarted && !gameOver && !gameWin) {
        paused ? resumeGame() : pauseGame();
      }
    } else if (key === "enter" || key === "space") {
      if (!gameStarted || gameOver) {
        gameOver && createFood();
        startGame();
      }
    } else if (gameStarted && !ref.current.freezeKeyMovement) {
      if (key === "left" || key === "a") {
        changeDir(moveDirection !== "RIGHT" && "LEFT");
      } else if (key === "right" || key === "d") {
        changeDir(moveDirection !== "LEFT" && "RIGHT");
      } else if (key === "up" || key === "w") {
        changeDir(moveDirection !== "DOWN" && "UP");
      } else if (key === "down" || key === "s") {
        changeDir(moveDirection !== "UP" && "DOWN");
      }
    }
  }

  function getGameStateClasses() {
    return cn({
      playing: !ref.current.gameOver && !ref.current.gameWin,
      "game-over": ref.current.gameOver,
      "game-win": ref.current.gameWin,
    });
  }

  function getCellPosition({ x, y }) {
    return { transform: `translate(${x * config.snakeSize}px, ${y * config.snakeSize}px)` };
  }

  useEventListener("keydown", onKeyPress);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(ref.current.animationFrame);
      clearInterval(revealSoundTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!config.frameLoaded) {
      revealSoundTimeoutRef.current = setTimeout(() => playGameReveal(), 1400);
    }
  }, [config.frameLoaded, playGameReveal]);

  useEffect(() => {
    if (foodBreakSound) {
      setFoodBreakSound(false);

      const soundsMap = {
        1: breakGlass1,
        2: breakGlass2,
        3: breakGlass3,
        4: breakGlass4,
        5: breakGlass5,
      };

      soundsMap[foodBreakSound]();
    }
  }, [foodBreakSound, breakGlass1, breakGlass2, breakGlass3, breakGlass4, breakGlass5]);

  return (
    <GameWrap>
      <ScoreWrap className={cn({ show: config.gridLoaded })}>
        <Title>
          {i18n("SNAKE_GAME.RETRO_SNAKE")}{" "}
          <span>
            {i18n("SNAKE_GAME.MODERN_REACT")} v{version.split("-").shift()}
          </span>
        </Title>
        <Score>
          <strong>{i18n("SNAKE_GAME.SCORE")}</strong> <span>{String(ref.current.score).padStart(6, "0")}</span>
        </Score>
      </ScoreWrap>

      <Board
        className={cn(
          { "board-revealed": config.frameLoaded, "reveal-animation": !config.frameLoaded && !lookToGround },
          getGameStateClasses()
        )}
        boardSize={config.boardSize}
        onAnimationEnd={({ animationName }) => {
          if (animationName === "pulsateRotateReveal") {
            setConfig({ frameLoaded: true });
          }
        }}
      >
        <BoardInner className={getGameStateClasses()}>
          <Food
            className={cn({ show: config.gridLoaded && ref.current.gameStarted })}
            style={getCellPosition(ref.current.foodPosition)}
            snakeSize={config.snakeSize}
          />
          <Snake
            className={cn("head", { show: config.gridLoaded && ref.current.gameStarted })}
            style={getCellPosition(ref.current.headPosition)}
            snakeSize={config.snakeSize}
          />
          {ref.current.tail.map((position, index) => (
            <Snake
              className="tail"
              style={getCellPosition(position)}
              snakeSize={config.snakeSize}
              key={`tail-${index}`}
            />
          ))}

          <Sparkles
            squareSparkles
            color="#c0ff00"
            animationCount={1}
            disableAutomaticStart
            initAnimation={config.showExplosion}
            layers={10}
            maximumDistance={100}
            minimumAnimationDuration={0.4}
            maximumAnimationDuration={0.7}
            minAnimationDelay={0}
            maxAnimationDelay={0}
            style={{
              ...getCellPosition(ref.current.explosionPosition),
              opacity: ref.current.gameStarted ? 1 : 0,
              top: config.snakeSize / 2 - 1,
              left: config.snakeSize / 2 - 1,
            }}
          />

          <GameStarter show={!ref.current.gameStarted && config.gridLoaded} onClick={startGame}>
            <OverlayContent className="overlay_content">
              {i18n("SNAKE_GAME.CLICK_TO_START")}
              <br />
              <span>{i18n("SNAKE_GAME.OR_PRESS_SPACE")}</span>
            </OverlayContent>
          </GameStarter>

          <GamePaused show={ref.current.paused}>
            <OverlayContent className="overlay_content">
              {i18n("SNAKE_GAME.PAUSED")}
              <br /> <span>{i18n("SNAKE_GAME.PRESS_ESC_TO_CONTINUE")}</span>
            </OverlayContent>
          </GamePaused>

          <GameOver show={ref.current.gameOver} onClick={startGame}>
            <OverlayContent className="overlay_content">
              <div className="high-score">
                {i18n("SNAKE_GAME.HIGH_SCORE")}: {String(ref.current.highScore).padStart(6, "0")}
              </div>
              {i18n("SNAKE_GAME.CLICK_TORESTART")}
              <span>{i18n("SNAKE_GAME.OR_PRESS_SPACE")}</span>
            </OverlayContent>
          </GameOver>

          <GameWin show={ref.current.gameWin} onClick={startGame}>
            <OverlayContent className="overlay_content">{i18n("SNAKE_GAME.CONGRATS_YOU_WON")}</OverlayContent>
          </GameWin>
        </BoardInner>
      </Board>

      <Footer className={cn({ show: config.gridLoaded })}>{i18n("SNAKE_GAME.CONTROLS")}</Footer>
    </GameWrap>
  );
};

export default SnakeGame;

const GameWrap = styled.div`
  position: relative;
  z-index: 11;
`;

const ScoreWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 25px;
  margin: 0 0 20px 0;
  opacity: 0;

  &.show {
    animation: fadeIn 0.4s ease forwards;
  }
`;

const Title = styled.h1`
  float: left;
  font-size: 18px;
  font-weight: 600;
  color: #4aadec;
  margin: 2px 0 0 0;

  span {
    font-size: 13px;
    color: #bbbbbb;
    font-weight: 400;
    font-style: italic;
  }
`;

const Score = styled.div`
  float: right;
  font-size: 16px;
  font-weight: 400;
  margin: 4px 0 0 0;

  strong {
    color: #4aadec;
    font-size: 11px;
    text-transform: uppercase;
  }

  span {
    font-weight: 500;
  }
`;

const Board = styled.div`
  position: relative;
  margin: 0 auto;
  opacity: 0;
  width: ${({ boardSize }) => boardSize - 1}px;
  height: ${({ boardSize }) => boardSize - 1}px;
  transition-property: border-color, box-shadow;
  transition-duration: 0.4s;
  transition-timing-function: ease;

  &.board-revealed {
    opacity: 1;
  }

  &.reveal-animation {
    opacity: 1;
    transform: rotate(360deg) scale(0);
    animation: pulsateRotateReveal 1.4s ease-in-out forwards;
  }

  &.playing {
    border: 1px solid #fff;
    box-shadow: 0px 0px 10px rgba(0, 240, 255, 0.8);
  }

  &.game-over {
    border: 1px solid #ff0000;
    box-shadow: 0px 0px 10px #ff0000;
  }

  &.game-win {
    border: 1px solid #9cff00;
    box-shadow: 0px 0px 10px #96ff00;
  }
`;

const Overlay = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  left: 0;
  z-index: 2;
  color: #00d2ff;
  font-weight: 600;
  font-size: 23px;
  cursor: pointer;
  text-align: center;
  text-transform: uppercase;
`;

const OverlayContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 319px;
  min-height: 63px;
  border: 1px solid #fff;
  padding: 18px 10px;
  box-shadow: 0px 0px 10px rgba(0, 240, 255, 0.8);
  background: rgb(0 0 0 / 62%);

  span {
    display: block;
    font-size: 12px;
    margin: 8px 0 0 0;
    color: #fff;
  }
`;

const BoardInner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  transition: box-shadow 0.4s ease;
  background: radial-gradient(rgb(10 138 218 / 20%) 15%, transparent 100%);

  &.playing {
    box-shadow: inset 0px 0px 12px rgba(0, 240, 255, 0.8);
  }

  &.game-over {
    box-shadow: inset 0px 0px 12px #ff0000;

    .head {
      background: rgb(255, 87, 87);
      background: radial-gradient(circle, rgba(255, 87, 87, 1) 0%, rgba(202, 0, 0, 1) 100%);
    }
  }

  &.game-win {
    box-shadow: inset 0px 0px 12px #96ff00;
  }
`;

const Food = styled.div`
  position: absolute;
  z-index: 2;
  opacity: 0;
  width: ${({ snakeSize }) => snakeSize - 1}px;
  height: ${({ snakeSize }) => snakeSize - 1}px;
  background: rgb(192, 255, 0);
  background: radial-gradient(circle, rgba(192, 255, 0, 1) 0%, rgba(98, 161, 0, 1) 100%);

  &.show {
    animation: fadeIn 0.4s ease forwards;
  }
`;

const Snake = styled.div`
  position: absolute;
  width: ${({ snakeSize }) => snakeSize - 1}px;
  height: ${({ snakeSize }) => snakeSize - 1}px;
  z-index: 1;

  &.head {
    opacity: 0;
    background: rgb(87, 245, 255);
    background: radial-gradient(circle, rgba(87, 245, 255, 1) 0%, rgba(0, 166, 202, 1) 100%);

    &.show {
      animation: fadeIn 0.4s ease forwards;
    }
  }

  &.tail {
    background: rgb(176, 250, 255);
    background: radial-gradient(circle, rgba(176, 250, 255, 1) 0%, rgba(98, 222, 248, 1) 100%);

    &::before {
      content: "";
      display: block;
      position: absolute;
      width: 50%;
      height: 50%;
      left: 18%;
      top: 19%;
      border: 1px solid #fff;
    }
  }
`;

const GameStarter = styled(Overlay)`
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: ${({ show }) => (show ? 100 : 0)};
  transform: translateY(${({ show }) => (show ? 0 : 100)}%);
  pointer-events: ${({ show }) => (show ? "auto" : "none")};
`;

const GamePaused = styled(Overlay)`
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: ${({ show }) => (show ? 100 : 0)};
  transform: translateY(${({ show }) => (show ? 0 : 100)}%);
  pointer-events: ${({ show }) => (show ? "auto" : "none")};
  cursor: default;
`;

const GameOver = styled(Overlay)`
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: ${({ show }) => (show ? 100 : 0)};
  transform: translateY(${({ show }) => (show ? 0 : 100)}%);
  pointer-events: ${({ show }) => (show ? "auto" : "none")};

  .overlay_content {
    width: 359px;
    border-color: #ff0000;
    box-shadow: 0px 0px 15px #ff0000;

    .high-score {
      color: #ddffe8;
      font-size: 30px;
      font-weight: 400;
      margin: 0 0 20px 0;
    }
  }
`;

const GameWin = styled(Overlay)`
  color: #96ff00;
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: ${({ show }) => (show ? 100 : 0)};
  transform: translateY(${({ show }) => (show ? 0 : 100)}%);
  pointer-events: ${({ show }) => (show ? "auto" : "none")};

  .overlay_content {
    width: 319px;
    height: 63px;
    border: 1px solid #fff;
    box-shadow: 0px 0px 10px #96ff00;
  }
`;

const Footer = styled.div`
  font-size: 13px;
  color: #bbbbbb;
  font-weight: 400;
  text-align: center;
  margin: 20px auto 0 auto;
  width: 100%;
  opacity: 0;

  span {
    color: #00bbf0;
  }

  b {
    color: #fff;
  }

  &.show {
    animation: fadeIn 0.4s ease forwards;
  }
`;
