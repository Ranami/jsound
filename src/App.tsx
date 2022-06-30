import { createTheme, styled, ThemeProvider } from "@mui/material";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import { Navbar } from "./components/Navbar";
import { MainPage } from "./pages/MainPage";
import "./App.css";
import { AlbumPage } from "./pages/AlbumPage";
import { AppProvider, useStore } from "./provider";
import { CustomAudioPlayer } from "./components/CustomAudioPlayer";
import { observer } from "mobx-react-lite";
import { Footer } from "./components/Footer";

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
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  margin: 0 auto;
  background-color: #181818;
  min-height: 100%;
`;

const MainContent = styled("div")`
  flex: 1 1 auto;
`;

const App = observer(() => {
  const { store } = useStore();

  return (
    <BrowserRouter>
      <AppProvider store={store}>
        <Wrapper>
          <ThemeProvider theme={theme}>
            <Navbar />
            <MainContent>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/:album" element={<AlbumPage />} />
                <Route path="/" element={"Home"} />
              </Routes>
            </MainContent>
            <Footer />
            <CustomAudioPlayer song={store.currentSong} />
          </ThemeProvider>
        </Wrapper>
      </AppProvider>
    </BrowserRouter>
  );
});

export default App;
