import styled from "styled-components/macro";
import { useState, useEffect } from "react";
import { useStoreMe } from "store-me";

import portfolioImagesMap from "../../../../_constants/portfolioImagesMap";
import sounds from "../../../../_constants/sounds";
import useAudio from "../../../hooks/useAudio";
import Gallery from "../../../common/Gallery";
import PortfolioMenu from "./PortfolioMenu";
import GalleryView from "./GalleryView";

const PagePortfolio = () => {
  const { nextCurrentPortfolioPage, currentPortfolioPage, lookToGround } = useStoreMe(
    "nextCurrentPortfolioPage",
    "currentPortfolioPage",
    "lookToGround"
  );
  const [showGallery, setShowGallery] = useState(false);
  const [initialImage, setInitialImage] = useState(0);
  const playAudio = useAudio({ url: sounds.page_reveal, volume: 0.4 });

  useEffect(() => {
    if (nextCurrentPortfolioPage !== currentPortfolioPage) {
      setInitialImage(0);
    }
  }, [nextCurrentPortfolioPage, currentPortfolioPage]);

  useEffect(() => {
    !lookToGround && playAudio();
  }, [lookToGround, playAudio]);

  return (
    <Wrap>
      {!lookToGround && <PortfolioMenu />}
      {!lookToGround && (
        <>
          <GalleryView
            imageSize={60}
            images={portfolioImagesMap[currentPortfolioPage].thumbs}
            onClick={index => {
              setShowGallery(true);
              setInitialImage(index);
            }}
          />
          <Gallery
            images={portfolioImagesMap[currentPortfolioPage].images}
            thumbs={portfolioImagesMap[currentPortfolioPage].thumbs}
            showGallery={showGallery}
            initialImage={initialImage}
            setShowGallery={setShowGallery}
            key={currentPortfolioPage}
          />
        </>
      )}
    </Wrap>
  );
};

export default PagePortfolio;

const Wrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
`;
