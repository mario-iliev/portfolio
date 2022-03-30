import { useStoreMe, setStoreMe } from "store-me";
import styled from "styled-components/macro";

import ToggleSoundIcon from "../common/ToggleSoundIcon";
import LanguageSwitch from "../common/LanguageSwitch";
import FullScreenBtn from "../common/FullScreenBtn";
import Checkbox from "../common/Checkbox";

const Footer = () => {
  const { userEnabledMusic, userEnabledEffects, homeRevealed } = useStoreMe(
    "userEnabledMusic",
    "userEnabledEffects",
    "homeRevealed"
  );

  return (
    <Wrap>
      <CopyRight>
        <span>&copy;</span> {new Date().getFullYear()}
      </CopyRight>

      <LanguageSwitch />

      <FullScreenBtn />

      <ToggleSoundIcon animate={homeRevealed}>
        <SoundsWrap>
          <SoundsInner>
            <Checkbox
              text="MUSIC"
              checked={userEnabledMusic}
              onClick={() => setStoreMe({ userEnabledMusic: !userEnabledMusic })}
            />
            <Checkbox
              text="EFFECTS"
              checked={userEnabledEffects}
              onClick={() => setStoreMe({ userEnabledEffects: !userEnabledEffects })}
            />
          </SoundsInner>
        </SoundsWrap>
      </ToggleSoundIcon>
    </Wrap>
  );
};

export default Footer;

const Wrap = styled.div`
  position: absolute;
  bottom: 30px;
  right: 30px;
  z-index: 500;
  display: flex;
  align-items: baseline;

  & > div {
    margin-left: 15px;

    &:first-child {
      margin-left: 0;
    }
  }
`;

const CopyRight = styled.div`
  font-size: 14px;
  font-weight: 600;
  cursor: default;
  color: ${({ theme }) => theme.footer};
`;

const SoundsWrap = styled.div`
  position: absolute;
  bottom: 20px;
  right: -20px;
  width: 175px;
  height: 75px;
`;

const SoundsInner = styled.div`
  position: absolute;
  right: 0;
  bottom: 15px;

  .checkbox-wrap {
    display: flex;
    flex-direction: row-reverse;
    margin-left: 0;
    margin-right: 20px;

    .cb-check {
      margin-right: 0;
      margin-left: 10px;
      border-color: ${({ theme }) => theme.language.inactive};
    }

    .cb-title {
      color: ${({ theme }) => theme.language.inactive};
    }

    &.is-check {
      .cb-check {
        border-color: ${({ theme }) => theme.language.active};
      }

      .cb-title {
        color: ${({ theme }) => theme.language.active};
      }
    }

    &:first-child {
      margin-bottom: 15px;
    }

    &:hover {
      .cb-title {
        color: ${({ theme }) => theme.language.active};
      }

      .cb-check {
        border-color: ${({ theme }) => theme.language.active};
      }
    }
  }
`;
