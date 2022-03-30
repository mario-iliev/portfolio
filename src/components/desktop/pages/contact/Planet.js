import styled from "styled-components/macro";
import cn from "classnames";

import sounds from "../../../../_constants/sounds";
import useAudio from "../../../hooks/useAudio";

const Planet = ({
  state,
  planet,
  style,
  planetsRefs,
  orbitId,
  planetSize,
  shadowOpacity,
  hoverGlow,
  glow,
  onClick,
  setState,
}) => {
  const playAudio = useAudio({ url: sounds.hover_1, forceLoad: true });
  const { hoveredPlanetId } = state;

  return (
    <Wrap
      className={cn({ hovered: hoveredPlanetId === planet })}
      onMouseEnter={() => {
        const element = planetsRefs.current[planet];
        const { top, left, width } = element.getBoundingClientRect();
        const descriptionPosition = {
          top: Math.ceil(top - 15),
          left: Math.ceil(left + width / 2),
        };

        setState(prevState => ({
          ...prevState,
          descriptionPosition,
          hoveredPlanetId: planet,
          text: planet,
          pauseSpinForOrbitId: orbitId,
        }));
        playAudio();
      }}
      onMouseLeave={() => setState(prevState => ({ ...prevState, hoveredPlanetId: false, pauseSpinForOrbitId: false }))}
      shadowOpacity={shadowOpacity}
      planetSize={planetSize}
      hoverGlow={hoverGlow}
      glow={glow}
      onClick={onClick}
      style={style}
      ref={node => (planetsRefs.current[planet] = node)}
    />
  );
};

export default Planet;

const Wrap = styled.div`
  cursor: pointer;
  position: absolute;
  z-index: 2;
  width: ${({ planetSize }) => planetSize}px;
  height: ${({ planetSize }) => planetSize}px;
  top: -${({ planetSize }) => planetSize / 2}px;
  left: 50%;
  margin: 0 0 0 -${({ planetSize }) => planetSize / 2}px;
  border-radius: 100%;
  background-color: #000912;
  box-shadow: inset 0px -5px 6px ${({ glow }) => glow};
  transition: box-shadow 0.3s ease;

  &.hovered {
    box-shadow: inset 0px -5px 6px ${({ glow }) => glow}, 0px 0px 15px ${({ hoverGlow }) => hoverGlow},
      inset 0px 0px 7px #fff;
  }

  &:before {
    content: "";
    position: absolute;
    pointer-events: none;
    left: 50%;
    bottom: ${({ planetSize }) => planetSize / 2}px;
    height: 300px;
    width: ${({ planetSize }) => planetSize - 2}px;
    margin-left: -${({ planetSize }) => (planetSize - 2) / 2}px;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 55%,
      rgba(0, 0, 0, ${({ shadowOpacity }) => shadowOpacity || 0.15}) 100%
    );
    filter: blur(3px);
  }
`;
