import { useState, useEffect, useRef } from "react";
import styled from "styled-components/macro";
import ReactDOM from "react-dom";
import cn from "classnames";

import useEventListener from "../hooks/useEventListener";
import loadResources from "../../utils/loadResources";
import LoadingSpinner from "./LoadingSpinner";
import CloseButton from "./CloseButton";

const Gallery = ({ images, thumbs, showGallery, initialImage, setShowGallery }) => {
  const [state, setGalleryState] = useState({
    currentImage: false,
    currentImageLoaded: false,
    animate: false,
    thumbsHinted: false,
    closedHinted: false,
    galleryIsClosed: true,
  });
  const thumbsHintTimeoutRef = useRef();
  const closeHintTimeoutRef = useRef();
  const { currentImage, currentImageLoaded, animate, thumbsHinted, closedHinted, galleryIsClosed } = state;
  const currentImageIndex = currentImage === false ? initialImage : currentImage;

  function setState(obj) {
    setGalleryState(prevState => ({ ...prevState, ...obj }));
  }

  function showPrevImage() {
    setState({
      currentImage: currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1,
      animate: false,
      thumbsHinted: true,
      closedHinted: true,
      currentImageLoaded: false,
    });
  }

  function showNextImage() {
    setState({
      currentImage: currentImageIndex + 1 > images.length - 1 ? 0 : currentImageIndex + 1,
      animate: false,
      thumbsHinted: true,
      closedHinted: true,
      currentImageLoaded: false,
    });
  }

  function keyboardControls(e) {
    if (showGallery) {
      const key = e.keyCode;

      if (key === 39) {
        showNextImage();
      } else if (key === 37) {
        showPrevImage();
      } else if (key === 27) {
        setShowGallery(false);
      }
    }
  }

  function onAnimationEnd() {
    animate && setState({ animate: false });
  }

  function onImageLoad() {
    setState({ currentImageLoaded: true, animate: true });
  }

  useEventListener("keyup", keyboardControls);

  useEffect(() => {
    return () => {
      clearTimeout(thumbsHintTimeoutRef.current);
      clearTimeout(closeHintTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    showGallery && galleryIsClosed && setState({ galleryIsClosed: false });
  }, [showGallery, galleryIsClosed]);

  useEffect(
    function preloadNextAndPrevImages() {
      if (!galleryIsClosed && currentImageLoaded && currentImageIndex + 1 <= images.length) {
        const nextImage = images[currentImageIndex + 1] || images[0];
        const prevImage = images[currentImageIndex - 1] || images[images.length - 1];

        loadResources([nextImage, prevImage]);
      }
    },
    [galleryIsClosed, currentImageIndex, currentImageLoaded, images]
  );

  const gallery = (
    <Wrap
      className={cn({ "show-gallery": showGallery, "hide-gallery": !showGallery })}
      onAnimationEnd={({ animationName }) => animationName === "fadeOut" && setState({ galleryIsClosed: true })}
    >
      <PrevNext className="prev" onClick={showPrevImage} />
      <PrevNext className="next" onClick={showNextImage} />

      <CloseButtonWrap
        className={cn({ "close-hint": !closedHinted && currentImageLoaded, "close-hint-seen": closedHinted })}
        onMouseEnter={() => {
          setState({ closedHinted: true });
          clearTimeout(closeHintTimeoutRef.current);
        }}
        onClick={() => setShowGallery(false)}
      >
        <StyledCloseButton
          onTransitionEnd={({ propertyName }) => {
            if (!closedHinted && propertyName === "transform") {
              closeHintTimeoutRef.current = setTimeout(() => {
                setState({ closedHinted: true });
              }, 2500);
            }
          }}
        />
      </CloseButtonWrap>

      <ImageWrap>
        <LoadingSpinner size={30} loadingBaseColor="#7e00a3" />
        <Mask />
        <img
          src={images[currentImageIndex]}
          className={cn({ animate: animate, visible: currentImageLoaded })}
          onAnimationEnd={onAnimationEnd}
          onLoad={() => onImageLoad(images[currentImageIndex])}
          alt=""
        />
      </ImageWrap>

      <ThumbsWrap
        onMouseEnter={() => {
          if (!thumbsHinted) {
            setState({ thumbsHinted: true });
            clearTimeout(thumbsHintTimeoutRef.current);
          }
        }}
      >
        <ThumbsInner
          className={cn("thumbs-inner", { "thumbs-hint": !thumbsHinted && currentImageLoaded })}
          onTransitionEnd={({ propertyName }) => {
            if (!thumbsHinted && propertyName === "transform") {
              thumbsHintTimeoutRef.current = setTimeout(() => {
                setState({ thumbsHinted: true });
              }, 2500);
            }
          }}
        >
          {thumbs.map((thumb, i) => (
            <ThumbWrap className={cn({ selected: currentImageIndex === i })} key={i}>
              <img
                src={thumb}
                onClick={() =>
                  currentImageIndex !== i && setState({ currentImage: i, currentImageLoaded: false, animate: false })
                }
                alt=""
              />
            </ThumbWrap>
          ))}
        </ThumbsInner>
      </ThumbsWrap>
    </Wrap>
  );

  return galleryIsClosed ? null : ReactDOM.createPortal(gallery, document.body);
};

export default Gallery;

const Wrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #000;
  animation: fadeIn 0.3s ease forwards;

  &.show-gallery {
    z-index: 1000;
  }

  &.hide-gallery {
    z-index: 1000;
    animation: fadeOut 0.3s ease forwards;
  }
`;

const ImageWrap = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    position: relative;
    display: block;
    max-height: 100%;
    max-width: 100%;
    opacity: 0;
    z-index: 1;

    &.visible {
      opacity: 1;
    }

    &.animate {
      animation: fadeIn 0.5s ease;
    }
  }
`;

const Mask = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 3;
`;

const ThumbsWrap = styled.div`
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 85px;
  bottom: 0;
  z-index: 5;

  &:hover {
    .thumbs-inner {
      transform: translateY(0);
    }
  }
`;

const ThumbsInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  transform: translateY(85px);
  transition: transform 0.4s ease;
  background-color: rgba(0, 0, 0, 0.5);

  &.thumbs-hint {
    transform: translateY(0px);
    transition-delay: 0.5s;
  }
`;

const ThumbWrap = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
  margin-left: 15px;
  height: 65px;
  border: 2px solid transparent;
  transition: border-color 0.3s ease;

  img {
    display: block;
    cursor: pointer;
    height: 100%;
    width: 100%;
    transition: transform 0.3s ease;
  }

  &.selected {
    border-color: #fff;
  }

  &:first-child {
    margin-left: 0;
  }

  &:hover {
    img {
      transform: scale(1.5);
    }
  }
`;

const CloseButtonWrap = styled.div`
  position: absolute;
  overflow: hidden;
  width: 200px;
  height: 200px;
  top: 0;
  right: 0;
  z-index: 5;
  cursor: pointer;

  &.close-hint {
    .close-button {
      transform: translate(0px, 0px);
      transition-delay: 0.5s;
    }
  }

  &.close-hint-seen {
    &:hover {
      .close-button {
        transform: translate(0, 0);

        &:before,
        &:after {
          background-color: red;
        }
      }
    }
  }
`;

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  z-index: 4;
  top: 20px;
  right: 20px;
  transform: translate(40px, -40px);
  transition: transform 0.3s ease;

  &:before,
  &:after {
    background-color: #fff;
  }

  &:hover {
    &:before,
    &:after {
      background-color: red;
    }
  }
`;

const PrevNext = styled.div`
  position: absolute;
  z-index: 4;
  cursor: pointer;
  top: 50%;
  width: 100px;
  height: 150px;
  margin: -75px 0 0 0;

  &.prev {
    left: 0;

    &:before {
      left: 29px;
      transform: rotate(-45deg);
    }
  }

  &.next {
    right: 0px;

    &:before {
      right: 29px;
      transform: rotate(135deg);
    }
  }

  &:before {
    content: "";
    position: absolute;
    z-index: 4;
    cursor: pointer;
    top: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 0;
    border-top-width: 3px;
    border-top-style: solid;
    border-left-width: 3px;
    border-left-style: solid;
    border-color: #7a00cb;
    transition: border-color 0.3s ease, left 0.3s ease, right 0.3s ease;
  }

  &:hover {
    &:before {
      border-color: #e71bff;
    }

    &.prev {
      &:before {
        left: 20px;
      }
    }

    &.next {
      &:before {
        right: 20px;
      }
    }
  }
`;
