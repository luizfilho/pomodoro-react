import React from "react";
import * as S from "./styles";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
export type ModeTimer = "PAUSE" | "PLAY";

interface Props {
  isPaused: boolean;
  onClick?: () => void;
}
const PlayPause = ({ isPaused, onClick }: Props) => {
  return (
    <S.Control onClick={onClick}>
      {!isPaused ? <BsPauseFill size={40} /> : <BsPlayFill size={40} />}
    </S.Control>
  );
};

export default PlayPause;
