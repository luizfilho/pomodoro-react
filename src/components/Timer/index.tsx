import React from "react";
import * as S from "./styles";

interface Props {
  time: {
    minutes: number;
    seconds: number;
  };
}
const Timer = ({ time }: Props) => {
  return (
    <S.Container>
      <S.Time>
        {String(time.minutes).padStart(2, "0")}:
        {String(time.seconds).padStart(2, "0")}
      </S.Time>
    </S.Container>
  );
};

export default Timer;
