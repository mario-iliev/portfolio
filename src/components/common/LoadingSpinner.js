import styled from "styled-components/macro";
import cn from "classnames";

const LoadingSpinner = ({
  wrapped,
  className,
  dataTestId,
  loadingSize,
  loadingColor,
  loadingThicknes,
  loadingBaseColor,
}) => {
  const elSize = loadingSize || 50;
  const spinner = (
    <Spinner
      loadingSize={elSize}
      loadingColor={loadingColor}
      loadingThicknes={loadingThicknes}
      loadingBaseColor={loadingBaseColor}
      className={cn("spinner", className)}
    />
  );

  if (wrapped) {
    return (
      <Wrap loadingSize={elSize} data-testid={dataTestId}>
        {spinner}
      </Wrap>
    );
  } else {
    return spinner;
  }
};

const Wrap = styled.span.attrs(props => ({
  style: {
    width: `${props.loadingSize}px`,
    height: `${props.loadingSize}px`,
  },
}))`
  display: inline-block;
  position: relative;
`;

const Spinner = styled.span.attrs(props => ({
  style: {
    width: `${props.loadingSize}px`,
    height: `${props.loadingSize}px`,
    margin: `-${props.loadingSize / 2}px 0px 0px -${props.loadingSize / 2}px`,
    border: `${props.loadingThicknes || Math.floor(props.loadingSize / 13)}px solid ${
      props.loadingBaseColor || "#e8e8e8"
    }`,
    borderLeftColor: props.loadingColor,
  },
}))`
  display: block;
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  border-radius: 100%;
  transform: translateZ(0);
  box-sizing: border-box;
  border-color: transparent;
  animation: spinAnimation 0.7s infinite linear;
`;

export default LoadingSpinner;
