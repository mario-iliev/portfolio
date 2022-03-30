import { ThemeProvider } from "styled-components/macro";
import { createContext } from "react";
import { useStoreMe } from "store-me";

const page_home = {
  sky: "rgb(152, 68, 0) 0%, rgba(90, 0, 36, 1) 22%, rgba(22, 0, 9, 0.9) 60%, rgba(0, 0, 0, 0.4) 100%",
  sun: {
    top: "67.3%",
    right: "0",
    gradient: "rgba(173, 75, 2, 0.75) 0%, rgba(191, 85, 0, 0.55) 60%, rgba(93, 0, 36, 0.22) 100%",
    box_shadow: "none",
  },
  ship: {
    trail: "rgba(255, 255, 255, 0) 10%, rgba(26, 182, 255, 1) 100%",
    explosion:
      "rgba(143, 219, 255, 1) 0%, rgba(60, 193, 255, 1) 15%, rgba(234, 248, 255, 0.2) 45%, rgba(255, 255, 255, 0) 100%",
    blaster: "rgba(67, 218, 255, 1) 0%, rgba(255, 255, 255, 0) 80%, rgba(255, 255, 255, 0) 100%",
    big: {
      wrap_left: "8.6%",
    },
    small: {
      wrap_left: "89.4%",
    },
  },
  city: "rgba(154, 65, 0, 1) 0%, rgba(134, 44, 13, 1) 100%",
  hamburger_menu: {
    color: "#4cfa00",
    hover: "#f30044",
    close: "#920438",
    top: "50%",
    left: "50%",
    right: "auto",
    margin: "-9px 0 0 -13px",
  },
  menuItem: {
    active: "#00cefd",
  },
  language: {
    active: "#d82400",
    inactive: "#6a111b",
  },
  mountain1: {
    left: "-8.5%",
    before: {
      top: "103%",
      left: "10%",
      gradientDegree: "-25deg",
      gradient: "rgba(0, 0, 0, 1) 63%, rgba(76, 0, 22, 1) 100%",
      transform: "rotate(27deg)",
    },
  },
  mountain2: {
    left: "5.5%",
    before: {
      top: "116%",
      left: "1%",
      gradientDegree: "-42deg",
      gradient: "rgba(0, 0, 0, 1) 69%, rgba(60, 0, 12, 1) 83%, rgba(74, 3, 17, 1) 91%, rgba(51, 0, 11, 1) 100%",
      transform: "rotate(41deg)",
    },
    after: {
      top: "174.3%",
      left: "-42.7%",
      gradientDegree: "-31deg",
      gradient: "rgba(0, 0, 0, 1) 73%, rgba(76, 0, 22, 1) 100%",
      transform: "rotate(93deg) skew(52deg, 9deg)",
    },
  },
  mountain3: {
    left: "23%",
    before: {
      top: "62%",
      left: "-81%",
      gradientDegree: "-45deg",
      gradient: "rgba(0, 0, 0, 1) 92%, rgba(97, 0, 28, 1) 100%",
      transform: "rotate(60deg) skewY(-32deg)",
    },
  },
  mountain4: {
    left: "21%",
    before: {
      top: "63%",
      left: "-80%",
      gradientDegree: "-45deg",
      gradient: "rgba(0, 0, 0, 1) 92%, rgba(97, 0, 28, 1) 100%",
      transform: "rotate(60deg) skewY(-40deg) skewX(-10deg)",
    },
  },
  mountain5: {
    left: "87%",
    before: {
      top: "96%",
      left: "-80%",
      gradientDegree: "-45deg",
      gradient: "rgba(0, 0, 0, 1) 92%, rgba(97, 0, 28, 1) 100%",
      transform: "rotate(60deg) skewY(-30deg)",
    },
  },
  fullscreen: {
    color: "#751c0f",
    hover: "#ec472e",
  },
  sound: {
    icon: {
      on: "#d82400",
      off: "#6a111b",
    },
  },
  footer: "#751c0f",
  groundGradient: "linear-gradient(1deg, #000 61%, #590000 100%)",
};

const page_portfolio = {
  sky: "rgb(136, 0, 211) 0%, rgba(61, 0, 109, 1) 22%, rgba(12, 0, 22, 1) 60% ,rgba(0, 0, 0, 1) 100%",
  sun: {
    top: "67.3%",
    right: "0",
    gradient: "rgba(168, 0, 197, 0.75) 0%, rgba(241, 20, 255, 0.55) 60%, rgba(87, 0, 93, 0.22) 100%",
    box_shadow: "none",
  },
  ship: {
    trail: "rgba(255, 255, 255, 0) 10%, rgba(254, 216, 255, 1) 100%",
    explosion:
      "rgba(239, 162, 251, 1) 0%, rgba(255, 214, 246, 1) 15%, rgba(234, 248, 255, 0.2) 45%, rgba(255, 255, 255, 0) 100%",
    blaster: "rgba(254, 196, 255, 1) 0%, rgba(255, 255, 255, 0) 80%, rgba(255, 255, 255, 0) 100%",
    big: {
      wrap_left: "8.6%",
    },
    small: {
      wrap_left: "89.4%",
    },
  },
  city: "rgba(154, 65, 0, 1) 0%, rgba(134, 44, 13, 1) 100%",
  hamburger_menu: {
    color: "#fa00ab",
    hover: "#8200f3",
    close: "#600492",
    top: "30px",
    left: "auto",
    right: "30px",
    margin: "0",
  },
  menuItem: {
    active: "#fa00ab",
  },
  language: {
    active: "#fa00ab",
    inactive: "#61116a",
  },
  mountain1: {
    left: "-8.5%",
    before: {
      top: "103%",
      left: "10%",
      gradientDegree: "-25deg",
      gradient: "rgba(0, 0, 0, 1) 63%, rgba(62, 0, 76, 1) 100%",
      transform: "rotate(27deg)",
    },
  },
  mountain2: {
    left: "5.5%",
    before: {
      top: "116%",
      left: "1%",
      gradientDegree: "-42deg",
      gradient: "rgba(0, 0, 0, 1) 69%, rgba(49, 0, 60, 1) 83%, rgba(52, 3, 74, 1) 91%, rgba(39, 0, 51, 1) 100%",
      transform: "rotate(41deg)",
    },
    after: {
      top: "174.3%",
      left: "-42.7%",
      gradientDegree: "-31deg",
      gradient: "rgba(0, 0, 0, 1) 73%, rgba(65, 0, 76, 1) 100%",
      transform: "rotate(93deg) skew(52deg, 9deg)",
    },
  },
  mountain3: {
    left: "23%",
    before: {
      top: "62%",
      left: "-81%",
      gradientDegree: "-45deg",
      gradient: "rgba(0, 0, 0, 1) 92%, rgba(87, 0, 97, 1) 100%",
      transform: "rotate(60deg) skewY(-32deg)",
    },
  },
  mountain4: {
    left: "21%",
    before: {
      top: "63%",
      left: "-80%",
      gradientDegree: "-45deg",
      gradient: "rgba(0, 0, 0, 1) 92%, rgba(79, 0, 97, 1) 100%",
      transform: "rotate(60deg) skewY(-40deg) skewX(-10deg)",
    },
  },
  mountain5: {
    left: "87%",
    before: {
      top: "96%",
      left: "-80%",
      gradientDegree: "-45deg",
      gradient: "rgba(0, 0, 0, 1) 92%, rgba(113, 0, 126, 1) 100%",
      transform: "rotate(60deg) skewY(-30deg)",
    },
  },
  fullscreen: {
    color: "#61116a",
    hover: "#fa00ab",
  },
  sound: {
    icon: {
      on: "#fa00ab",
      off: "#61116a",
    },
  },
  footer: "#61116a",
  groundGradient: "linear-gradient(1deg, #000 61%, #6b0083 100%)",
};

const page_about = {
  sky: "rgb(2, 105, 170) 0%, rgba(0, 58, 107, 1) 22%, rgba(0, 48, 80, 1) 31%, rgba(0, 0, 0, 1) 100%",
  sun: {
    top: "85.5%",
    right: "-3%",
    gradient: "rgba(0, 142, 195, 1) 0%, rgba(0, 142, 195, 1) 87%, rgba(0, 174, 239, 1) 100%",
    box_shadow: "0px 0px 130px rgba(70, 184, 255, 0.65)",
  },
  ship: {
    trail: "rgba(255, 255, 255, 0) 10%, rgba(255, 255, 255, 1) 100%",
    explosion:
      "rgba(143, 219, 255, 1) 0%, rgba(60, 193, 255, 1) 15%, rgba(234, 248, 255, 0.2) 45%, rgba(255, 255, 255, 0) 100%",
    blaster: "rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 80%, rgba(255, 255, 255, 0) 100%",
    big: {
      wrap_left: "8.6%",
    },
    small: {
      wrap_left: "89.4%",
    },
  },
  city: "rgba(154, 65, 0, 1) 0%, rgba(134, 44, 13, 1) 100%",
  hamburger_menu: {
    color: "#00d1fa",
    hover: "#fff",
    close: "#cc0021",
    top: "30px",
    left: "auto",
    right: "30px",
    margin: "0",
  },
  menuItem: {
    active: "#00cefd",
  },
  language: {
    active: "#00daff",
    inactive: "#015b98",
  },
  mountain1: {
    left: "-8.5%",
    before: {
      top: "103%",
      left: "10%",
      gradientDegree: "-25deg",
      gradient: "rgba(0, 0, 0, 1) 63%, rgba(3, 99, 131, 1) 100%",
      transform: "rotate(27deg)",
    },
  },
  mountain2: {
    left: "5.5%",
    before: {
      top: "116%",
      left: "1%",
      gradientDegree: "-37deg",
      gradient: "rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 1) 78%, rgba(0, 51, 68, 1) 87%, rgba(3, 99, 131, 1) 100%",
      transform: "rotate(41deg)",
    },
    after: {
      top: "174.3%",
      left: "-42.7%",
      gradientDegree: "-31deg",
      gradient: "rgba(0, 0, 0, 1) 73%, rgba(2, 46, 61, 1) 100%",
      transform: "rotate(93deg) skew(52deg, 9deg)",
    },
  },
  mountain3: {
    left: "23%",
    before: {
      top: "62%",
      left: "-81%",
      gradientDegree: "-45deg",
      gradient: "rgba(0, 0, 0, 1) 92%, rgba(0, 74, 98, 1) 100%",
      transform: "rotate(60deg) skewY(-32deg)",
    },
  },
  mountain4: {
    left: "21%",
    before: {
      top: "63%",
      left: "-80%",
      gradientDegree: "-45deg",
      gradient: "rgba(0, 0, 0, 1) 92%, rgba(0, 84, 112, 1) 100%",
      transform: "rotate(60deg) skewY(-40deg) skewX(-10deg)",
    },
  },
  mountain5: {
    left: "87%",
    before: {
      top: "96%",
      left: "-80%",
      gradientDegree: "-45deg",
      gradient: ["rgba(0, 0, 0, 1) 92%, rgba(44, 63, 69, 1) 100%"],
      transform: "rotate(60deg) skewY(-30deg)",
    },
  },
  fullscreen: {
    color: "#015b98",
    hover: "#00daff",
  },
  sound: {
    icon: {
      on: "#00daff",
      off: "#015b98",
    },
  },
  footer: "#015b98",
  groundGradient: "linear-gradient(1deg, #000 61%, #0c3b66 100%)",
};

const page_contacts = {
  sky: "rgb(113, 170, 2) 0%, rgba(49, 110, 0, 1) 20%, rgba(0, 70, 2, 1) 36%, rgba(0, 0, 0, 1) 100%",
  sun: {
    top: "75.5%",
    right: "5%",
    gradient: "rgba(86, 144, 1, 1) 0%, rgba(96, 157, 0, 1) 87%, rgba(141, 222, 0, 1) 100%",
    box_shadow: "0px 0px 130px rgba(240, 255, 70, 0.65)",
  },
  ship: {
    trail: "rgba(255, 255, 255, 0) 10%, rgba(255, 169, 34, 1) 100%",
    explosion:
      "rgba(248, 255, 143, 1) 0%, rgba(255, 177, 60, 1) 15%, rgba(255, 249, 234, 0.2) 45%, rgba(255, 255, 255, 0) 100%",
    blaster: "rgba(255, 254, 67, 1) 0%, rgba(255, 255, 255, 0) 80%, rgba(255, 255, 255, 0) 100%",

    big: {
      wrap_left: "84.6%",
    },
    small: {
      wrap_left: "79.4%",
    },
  },
  city: "rgba(154, 65, 0, 1) 0%, rgba(134, 44, 13, 1) 100%",
  hamburger_menu: {
    color: "#98ef00",
    hover: "#ff6600",
    close: "#cc0021",
    top: "30px",
    left: "auto",
    right: "30px",
    margin: "0",
  },
  menuItem: {
    active: "#a1ff00",
  },
  language: {
    active: "#86d300",
    inactive: "#196402",
  },
  mountain1: {
    left: "48.5%",
    before: {
      top: "103%",
      left: "10%",
      gradientDegree: "25deg",
      gradient: "rgba(0, 0, 0, 1) 63%, rgba(33, 131, 3, 1) 100%",
      transform: "rotate(-27deg)",
    },
  },
  mountain2: {
    left: "-6%",
    before: {
      top: "116%",
      left: "1%",
      gradientDegree: "-42deg",
      gradient: "rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 1) 71%, rgba(17, 72, 0, 1) 92%, rgba(33, 131, 3, 1) 100%",
      transform: "rotate(41deg)",
    },
    after: {
      top: "174.3%",
      left: "-42.7%",
      gradientDegree: "-31deg",
      gradient: "rgba(0, 0, 0, 1) 73%, rgba(21, 88, 0, 1) 100%",
      transform: "rotate(93deg) skew(52deg, 9deg)",
    },
  },
  mountain3: {
    left: "23%",
    before: {
      top: "70%",
      left: "-40%",
      gradientDegree: "-45deg",
      gradient: "rgba(0, 0, 0, 1) 89%, rgba(49, 116, 4, 1) 100%",
      transform: "rotate(60deg) skewY(-32deg)",
    },
  },
  mountain4: {
    left: "6%",
    before: {
      top: "63%",
      left: "-80%",
      gradientDegree: "-45deg",
      gradient: "rgba(0, 0, 0, 1) 92%, rgba(43, 110, 3, 1) 100%",
      transform: "rotate(60deg) skewY(-40deg) skewX(-10deg)",
    },
  },
  mountain5: {
    left: "71%",
    before: {
      top: "89%",
      left: "-80%",
      gradientDegree: "-45deg",
      gradient: "rgba(0, 0, 0, 1) 92%, rgba(49, 116, 4, 1) 100%",
      transform: "rotate(60deg) skewY(-30deg)",
    },
  },
  fullscreen: {
    color: "#196402",
    hover: "#86d300",
  },
  sound: {
    icon: {
      on: "#86d300",
      off: "#196402",
    },
  },
  footer: "#196402",
  groundGradient: "linear-gradient(1deg, #000 61%, #365e07 100%)",
};

const page_snake_game = {
  sky: "rgb(2, 105, 170) 0%, rgba(0, 58, 107, 1) 22%, rgba(0, 48, 80, 1) 31%, rgba(0, 0, 0, 1) 100%",
  sun: {
    top: "85.5%",
    right: "-3%",
    gradient: "rgba(0, 142, 195, 1) 0%, rgba(0, 142, 195, 1) 87%, rgba(0, 174, 239, 1) 100%",
    box_shadow: "0px 0px 130px rgba(70, 184, 255, 0.65)",
  },
  ship: {
    trail: "rgba(255, 255, 255, 0) 10%, rgba(255, 255, 255, 1) 100%",
    explosion:
      "rgba(143, 219, 255, 1) 0%, rgba(60, 193, 255, 1) 15%, rgba(234, 248, 255, 0.2) 45%, rgba(255, 255, 255, 0) 100%",
    blaster: "rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 80%, rgba(255, 255, 255, 0) 100%",
    big: {
      wrap_left: "27.6%",
    },
    small: {
      wrap_left: "78.4%",
    },
  },
  city: "rgba(154, 65, 0, 1) 0%, rgba(134, 44, 13, 1) 100%",
  hamburger_menu: {
    color: "#00d1fa",
    hover: "#ff6600",
    close: "#cc0021",
    top: "30px",
    left: "auto",
    right: "30px",
    margin: "0",
  },
  menuItem: {
    active: "#00cefd",
  },
  language: {
    active: "#00daff",
    inactive: "#015b98",
  },
  mountain1: {
    left: "-8.5%",
    before: {
      top: "103%",
      left: "10%",
      gradientDegree: "-25deg",
      gradient: "rgba(0, 0, 0, 1) 63%, rgba(3, 99, 131, 1) 100%",
      transform: "rotate(27deg)",
    },
  },
  mountain2: {
    left: "5.5%",
    before: {
      top: "116%",
      left: "1%",
      gradientDegree: "-37deg",
      gradient: "rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 1) 78%, rgba(0, 51, 68, 1) 87%, rgba(3, 99, 131, 1) 100%",
      transform: "rotate(41deg)",
    },
    after: {
      top: "174.3%",
      left: "-42.7%",
      gradientDegree: "-31deg",
      gradient: "rgba(0, 0, 0, 1) 73%, rgba(2, 46, 61, 1) 100%",
      transform: "rotate(93deg) skew(52deg, 9deg)",
    },
  },
  mountain3: {
    left: "23%",
    before: {
      top: "62%",
      left: "-81%",
      gradientDegree: "-45deg",
      gradient: "rgba(0, 0, 0, 1) 92%, rgba(0, 74, 98, 1) 100%",
      transform: "rotate(60deg) skewY(-32deg)",
    },
  },
  mountain4: {
    left: "21%",
    before: {
      top: "63%",
      left: "-80%",
      gradientDegree: "-45deg",
      gradient: "rgba(0, 0, 0, 1) 92%, rgba(0, 84, 112, 1) 100%",
      transform: "rotate(60deg) skewY(-40deg) skewX(-10deg)",
    },
  },
  mountain5: {
    left: "87%",
    before: {
      top: "96%",
      left: "-80%",
      gradientDegree: "-45deg",
      gradient: "rgba(0, 0, 0, 1) 92%, rgba(44, 63, 69, 1) 100%",
      transform: "rotate(60deg) skewY(-30deg)",
    },
  },
  fullscreen: {
    color: "#015b98",
    hover: "#00daff",
  },
  sound: {
    icon: {
      on: "#00daff",
      off: "#015b98",
    },
  },
  footer: "#015b98",
  groundGradient: "linear-gradient(1deg, #000 61%, #0c3b66 100%)",
};

const colorsByPage = {
  0: page_home,
  1: page_portfolio,
  2: page_about,
  3: page_contacts,
  4: page_snake_game,
};

const ThemeContext = createContext(colorsByPage[0]);

const ThemeDesktop = ({ children }) => {
  const { currentPage } = useStoreMe("currentPage");
  const theme = colorsByPage[currentPage || 0];

  return (
    <ThemeContext.Provider value={{ theme }}>
      <ThemeProvider theme={{ ...theme }}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeDesktop;
