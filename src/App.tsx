import { createTheme, ThemeProvider } from "@mui/material";
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

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <ThemeProvider theme={theme}>
          <Navbar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/" element={"Home"} />
            <Route path="/" element={"Home"} />
          </Routes>
        </ThemeProvider>
      </div>
    </BrowserRouter>
  );
};

export default App;
