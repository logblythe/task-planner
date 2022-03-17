import React from "react";
import "./App.css";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import Board from "./Board";

function App() {
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          // Override any other properties from default theme
          fontFamily: "Open Sans, sans serif",
          spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
          colorScheme: colorScheme,
        }}
      >
        <Board />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
