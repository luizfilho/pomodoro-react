import React, { useMemo } from "react";
import { useState, useEffect, useContext, createContext, useRef } from "react";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import { ModeTimer } from "~/components/Controls/PlayPause";
import isEmptyObj from "~/utils/isEmptyObj";

export enum Mode {
  POMODORO = "POMODORO",
  BREAK = "BREAK",
}

interface TimerContextProps {
  minutes: number;
  seconds: number;
  modeTimer: ModeTimer;
  handleTimer: () => void;
  handleSecondsLeft: () => void;
  increaseSeconds: () => void;
  isPaused: boolean;
  isPausedRef: boolean;
  mode: Mode;
}

const INITIAL_SHORT_BREAK_MINUTES = 1;
const INITIAL_POMODORO_MINUTES = 2;

const TimerContext = createContext({} as TimerContextProps);

interface PomodoroConfig {
  pomodoroMinutes: number;
  shortBreakMinutes: number;
}
interface Props {
  children: any;
}

export const TimerContextProvider = ({ children }: Props) => {
  const localStorage = useLocalStorage();
  const pomodoroConfig: PomodoroConfig = localStorage.getItem("pomodoroConfig");
  const [isPaused, setIsPaused] = useState(true);
  const isPausedRef = useRef(isPaused);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const secondsLeftRef = useRef(secondsLeft);
  const [modeTimer, setModetimer] = useState<ModeTimer>("PLAY");
  const [mode, setMode] = useState<Mode>(Mode.POMODORO);
  const minutes = useMemo(() => {
    return mode === Mode.POMODORO
      ? pomodoroConfig.pomodoroMinutes
      : pomodoroConfig.shortBreakMinutes;
  }, [pomodoroConfig, mode]);
  console.log("currentMinutes", minutes);

  // const [minutes] = useState(currentMinutes);

  useEffect(() => {
    if (isPausedRef.current) {
      return;
    } else {
      setTimeout(() => {
        increaseSeconds();
      }, 100);
    }
  }, [isPausedRef.current, isPausedRef, secondsLeft]);

  useEffect(() => {
    handleSecondsLeft();
  }, []);

  const increaseSeconds = () => {
    if (!secondsLeftRef.current) {
      return handleCurrentModeTimer();
    }
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  };

  const sounds = useMemo(() => {
    return {
      pomodoro: new Audio("assets/sounds/pomodoro-end.wav"),
      shortBreak: new Audio("assets/sounds/shortbreak-end.wav"),
    };
  }, []);

  const handleCurrentModeTimer = () => {
    if (mode === Mode.POMODORO) {
      setMode(Mode.BREAK);
      sounds.pomodoro.play();
    } else {
      setMode(Mode.POMODORO);
      sounds.shortBreak.play();
    }
    handleSecondsLeft();
  };

  const handleSecondsLeft = () => {
    secondsLeftRef.current = minutes * 60;
    setSecondsLeft(secondsLeftRef.current);
  };

  const handleTimer = () => {
    isPausedRef.current = !isPausedRef.current;
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    initConfig();
  }, []);

  const initConfig = () => {
    const currentConfig = localStorage.getItem("pomodoroConfig");
    console.log("currentConfig", currentConfig);

    if (isEmptyObj(currentConfig)) {
      localStorage.setItem("pomodoroConfig", {
        pomodoroMinutes: INITIAL_POMODORO_MINUTES,
        shortBreakMinutes: INITIAL_SHORT_BREAK_MINUTES,
      });
    }
  };
  const minutesConverted = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <TimerContext.Provider
      value={{
        minutes: minutesConverted,
        seconds,
        modeTimer,
        handleTimer,
        isPaused,
        isPausedRef: isPausedRef.current,
        handleSecondsLeft,
        increaseSeconds,
        mode,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export function useTimerContext() {
  const context = useContext(TimerContext);
  return {
    ...context,
  };
}
