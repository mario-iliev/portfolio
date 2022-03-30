import { useStoreMe, setStoreMe } from "store-me";
import styled from "styled-components/macro";
import cn from "classnames";

import sounds from "../../_constants/sounds";
import useAudio from "../hooks/useAudio";

const PlayGameButton = ({ className }) => {
  const { menuIsVisible, lookToSky, currentPage } = useStoreMe("menuIsVisible", "lookToSky", "currentPage");
  const playHover = useAudio({ url: sounds.hover_2 });

  return (
    <Wrap
      className={cn(className, { show: menuIsVisible, active: currentPage === 4 })}
      onClick={() => !lookToSky && currentPage !== 4 && setStoreMe({ nextPage: 4, menuIsVisible: false })}
      onMouseEnter={playHover}
    >
      <T />
      <G />
    </Wrap>
  );
};

export default PlayGameButton;

const blockSize = 6;
const iconWidth = 22;

const Wrap = styled.div`
  position: relative;
  cursor: pointer;
  z-index: 100;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;

  &.show {
    pointer-events: auto;
    opacity: 1;
  }

  div {
    background-color: #fff;
    transition: background-color 0.3s ease;
  }

  &:hover,
  &.active {
    div {
      background-color: ${({ theme }) => theme.hamburger_menu.color};
    }
  }
`;

const T = styled.div`
  position: relative;
  width: ${iconWidth}px;
  height: ${blockSize}px;
  border-radius: 1px;

  &:before {
    content: "";
    position: absolute;
    width: ${blockSize}px;
    height: ${blockSize}px;
    left: 9px;
    top: ${blockSize + 1}px;
    background-color: inherit;
  }

  &:after {
    content: "";
    position: absolute;
    left: ${blockSize + 2}px;
    width: ${blockSize}px;
    height: ${blockSize}px;
    border-left: 1px solid #000;
    border-right: 1px solid #000;
  }
`;

const G = styled.div`
  position: relative;
  width: ${iconWidth}px;
  height: ${blockSize}px;
  margin-top: ${blockSize * 2 + blockSize / 2}px;
  border-radius: 1px;

  &:before {
    content: "";
    position: absolute;
    width: ${blockSize}px;
    height: ${blockSize}px;
    bottom: ${blockSize + 1}px;
    left: 0;
    background-color: inherit;
  }

  &:after {
    content: "";
    position: absolute;
    left: ${blockSize + 1}px;
    width: ${blockSize}px;
    height: ${blockSize}px;
    border-left: 1px solid #000;
    border-right: 1px solid #000;
  }
`;
