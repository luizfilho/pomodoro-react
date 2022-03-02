import React, { useState } from "react";
import Input from "~/components/Input";
import Button from "~/components/Button";
import BackButton from "~/components/BackButton";

import * as S from "./styles";

interface Props {
  handleBackButton: () => void;
}

const Settings = ({ handleBackButton }: Props) => {
  const [settings, setSettings] = useState({
    pomodoroSecs: 0,
    shortBreakSecs: 0,
  });
  const handleSettingsValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setSettings({
      ...settings,
      [id]: parseInt(value),
    });
  };
  console.log("settings", settings);
  return (
    <S.Container>
      <BackButton onClick={() => handleBackButton()} />
      <S.ContainerSettings>
        <S.Title>Settings</S.Title>
        <S.InputContainer>
          <Input
            placeholder="Pomodoro"
            type="number"
            label="Pomodoro"
            id="pomodoroSecs"
            onChange={handleSettingsValues}
            value={settings.pomodoroSecs}
          />
          <Input
            placeholder="Shortbreak"
            type="number"
            label="Shortbreak"
            id="shortBreakSecs"
            onChange={handleSettingsValues}
            value={settings.shortBreakSecs}

          />
        </S.InputContainer>
        <S.ControlsContainer>
          <Button label="OK" />
        </S.ControlsContainer>
      </S.ContainerSettings>
    </S.Container>
  );
};

export default Settings;
