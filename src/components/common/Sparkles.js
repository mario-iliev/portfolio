import styled, { keyframes } from "styled-components/macro";
import { useState, useEffect, useRef } from "react";
import cn from "classnames";

import randomBetween from "../../utils/randomBetween";
import hexToRgb from "../../utils/hexToRgb";

const defaultProps = {
  color: "#fff",
  layers: 25,
  dotsPerLayer: 7,
  maximumDistance: 200,
  minimumDotSize: 1,
  maximumDotSize: 6,
  minimumAnimationDuration: 3,
  maximumAnimationDuration: 7,
  minAnimationDelay: 0,
  maxAnimationDelay: 5,
  minOpacity: 4,
  maxOpacity: 10,
  animationCount: "infinite",
  onAnimationEnd: undefined,
  squareSparkles: false,
};

const createCSSPerLayer = config => {
  const layersDotsMap = {};
  const result = {};

  for (let i = 0; i < config.layers; i++) {
    result[i] = {
      size: randomBetween(config.minimumDotSize, config.maximumDotSize),
      animationDuration:
        i === 0
          ? config.minimumAnimationDuration
          : randomBetween(config.minimumAnimationDuration, config.maximumAnimationDuration),
      animationDelay:
        i === 0 ? config.minAnimationDelay : randomBetween(config.minAnimationDelay, config.maxAnimationDelay),
      keyframes: undefined,
    };
    layersDotsMap[i] = {
      from: [],
      to: [],
    };

    for (let n = 0; n < config.dotsPerLayer; n++) {
      const dotOpacity = randomBetween(config.minOpacity, config.maxOpacity) / 10;
      const initialDotColor = hexToRgb(config.color, dotOpacity);
      const findalDestinationColor = hexToRgb(config.color, 0);
      const finalDestinationLeft = randomBetween(-config.maximumDistance, config.maximumDistance);
      const finalDestinationTop = randomBetween(-config.maximumDistance, config.maximumDistance);

      layersDotsMap[i].from.push(`0px 0px ${initialDotColor}`);
      layersDotsMap[i].to.push(`${finalDestinationLeft}px ${finalDestinationTop}px ${findalDestinationColor}`);
    }

    result[i].keyframes = keyframes`
      0% {
          box-shadow: ${layersDotsMap[i].from.join(",")};
      }
      100% {
          box-shadow: ${layersDotsMap[i].to.join(",")};
      }
    `;
  }

  return result;
};

const Sparkles = props => {
  const [removeAnimationClass, setRemoveAnimationClass] = useState(false);
  const [divsCount, setDivsCount] = useState([]);
  const configRef = useRef({
    ...defaultProps,
    ...props,
  });
  const removeAnimationClassRef = useRef(removeAnimationClass);
  const timeoutRef = useRef();
  const layersCSS = useRef();

  useEffect(() => {
    layersCSS.current = createCSSPerLayer(configRef.current);

    setDivsCount(new Array(props.layers || defaultProps.layers).fill(1));
  }, [props.layers]);

  useEffect(() => {
    if (props.initAnimation) {
      if (removeAnimationClassRef.current) {
        removeAnimationClassRef.current = false;
        setRemoveAnimationClass(false);

        timeoutRef.current = setTimeout(() => setRemoveAnimationClass(true), 10);
      } else {
        setRemoveAnimationClass(true);
      }
    }
  }, [props.initAnimation]);

  useEffect(() => {
    if (removeAnimationClass) {
      timeoutRef.current = setTimeout(() => {
        removeAnimationClassRef.current = false;

        setRemoveAnimationClass(false);
      }, 10);

      return () => clearTimeout(timeoutRef.current);
    }
  }, [removeAnimationClass]);

  return (
    <Wrap className={props.className} style={props.style}>
      {divsCount.map((div, i) => (
        <SparkleSpawn
          className={cn("sparkle-spawn", {
            animate: !props.disableAutomaticStart || (props.disableAutomaticStart && !removeAnimationClass),
          })}
          squareSparkles={props.squareSparkles}
          onAnimationEnd={props.onAnimationEnd}
          animationCount={props.animationCount ?? defaultProps.animationCount}
          animationDuration={layersCSS.current[i].animationDuration}
          animationDelay={layersCSS.current[i].animationDelay}
          keyframes={layersCSS.current[i].keyframes}
          size={layersCSS.current[i].size}
          key={i}
        />
      ))}
    </Wrap>
  );
};

export default Sparkles;

const Wrap = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  top: 50%;
  left: 50%;
`;

const SparkleSpawn = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ squareSparkles }) => (squareSparkles ? 0 : 100)}%;

  &.animate {
    animation-name: ${({ keyframes }) => keyframes};
    animation-duration: ${({ animationDuration }) => animationDuration}s;
    animation-delay: ${({ animationDelay }) => animationDelay}s;
    animation-iteration-count: ${({ animationCount }) => animationCount};
  }
`;
