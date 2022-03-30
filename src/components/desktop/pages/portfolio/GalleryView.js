import { useStoreMe, setStoreMe } from "store-me";
import styled from "styled-components/macro";
import { useState, useEffect } from "react";
import cn from "classnames";

import useWindowSize from "../../../hooks/useWindowSize";
import usePrevious from "../../../hooks/usePrevious";
import sounds from "../../../../_constants/sounds";
import useAudio from "../../../hooks/useAudio";
import Ring from "../../../common/Ring";

const GalleryView = ({ images, imageSize, onClick }) => {
  const { nextCurrentPortfolioPage, currentPortfolioPage, lookToGround } = useStoreMe(
    "nextCurrentPortfolioPage",
    "currentPortfolioPage",
    "lookToGround"
  );
  const [state, setGalleryState] = useState({
    previewImageSize: false,
    translateOffset: false,
    previewRevealed: false,
    switchPortfolio: false,
    addMaxSize: false,
    activeIndex: 0,
  });
  const playImageHover = useAudio({ url: sounds.hover_3 });
  const playWoosh = useAudio({ url: sounds.woosh });
  const [previousIndex, currentIndex] = usePrevious(state.activeIndex);
  const { height } = useWindowSize();
  const { previewImageSize, translateOffset, previewRevealed, switchPortfolio, addMaxSize } = state;

  const setState = obj => setGalleryState(prev => ({ ...prev, ...obj }));

  useEffect(() => {
    let wrapHeight = (height / 100) * 70;
    let addMaxSize = false;

    if (wrapHeight > 700) {
      wrapHeight = 700;
      addMaxSize = true;
    }

    setState({
      previewImageSize: wrapHeight / 2,
      translateOffset: wrapHeight / 2 - imageSize / 2,
      addMaxSize,
    });
  }, [height, imageSize]);

  useEffect(() => {
    if (nextCurrentPortfolioPage === currentPortfolioPage) {
      setState({ switchPortfolio: false, activeIndex: 0 });
    } else {
      setState({ switchPortfolio: true });
    }
  }, [nextCurrentPortfolioPage, currentPortfolioPage]);

  return (
    <Wrap
      className={cn({ "preview-reveal": !lookToGround, "disable-events": switchPortfolio })}
      onAnimationEnd={({ animationName }) => {
        animationName === "fadeIn" && setState({ previewRevealed: true });
      }}
    >
      <AllThumbsRing className={cn({ "max-size": addMaxSize })} />

      <PreviewWrap style={{ width: `${previewImageSize}px`, height: `${previewImageSize}px` }}>
        <PreviewImageWrap
          className={cn({ shrink: switchPortfolio, unshrink: !switchPortfolio })}
          onMouseEnter={playImageHover}
          onClick={() => {
            playWoosh();
            onClick(currentIndex);
          }}
          onAnimationEnd={({ animationName }) => {
            if (animationName === "galleryShrinkAnimation") {
              setStoreMe({ currentPortfolioPage: nextCurrentPortfolioPage });
            }
          }}
        >
          <div className="shrink-mask" />
          <img className="previous-image" src={images[previousIndex]} alt="" />
          <img className="current-image" src={images[currentIndex]} alt="" key={currentIndex} />
        </PreviewImageWrap>

        <PreviewRing
          size={280}
          ringColor="#8d00cc"
          spinSpeed={15}
          spinnerWidth={6}
          spinnerColor="#bb00f3"
          customPosition
        />
      </PreviewWrap>

      {images.map((image, i) => {
        const rotateAngle = (360 / images.length) * i;

        return (
          <ThumbWrap
            style={{
              width: `${imageSize}px`,
              height: `${imageSize}px`,
              margin: `-${imageSize / 2}px 0 0 -${imageSize / 2}px`,
              opacity: previewRevealed && !switchPortfolio ? 1 : 0,
              transform:
                previewRevealed && !switchPortfolio
                  ? `rotate(${rotateAngle}deg) translate(0, -${translateOffset}px) rotate(-${rotateAngle}deg)`
                  : `rotate(0) translate(0,0)`,
            }}
            onMouseEnter={() => {
              setState({ activeIndex: i });
              playImageHover();
            }}
            onClick={() => onClick(i)}
            key={i}
          >
            <ThumbImageWrap className={cn({ active: i === currentIndex })}>
              <img src={image} alt="" />
            </ThumbImageWrap>

            {i === currentIndex && (
              <ThumbRing size={82} ringColor="#efcbff" spinSpeed={20} spinnerWidth={3} spinnerColor="#fadbff" />
            )}
          </ThumbWrap>
        );
      })}
    </Wrap>
  );
};

export default GalleryView;

const Wrap = styled.div`
  position: absolute;
  width: 100%;
  height: 70%;
  top: 7%;
  left: 0;
  z-index: 100;
  opacity: 0;

  &.disable-events {
    pointer-events: none;
  }

  &.preview-reveal {
    animation: fadeIn 0.5s ease forwards;
  }
`;

const PreviewWrap = styled.div`
  position: absolute;
  cursor: pointer;
  top: 50%;
  left: 50%;
  z-index: 11;
  transform: translate(-50%, -50%);
  transition: width 0.4s ease, height 0.4s ease;
`;

const PreviewImageWrap = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 100%;
  width: 100%;
  height: 100%;
  z-index: 1;
  box-shadow: 0px 0px 90px #e692ff54;

  .shrink-mask {
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    background: #130021;
  }

  &.unshrink {
    animation: galleryUnshrinkAnimation 0.5s ease forwards;

    .shrink-mask {
      animation: fadeOut 0.5s ease forwards;
    }
  }

  &.shrink {
    animation: galleryShrinkAnimation 0.6s ease forwards;
    animation-delay: 0.3s;

    .previous-image {
      opacity: 0;
    }

    .shrink-mask {
      animation: fadeIn 0.6s ease forwards;
      animation-delay: 0.3s;
    }
  }

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transition: transform 0.4s ease;
    transform: translate(-50%, -50%) translateZ(0);

    &.current-image {
      animation: fadeIn 0.4s ease forwards;
    }
  }

  &:hover {
    img.current-image {
      transform: translate(-50%, -50%) translateZ(0) scale(1.5);
    }
  }
`;

const PreviewRing = styled(Ring)`
  top: -5%;
  left: -5%;
  width: 110%;
  height: 110%;
  margin: -1px 0 0 -1px;
`;

const ThumbWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  transition: transform 0.7s ease, opacity 0.7s ease;
`;

const ThumbImageWrap = styled.div`
  position: absolute;
  cursor: pointer;
  z-index: 1;
  top: 50%;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  transform: translateY(-50%);

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: -2px;
    left: -2px;
    border-radius: 100%;
    background: #24002a;
    border: 2px solid #87538f;
  }

  img {
    position: absolute;
    height: 100%;
    top: 0;
    left: 50%;
    border-radius: 100%;
    transform: translateX(-50%) translateZ(0);
    transition: transform 0.3s ease;
  }
`;

const ThumbRing = styled(Ring)`
  animation: pulsateRotateReveal 0.4s ease;
`;

const AllThumbsRing = styled.div`
  position: absolute;
  width: 64.5vh;
  height: 64.5vh;
  left: 50%;
  top: 2.8vh;
  transform: translate(-50%, 0%);
  border: 2px solid rgb(123 0 237 / 65%);
  border-radius: 100%;
  box-shadow: 0px 0px 90px #cb92ff54;
  transition: width 0.4s ease, height 0.4s ease;

  &.max-size {
    max-width: 650px;
    max-height: 650px;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;
