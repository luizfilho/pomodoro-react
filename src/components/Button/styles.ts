import { styled } from "~/styles/theme";

export const Container = styled.div``;

export const Button = styled.button`
  min-width: 240px;
  min-height: 50px;
  outline: none;
  text-transform: uppercase;
  background-color: ${(props) => props.theme.colors.purple.purple300};
  border: none;
  color: ${(props) => props.theme.colors.white};
  font-size: 24px;
  border-radius: 4px;
  margin: 16px;
  font-family: 'Nunito';
  letter-spacing:4px;
  font-weight: 700;
  cursor:pointer;
  user-select: none;
`;