import baseStyled, { ThemedStyledInterface } from "styled-components";
export const theme = {
  colors: {
    black: {
      main: "#05050e",
    },
    gray: {
      main: "#545068",
      gray100:'#232330'
    },
    white: "#fff",
    pomodoroMode:{
      focus: '#A84340',
      break: '#5EA9BE'
    }
  },
};
export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
