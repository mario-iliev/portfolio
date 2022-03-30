import { useState, useEffect, useRef } from "react";
import { useStoreMe, setStoreMe } from "store-me";
import styled from "styled-components/macro";
import cn from "classnames";

import sounds from "../../../../_constants/sounds";
import Sparkles from "../../../common/Sparkles";
import useAudio from "../../../hooks/useAudio";

const HomeMenu = () => {
  const { i18n, currentPage, menuIsVisible, lookToSky } = useStoreMe(
    "i18n",
    "currentPage",
    "menuIsVisible",
    "lookToSky"
  );
  const [hoveredMenu, setHoveredMenu] = useState();
  const playHover = useAudio({ url: sounds.hover_2 });
  const prevMenuIsVisible = useRef(menuIsVisible);
  const hadInteraction = useRef(false);
  const changePage = page => {
    !lookToSky && currentPage !== page && setStoreMe({ nextPage: page });
  };

  useEffect(() => {
    if (menuIsVisible && !hadInteraction.current) {
      hadInteraction.current = true;
    }

    if (prevMenuIsVisible.current !== menuIsVisible) {
      prevMenuIsVisible.current = menuIsVisible;
    }
  }, [menuIsVisible]);

  return (
    <Wrap className={cn({ show: menuIsVisible, hide: hadInteraction.current && !menuIsVisible })}>
      <div
        className="menu-item _1"
        onClick={() => changePage(1)}
        onMouseEnter={() => {
          playHover();
          setHoveredMenu(1);
        }}
        onMouseLeave={() => setHoveredMenu(null)}
      >
        {hoveredMenu === 1 && (
          <Sparkles
            color="#fa08ff"
            layers={5}
            dotsPerLayer={7}
            maxAnimationDelay={3}
            maximumDistance={130}
            maximumDotSize={3}
            minimumAnimationDuration={5}
            maximumAnimationDuration={9}
          />
        )}
        <BlockGlass />
        <span>{i18n("MENU.PORTFOLIO")}</span>
        <i className="line" />
      </div>

      <div
        className="menu-item _2"
        onClick={() => changePage(2)}
        onMouseEnter={() => {
          playHover();
          setHoveredMenu(2);
        }}
        onMouseLeave={() => setHoveredMenu(null)}
      >
        {hoveredMenu === 2 && (
          <Sparkles
            color="#00cefa"
            layers={5}
            dotsPerLayer={7}
            maxAnimationDelay={3}
            maximumDistance={130}
            maximumDotSize={3}
            minimumAnimationDuration={5}
            maximumAnimationDuration={9}
          />
        )}
        <BlockGlass />
        <span>{i18n("MENU.ABOUT")}</span>
        <i className="line" />
      </div>

      <div
        className="menu-item _3"
        onClick={() => changePage(3)}
        onMouseEnter={() => {
          playHover();
          setHoveredMenu(3);
        }}
        onMouseLeave={() => setHoveredMenu(null)}
      >
        {hoveredMenu === 3 && (
          <Sparkles
            color="#4cfa00"
            layers={5}
            dotsPerLayer={7}
            maxAnimationDelay={3}
            maximumDistance={130}
            maximumDotSize={3}
            minimumAnimationDuration={5}
            maximumAnimationDuration={9}
          />
        )}
        <BlockGlass />
        <span>{i18n("MENU.CONTACT")}</span>
        <i className="line" />
      </div>
    </Wrap>
  );
};

export default HomeMenu;

const Wrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 254px;
  height: 254px;
  margin: -127px 0 0 -127px;

  .menu-item {
    cursor: pointer;
    position: absolute;
    will-change: transform;
    z-index: 1;
    top: 50%;
    left: 50%;
    width: 50px;
    height: 50px;
    margin: -25px 0 0 -25px;
    animation-duration: 0.5s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;

    span {
      position: absolute;
      color: #fff;
      opacity: 0;
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.7px;
      pointer-events: none;
      transition-property: transform, opacity;
      transition-timing-function: ease;
      transition-duration: 0.3s;
    }

    i {
      position: absolute;
      pointer-events: none;
      background-color: #00baff;
      transition-property: width, height;
      transition-timing-function: ease;
      transition-duration: 0.15s;
    }

    &._1 {
      span {
        top: 18px;
        right: 0;
        transform: translateX(-95px);
      }

      i {
        top: 50%;
        right: -93px;
        height: 1px;
        width: 0;
      }

      &:after {
        background-color: #fa08ff;
        box-shadow: 0px 0px 6px #ff91fd;
      }
    }

    &._2 {
      span {
        width: 150px;
        top: 0;
        left: -50px;
        transform: translateY(-60px);
        text-align: center;
      }

      i {
        bottom: -93px;
        left: 50%;
        width: 1px;
        height: 0;
      }

      &:after {
        background-color: #00cefa;
        box-shadow: 0px 0px 6px #00cefa;
      }
    }

    &._3 {
      span {
        top: 18px;
        left: 0;
        transform: translateX(95px);
      }

      i {
        top: 50%;
        left: -93px;
        height: 1px;
        width: 0;
      }

      &:after {
        background-color: #4cfa00;
        box-shadow: 0px 0px 6px #4cfa00;
      }
    }

    &:before {
      content: "";
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      border: 1px solid #00629b;
      background-color: #000912;
      box-shadow: 0px 0px 5px #009cdd;
      transform: rotate(45deg);
      transition: background-color 0.3s ease, box-shadow 0.3s ease;
      transition-delay: 0.15s;
    }

    &:after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      width: 14px;
      height: 14px;
      margin: -7px 0 0 -6px;
    }

    &:hover {
      span {
        opacity: 1;
      }

      &._1 {
        span {
          transform: translateX(-75px);
        }

        i {
          width: 82px;
        }
      }

      &._2 {
        span {
          transform: translateY(-40px);
        }

        i {
          height: 82px;
        }
      }

      &._3 {
        span {
          transform: translateX(75px);
        }

        i {
          width: 82px;
        }
      }

      &:before {
        background-color: transparent;
        box-shadow: 0px 0px 5px #00b4ff, 0px 0px 18px rgba(0, 180, 255, 0.65);
      }
    }
  }

  &.show {
    .menu-item {
      &._1 {
        animation-name: homeMenu1Show;
      }
      &._2 {
        animation-name: homeMenu2Show;
      }
      &._3 {
        animation-name: homeMenu3Show;
      }

      &:after {
        animation: spinAnimation 3s linear infinite;
      }
    }
  }

  &.hide {
    .menu-item {
      &._1 {
        animation-name: homeMenu1Hide;
      }
      &._2 {
        animation-name: homeMenu2Hide;
      }
      &._3 {
        animation-name: homeMenu3Hide;
      }
    }
  }
`;

const BlockGlass = styled.div`
  position: absolute;
  overflow: hidden;
  pointer-events: none;
  width: 100%;
  height: 100%;
  z-index: 1;
  transform: rotate(45deg);

  &:before {
    content: "";
    position: absolute;
    top: 8px;
    left: -25px;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.15) 100%);
    transform: rotate(-45deg);
  }
`;
