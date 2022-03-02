import { styled } from "~/styles/theme";

export const Container = styled.div`
  svg {
    fill: ${(props) => props.theme.colors.purple.purple200};
    cursor:pointer;
  }
`;
