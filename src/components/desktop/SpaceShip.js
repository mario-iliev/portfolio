import { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components/macro";
import { useStoreMe } from "store-me";
import cn from "classnames";

import sounds from "../../_constants/sounds";
import useAudio from "../hooks/useAudio";

const SpaceShip = ({ size }) => {
  const { homeRevealed, lookToSky, lookToGround } = useStoreMe("homeRevealed", "lookToSky", "lookToGround");
  const [animate, setAnimate] = useState(false);
  const newAnimationTimeout = useRef();
  const prevAnimate = useRef(false);
  const playAudio = useAudio({
    url: sounds.rocket_blast,
    volume: 0.2,
    delay: 700,
  });

  const setAnimationTimeout = useCallback(() => {
    newAnimationTimeout.current = setTimeout(
      () => {
        setAnimate(true);
      },
      size === "big" ? 8000 : 5000
    );
  }, [size]);

  const prepareNewAnimation = () => {
    setAnimate(false);
    setAnimationTimeout();
  };

  useEffect(() => {
    return () => {
      clearTimeout(newAnimationTimeout.current);
    };
  }, []);

  useEffect(() => {
    homeRevealed && setAnimationTimeout();
  }, [homeRevealed, setAnimationTimeout]);

  useEffect(() => {
    if (prevAnimate.current !== animate) {
      prevAnimate.current = animate;
      animate && playAudio();
    }
  }, [animate, playAudio]);

  return (
    <Wrap
      className={cn(size, { "fade-out": lookToSky || lookToGround })}
      onAnimationEnd={({ animationName }) => {
        animationName === "fadeOut" && prepareNewAnimation();
      }}
    >
      <ShipCoridor
        className={cn({ animate })}
        onAnimationEnd={({ animationName }) => {
          animationName === "spaceShipTravel" && prepareNewAnimation();
        }}
      >
        <ShipWrap className={cn(size)}>
          <ShipTop />
          <ShipBottom />
          <Blaster />
          <Trail className={cn({ animate })} />
        </ShipWrap>
      </ShipCoridor>
      <LiftOfExplosionWrap className={size}>
        <LiftOfExplosion className={cn(size, { animate })} />
      </LiftOfExplosionWrap>
    </Wrap>
  );
};

export default SpaceShip;

const Wrap = styled.div`
  position: absolute;
  width: 5vw;
  height: 100%;

  &.fade-out {
    animation: fadeOut 0.3s ease forwards;
  }

  &.big {
    left: ${({ theme }) => theme.ship.big.wrap_left};
  }

  &.small {
    left: ${({ theme }) => theme.ship.small.wrap_left};
  }
`;

const ShipCoridor = styled.div`
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  transform: translateY(100%);
  will-change: transform;

  &.animate {
    animation: spaceShipTravel 12s linear forwards;
  }
`;

const ShipWrap = styled.div`
  position: absolute;
  top: 0;
  width: 0.7vw;
  height: 1.3vw;

  &.big {
    left: 50%;
  }
`;

const ShipTop = styled.div`
  position: absolute;
  top: 0;
  width: 0;
  height: 0;
  z-index: 4;
  border-left: 0.35vw solid transparent;
  border-right: 0.35vw solid transparent;
  border-bottom: 1vw solid #170200;
`;

const ShipBottom = styled.div`
  position: absolute;
  top: 74%;
  width: 0;
  height: 0;
  z-index: 3;
  border-left: 0.35vw solid transparent;
  border-right: 0.35vw solid transparent;
  border-top: 0.3vw solid #170200;
`;

const Blaster = styled.div`
  position: absolute;
  top: 60%;
  width: 0.7vw;
  height: 0.7vw;
  background: ${({ theme }) => `radial-gradient(circle, ${theme.ship.blaster})`};
`;

const Trail = styled.div`
  position: absolute;
  overflow: hidden;
  top: 80%;
  left: 38%;
  width: 0.2vw;
  height: 9vw;
  z-index: 2;

  &:after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    background: ${({ theme }) => `linear-gradient(0deg, ${theme.ship.trail})`};
  }

  &.animate {
    &:after {
      animation: spaceShipTrail 0.2s linear infinite;
    }
  }
`;

const LiftOfExplosionWrap = styled.div`
  position: absolute;
  overflow: hidden;
  height: 100%;
  left: -7.5vw;

  &.big {
    width: 22vw;
  }

  &.small {
    width: 15vw;
  }
`;

const LiftOfExplosion = styled.div`
  position: absolute;
  left: 0;
  bottom: -7.5vw;
  border-radius: 100%;
  background: ${({ theme }) => `radial-gradient(circle, ${theme.ship.explosion})`};
  transform: scale(0);

  &.animate {
    animation: spaceShipLiftOfExplosion 15s linear forwards;
  }

  &.big {
    width: 22vw;
    height: 22vw;
  }

  &.small {
    width: 15vw;
    height: 15vw;
  }
`;
