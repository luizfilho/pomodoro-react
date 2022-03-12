import React, { ReactNode } from "react";
import * as S from "./styles";
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string | ReactNode;
}

const Button = ({ label, ...props }: Props) => {
  return (
    <S.Container>
      <S.Button {...props}>{label}</S.Button>
    </S.Container>
  );
};

export default Button;
