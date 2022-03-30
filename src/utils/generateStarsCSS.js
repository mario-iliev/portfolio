import { css } from "styled-components/macro";

import randomBetween from "./randomBetween";

const generateStarsCSS = (starSizePX = 1, fieldWidth, fieldHeight, starsCount, colors) => {
  const starColors = colors || {
    0: "#fff",
    1: "#989898",
    2: "#876d6d",
    3: "#d9d9b4",
  };
  let stars = [];
  let i = 0;

  for (i; i < starsCount; i++) {
    stars.push(
      `${randomBetween(0, fieldWidth)}px ${randomBetween(0, fieldHeight)}px ${
        starColors[randomBetween(0, Object.keys(starColors).length - 1)]
      }`
    );
  }

  return css`
    position: absolute;
    top: 0;
    left: 0;
    width: ${starSizePX}px;
    height: ${starSizePX}px;
    border-radius: 100%;
    box-shadow: ${stars.join(",")};
  `;
};

export default generateStarsCSS;
