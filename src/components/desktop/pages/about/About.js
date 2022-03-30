import styled from "styled-components/macro";
import { useStoreMe } from "store-me";
import { useState } from "react";
import cn from "classnames";

import calculateAge from "../../../../utils/calculateAge";
import sounds from "../../../../_constants/sounds";
import Sparkles from "../../../common/Sparkles";
import useAudio from "../../../hooks/useAudio";
import Ring from "../../../common/Ring";

const About = () => {
  const { i18n, language } = useStoreMe("i18n", "language");
  const [dorkImageShown, setDorkImageShown] = useState(false);
  const playAudio = useAudio({ url: sounds.mario_coin, volume: 0.3 });

  return (
    <Wrap>
      <Content>
        <ImageWrap className={cn({ rotate: dorkImageShown })}>
          <Sparkles
            color="#50ccff"
            layers={20}
            maximumDistance={600}
            minimumAnimationDuration={10}
            maximumAnimationDuration={15}
          />

          <ImageBackground />

          <Images
            onMouseEnter={() => {
              setDorkImageShown(true);
              playAudio();
            }}
            onMouseLeave={() => setDorkImageShown(false)}
          >
            <img src="./images/mario-iliev-1.jpg" alt="" />
            <img className={cn("dork-img", { shown: dorkImageShown })} src="./images/mario-iliev-2.jpg" alt="" />
          </Images>

          {language === "en" && (
            <DorkTitle className={cn({ shown: dorkImageShown })}>{i18n("ABOUT.DORK_MODE")}</DorkTitle>
          )}

          <Arrow />

          <Ring size={450} ringColor="rgba(255, 255, 255, 0.15)" />
          <Ring size={610} ringColor="#07536f" spinSpeed={25} spinnerWidth={6} spinnerColor="#07536f" />
        </ImageWrap>

        <Name>
          <span>{i18n("NAME")}</span>
        </Name>

        <TextBox className="light">
          {i18n("ABOUT.RESUME", {
            years_old: calculateAge("02/17/1989"),
            experience: calculateAge("01/01/2012"),
            react_link: (
              <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
                <b>React</b>
              </a>
            ),
          })}
        </TextBox>

        <TextBox className="dark">
          {i18n("ABOUT.ABOUT_SITE", {
            store_me_link: (
              <a href="https://www.npmjs.com/package/store-me" target="_blank" rel="noreferrer">
                <b>StoreMe</b>
              </a>
            ),
          })}
        </TextBox>
      </Content>
    </Wrap>
  );
};

export default About;

const Wrap = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 10;
`;

const Content = styled.div`
  max-width: 1140px;
  padding-top: 30px;
`;

const ImageWrap = styled.div`
  width: 304px;
  height: 304px;
  margin: 0 auto;
  position: relative;

  &.rotate {
    &:after {
      transform: rotate(225deg);
    }
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    border-radius: 100%;
    width: 262px;
    height: 262px;
    top: 50%;
    left: 50%;
    z-index: 1;
  }

  &:before {
    margin: -131px 0 0 -131px;
    border: 1px solid #009ae2;
  }

  &:after {
    margin: -138px 0 0 -138px;
    border-color: transparent;
    border-style: solid;
    border-top-color: #009ae2;
    border-width: 8px;
    transform: rotate(45deg);
    transition: transform 0.4s ease;
  }
`;

const ImageBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 10px;
  background-color: #fff;
`;

const Images = styled.div`
  position: absolute;
  overflow: hidden;
  z-index: 10;
  top: 50%;
  left: 50%;
  width: 224px;
  height: 224px;
  border-radius: 100%;
  margin: -112px 0 0 -112px;

  img {
    position: absolute;
    top: 0;
    left: 0;

    &.dork-img {
      animation: fadeOut 0.4s ease forwards;
      z-index: 1;

      &.shown {
        animation: fadeIn 0.4s ease forwards;
      }
    }
  }
`;

const DorkTitle = styled.div`
  color: #2c2c2c;
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 14px;
  font-weight: 600;
  opacity: 0;
  transition: opacity 0.3s ease;

  &.shown {
    opacity: 1;
  }
`;

const Arrow = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  width: 0;
  height: 0;
  margin: -5px 0 0 -15px;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 20px solid #fff;
`;

const Name = styled.div`
  width: 100%;
  height: 1px;
  position: relative;

  span {
    position: absolute;
    font-size: 32px;
    bottom: 100%;
    left: 20px;
    z-index: 1;
    margin: 0 0 -4px 0;
    line-height: 100%;
  }
`;

const TextBox = styled.div`
  position: relative;
  margin: 20px 0 0 0;
  padding: 20px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 400;
  line-height: 19px;
  overflow: hidden;
  letter-spacing: -0.4px;

  a {
    color: #009ae2;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  &.light {
    color: #2c2c2c;
    background-color: #fff;
  }

  &.dark {
    color: #fff;
    border: 1px solid rgb(147 222 255 / 60%);
    text-align: center;
    background-color: rgba(0, 0, 0, 0.35);

    span {
      display: block;
      font-size: 17px;
      margin: 12px 0 0 0;
      color: #00ccff;
    }

    a {
      color: #00ccff;

      &:hover {
        color: #fff;
      }
    }

    &:before {
      content: "";
      position: absolute;
      width: 110%;
      height: 110%;
      top: 0;
      left: -5%;
      pointer-events: none;
      box-shadow: inset 0px 0px 45px rgb(255 255 255 / 65%);
    }
  }
`;
