import React, { useMemo } from "react";
import { useState, useEffect, useContext, createContext, useRef } from "react";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import { useAlert } from "~/hooks/useAlert";

export enum Mode {
  POMODORO = "POMODORO",
  BREAK = "BREAK",
}

interface Props {
  children: any;
}
interface TimerContextProps {
  minutes: number;
  seconds: number;
  handleTimer: () => void;
  increaseSeconds: () => void;
  handleMode: (newMode: Mode) => void;
  handlePomodoroConfig: (values: PomodoroConfig) => void;
  isPaused: boolean;
  isPausedRef: boolean;
  mode: Mode;
  pomodoroConfig: PomodoroConfig;
}

const INITIAL_SHORT_BREAK_MINUTES = 30;
const INITIAL_POMODORO_MINUTES = 5;
const INITIAL_AUTO_START_POMODORO = true;
const INITIAL_AUTO_START_BREAKS = true;

const TimerContext = createContext({} as TimerContextProps);

export interface PomodoroConfig {
  pomodoroMinutes: number;
  shortBreakMinutes: number;
  autoStartPomodoro: boolean;
  autoStartBreaks: boolean;
}

const sounds = {
  pomodoro: new Audio("assets/sounds/pomodoro-end.wav"),
  shortBreak: new Audio("assets/sounds/shortbreak-end.wav"),
};

export const TimerContextProvider = ({ children }: Props) => {
  const { createAlertConfirm } = useAlert();
  const [isPaused, setIsPaused] = useState(true);
  const isPausedRef = useRef(isPaused);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const secondsLeftRef = useRef(secondsLeft);
  const [mode, setMode] = useState<Mode>(Mode.POMODORO);
  const [pomodoroConfig, setPomodoroConfig] = useLocalStorage<PomodoroConfig>(
    "pomodoroConfig",
    {
      pomodoroMinutes: INITIAL_SHORT_BREAK_MINUTES,
      shortBreakMinutes: INITIAL_POMODORO_MINUTES,
      autoStartPomodoro: INITIAL_AUTO_START_POMODORO,
      autoStartBreaks: INITIAL_AUTO_START_BREAKS,
    }
  );
  console.log("pomodoroConfig", pomodoroConfig);
  const minutes = useMemo(() => {
    if (mode === Mode.POMODORO) {
      return pomodoroConfig.pomodoroMinutes;
    } else {
      return pomodoroConfig.shortBreakMinutes;
    }
  }, [pomodoroConfig.pomodoroMinutes, pomodoroConfig.shortBreakMinutes, mode]);

  const increaseSeconds = () => {
    if (!secondsLeftRef.current) {
      return handleCurrentModeTimer();
    }
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  };

  const handleCurrentModeTimer = () => {
    if (mode === Mode.POMODORO) {
      handleMode(Mode.BREAK);
      !pomodoroConfig.autoStartBreaks && handleTimer();
      sounds.pomodoro.play();
    } else {
      !pomodoroConfig.autoStartPomodoro && handleTimer();
      handleMode(Mode.POMODORO);
      sounds.shortBreak.play();
    }
  };

  const handleMode = (newMode: Mode) => {
    const newMinutes =
      newMode === Mode.POMODORO
        ? pomodoroConfig.pomodoroMinutes
        : pomodoroConfig.shortBreakMinutes;

    if (secondsLeft < minutes * 60 && secondsLeft > 0) {
      createAlertConfirm({
        title: "The timer is still running, are you sure you want to switch?",
        onConfirm: () => {
          setMode(newMode as Mode);
          handleTimer();
          handleSecondsLeft(newMinutes);
        },
      });
    } else {
      handleSecondsLeft(newMinutes);
      setMode(newMode as Mode);
    }
  };

  const handleSecondsLeft = (customMinutes?: number) => {
    const newSecondsleft = customMinutes ? customMinutes : minutes;
    secondsLeftRef.current = newSecondsleft * 60;
    setSecondsLeft(secondsLeftRef.current);
  };

  const handleTimer = () => {
    isPausedRef.current = !isPausedRef.current;
    setIsPaused(!isPaused);
  };

  const handlePomodoroConfig = (values: PomodoroConfig) => {
    const {
      pomodoroMinutes,
      shortBreakMinutes,
      autoStartPomodoro,
      autoStartBreaks,
    } = values;
    setPomodoroConfig({
      pomodoroMinutes,
      shortBreakMinutes,
      autoStartPomodoro,
      autoStartBreaks,
    });
    if (mode === Mode.POMODORO) {
      handleSecondsLeft(pomodoroMinutes);
    } else {
      handleSecondsLeft(shortBreakMinutes);
    }
  };

  useEffect(() => {
    handleSecondsLeft();
  }, []);

  useEffect(() => {
    if (isPausedRef.current) {
      return;
    } else {
      const timeoutId = setTimeout(() => {
        increaseSeconds();
      }, 100);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isPausedRef.current, secondsLeftRef.current]);

  const minutesConverted = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <TimerContext.Provider
      value={{
        minutes: minutesConverted,
        seconds,
        handleTimer,
        isPaused,
        isPausedRef: isPausedRef.current,
        increaseSeconds,
        mode,
        handleMode,
        pomodoroConfig,
        handlePomodoroConfig,
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
