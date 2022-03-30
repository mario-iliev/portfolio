import { useStoreMe, setStoreMe } from "store-me";
import styled from "styled-components/macro";
import cn from "classnames";

import generateStarsCSS from "../../utils/generateStarsCSS";
import percentOf from "../../utils/percentOf";

const Space = () => {
  const { nextPage, currentPage, animateSpaceRotation } = useStoreMe("nextPage", "currentPage", "animateSpaceRotation");
  const sceneClassName = cn(`scene_${animateSpaceRotation ? nextPage : currentPage}`);

  return (
    <Wrap>
      <SceneRotatorWrap className={sceneClassName}>
        <StarsSmallDimmed />
        <StarsSmall />
        <StarsMedium />
        <StarsBig />

        <SceneScaleWrap
          className={sceneClassName}
          onTransitionEnd={({ propertyName }) => {
            if (propertyName === "transform") {
              setStoreMe({
                currentPage: nextPage,
                lookToSky: false,
                lookToGround: true,
                menuIsVisible: false,
                animateSpaceRotation: false,
              });
            }
          }}
        >
          <RightTopGalaxy />

          <LeftSun>
            <LeftSunGradient />
          </LeftSun>
          <LeftPlanet />
          <LeftPlanetSunrise />

          <RightBigPlanet />
        </SceneScaleWrap>
      </SceneRotatorWrap>
    </Wrap>
  );
};

export default Space;

const fieldSize = window.innerWidth * 2;

const starsSmallDimmedCSS = generateStarsCSS(1, fieldSize, fieldSize, percentOf(fieldSize, 25), {
  0: "#616161",
});
const starsSmallCSS = generateStarsCSS(1, fieldSize, fieldSize, percentOf(fieldSize, 4));
const starsMediumCSS = generateStarsCSS(2, fieldSize, fieldSize, percentOf(fieldSize, 2));
const starsBigCSS = generateStarsCSS(2, fieldSize, fieldSize, percentOf(fieldSize, 2));

const Wrap = styled.div`
  position: absolute;
  width: 100%;
  height: 115%;
  bottom: 85%;
`;

const StarsSmallDimmed = styled.div`
  ${starsSmallDimmedCSS};
`;

const StarsSmall = styled.div`
  ${starsSmallCSS};
`;

const StarsMedium = styled.div`
  ${starsMediumCSS};
`;

const StarsBig = styled.div`
  ${starsBigCSS};
`;

const SceneRotatorWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: transform 1.4s linear;

  &.scene_0 {
    transform: translate(0%, 0%) rotate(0deg);
  }

  &.scene_1 {
    transform: translate(-17%, 0%) rotate(10deg);
  }

  &.scene_2 {
    transform: translate(-16%, -26%) rotate(-52deg);
  }

  &.scene_3 {
    transform: translate(23%, 0%) rotate(45deg);
  }

  &.scene_4 {
    transform: translate(-3%, -17%) rotate(-50deg);
  }
`;

const SceneScaleWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: transform 1.5s ease;

  &.scene_0 {
    transform: scale(1);
  }

  &.scene_1 {
    transform: scale(1.2);
  }

  &.scene_2 {
    transform: scale(0.7);
  }

  &.scene_3 {
    transform: scale(0.5);
  }

  &.scene_4 {
    transform: scale(0.3);
  }
`;

const LeftSunGradient = styled.div`
  position: absolute;
  width: 96vh;
  height: 96vh;
  top: -45vh;
  left: -45vh;
  z-index: -1;
  background: radial-gradient(
    circle,
    rgb(0, 44, 71) 0%,
    rgba(11, 27, 48, 0.7) 30%,
    rgba(0, 21, 35, 0.3) 50%,
    rgba(0, 0, 0, 0) 60%,
    rgba(0, 0, 0, 0) 100%
  );

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: radial-gradient(
      circle,
      rgb(0, 44, 71) 0%,
      rgba(29, 38, 49, 0.5) 15%,
      rgba(0, 21, 35, 0.25) 55%,
      rgba(0, 0, 0, 0) 70%,
      rgba(0, 0, 0, 0) 100%
    );
  }
`;

const RightTopGalaxy = styled.div`
  position: absolute;
  width: 1.6vw;
  height: 0.42vw;
  top: 10%;
  right: 20%;
  border-radius: 50%;
  background: radial-gradient(#fff, transparent);
  box-shadow: 7px 1px 3px #fff, -4px -1px 4px #fff, 7px 1px 11px #fff, -4px -1px 15px #d8a895, 7px 1px 40px #fff,
    -4px -1px 65px #d8a895;
  transform: rotate(-45deg);
`;

const LeftSun = styled.div`
  position: absolute;
  width: 2.7vw;
  height: 2.7vw;
  top: 41%;
  left: 31%;
  border-radius: 100%;
  background: #fff;
  box-shadow: 0px 0px 30px #fff, 0px 0px 5px #fff, 0px 0px 4px #fff;
`;

const LeftPlanet = styled.div`
  position: absolute;
  width: 5.3vw;
  height: 5.3vw;
  overflow: hidden;
  top: 41%;
  left: 28%;
  border-radius: 100%;
  background: #000;
  box-shadow: 2px -3px 3px rgb(255 255 255 / 75%);

  &:before,
  &:after {
    content: "";
    position: absolute;
    border-radius: 100%;
  }

  &:before {
    width: 110%;
    height: 110%;
    top: -2px;
    left: -2px;
    box-shadow: inset -12px 11px 21px #a1a1a0a6, inset -12px 11px 71px #0158b545, inset -12px 4px 7px #ffffffbd;
  }

  &:after {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    box-shadow: inset -2px 7px 18px rgb(173 254 91 / 7%);
  }
`;

const LeftPlanetSunrise = styled.div`
  position: absolute;
  width: 5.3vw;
  height: 5.3vw;
  overflow: hidden;
  top: 40.9%;
  left: 28.1%;
  border-radius: 100%;

  &:before {
    content: "";
    position: absolute;
    width: 110%;
    height: 110%;
    top: -8%;
    left: -4%;
    border-radius: 100%;
    box-shadow: inset -6px 10px 7px #fff;
  }

  &:after {
    content: "";
    position: absolute;
    width: 1.6vw;
    height: 0.4vw;
    top: 16.8%;
    left: 75%;
    border-radius: 80%;
    background: #fff;
    box-shadow: 0px 0px 0.2vw #fff, 0px 0px 0.2vw #fff, 0px 0px 0.5vw #fff;
    transform: rotate(52deg);
  }
`;

const RightBigPlanet = styled.div`
  position: absolute;
  width: 21.2vw;
  height: 21.2vw;
  top: 14%;
  right: 20%;
  border-radius: 100%;
  background: #000;
  box-shadow: inset 15px -4px 32px rgb(155 215 232 / 37%), inset 5px 1px 5px rgb(155 215 232 / 37%),
    inset 2px 1px 2px rgb(255 255 255 / 15%);
`;
