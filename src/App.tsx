import { createTheme, styled, ThemeProvider } from "@mui/material";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import { Navbar } from "./components/Navbar";
import { MainPage } from "./pages/MainPage";
import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1B2430",
    },
    secondary: {
      main: "#ff4810",
    },
  },
});

const Wrapper = styled("div")`
  max-width: 1440px;
  margin: 0 auto;
  background-color: #181818;
  height: 100vh;
`;

const App = () => {
  return (
    <BrowserRouter>
      <Wrapper>
        <ThemeProvider theme={theme}>
          <Navbar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/" element={"Home"} />
            <Route path="/" element={"Home"} />
          </Routes>
        </ThemeProvider>
      </Wrapper>
    </BrowserRouter>
  );
};

export default App;
