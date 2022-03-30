import styled from "styled-components/macro";

const Sun = () => <Wrap />;

export default Sun;

const Wrap = styled.div`
  position: absolute;
  width: 30vw;
  height: 30vw;
  border-radius: 100%;
  top: ${({ theme }) => theme.sun.top};
  right: ${({ theme }) => theme.sun.right};
  box-shadow: ${({ theme }) => theme.sun.box_shadow};
  background: ${({ theme }) => `linear-gradient(0deg, ${theme.sun.gradient});`};
`;
