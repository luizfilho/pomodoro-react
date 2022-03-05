import React, { useState } from "react";
import Input from "~/components/Input";
import Button from "~/components/Button";
import BackButton from "~/components/BackButton";
import { useTimerContext } from "~/contexts/TimerContext";

import * as S from "./styles";

interface Props {
  onBack: () => void;
}

const Settings = ({ onBack }: Props) => {
  const {
    pomodoroConfig: { pomodoroMinutes, shortBreakMinutes },
    handlePomodoroConfig,
  } = useTimerContext();
  const [settings, setSettings] = useState({
    pomodoroMinutes: pomodoroMinutes,
    shortBreakMinutes: shortBreakMinutes,
  });
  const handleSettingsValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setSettings({
      ...settings,
      [id]: parseInt(value),
    });
  };

  const handleSubmit = () => {
    handlePomodoroConfig({
      pomodoroMinutes: settings.pomodoroMinutes,
      shortBreakMinutes: settings.shortBreakMinutes,
    });
    onBack();
  };
  return (
    <S.Container>
      <BackButton onClick={() => onBack()} />
      <S.ContainerSettings>
        <S.Title>Settings</S.Title>
        <S.InputContainer>
          <Input
            placeholder="Pomodoro"
            type="number"
            label="Pomodoro"
            id="pomodoroMinutes"
            onChange={handleSettingsValues}
            value={settings.pomodoroMinutes}
          />
          <Input
            placeholder="Shortbreak"
            type="number"
            label="Shortbreak"
            id="shortBreakMinutes"
            onChange={handleSettingsValues}
            value={settings.shortBreakMinutes}
          />
        </S.InputContainer>
        <S.ControlsContainer>
          <Button label="OK" onClick={() => handleSubmit()} />
        </S.ControlsContainer>
      </S.ContainerSettings>
    </S.Container>
  );
};

export default Settings;
