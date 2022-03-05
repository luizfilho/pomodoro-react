import React, { useMemo } from "react";
import { useState, useEffect, useContext, createContext, useRef } from "react";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import { ModeTimer } from "~/components/Controls/PlayPause";
import isEmptyObj from "~/utils/isEmptyObj";

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
  modeTimer: ModeTimer;
  handleTimer: () => void;
  increaseSeconds: () => void;
  handleMode: (newMode: Mode) => void;
  handlePomodoroConfig: (values: PomodoroConfig) => void;
  isPaused: boolean;
  isPausedRef: boolean;
  mode: Mode;
  pomodoroConfig: PomodoroConfig;
}

const INITIAL_SHORT_BREAK_MINUTES = 1;
const INITIAL_POMODORO_MINUTES = 2;

const TimerContext = createContext({} as TimerContextProps);

interface PomodoroConfig {
  pomodoroMinutes: number;
  shortBreakMinutes: number;
}

export const TimerContextProvider = ({ children }: Props) => {
  const [isPaused, setIsPaused] = useState(true);
  const isPausedRef = useRef(isPaused);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const secondsLeftRef = useRef(secondsLeft);
  const [modeTimer, setModetimer] = useState<ModeTimer>("PLAY");
  const [mode, setMode] = useState<Mode>(Mode.POMODORO);
  const [pomodoroConfig, setPomodoroConfig] = useLocalStorage<PomodoroConfig>(
    "pomodoroConfig",
    {
      pomodoroMinutes: 10,
      shortBreakMinutes: 20,
    }
  );

  // const { pomodoroMinutes, shortBreakMinutes } = pomodoroConfig;
  const minutes = useMemo(() => {
    if (mode === Mode.POMODORO) {
      return pomodoroConfig.pomodoroMinutes;
    } else {
      return pomodoroConfig.shortBreakMinutes;
    }
  }, [pomodoroConfig.pomodoroMinutes, pomodoroConfig.shortBreakMinutes, mode]);

  // const minutes = useMemo(() => {
  //   return mode === Mode.POMODORO
  //     ?
  //     : pomodoroConfig.shortBreakMinutes;
  // }, [pomodoroConfig, mode]);

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
  }, [mode]);

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
      handleMode(Mode.BREAK);
      sounds.pomodoro.play();
    } else {
      handleMode(Mode.POMODORO);
      sounds.shortBreak.play();
    }
    handleSecondsLeft();
  };

  const handleMode = (newMode: Mode) => {
    setMode(newMode as Mode);
  };

  const handleSecondsLeft = (customMinutes?: number) => {
    const newSecondsleft = customMinutes ? customMinutes : minutes
    secondsLeftRef.current = newSecondsleft * 60;
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
    if (isEmptyObj(pomodoroConfig)) {
      setPomodoroConfig({
        pomodoroMinutes: INITIAL_POMODORO_MINUTES,
        shortBreakMinutes: INITIAL_SHORT_BREAK_MINUTES,
      });
    }
  };

  const handlePomodoroConfig = (values: PomodoroConfig) => {
    const { pomodoroMinutes, shortBreakMinutes } = values;
    setPomodoroConfig({
      pomodoroMinutes,
      shortBreakMinutes,
    });
    if (mode === Mode.POMODORO) {
      handleSecondsLeft(pomodoroMinutes);
    } else {
      handleSecondsLeft(shortBreakMinutes);
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
