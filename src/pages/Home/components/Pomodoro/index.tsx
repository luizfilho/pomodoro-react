import React from "react";
import { IoSettingsSharp } from "react-icons/io5";
import Button from "~/components/Button";
import Timer from "~/components/Timer";
import Tabs from "~/components/Tabs";
import { Mode } from "~/contexts/TimerContext";
import * as S from "./styles";

interface Props {
  tabs: { label: string; component: any; value: Mode }[];
  currentMode: number;
  minutes: number;
  seconds: number;
  textMode: string;
  handleMode: (value: any) => void;
  handleTimer: () => void;
  buttonLabel: string;
  handleSettings: () => void;
}

const Pomodoro = ({
  tabs,
  currentMode,
  handleMode,
  minutes,
  seconds,
  textMode,
  buttonLabel,
  handleSettings,
  handleTimer,
}: Props) => {
  return (
    <>
      <S.ContainerTabs>
        <Tabs
          tabs={tabs}
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
  );
};
export default Pomodoro;
