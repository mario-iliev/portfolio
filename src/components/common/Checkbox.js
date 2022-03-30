import styled from "styled-components/macro";
import { useStoreMe } from "store-me";
import cn from "classnames";

import sounds from "../../_constants/sounds";
import useAudio from "../hooks/useAudio";

const Checkbox = ({ checked, text, onClick }) => {
  const { i18n } = useStoreMe("i18n");
  const playAudio = useAudio({ url: sounds.hover_2, forceLoad: true });

  return (
    <Wrap
      className={cn("checkbox-wrap", { "is-check": checked, "not-checked": !checked })}
      onClick={onClick}
      onMouseEnter={playAudio}
    >
      <Check className={cn("cb-check", { checked })} />
      <span className="cb-title">{i18n(text)}</span>
    </Wrap>
  );
};

export default Checkbox;

const Wrap = styled.div`
  display: inline-block;
  vertical-align: bottom;
  cursor: pointer;
  color: #01baff;
  margin-left: 15px;
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  text-transform: uppercase;

  span {
    display: inline-block;
    vertical-align: middle;
  }

  .cb-title {
    transition: color 0.4s ease;
  }

  &:first-child {
    margin-left: 0;
  }

  &:hover {
    .cb-title {
      color: #fff;
    }
  }
`;

const Check = styled.span`
  position: relative;
  width: 14px;
  height: 14px;
  border: 1px solid #01baff;
  margin-right: 10px;
  box-sizing: border-box;
  transition: border 0.4s ease;

  &:before {
    content: "";
    position: absolute;
    width: 9px;
    height: 4px;
    top: 2px;
    left: 1px;
    border-left: 2px solid #fff;
    border-bottom: 1px solid #fff;
    transform: rotate(-55deg);
    animation-duration: 0.2s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-out;
    animation-name: checkboxOff;
  }

  &.checked {
    &:before {
      animation-name: checkboxOn;
    }
  }
`;
