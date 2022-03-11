import React, { useMemo, useState } from "react";
import Input from "~/components/Input";
import Button from "~/components/Button";
import BackButton from "~/components/BackButton";
import { useTimerContext } from "~/contexts/TimerContext";

import * as S from "./styles";

interface Props {
  onBack: () => void;
}

interface Errors {
  pomodoroMinutes?: undefined | string;
  shortBreakMinutes?: undefined | string;
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

    console.log("value", value);

    setSettings({
      ...settings,
      [id]: parseInt(value) ?? 0,
    });
  };

  const handleSubmit = () => {
    if (isValidValues()) {
      handlePomodoroConfig({
        pomodoroMinutes: settings.pomodoroMinutes,
        shortBreakMinutes: settings.shortBreakMinutes,
      });
      onBack();
    }
  };

  const formErrors = useMemo(() => {
    const errors: Errors = {};
    if (!settings.pomodoroMinutes) {
      errors.pomodoroMinutes = "required field";
    }

    if (!settings.shortBreakMinutes) {
      errors.shortBreakMinutes = "required field";
    }

    return { ...errors };
  }, [settings]);
  const isValidValues = () => Object.values(formErrors).length === 0;

  return (
    <S.Container>
      <BackButton onClick={() => onBack()} />
      <S.ContainerSettings>
        <S.Title>Settings</S.Title>
        <S.InputContainer>
          <Input
            placeholder="Ex: 25"
            type="number"
            label="Pomodoro (minutes)"
            id="pomodoroMinutes"
            onChange={handleSettingsValues}
            value={settings.pomodoroMinutes}
            error={formErrors.pomodoroMinutes}
          />
          <Input
            placeholder="Ex: 5"
            type="number"
            label="Shortbreak (minutes)"
            id="shortBreakMinutes"
            onChange={handleSettingsValues}
            value={settings.shortBreakMinutes}
            error={formErrors.shortBreakMinutes}
          />
        </S.InputContainer>

        <S.ControlsContainer>
          <Button label="OK" type="submit" onClick={handleSubmit} />
        </S.ControlsContainer>
      </S.ContainerSettings>
    </S.Container>
  );
};

export default Settings;
