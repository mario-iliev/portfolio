import styled from "styled-components/macro";

const Sky = () => <Wrap />;

export default Sky;

const Wrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${({ theme }) => `linear-gradient(0deg, ${theme.sky});`};
`;
