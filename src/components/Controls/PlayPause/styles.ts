import { styled } from "~/styles/theme";

export const Control = styled.div`
  width: 54px;
  height: 54px;
  background-color: ${(props) => props.theme.colors.purple.purple200};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    fill: ${(props) => props.theme.colors.white};
  }
`;
