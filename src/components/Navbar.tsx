import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Drawer, IconButton, styled } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { ModalForm } from "./ModalForm";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { useEffect, useState } from "react";
import { useStore } from "../provider";
import { observer } from "mobx-react-lite";

export const Navbar = observer(() => {
  const { store } = useStore();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => store.setModalOpen(true);
  const handleClose = () => store.setModalOpen(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    });
  });

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const CustomAppBar = styled(AppBar)`
    min-height: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const CustomNavLink = styled(NavLink)`
    color: hsla(0, 0%, 100%, 0.5);
    text-decoration: none;
    text-transform: none;
    font-size: 20px;
    transition: 0.2s;
    margin-left: 5px;
    &.active {
      color: white;
    }
    &:hover {
      color: #ff4810;
    }
  `;

  const logout = () => {
    db.collection("users")
      .doc(auth.currentUser?.uid)
      .update({
        currentSong: JSON.parse(localStorage.getItem("currentSong")!),
        currentAlbum: JSON.parse(localStorage.getItem("currentAlbum")!),
        favourite: JSON.parse(localStorage.getItem("favourite")!),
      });

    store.cleanFavourite();
    signOut(auth);
    navigate("/");
  };
  return (
    <CustomAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavLink to={`/`}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
              }}
            >
              <img src={require("../assets/logo.png")} alt="Logo" />
            </Typography>
          </NavLink>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon fontSize={"large"} />
            </IconButton>
            <Drawer
              id="menu-appbar"
              keepMounted
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchor="left"
              sx={{
                display: { xs: "block", md: "none" },
              }}
              PaperProps={{
                sx: { width: "75%" },
              }}
            >
              <MenuItem
                onClick={handleCloseNavMenu}
                sx={{
                  borderBottom: { xs: "3px solid #ff4810" },
                }}
              >
                <NavLink style={{ textDecoration: "none" }} to={`/`}>
                  <Typography
                    color={"primary"}
                    sx={{
                      width: "100%",
                      fontSize: { xs: "24px", md: "16px" },
                    }}
                  >
                    Главное
                  </Typography>
                </NavLink>
              </MenuItem>
              {isLogged && (
                <MenuItem
                  onClick={handleCloseNavMenu}
                  sx={{
                    borderBottom: { xs: "3px solid #ff4810" },
                  }}
                >
                  <NavLink
                    style={{ textDecoration: "none" }}
                    to={`/collection`}
                  >
                    <Typography
                      color={"primary"}
                      sx={{
                        width: "100%",
                        fontSize: { xs: "24px", md: "16px" },
                      }}
                    >
                      Коллекция
                    </Typography>
                  </NavLink>
                </MenuItem>
              )}
            </Drawer>
          </Box>

          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
            }}
          >
            <NavLink to={`/`}>
              <img src={require("../assets/logo.png")} width={160} alt="Logo" />
            </NavLink>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button onClick={handleCloseNavMenu}>
              <CustomNavLink to={`/`}>Главное</CustomNavLink>
            </Button>

            {isLogged && (
              <Button onClick={handleCloseNavMenu}>
                <CustomNavLink to={`/collection`}>Коллекция</CustomNavLink>
              </Button>
            )}
          </Box>
          <Box>
            {isLogged ? (
              <Button
                onClick={logout}
                variant={"contained"}
                sx={{ fontSize: "20px", textTransform: "capitalize" }}
                color="secondary"
              >
                Выйти
              </Button>
            ) : (
              <Button
                variant={"contained"}
                sx={{ fontSize: "20px", textTransform: "capitalize" }}
                color="secondary"
                onClick={handleOpen}
              >
                Войти
              </Button>
            )}
          </Box>
        </Toolbar>
        <ModalForm open={store.modalOpen} onClose={handleClose} />
      </Container>
    </CustomAppBar>
  );
});
