import React from "react";
import * as S from "./styles";

interface Props extends React.InputHTMLAttributes<any> {
  label?: string;
}
const Input = (props: Props) => {
  return (
    <S.Container>
      <S.Label>{props.label}</S.Label>
      <S.Input {...props} />
    </S.Container>
  );
};

export default Input;
