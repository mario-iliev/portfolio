import styled from "styled-components/macro";

import IntroScreenMobile from "./components/mobile/IntroScreenMobile";

const Main = () => {
  return (
    <Wrap>
      <IntroScreenMobile />
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
`;
