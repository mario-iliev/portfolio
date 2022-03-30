import styled from "styled-components/macro";
import { useStoreMe } from "store-me";

import LanguageSwitch from "../common/LanguageSwitch";
import Sparkles from "../common/Sparkles";

const IntroScreenMobile = () => {
  const { i18n } = useStoreMe("i18n");

  return (
    <Wrap
      onAnimationEnd={({ animationName }) => {
        if (animationName === "fadeIn") {
          document.getElementById("app-spinner").classList.remove("animate");
        }
      }}
    >
      <WarningIconWrap>
        <Sparkles
          color="#f9e300"
          layers={15}
          maximumDistance={400}
          minimumAnimationDuration={8}
          maximumAnimationDuration={14}
        />

        <WarningIcon>
          <WarningSign>!</WarningSign>
        </WarningIcon>
      </WarningIconWrap>

      <TextWrap>
        <MainText>{i18n("MOBILE_UNDER_CONSTRUCTION")}</MainText>
        <ReasonText>{i18n("MOBILE_NOT_READY_REASON")}</ReasonText>
      </TextWrap>

      <StyledLanguageSwitch />
    </Wrap>
  );
};

export default IntroScreenMobile;

const Wrap = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 10000;
  animation: fadeIn 0.6s ease forwards;
`;

const WarningIconWrap = styled.div`
  width: 150px;
  height: 150px;
  perspective: 100px;
  margin-top: 40px;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1;
    border-radius: 100%;
    box-shadow: inset 0px 0px 16px #fff985, inset 0px 0px 7px #fff985, 0px 0px 26px #ffb785;
  }
`;

const WarningIcon = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 100%;
  background: radial-gradient(#fff15e 16%, #f9e300 29%, #ffa800 59%, #b54809 100%);
  box-shadow: 0px 0px 100px #844700, 0px 0px 110px #512b00, 0px 0px 170px #633500, 0px 0px 70px #f5880b,
    0px 0px 12px #f5a50d;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 110%;
    left: 57px;
    border-radius: 100%;
    box-shadow: rgb(255 255 255 / 70%) -9px -70px 20px;
  }
`;

const WarningSign = styled.div`
  font-size: 80px;
  font-weight: 400;
  color: #b53300;
`;

const StyledLanguageSwitch = styled(LanguageSwitch)`
  display: flex;
  justify-content: center;
  width: 100%;

  .active {
    color: #ffd300;
  }

  .inactive {
    color: #986b01;
  }

  div {
    margin-left: 20px;
  }
`;

const TextWrap = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  box-sizing: border-box;
  text-align: center;
  width: 100%;
  padding: 20px;
  margin: 30px 0 0 0;
  z-index: 1;
`;

const MainText = styled.div`
  font-size: 18px;
  color: #fff;
  font-weight: 400;

  span {
    display: inline-block;
    color: #ffd300;
    font-weight: 600;
    padding-bottom: 10px;
  }
`;

const ReasonText = styled.div`
  margin-top: 20px;
`;
