import styled from "styled-components/macro";
import { useStoreMe } from "store-me";

import sounds from "../../../../_constants/sounds";
import useAudio from "../../../hooks/useAudio";

const OrbitLegend = ({ className, direction = "left", text = "", setState, planetId }) => {
  const { i18n } = useStoreMe("i18n");
  const playLegendHover = useAudio({ url: sounds.hover_3, forceLoad: true });

  let content = [
    <Text
      direction={direction}
      onMouseEnter={() => {
        setState(prevState => ({ ...prevState, hoveredPlanetId: planetId, text: false }));
        playLegendHover();
      }}
      onMouseLeave={() => setState(prevState => ({ ...prevState, hoveredPlanetId: false }))}
      key="text"
    >
      {i18n(`CONTACT.ORBIT_LABELS.${text}`)}
    </Text>,
    <Line direction={direction} key="line" />,
  ];

  if (direction === "right") {
    content = content.reverse();
  }

  return <Wrap className={className}>{content}</Wrap>;
};

export default OrbitLegend;

const Wrap = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
`;

const Text = styled.div`
  padding: 5px 15px;
  border: 1px solid #fff;
  color: #afff3a;
  font-weight: 500;
  cursor: default;
  border-radius: ${({ direction }) => (direction === "left" ? "0px 10px 0px 10px" : "10px 0px 10px 0px")};
  background-color: rgb(134 211 0 / 15%);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(0 0 0 / 20%);
  }
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  top: 0;
  left: 0;
  background: linear-gradient(
    ${({ direction }) => (direction === "left" ? "90deg" : "-90deg")},
    #fff 0%,
    rgba(255, 255, 255, 0.2) 100%
  );
`;
