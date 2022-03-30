import styled from "styled-components/macro";
import { useStoreMe } from "store-me";
import { useEffect } from "react";

import HamburgerMenuButton from "../../../common/HamburgerMenuButton";
import sounds from "../../../../_constants/sounds";
import useAudio from "../../../hooks/useAudio";
import Ring from "../../../common/Ring";
import HomeMenu from "./HomeMenu";
import City from "./City";

const Home = () => {
  const { homeRevealed } = useStoreMe("homeRevealed");
  const playAudio = useAudio({ url: sounds.page_reveal, volume: 0.4 });

  useEffect(() => {
    homeRevealed && playAudio();
  }, [homeRevealed, playAudio]);

  return (
    <Wrap className="absolute">
      <City />

      <HamburgerMenuButton className="home-menu-btn" />

      <MenuWrap />

      <MainBlock>
        <MainBlockGlass />
        {homeRevealed && (
          <>
            <div className="light-trail _1" />
            <div className="light-trail _2" />
            <div className="light-trail _3" />
            <div className="light-trail _4" />
          </>
        )}
      </MainBlock>

      {homeRevealed && (
        <>
          <MiddleBlock className="spin-blocks" />
          <BottomBlock className="spin-blocks" />

          <HomeMenu />

          <Ring
            size={390}
            ringColor="rgba(255, 255, 255, 0.15)"
            spinSpeed={35}
            spinnerWidth={6}
            spinnerColor="#500023"
          />
          <Ring
            className="ring_2"
            size={500}
            ringColor="rgba(255, 255, 255, 0.15)"
            spinSpeed={15}
            spinnerWidth={8}
            spinnerColor="rgba(80, 0, 35, 0.7)"
          />
        </>
      )}
    </Wrap>
  );
};

export default Home;

const Wrap = styled.div`
  z-index: 100;

  .light-trail {
    position: absolute;
    z-index: 1;
    background: linear-gradient(
      15deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    box-shadow: 0px 0px 5px #00baff, 0px 0px 12px #00baff;
    animation-duration: 2.5s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-out;

    &._1,
    &._2 {
      width: 20px;
      height: 1px;
      top: 50%;
      left: 0px;
    }

    &._3,
    &._4 {
      width: 1px;
      height: 20px;
      top: 0;
      left: 50%;
    }

    &._1 {
      animation-name: homeMachineLightTrail1;
    }

    &._2 {
      animation-name: homeMachineLightTrail2;
    }

    &._3 {
      animation-name: homeMachineLightTrail3;
    }

    &._4 {
      animation-name: homeMachineLightTrail4;
    }
  }

  .spin-blocks {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 230px;
    height: 230px;
    margin: -115px 0 0 -115px;
    background-color: #000912;
  }

  .ring {
    transform: scale(0);
    animation-name: homeMachineShowRing;
    animation-duration: 1.4s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-out;

    &.ring_2 {
      animation-delay: 0.2s;
    }
  }

  .home-menu-btn {
    width: 80px;
    height: 80px;
    border-radius: 100%;
    margin: -39px 0 0 -39px;

    .menu-button {
      top: 50%;
      left: 50%;
    }
  }
`;

const MenuWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 4;
  width: 80px;
  height: 80px;
  margin: -40px 0 0 -40px;
  border-radius: 100%;
  border: 1px solid #00baff;
  background-color: #000;
  box-shadow: 0px 0px 20px #00baff, 0px 0px 5px #00baff;
`;

const MainBlock = styled.div`
  position: absolute;
  overflow: hidden;
  top: 50%;
  left: 50%;
  z-index: 3;
  width: 254px;
  height: 254px;
  margin: -127px 0 0 -127px;
  border: 1px solid #22aeff;
  background-color: rgb(0 9 18 / 85%);
  box-shadow: 0px 0px 16px #009cdd;
  transform: rotate(45deg);

  &:before,
  &:after {
    content: "";
    position: absolute;
    background-color: #00baff;
  }

  &:before {
    width: 100%;
    height: 1px;
    top: 50%;
  }

  &:after {
    width: 1px;
    height: 100%;
    left: 50%;
  }
`;

const MainBlockGlass = styled.div`
  position: absolute;
  top: 53px;
  left: -127px;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(9, 81, 105, 0.6) 100%);
  transform: rotate(-45deg);
`;

const MiddleBlock = styled.div`
  z-index: 2;
  border: 1px solid #ff6600;
  box-shadow: 0px 0px 11px rgba(249, 76, 16, 0.6);
  transform: rotate(45deg);
  animation: homeMachineBlockSpin 10s linear infinite;
`;

const BottomBlock = styled.div`
  z-index: 1;
  border: 1px solid #00a2ff;
  box-shadow: 0px 0px 11px #108ef9;
  transform: rotate(45deg);
  animation: homeMachineBlockSpin 16s linear infinite;
  animation-delay: 0.8s;
`;
