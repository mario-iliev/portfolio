import styled from "styled-components/macro";
import { useState, useRef } from "react";
import { useStoreMe } from "store-me";
import cn from "classnames";

import sounds from "../../../../_constants/sounds";
import Sparkles from "../../../common/Sparkles";
import useAudio from "../../../hooks/useAudio";
import OrbitLegend from "./OrbitLegend";
import Planet from "./Planet";

const planetTextsMap = {
  1: "LINKEDIN",
  2: "GITHUB",
  3: "EMAIL",
  4: "PHONE",
  5: "DEVIANTART",
};

const Contact = () => {
  const { i18n } = useStoreMe("i18n");
  const [state, setState] = useState({
    descriptionPosition: {
      top: 0,
      left: 0,
    },
    hoveredPlanetId: false,
    pauseSpinForOrbitId: false,
    text: false,
  });
  const [shockWave, setShockWave] = useState(false);
  const playWoosh = useAudio({ url: sounds.woosh });
  const playSunHover = useAudio({
    url: sounds.hover_3,
    forceLoad: true,
  });
  const planetsRefs = useRef({});
  const { descriptionPosition, pauseSpinForOrbitId, hoveredPlanetId, text } = state;

  return (
    <Wrap>
      <OrbitsWrap>
        <LinkedInOrbitLegend text="LINKEDIN" direction="right" planetId={1} setState={setState} />
        <GitHubOrbitLegend text="GITHUB" planetId={2} setState={setState} />
        <EmailOrbitLegend text="EMAIL" planetId={3} setState={setState} />
        <PhoneOrbitLegend text="PHONE" direction="right" planetId={4} setState={setState} />
        <DeviantOrbitLegend text="DEVIANTART" direction="right" planetId={5} setState={setState} />
      </OrbitsWrap>

      <Tooltip className={cn({ show: hoveredPlanetId && text })} descriptionPosition={descriptionPosition}>
        {text ? i18n(`CONTACT.PLANET_DESCRIPTION.${planetTextsMap[text]}`) : ""}
      </Tooltip>

      <Sparkles color="#ffff10" maximumDotSize={4} minimumAnimationDuration={7} maximumAnimationDuration={14} />

      <SunShockWave
        className={cn({ animate: shockWave })}
        onAnimationEnd={({ animationName }) => animationName === "sunShockwave" && setShockWave(false)}
      />

      <Sun
        onClick={() => {
          if (!shockWave) {
            setShockWave(true);
            playWoosh();
          }
        }}
        onMouseEnter={() => playSunHover()}
      />

      <Orbit zindex={50} size={174} color="#97ec04">
        <OrbitSpin className={cn({ "pause-animation": pauseSpinForOrbitId === 1 })} speed={7}>
          <Planet
            planet={1}
            orbitId={1}
            planetSize={68}
            shadowOpacity={0.4}
            state={state}
            hoverGlow="#fffe00"
            glow="#f1f8fb"
            setState={setState}
            onClick={() => window.open("https://www.linkedin.com/in/mario-iliev/")}
            planetsRefs={planetsRefs}
          />
        </OrbitSpin>
      </Orbit>

      <Orbit zindex={49} size={308} color="#00ee5a">
        <OrbitSpin className={cn({ "pause-animation": pauseSpinForOrbitId === 2 })} speed={18}>
          <Planet
            planet={2}
            orbitId={2}
            planetSize={38}
            shadowOpacity={0.3}
            hoverGlow="#65ff25"
            glow="#cfff7c"
            state={state}
            setState={setState}
            onClick={() => window.open("https://github.com/mario-iliev")}
            planetsRefs={planetsRefs}
          />
        </OrbitSpin>
      </Orbit>

      <Orbit zindex={48} size={438} color="#00a95f">
        <OrbitSpin className={cn({ "pause-animation": pauseSpinForOrbitId === 3 })} speed={10}>
          <Planet
            planet={3}
            orbitId={3}
            planetSize={52}
            shadowOpacity={0.2}
            hoverGlow="rgba(207, 255, 124, 0.8)"
            glow="#ffa4a4"
            state={state}
            setState={setState}
            onClick={() => {
              window.location.href = "mailto:sayhello@marioiliev.com";
            }}
            planetsRefs={planetsRefs}
          />
        </OrbitSpin>
      </Orbit>

      <Orbit zindex={47} size={650} color="#009b5f">
        <OrbitSpin className={cn({ "pause-animation": pauseSpinForOrbitId === 4 })} speed={28}>
          <Planet
            planet={4}
            orbitId={4}
            planetSize={52}
            hoverGlow="#69d8ff"
            glow="#78daff"
            state={state}
            setState={setState}
            onClick={() => {
              window.location.href = "tel:+359886632811";
            }}
            planetsRefs={planetsRefs}
          />

          <Planet
            planet={5}
            orbitId={4}
            planetSize={58}
            hoverGlow="#fff1ff"
            glow="#4e4e4e"
            state={state}
            setState={setState}
            onClick={() => {
              window.open("https://www.deviantart.com/dnb-noise");
            }}
            style={{
              top: "466px",
              left: "44px",
              transform: "rotate(-121deg)",
            }}
            planetsRefs={planetsRefs}
          />
        </OrbitSpin>
      </Orbit>
    </Wrap>
  );
};

export default Contact;

const Wrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 10;
`;

const SunShockWave = styled.div`
  position: absolute;
  transform: scale(0);
  z-index: 51;
  width: 650px;
  height: 650px;
  top: 50%;
  left: 50%;
  border-radius: 100%;
  margin: -325px 0 0 -325px;
  background: radial-gradient(transparent 20%, #ffe74abd 32%, transparent 69%, transparent 100%),
    radial-gradient(transparent 30%, rgb(255 255 255 / 83%) 45%, transparent 55%, transparent 100%);

  &.animate {
    animation: sunShockwave 0.7s ease forwards;
  }
`;

const Sun = styled.div`
  position: absolute;
  cursor: pointer;
  z-index: 52;
  width: 62px;
  height: 62px;
  top: 50%;
  left: 50%;
  border-radius: 100%;
  margin: -31px 0 0 -31px;
  box-shadow: 0px 0px 20px rgb(255 255 0 / 85%);
  background: radial-gradient(circle, rgba(255, 198, 0, 1) 0%, rgba(255, 150, 0, 1) 100%);

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }

  &:before {
    box-shadow: 0px 0px 70px #f2ff04, 0px 0px 110px #a7c500, 0px 0px 150px #ffea0a, 0px 0px 110px #e2ff00,
      0px 0px 150px #e3ff0c;
  }

  &:after {
    box-shadow: inset 0px 0px 10px #ffff10;
  }
`;

const Orbit = styled.div`
  position: absolute;
  border-radius: 100%;
  top: 50%;
  left: 50%;
  z-index: ${({ zindex }) => zindex};
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  margin: ${({ size }) => `-${size / 2 + 1}px 0 0 -${size / 2 + 1}px`};
  border: ${({ color, strokeWidth }) => `${strokeWidth || 1}px solid ${color}`};
`;

const OrbitSpin = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: spinAnimation ${({ speed }) => speed}s linear infinite;

  &.pause-animation {
    animation-play-state: paused;
  }
`;

const OrbitsWrap = styled.div`
  position: absolute;
  width: 650px;
  height: 650px;
  top: 50%;
  left: 50%;
  margin: -325px 0 0 -325px;
`;

const GitHubOrbitLegend = styled(OrbitLegend)`
  width: 340px;
  top: 32%;
  right: 67.4%;
`;

const EmailOrbitLegend = styled(OrbitLegend)`
  width: 350px;
  top: 65%;
  right: 79%;
`;

const PhoneOrbitLegend = styled(OrbitLegend)`
  width: 230px;
  top: 5%;
  left: 76.4%;
`;

const LinkedInOrbitLegend = styled(OrbitLegend)`
  width: 420px;
  top: 48%;
  left: 63.4%;
`;

const DeviantOrbitLegend = styled(OrbitLegend)`
  width: 230px;
  top: 81%;
  left: 88.2%;
`;

const Tooltip = styled.div`
  position: absolute;
  pointer-events: none;
  font-size: 15px;
  z-index: 100;
  width: 340px;
  padding: 15px;
  top: ${({ descriptionPosition }) => descriptionPosition.top}px;
  left: ${({ descriptionPosition }) => descriptionPosition.left}px;
  opacity: 0;
  text-align: center;
  font-weight: 400;
  border-radius: 10px;
  transform: translate(-50%, -150%);
  background-color: rgba(0, 0, 0, 0.8);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.4);
  animation: tooltipHide 0.4s ease forwards;

  &.show {
    opacity: 1;
    animation: tooltipShow 0.4s ease forwards;
  }

  &:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    width: 0;
    height: 0;
    margin: -1px 0 0 -12px;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 10px solid rgba(0, 0, 0, 0.8);
  }
`;
