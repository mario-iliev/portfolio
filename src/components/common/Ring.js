import { useState, useEffect } from "react";
import styled from "styled-components/macro";
import cn from "classnames";

const Ring = ({ size, ringColor, spinnerWidth, spinnerColor, spinSpeed, customPosition, className }) => {
  const [styles, setStyles] = useState();

  useEffect(() => {
    if (customPosition) {
      setStyles({ border: `1px solid ${ringColor}` });
    } else {
      setStyles({
        width: `${size}px`,
        height: `${size}px`,
        margin: `-${size / 2 + 1}px 0 0 -${size / 2 + 1}px`,
        border: `1px solid ${ringColor}`,
      });
    }
  }, [customPosition, ringColor, size]);

  if (styles) {
    return (
      <Wrap
        className={cn("ring", className, { "has-spinner": spinnerWidth })}
        spinnerColor={spinnerColor}
        spinnerWidth={spinnerWidth}
        spinSpeed={spinSpeed}
        style={styles}
      />
    );
  } else {
    return null;
  }
};

export default Ring;

const Wrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 100%;

  &.has-spinner {
    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 100%;
      border-color: transparent;
      border-style: solid;
      top: ${({ spinnerWidth }) => `-${spinnerWidth}px`};
      left: ${({ spinnerWidth }) => `-${spinnerWidth}px`};
      border-width: ${({ spinnerWidth }) => `${spinnerWidth}px`};
      border-left-color: ${({ spinnerColor }) => spinnerColor};
      animation: spinAnimation ${({ spinSpeed }) => `${spinSpeed}s linear infinite`};
    }
  }
`;
