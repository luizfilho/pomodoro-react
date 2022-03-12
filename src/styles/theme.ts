import baseStyled, { ThemedStyledInterface } from "styled-components";
export const theme = {
  colors: {
    black: {
      main: "#05050e",
    },
    gray: {
      main: "#545068",
      gray100: "#232330",
    },
    white: "#fff",
    pomodoroMode: {
      focus: "#A84340",
      break: "#5EA9BE",
    },
  },
  breakpoints: {
    xs: "only screen and (max-width: 575px)",
    sm: "only screen and (min-width: 576px) and (max-width: 767px)",
    md: "only screen and (min-width: 768px) and (max-width: 991px)",
    lg: "only screen and (min-width: 992px) and (max-width: 1199px)",
    xlg: "only screen and (min-width: 1200px)",
  },
};
export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
