import styled from "styled-components/macro";
import cn from "classnames";

const CloseButton = ({ size, thickness, onClick, className, dataTestId, onAnimationEnd, onTransitionEnd }) => (
  <Wrap
    onClick={onClick}
    btnSize={size || 20}
    thickness={thickness || 2}
    data-testid={dataTestId}
    onAnimationEnd={onAnimationEnd}
    onTransitionEnd={onTransitionEnd}
    className={cn("close-button", className)}
  />
);

export default CloseButton;

const Wrap = styled.div`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  z-index: 2;
  width: ${({ btnSize }) => btnSize}px;
  height: ${({ btnSize }) => btnSize}px;

  &:before,
  &:after {
    content: "";
    position: absolute;
    height: 130%;
    top: -15%;
    left: 50%;
    margin: 0 0 0 ${({ thickness }) => (thickness === 1 ? 0 : `-${thickness / 2}`)}px;
    width: ${({ thickness }) => thickness}px;
    background-color: #c0c3c6;
    transition: background-color 0.3s ease;
  }

  &:before {
    transform: rotate(-45deg);
  }
  &:after {
    transform: rotate(-135deg);
  }

  &:hover {
    &:before,
    &:after {
      background-color: #00bdff;
    }
  }
`;
