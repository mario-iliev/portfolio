import { useState, useEffect, useCallback, useRef } from "react";
import { useStoreMe } from "store-me";

import useIsMounted from "../hooks/useIsMounted";

const useAudio = ({
  url,
  volume = 1,
  startAt = 0,
  loop = false,
  delay = false,
  fadeIn = false,
  type = "effect",
  forceLoad = false,
}) => {
  const { userEnabledMusic, userEnabledEffects, soundEnabled, canLoadAudio } = useStoreMe(
    "userEnabledMusic",
    "userEnabledEffects",
    "soundEnabled",
    "canLoadAudio"
  );
  const [state, setAudioState] = useState({
    loaded: false,
    initAudio: false,
    isPlaying: false,
    audioCreated: false,
  });
  const audioRef = useRef();
  const delayPlayRef = useRef();
  const fadeInInited = useRef();
  const fadeInTimerRef = useRef();
  const isMounted = useIsMounted();
  const userAllowThisAudio = (type === "effect" && userEnabledEffects) || (type === "music" && userEnabledMusic);
  const { initAudio, audioCreated, loaded, isPlaying } = state;

  const setState = useCallback(obj => setAudioState(prev => ({ ...prev, ...obj })), []);
  const playAudio = useCallback(() => setState({ initAudio: true }), [setState]);

  useEffect(() => {
    return () => {
      clearTimeout(delayPlayRef.current);
      clearInterval(fadeInTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (initAudio && loaded) {
      setState({ initAudio: false });

      const play = () => {
        audioRef.current.currentTime = startAt;
        audioRef.current.loop = loop;

        const playPromise = audioRef.current.play();

        if (typeof playPromise !== "undefined") {
          playPromise.then(() => setState({ isPlaying: true })).catch(() => setState({ isPlaying: false }));
        }
      };

      if (delay) {
        delayPlayRef.current = setTimeout(play, delay);
      } else {
        play();
      }
    }
  }, [delay, loaded, loop, initAudio, setState, startAt]);

  useEffect(
    function createAudio() {
      if (canLoadAudio || forceLoad) {
        if (audioCreated) {
          audioRef.current.addEventListener("canplay", () => isMounted.current && setState({ loaded: true }), false);
          audioRef.current.addEventListener("ended", () => isMounted.current && setState({ isPlaying: false }), false);
        } else if (url) {
          try {
            audioRef.current = new Audio(url);

            setState({ audioCreated: true });
          } catch (e) {}
        }
      }
    },
    [url, audioCreated, forceLoad, canLoadAudio, isMounted, setState]
  );

  useEffect(() => {
    if (loaded) {
      if (userAllowThisAudio && soundEnabled && (!fadeIn || (fadeIn && fadeInInited.current))) {
        audioRef.current.volume = volume;
      } else {
        audioRef.current.volume = 0;
      }
    }
  }, [userAllowThisAudio, soundEnabled, audioCreated, loaded, volume, fadeIn]);

  useEffect(() => {
    if (!fadeInInited.current && userAllowThisAudio && soundEnabled && isPlaying && fadeIn) {
      const increaseDelta = (volume / fadeIn) * 100;

      fadeInInited.current = true;
      fadeInTimerRef.current = setInterval(() => {
        audioRef.current.volume += increaseDelta;

        if (audioRef.current.volume >= volume) {
          audioRef.current.volume = volume;
          clearInterval(fadeInTimerRef.current);
        }
      }, 100);
    }
  }, [isPlaying, volume, fadeIn, audioCreated, soundEnabled, userAllowThisAudio]);

  return playAudio;
};

export default useAudio;
