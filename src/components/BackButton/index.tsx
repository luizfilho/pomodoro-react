import React from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import * as S from "./styles";

interface Props {
  onClick: () => void;
}

const BackButton = ({ onClick }: Props) => {
  return (
    <S.Container>
      <BsFillArrowLeftCircleFill size={32} onClick={() => onClick()} />
    </S.Container>
  );
};

export default BackButton;
