import { useStoreMe, setStoreMe } from "store-me";
import { useLayoutEffect, useRef } from "react";
import styled from "styled-components/macro";
import cn from "classnames";

import useEventListener from "../hooks/useEventListener";
import sounds from "../../_constants/sounds";
import useAudio from "../hooks/useAudio";

const HamburgerMenuButton = ({ className }) => {
  const { menuIsVisible } = useStoreMe("menuIsVisible");
  const playHoverSound = useAudio({ url: sounds.hover_3 });
  const playWoosh = useAudio({ url: sounds.woosh });
  const prevMenuIsVisible = useRef(menuIsVisible);
  const hadInteraction = useRef(false);

  const onKeyUp = e => e.keyCode === 27 && menuIsVisible && setStoreMe({ menuIsVisible: false });

  useEventListener("keyup", onKeyUp);

  useLayoutEffect(() => {
    if (menuIsVisible && !hadInteraction.current) {
      hadInteraction.current = true;
    }

    if (prevMenuIsVisible.current !== menuIsVisible) {
      prevMenuIsVisible.current = menuIsVisible;
      hadInteraction.current && playWoosh();
    }
  }, [menuIsVisible, playWoosh]);

  return (
    <Wrap
      className={className}
      onMouseEnter={playHoverSound}
      onClick={() => setStoreMe({ menuIsVisible: !menuIsVisible })}
    >
      <div
        className={cn("menu-button", {
          opened: menuIsVisible,
          closed: hadInteraction.current && !menuIsVisible,
          interacted: !hadInteraction.current,
        })}
      >
        <b className="_1" />
        <b className="_2" />
        <b className="_3" />
      </div>
    </Wrap>
  );
};

export default HamburgerMenuButton;

const Wrap = styled.div`
  position: absolute;
  cursor: pointer;
  z-index: 5;
  top: ${({ theme }) => theme.hamburger_menu.top};
  left: ${({ theme }) => theme.hamburger_menu.left};
  right: ${({ theme }) => theme.hamburger_menu.right};

  .menu-button {
    position: absolute;
    width: 28px;
    height: 20px;
    margin: ${({ theme }) => theme.hamburger_menu.margin};

    b {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 3px;
      background-color: ${({ theme }) => theme.hamburger_menu.color};
      transition: width 0.2s ease, background-color 0.3s ease;
      animation-fill-mode: forwards;
      animation-timing-function: linear;

      &._1 {
        transform: translateY(0px);
        animation-duration: 0.3s;
      }

      &._2 {
        transform: translateY(8px);
        animation-duration: 0.15s;
      }

      &._3 {
        transform: translateY(16px);
        animation-duration: 0.3s;
      }
    }

    &.opened {
      b {
        background-color: ${({ theme }) => theme.hamburger_menu.close};

        &._1 {
          animation-name: hamburgerLine1Closed;
        }

        &._2 {
          animation-name: fadeOut;
        }

        &._3 {
          animation-name: hamburgerLine3Closed;
        }
      }
    }

    &.closed {
      b {
        &._1 {
          animation-name: hamburgerLine1Opened;
        }

        &._2 {
          animation-name: fadeIn;
        }

        &._3 {
          animation-name: hamburgerLine3Opened;
        }
      }
    }
  }

  &:hover {
    .menu-button {
      b {
        background-color: ${({ theme }) => theme.hamburger_menu.hover};
      }

      &.closed,
      &.interacted {
        b {
          &._1 {
            width: 50%;
          }

          &._2 {
            width: 75%;
          }
        }
      }

      &.opened {
        b {
          background-color: #ff0000;
        }
      }
    }
  }
`;
