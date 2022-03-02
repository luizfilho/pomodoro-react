import React from "react";
import { ThemeProvider } from "styled-components";
import Home from "~/pages/Home";
import { TimerContextProvider } from "~/contexts/TimerContext";
import { theme } from "~/styles/theme";
import "./app.css";

function App() {
  return (
    <TimerContextProvider>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </TimerContextProvider>
  );
}

export default App;
