import { useStoreMe, setStoreMe } from "store-me";
import toggleFullscreen from "toggle-fullscreen";
import styled from "styled-components/macro";
import cn from "classnames";

import sounds from "../../_constants/sounds";
import useAudio from "../hooks/useAudio";

const FullScreenBtn = ({ className }) => {
  const { isFullScreen } = useStoreMe("isFullScreen");
  const playAudio = useAudio({ url: sounds.hover_1, volume: 0.7 });

  const toggleFS = () => {
    setStoreMe({ isFullScreen: !isFullScreen });
    toggleFullscreen(document.querySelector("#root")).finally(() => {});
  };

  return <Wrap className={cn(className, { active: isFullScreen })} onClick={toggleFS} onMouseEnter={playAudio} />;
};

export default FullScreenBtn;

const Wrap = styled.div`
  position: relative;
  cursor: pointer;
  width: 18px;
  height: 18px;
  border: 1px solid ${({ theme }) => theme.fullscreen.color};
  transition: border-color 0.4s ease;

  &:hover,
  &.active {
    border-color: ${({ theme }) => theme.fullscreen.hover};
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    background-color: #000;
  }

  &:before {
    width: 8px;
    height: 20px;
    left: 5px;
    top: -1px;
  }

  &:after {
    width: 20px;
    height: 8px;
    left: -1px;
    top: 5px;
  }
`;
