import { useStoreMe, setStoreMe } from "store-me";
import styled from "styled-components/macro";

import MenuItems from "../../../common/MenuItems";

const menuItems = [
  {
    page: 0,
    text: "PORTFOLIO.MENU.SPACE_ART",
  },
  {
    page: 1,
    text: "PORTFOLIO.MENU.DIGITAL_ART",
  },
  {
    page: 2,
    text: "PORTFOLIO.MENU.TRADITIONAL_ART",
  },
  {
    page: 3,
    text: "PORTFOLIO.MENU.WEBSITES",
  },
  {
    page: 4,
    text: "PORTFOLIO.MENU.LOGOS",
  },
  {
    page: 5,
    text: "PORTFOLIO.MENU.BUSINESS_CARDS",
  },
];

const PortfolioMenu = () => {
  const { lookToSky, nextCurrentPortfolioPage } = useStoreMe("lookToSky", "nextCurrentPortfolioPage");

  return (
    <StyledMenuItems
      menuItems={menuItems}
      currentPageIndex={nextCurrentPortfolioPage}
      fadeOutItems={lookToSky}
      showMenu
      onClick={pageIndex => {
        setStoreMe({
          nextCurrentPortfolioPage: pageIndex,
        });
      }}
    />
  );
};

export default PortfolioMenu;

const StyledMenuItems = styled(MenuItems)`
  top: 15px;
  left: 30px;
  z-index: 101;
  opacity: 0;
  animation: fadeIn 0.4s ease forwards;

  .menu-item {
    font-size: 13px;
    margin-left: 25px;

    &:first-child {
      margin-left: 0;
    }
  }
`;
