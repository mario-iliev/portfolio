import styled from "styled-components/macro";
import { useStoreMe } from "store-me";
import { useState } from "react";
import cn from "classnames";

import sounds from "../../_constants/sounds";
import useAudio from "../hooks/useAudio";

const ToggleSoundIcon = ({ animate, onClick, onMouseEnter, onMouseLeave, className, children }) => {
  const { userEnabledEffects, userEnabledMusic } = useStoreMe("userEnabledEffects", "userEnabledMusic");
  const [isHovered, setIsHovered] = useState(false);
  const playAudio = useAudio({ url: sounds.hover_1, volume: 0.6 });

  return (
    <Wrap
      className={className}
      onMouseEnter={() => {
        onMouseEnter && onMouseEnter();
        setIsHovered(true);
        playAudio();
      }}
      onMouseLeave={() => {
        onMouseLeave && onMouseLeave();
        setIsHovered(false);
      }}
      onClick={onClick}
    >
      <Bars
        className={cn({
          music: userEnabledMusic,
          effects: userEnabledEffects,
          animate: animate,
        })}
      >
        <b className="_1" />
        <b className="_2" />
        <b className="_3" />
        <b className="_4" />
      </Bars>
      {children && <ChildrenWrap className={cn({ show: isHovered })}>{children}</ChildrenWrap>}
    </Wrap>
  );
};

export default ToggleSoundIcon;

const Wrap = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
`;

const Bars = styled.div`
  position: absolute;
  overflow: hidden;
  width: 20px;
  height: 20px;
  bottom: 0;
  right: 0;

  b {
    position: absolute;
    bottom: 0;
    width: 3px;
    height: 100%;
    transition: background-color 0.3s ease;
    background-color: ${({ theme }) => theme.sound.icon.off};

    &._1 {
      left: 0;
      transform: translateY(10px);
    }

    &._2 {
      left: 5px;
    }

    &._3 {
      left: 10px;
      transform: translateY(5px);
    }

    &._4 {
      left: 15px;
    }
  }

  &.music {
    b {
      &._1,
      &._2 {
        background-color: ${({ theme }) => theme.sound.icon.on};
      }
    }
  }

  &.effects {
    b {
      &._3,
      &._4 {
        background-color: ${({ theme }) => theme.sound.icon.on};
      }
    }
  }

  &.animate {
    b {
      &._1 {
        animation: soundBar1 0.5s linear infinite;
      }

      &._2 {
        animation: soundBar2 0.5s linear infinite;
      }

      &._3 {
        animation: soundBar3 0.5s linear infinite;
      }

      &._4 {
        animation: soundBar4 0.5s linear infinite;
      }
    }
  }
`;

const ChildrenWrap = styled.div`
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;

  &.show {
    opacity: 1;
    pointer-events: auto;
  }
`;
