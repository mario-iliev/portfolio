import styled from "styled-components/macro";

const City = () => (
  <Wrap>
    <Building1 />
    <Building2 />
    <Building3 />
    <Building4 />
    <Building5 />
    <Building6 />
  </Wrap>
);

export default City;

const Wrap = styled.div`
  position: absolute;
  overflow: hidden;
  width: 9vw;
  height: 9vw;
  right: 17.5%;
  bottom: 19%;

  div {
    position: absolute;
    bottom: 0;
    background: ${({ theme }) => `linear-gradient(0deg, ${theme.city})`};
  }
`;

const Building1 = styled.div`
  left: 0;
  width: 5%;
  height: 8%;
`;

const Building2 = styled.div`
  left: 5%;
  width: 3%;
  height: 21%;
`;

const Building3 = styled.div`
  left: 16%;
  width: 10%;
  height: 14%;
`;

const Building4 = styled.div`
  left: 30%;
  width: 6%;
  height: 25%;
`;

const Building5 = styled.div`
  left: 42%;
  width: 13%;
  height: 9%;
`;

const Building6 = styled.div`
  left: 72%;
  width: 9%;
  height: 15%;
`;
