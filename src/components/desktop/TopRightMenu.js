import { useStoreMe, setStoreMe } from "store-me";
import styled from "styled-components/macro";

import HamburgerMenuButton from "../common/HamburgerMenuButton";
import PlayGameButton from "../common/PlayGameButton";
import MenuItems from "../common/MenuItems";

const menuItems = [
  {
    page: 0,
    text: "MENU.HOME",
  },
  {
    page: 1,
    text: "MENU.PORTFOLIO",
  },
  {
    page: 2,
    text: "MENU.ABOUT",
  },
  {
    page: 3,
    text: "MENU.CONTACT",
  },
];

const TopRightMenu = () => {
  const { currentPage, menuIsVisible } = useStoreMe("currentPage", "menuIsVisible");

  return (
    <>
      <StyledHamburgerMenuButton />

      <StyledMenuItems
        menuItems={menuItems}
        currentPageIndex={currentPage}
        showMenu={menuIsVisible}
        onClick={pageIndex => {
          setStoreMe({
            nextPage: pageIndex,
            menuIsVisible: false,
          });
        }}
      />

      <StyledPlayGameButton />
    </>
  );
};

export default TopRightMenu;

const StyledHamburgerMenuButton = styled(HamburgerMenuButton)`
  width: 28px;
  height: 20px;
  z-index: 1000;
`;

const StyledMenuItems = styled(MenuItems)`
  top: 15px;
  right: 89px;

  .menu-item {
    opacity: 0;
    transition: opacity 0.4s ease, transform 0.4s ease;

    &.show {
      opacity: 1;
    }

    &._0 {
      transform: translateX(-50px);

      &.show {
        transform: translateX(0px);
      }
    }

    &._1 {
      transform: translateY(-50px);

      &.show {
        transform: translateY(0px);
      }
    }

    &._2 {
      transform: translateX(105px);

      &.show {
        transform: translateX(0px);
      }
    }

    &._3 {
      transform: translateY(50px);

      &.show {
        transform: translateY(0px);
      }
    }
  }
`;

const StyledPlayGameButton = styled(PlayGameButton)`
  position: absolute;
  right: 33px;
  top: 70px;
`;
