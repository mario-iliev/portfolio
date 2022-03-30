import { fullscreenChange, isFullscreen } from "toggle-fullscreen";
import { useEffect, useLayoutEffect } from "react";
import { useStoreMe, setStoreMe } from "store-me";
import styled from "styled-components/macro";
import cn from "classnames";

import IntroScreenDesktop from "./components/desktop/pages/intro/IntroScreenDesktop";
import Portfolio from "./components/desktop/pages/portfolio/Portfolio";
import useEventListener from "./components/hooks/useEventListener";
import Contact from "./components/desktop/pages/contact/Contact";
import TopRightMenu from "./components/desktop/TopRightMenu";
import Snake from "./components/desktop/pages/snake/Snake";
import About from "./components/desktop/pages/about/About";
import SceneStars from "./components/desktop/SceneStars";
import Home from "./components/desktop/pages/home/Home";
import Mountains from "./components/desktop/Mountains";
import SpaceShip from "./components/desktop/SpaceShip";
import useAudio from "./components/hooks/useAudio";
import Footer from "./components/desktop/Footer";
import Space from "./components/desktop/Space";
import Sun from "./components/desktop/Sun";
import Sky from "./components/desktop/Sky";
import sounds from "./_constants/sounds";

const Main = () => {
  const {
    nextPage,
    lookToSky,
    revealHome,
    currentPage,
    lookToGround,
    canLoadAudio,
    homeRevealed,
    introScreenRevealed,
  } = useStoreMe(
    "nextPage",
    "lookToSky",
    "revealHome",
    "currentPage",
    "lookToGround",
    "canLoadAudio",
    "homeRevealed",
    "introScreenRevealed"
  );
  const playThemeAudio = useAudio({
    url: sounds.theme,
    volume: 0.4,
    loop: true,
    fadeIn: 3000,
    type: "music",
  });
  const playChangePage = useAudio({
    url: sounds.change_page,
    volume: 0.2,
  });

  const onAnimationEnd = ({ animationName }) => {
    if (animationName === "lookToSkyAnimation") {
      setStoreMe({ animateSpaceRotation: true });
    } else if (animationName === "lookToGroundAnimation") {
      setStoreMe({ lookToGround: false, homeRevealed: true });
    }
  };

  useEventListener("blur", () => setStoreMe({ soundEnabled: false, windowIsFocused: false }));
  useEventListener("focus", () => setStoreMe({ soundEnabled: true, windowIsFocused: true }));

  useEffect(() => {
    fullscreenChange(() => setStoreMe({ isFullScreen: isFullscreen() })).finally(() => {});
  }, []);

  useEffect(() => {
    canLoadAudio && revealHome && playThemeAudio();
  }, [canLoadAudio, revealHome, playThemeAudio]);

  useLayoutEffect(() => {
    if (nextPage === currentPage) {
      if (currentPage !== 1) {
        setStoreMe({ nextCurrentPortfolioPage: 0, currentPortfolioPage: 0 });
      }
    } else {
      setStoreMe({ lookToSky: true });
      playChangePage();
    }
  }, [currentPage, nextPage, playChangePage]);

  return (
    <Wrap
      className={cn({
        "look-to-sky": lookToSky,
        "look-to-ground": lookToGround,
        reveal: revealHome && !homeRevealed,
        unrevealed: !homeRevealed,
      })}
      onAnimationEnd={onAnimationEnd}
    >
      {!homeRevealed && <IntroScreenDesktop />}

      {introScreenRevealed && <Space />}

      <AboveGround>
        <Sky />

        <SceneStars />

        {currentPage === 2 && (
          <>
            <AboutBackgroundPlanet />
            <AboutRightSmallSun />
            <AboutRightPlanet />
          </>
        )}
        {currentPage === 3 && <ContactsBackgroundPlanet />}
        {currentPage === 4 && <GameBackgroundPlanet />}

        <Sun />

        {homeRevealed && <SpaceShip size="big" />}
        {homeRevealed && <SpaceShip size="small" />}
      </AboveGround>

      <Ground />

      <AboveGround>
        <Mountains />

        {currentPage !== 0 && <TopRightMenu />}
      </AboveGround>

      {currentPage === 0 && <Home />}
      {currentPage === 1 && <Portfolio />}
      {currentPage === 2 && <About />}
      {currentPage === 3 && <Contact />}
      {currentPage === 4 && <Snake />}

      <Footer />
    </Wrap>
  );
};

export default Main;

const Wrap = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  will-change: transform, opacity;

  &.unrevealed {
    transform: translateY(100%);
  }

  &.reveal,
  &.look-to-sky,
  &.look-to-ground {
    pointer-events: none;

    * {
      pointer-events: none;
    }
  }

  &.reveal {
    animation: lookToGroundAnimation 2.5s ease-in-out forwards;
  }

  &.look-to-sky {
    animation: lookToSkyAnimation 1.5s ease-out forwards;
  }

  &.look-to-ground {
    animation: lookToGroundAnimation 1.5s ease-in-out forwards;
  }
`;

const Ground = styled.div`
  position: absolute;
  width: 100%;
  height: 19%;
  bottom: 0;
  background-color: #000;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100px;
    top: 0;
    left: 0;
    background: ${({ theme }) => theme.groundGradient};
  }
`;

const AboveGround = styled.div`
  position: absolute;
  width: 100%;
  height: 81%;
  top: 0;
`;

const GameBackgroundPlanet = styled.div`
  position: absolute;
  width: 25vw;
  height: 25vw;
  bottom: -30%;
  left: 30%;
  border-radius: 100%;
  box-shadow: inset -50px 10px 40px rgb(13 99 168 / 46%);
`;

const ContactsBackgroundPlanet = styled.div`
  position: absolute;
  width: 15vw;
  height: 15vw;
  top: 0;
  left: 8%;
  border-radius: 100%;
  box-shadow: inset -20px 2px 30px rgb(79 84 57 / 27%);
`;

const AboutBackgroundPlanet = styled.div`
  position: absolute;
  width: 35vw;
  height: 35vw;
  bottom: -14vw;
  left: 0;
  border-radius: 100%;
  box-shadow: inset -30px 2px 30px rgb(80 147 189 / 52%);
`;

const AboutRightSmallSun = styled.div`
  position: absolute;
  top: 20%;
  right: 20%;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background: #fff;
  box-shadow: 0 0 20px #4eb3ff, 0 0 20px #fff, 0 0 12px #4eb3ff, 0 0 9px #fff, 0 0 5px #fff;
`;

const AboutRightPlanet = styled.div`
  position: absolute;
  width: 5vw;
  height: 5vw;
  top: 10vw;
  right: 24vw;
  border-radius: 100%;
  box-shadow: inset -3px 4px 3px rgb(80 147 189 / 30%), inset -6px -7px 22px rgb(80 147 189 / 20%);
`;
