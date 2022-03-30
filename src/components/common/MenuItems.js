import styled from "styled-components/macro";
import { useStoreMe } from "store-me";
import cn from "classnames";

import sounds from "../../_constants/sounds";
import useAudio from "../hooks/useAudio";

const MenuItems = ({ menuItems, currentPageIndex, showMenu, fadeOutItems, onClick, className }) => {
  const { i18n } = useStoreMe("i18n");
  const playHover = useAudio({ url: sounds.hover_2 });

  return (
    <Wrap className={cn(className, { clickable: showMenu, hide: fadeOutItems })}>
      {menuItems.map(({ page, text }) => (
        <MenuItem
          className={cn("menu-item", `_${page}`, {
            active: currentPageIndex === page,
            show: showMenu,
          })}
          onMouseEnter={playHover}
          onClick={() => currentPageIndex !== page && onClick(page)}
          key={page}
        >
          {i18n(text)}
        </MenuItem>
      ))}
    </Wrap>
  );
};

export default MenuItems;

const Wrap = styled.div`
  position: absolute;
  z-index: 0;

  &.clickable {
    z-index: 500;
  }

  &.hide {
    animation: fadeOut 0.4s ease forwards;
  }
`;

const MenuItem = styled.div`
  cursor: pointer;
  color: #fff;
  display: inline-block;
  position: relative;
  font-size: 14px;
  font-weight: 600;
  margin-left: 30px;
  padding-top: 17px;
  text-transform: uppercase;
  transition: color 0.3s ease;

  &:after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 19px;
    left: 50%;
    transform: translateX(-50%);
    transition: background-color 0.3s ease, width 0.3s ease;
    background-color: ${({ theme }) => theme.menuItem.active};
  }

  &:first-child {
    margin-left: 0;
  }

  &:hover {
    &:after {
      width: 100%;
    }
  }

  &.active {
    cursor: default;
    color: ${({ theme }) => theme.menuItem.active};

    &:after {
      background-color: #fff;
    }
  }
`;
