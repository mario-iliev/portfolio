import { createGlobalStyle } from "styled-components/macro";

const GlobalStyle = createGlobalStyle`
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @keyframes fadeOut {
    0% { opacity: 1; }
    100% { opacity: 0; }
  }

  @keyframes expandWidth {
    0% { width: 0%; }
    100% { width: 100%; }
  }

  @keyframes expandHeight {
    0% { height: 0%; }
    100% { height: 100%; }
  }

  @keyframes pulsateRotateReveal {
    0% { transform: rotate(360deg) scale(0); }
    60% { transform: rotate(0deg) scale(1.2); }
    100% { transform: rotate(0deg) scale(1); }
  }

  @keyframes lookToSkyAnimation {
    0% { transform: translateY(0%); }
    100% { transform: translateY(100%); }
  }

  @keyframes lookToGroundAnimation {
    0% { transform: translateY(100%); }
    100% { transform: translateY(0%); }
  }

  @keyframes checkboxOn {
    0% { transform: rotate(-55deg) scale(0); }
    100% { transform: rotate(-55deg) scale(1); }
  }

  @keyframes checkboxOff {
    0% { transform: rotate(-55deg) scale(1); }
    100% { transform: rotate(-55deg) scale(0); }
  }

  @keyframes hamburgerLine1Opened {
    0% { transform: translateY(8px) rotate(43deg); }
    50% { transform: translateY(8px) rotate(0deg); }
    100% { transform: translateY(0px); }
  }

  @keyframes hamburgerLine3Opened {
    0% { transform: translateY(8px) rotate(-43deg); }
    50% { transform: translateY(8px) rotate(0deg); }
    100% { transform: translateY(16px); }
  }

  @keyframes hamburgerLine1Closed {
    0% { transform: translateY(0px); }
    50% { transform: translateY(8px) rotate(0deg); }
    100% { transform: translateY(8px) rotate(43deg); }
  }

  @keyframes hamburgerLine3Closed {
    0% { transform: translateY(16px); }
    50% { transform: translateY(8px) rotate(0deg); }
    100% { transform: translateY(8px) rotate(-43deg); }
  }

  @keyframes soundBar1 {
    0% { transform: translateY(70%); }
    40% { transform: translateY(0%); }
    100% { transform: translateY(70%); }
  }

  @keyframes soundBar2 {
    0% { transform: translateY(10%); }
    40% { transform: translateY(60%); }
    100% { transform: translateY(10%); }
  }

  @keyframes soundBar3 {
    0% { transform: translateY(30%); }
    40% { transform: translateY(0%); }
    100% { transform: translateY(30%); }
  }

  @keyframes soundBar4 {
    0% { transform: translateY(80%); }
    25% { transform: translateY(30%); }
    50% { transform: translateY(70%); }
    75% { transform: translateY(0%); }
    100% { transform: translateY(80%); }
  }

  @keyframes spaceShipTrail {
    0% { transform: translateY(0%); }
    50% { transform: translateY(-3%); }
    100% { transform: translateY(0%); }
  }

  @keyframes spaceShipLiftOfExplosion {
    0% { transform: scale(0); opacity: 1; }
    2% { transform: scale(1); opacity: 1; }
    4% { transform: scale(0.8); opacity: 0; }
    100% { transform: scale(0.8); opacity: 0; }
  }

  @keyframes spaceShipTravel {
    0% { transform: translateY(100%); }
    100% { transform: translateY(-40%); }
  }

  @keyframes tooltipShow {
    0% { transform: translate(-50%, -150%);  opacity: 0; }
    100% { transform: translate(-50%, -100%); opacity: 1; }
  }

  @keyframes tooltipHide {
    0% { transform: translate(-50%, -100%); opacity: 1; }
    100% { transform: translate(-50%, -150%);  opacity: 0; }
  }

  @keyframes sunShockwave {
    0% { transform: scale(0); opacity: 1; }
    100% { transform: scale(2); opacity: 0; }
  }

  @keyframes homeMachineBlockSpin {
    0% { transform: rotate(45deg); }
    100% { transform: rotate(405deg); }
  }

  @keyframes homeMachineLightTrail1 {
    0% { transform: translateX(-20px); }
    15% { transform: translateX(100px); }
    100% { transform: translateX(100px); }
  }

  @keyframes homeMachineLightTrail2 {
    0% { transform: translateX(255px); }
    15% { transform: translateX(140px); }
    100% { transform: translateX(140px); }
  }

  @keyframes homeMachineLightTrail3 {
    0% { transform: translateY(-20px); }
    15% { transform: translateY(100px); }
    100% { transform: translateY(100px); }
  }

  @keyframes homeMachineLightTrail4 {
    0% { transform: translateY(255px); }
    15% { transform: translateY(140px); }
    100% { transform: translateY(140px); }
  }

  @keyframes homeMachineShowRing {
    0% { transform: scale(0); }
    70% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }

  @keyframes homeMenu1Show {
    0% { transform: translateX(0) }
    100% { transform: translateX(-296px) }
  }

  @keyframes homeMenu1Hide {
    0% { transform: translateX(-296px) }
    100% { transform: translateX(0px) }
  }

  @keyframes homeMenu2Show {
    0% { transform: translateY(0) }
    100% { transform: translateY(-296px) }
  }

  @keyframes homeMenu2Hide {
    0% { transform: translateY(-296px) }
    100% { transform: translateY(0px) }
  }

  @keyframes homeMenu3Show {
    0% { transform: translateX(0) }
    100% { transform: translateX(296px) }
  }

  @keyframes homeMenu3Hide {
    0% { transform: translateX(296px) }
    100% { transform: translateX(0px) }
  }

  @keyframes introCheckboxColorPulse {
    0% { color: #01baff; }
    30% { color: #fff; }
    60% { color: #01baff; }
    100% { color: #01baff; }
  }

  @keyframes headphonesNod {
    0% { transform: rotateX(0deg) translateY(0px); }
    50% { transform: rotateX(-10deg) translateY(5px); }
    100% { transform: rotateX(0deg) translateY(0px); }
  }

  @keyframes galleryUnshrinkAnimation {
    0% { transform: scale(0.2); }
    100% { transform: scale(1); }
  }

  @keyframes galleryShrinkAnimation {
    0% { transform: scale(1); }
    100% { transform: scale(0.2); }
  }
`;

const GlobalCSS = props => <GlobalStyle {...props} />;

export default GlobalCSS;
