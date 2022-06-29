import { createTheme, styled, ThemeProvider } from "@mui/material";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import { Navbar } from "./components/Navbar";
import { MainPage } from "./pages/MainPage";
import "./App.css";
import { AlbumPage } from "./pages/AlbumPage";

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

const App = () => (
  <BrowserRouter>
    <Wrapper>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:album" element={<AlbumPage />} />
          <Route path="/" element={"Home"} />
        </Routes>
        {/* <CustomAudioPlayer song={songs[0]} /> */}
      </ThemeProvider>
    </Wrapper>
  </BrowserRouter>
);

export default App;
