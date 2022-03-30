import styled from "styled-components/macro";
import { useStoreMe } from "store-me";
import i18next from "i18next";
import cn from "classnames";

import useLanguageSwitch from "../hooks/useLanguageSwitch";
import sounds from "../../_constants/sounds";
import useAudio from "../hooks/useAudio";

const LanguageSwitch = ({ className }) => {
  const { menuIsVisible, language } = useStoreMe("menuIsVisible", "language");
  const playAudio = useAudio({ url: sounds.hover_1, volume: 0.7 });
  const { changeLanguage } = useLanguageSwitch();
  const languages = i18next.services.resourceStore.data || {};

  return (
    <Wrap className={cn(className, { show: menuIsVisible })}>
      {Object.keys(languages).map(lang => (
        <Btn
          className={cn({ active: lang === language, inactive: lang !== language })}
          onClick={() => lang !== language && changeLanguage(lang)}
          onMouseEnter={playAudio}
          key={lang}
        >
          {lang}
        </Btn>
      ))}
    </Wrap>
  );
};

export default LanguageSwitch;

const Wrap = styled.div`
  display: inline-block;
`;

const Btn = styled.div`
  display: inline-block;
  cursor: pointer;
  margin-left: 10px;
  font-size: 13px;
  line-height: 100%;
  font-weight: 700;
  text-transform: uppercase;
  transition: color 0.3s ease;
  color: ${({ theme }) => theme.language.inactive};

  &:first-child {
    margin-left: 0;
  }

  &.active {
    cursor: default;
    color: ${({ theme }) => theme.language.active};
  }

  &.inactive {
    &:hover {
      color: #fff;
    }
  }
`;
