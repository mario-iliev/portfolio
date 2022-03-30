import { ThemeProvider } from "styled-components/macro";
import { createContext } from "react";

const theme = {
  language: {
    active: "#d82400",
    inactive: "#6a111b",
  },
};

const ThemeContext = createContext(theme);

const ThemeMobile = ({ children }) => (
  <ThemeContext.Provider value={{ theme }}>
    <ThemeProvider theme={{ ...theme }}>{children}</ThemeProvider>
  </ThemeContext.Provider>
);

export default ThemeMobile;
