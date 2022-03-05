import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import { IoSettingsSharp } from "react-icons/io5";
import { ContainerPage } from "~/components/Layout";
import Timer from "~/components/Timer";

import Settings from "./components/Settings";
import Tabs from "~/components/Tabs";
import Button from "~/components/Button";
import {theme} from '~/styles/theme'
import { useTimerContext, Mode } from "~/contexts/TimerContext";
import * as S from "./styles";

const Home = () => {
  const [showSettings, setShowSettings] = useState(false);

  const handleSettings = () => {
    setShowSettings(!showSettings);
  };

  const { minutes, seconds, handleTimer, isPaused, mode, handleMode } =
    useTimerContext();

  const timeFormated = ` ${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padEnd(2, "0")}`;

  const buttonLabel = useMemo(() => (isPaused ? "Start" : "Pause"), [isPaused]);
  const currentMode = useMemo(() => (mode === Mode.POMODORO ? 0 : 1), [mode]);

  const textMode = useMemo(
    () => (mode === Mode.POMODORO ? "time to focus!" : "time for a break!"),
    [mode]
  );
  const colorMode = useMemo(() => 
    mode === Mode.POMODORO ? theme.colors.pomodoroMode.focus : theme.colors.pomodoroMode.break
  ,[mode])
  return (
    <ContainerPage backgroundColor={colorMode}>
      <Helmet>
        <title>{timeFormated} - Pomodoro</title>
      </Helmet>{" "}
      <S.Container>
        <S.TitlePage>pomo-doro</S.TitlePage>
        {showSettings ? (
          <Settings onBack={handleSettings} />
        ) : (
          <>
            <S.ContainerTabs>
              <Tabs
                tabs={[
                  { label: "Pomodoro", component: null, value: Mode.POMODORO },
                  { label: "Short Break", component: null, value: Mode.BREAK },
                ]}
                initialTabIndex={currentMode}
                onChangeTab={handleMode}
              />
            </S.ContainerTabs>
            <Timer
              time={{
                minutes,
                seconds,
              }}
            />
        <S.TextMode>{textMode}</S.TextMode>

            <S.ContainerControls>
              <Button label={buttonLabel} onClick={handleTimer} />
              <IoSettingsSharp size={32} onClick={() => handleSettings()} />
            </S.ContainerControls>
          </>
        )}
      </S.Container>
    </ContainerPage>
  );
};

export default Home;
