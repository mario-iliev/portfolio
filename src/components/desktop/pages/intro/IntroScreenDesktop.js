import { useStoreMe, setStoreMe } from "store-me";
import toggleFullscreen from "toggle-fullscreen";
import styled from "styled-components/macro";
import { useState } from "react";
import cn from "classnames";

import ToggleSoundIcon from "../../../common/ToggleSoundIcon";
import LanguageSwitch from "../../../common/LanguageSwitch";
import sounds from "../../../../_constants/sounds";
import Sparkles from "../../../common/Sparkles";
import Checkbox from "../../../common/Checkbox";
import useAudio from "../../../hooks/useAudio";

const IntroScreenDesktop = () => {
  const { introScreenRevealed, userEnabledEffects, userEnabledMusic, isFullScreen, i18n } = useStoreMe(
    "introScreenRevealed",
    "userEnabledEffects",
    "userEnabledMusic",
    "isFullScreen",
    "i18n"
  );
  const [hide, setHide] = useState(false);
  const playAudio = useAudio({ url: sounds.hover_1, forceLoad: true });

  const onAnimationEnd = ({ animationName }) => {
    if (animationName === "fadeIn") {
      document.getElementById("app-spinner").classList.remove("animate");
      setStoreMe({ introScreenRevealed: true });
    }

    if (animationName === "fadeOut") {
      setStoreMe({ revealHome: true });
    }
  };

  return (
    <Wrap
      className={cn({ hide, "is-clickable": !hide && introScreenRevealed })}
      onClick={() => setStoreMe({ canLoadAudio: true })}
      onAnimationEnd={onAnimationEnd}
    >
      <HeadPhonesWrap>
        <StyledSparkles
          color="#50ccff"
          layers={15}
          maximumDistance={400}
          minimumAnimationDuration={8}
          maximumAnimationDuration={14}
        />

        <HeadPhoneFrame />
        <EarCup className="left" />
        <EarCup className="right" />

        <EnterButtonWrap onMouseEnter={playAudio} onClick={() => introScreenRevealed && setHide(true)}>
          <div className="text">{i18n("INTRO.ENTER")}</div>
          <StyledToggleSoundIcon animate disableAudio />
        </EnterButtonWrap>
      </HeadPhonesWrap>

      <PreferencesWrap>
        <Checkbox
          text="MUSIC"
          checked={userEnabledMusic}
          onClick={() => setStoreMe({ userEnabledMusic: !userEnabledMusic })}
        />
        <Checkbox
          text="EFFECTS"
          checked={userEnabledEffects}
          onClick={() => setStoreMe({ userEnabledEffects: !userEnabledEffects })}
        />

        <Checkbox
          text="FULLSCREEN"
          checked={isFullScreen}
          onClick={() => {
            setStoreMe({ isFullScreen: !isFullScreen });
            toggleFullscreen(document.querySelector("#root"));
          }}
        />
      </PreferencesWrap>

      <Description className="_1">{i18n("INTRO.DESCRIPTION")}</Description>
      <Description className="_2">{i18n("INTRO.SUB_HEADLINE")}</Description>

      <StyledLanguageSwitch />
    </Wrap>
  );
};

export default IntroScreenDesktop;

const Wrap = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 10000;
  pointer-events: none;
  transform: translateY(-100%);
  animation: fadeIn 0.6s ease;
  background: radial-gradient(circle, rgba(0, 28, 48, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 100%);

  &.hide {
    animation: fadeOut 0.8s ease forwards;
  }

  &.is-clickable {
    pointer-events: auto;
  }
`;

const HeadPhonesWrap = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin-top: 49px;
  perspective: 100px;
`;

const HeadPhoneFrame = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 107px;

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 200px;
    height: 200px;
    top: 10px;
    border-radius: 100%;
    box-sizing: border-box;
  }

  &:before {
    border: 9px solid #8a919a;
  }

  &:after {
    box-shadow: inset 0px 7px 2px #fff;
  }
`;

const EarCup = styled.div`
  position: absolute;
  overflow: hidden;
  top: 98px;
  width: 39px;
  height: 78px;

  &:before {
    content: "";
    position: absolute;
    width: 78px;
    height: 100%;
    border-radius: 100%;
    background-color: #fff;
    box-shadow: inset 0px -18px 16px rgb(0 12 30 / 70%);
  }

  &.left {
    left: -18px;
    transform: rotate(-6deg);

    &:before {
      left: 0;
    }
  }

  &.right {
    right: -17px;
    transform: rotate(6deg);

    &:before {
      right: 0;
    }
  }
`;

const EnterButtonWrap = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  top: 70px;
  left: 32px;
  width: 134px;
  height: 134px;
  border-radius: 100%;
  border: 1px solid #00c6ff;
  box-sizing: border-box;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.4);
  background: radial-gradient(
    circle,
    rgba(0, 41, 67, 1) 0%,
    rgba(0, 41, 67, 1) 30%,
    rgba(0, 26, 43, 1) 70%,
    rgba(0, 26, 43, 1) 100%
  );
  transform-style: preserve-3d;

  .text {
    color: #fff;
    font-size: 29px;
    font-weight: 600;
    line-height: 100%;
    text-align: center;
    letter-spacing: 0.3px;
    text-transform: uppercase;
    transition: color 0.4s ease;
  }

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 170%;
    left: 50px;
    top: 0;
    border-radius: 100%;
    box-shadow: -9px -70px 20px rgba(255, 255, 255, 0.1);
  }

  &:hover {
    animation: headphonesNod 0.7s ease;

    .text {
      color: #00dcff;
    }
  }
`;

const StyledToggleSoundIcon = styled(ToggleSoundIcon)`
  position: absolute;
  top: 112px;
  left: 57px;
  pointer-events: none;

  b {
    &._1,
    &._2,
    &._3,
    &._4 {
      background-color: #0b446c;
    }
  }

  .music {
    b {
      &._1,
      &._2 {
        background-color: #00daff;
      }
    }
  }

  .effects {
    b {
      &._3,
      &._4 {
        background-color: #00daff;
      }
    }
  }
`;

const StyledSparkles = styled(Sparkles)`
  margin-top: 40px;
`;

const PreferencesWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 33px;

  .checkbox-wrap {
    &.not-checked {
      &:last-child {
        .cb-title {
          animation: introCheckboxColorPulse 1.5s ease infinite;
          animation-delay: 0.7s;
        }

        &:hover {
          .cb-title {
            animation: none;
          }
        }
      }
    }
  }
`;

const Description = styled.div`
  font-weight: 400;
  text-align: center;

  &._1 {
    color: #fff;
    font-size: 18px;
    margin-top: 21px;
  }

  &._2 {
    color: #86a7b5;
    font-size: 15px;
    margin-top: 7px;
  }
`;

const StyledLanguageSwitch = styled(LanguageSwitch)`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  .active {
    color: #00daff;
  }

  .inactive {
    color: #015b98;
  }
`;
