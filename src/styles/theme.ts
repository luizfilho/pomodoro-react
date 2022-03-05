import baseStyled, { ThemedStyledInterface } from "styled-components";
export const theme = {
  colors: {
    purple: {
      // purple100: "#8396df",
      purple100: "#FDF8E2",

      purple200: "#5454c2",
      purple300: "#4747b1",
      purple400: "#282fa9",
      purple500: "#100f5b",
    },
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
