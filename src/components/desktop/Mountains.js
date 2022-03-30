import styled from "styled-components/macro";

const Mountains = () => (
  <Wrap>
    <Mountain1 />
    <Mountain2 />
    <Mountain3 />
    <Mountain4 />
    <Mountain5 />
  </Wrap>
);

export default Mountains;

const Wrap = styled.div`
  div {
    position: absolute;
    bottom: 0;

    &:before,
    &:after {
      content: "";
      position: absolute;
    }
  }
`;

const Mountain1 = styled.div`
  z-index: 8;
  width: 50vw;
  height: 20vw;
  left: ${({ theme }) => theme.mountain1.left};

  &:before {
    width: 100%;
    height: 100%;
    top: ${({ theme }) => theme.mountain1.before.top};
    left: ${({ theme }) => theme.mountain1.before.left};
    background: ${({ theme }) => `linear-gradient(
      ${theme.mountain1.before.gradientDegree}, ${theme.mountain1.before.gradient}
    )`};
    transform: ${({ theme }) => theme.mountain1.before.transform};
  }
`;

const Mountain2 = styled.div`
  z-index: 7;
  width: 50vw;
  height: 20vw;
  left: ${({ theme }) => theme.mountain2.left};

  &:before {
    width: 100%;
    height: 100%;
    top: ${({ theme }) => theme.mountain2.before.top};
    left: ${({ theme }) => theme.mountain2.before.left};
    background: ${({ theme }) => `linear-gradient(
      ${theme.mountain2.before.gradientDegree}, ${theme.mountain2.before.gradient}
    )`};
    transform: ${({ theme }) => theme.mountain2.before.transform};
  }

  &:after {
    width: 100%;
    height: 40%;
    top: ${({ theme }) => theme.mountain2.after.top};
    left: ${({ theme }) => theme.mountain2.after.left};
    background: ${({ theme }) => `linear-gradient(
      ${theme.mountain2.after.gradientDegree}, ${theme.mountain2.after.gradient}
    )`};
    transform: ${({ theme }) => theme.mountain2.after.transform};
  }
`;

const Mountain3 = styled.div`
  z-index: 5;
  width: 10vw;
  height: 10vw;
  left: ${({ theme }) => theme.mountain3.left};

  &:before {
    width: 300%;
    height: 300%;
    top: ${({ theme }) => theme.mountain3.before.top};
    left: ${({ theme }) => theme.mountain3.before.left};
    background: ${({ theme }) => `linear-gradient(
      ${theme.mountain3.before.gradientDegree}, ${theme.mountain3.before.gradient}
    )`};
    transform: ${({ theme }) => theme.mountain3.before.transform};
  }
`;

const Mountain4 = styled.div`
  z-index: 6;
  width: 30vw;
  height: 30vw;
  left: ${({ theme }) => theme.mountain4.left};

  &:before {
    width: 300%;
    height: 300%;
    top: ${({ theme }) => theme.mountain4.before.top};
    left: ${({ theme }) => theme.mountain4.before.left};
    background: ${({ theme }) => `linear-gradient(
      ${theme.mountain4.before.gradientDegree}, ${theme.mountain4.before.gradient}
    )`};
    transform: ${({ theme }) => theme.mountain4.before.transform};
  }
`;

const Mountain5 = styled.div`
  z-index: 6;
  width: 10vw;
  height: 10vw;
  left: ${({ theme }) => theme.mountain5.left};

  &:before {
    width: 300%;
    height: 300%;
    top: ${({ theme }) => theme.mountain5.before.top};
    left: ${({ theme }) => theme.mountain5.before.left};
    background: ${({ theme }) => `linear-gradient(
      ${theme.mountain5.before.gradientDegree}, ${theme.mountain5.before.gradient}
    )`};
    transform: ${({ theme }) => theme.mountain5.before.transform};
  }
`;
