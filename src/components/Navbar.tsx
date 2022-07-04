import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Drawer, IconButton, Menu, styled, Tooltip } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ModalForm } from "./ModalForm";
import { signOut } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { useCallback, useEffect, useState } from "react";
import { useStore } from "../provider";
import { observer } from "mobx-react-lite";

export const Navbar = observer(() => {
  const { store } = useStore();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const isLogged = store.isLogged;

  const navigate = useNavigate();

  const handleOpen = useCallback(() => store.setModalOpen(true), [store]);
  const handleClose = useCallback(() => store.setModalOpen(false), [store]);

  useEffect(() => {
    store.setAutoplayToFalse();
  }, [store]);

  const handleCloseNavMenu = useCallback(() => {
    setAnchorElNav(null);
  }, []);

  const handleOpenNavMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    },
    []
  );

  const handleOpenUserMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    },
    []
  );

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

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
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <NavLink style={{ height: "60px" }} to={`/`}>
              <img
                src={require("../assets/minilogo.png")}
                width={60}
                alt="Logo"
              />
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
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, color: "white" }}
              >
                <Typography
                  sx={{
                    display: { xs: "none", md: "block" },
                    marginRight: 1,
                  }}
                >
                  {isLogged ? store?.userName : ""}
                </Typography>
                <AccountCircleIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isLogged ? (
                <MenuItem sx={{ display: { xs: "block", md: "none" } }}>
                  <Typography
                    sx={{
                      fontSize: { xs: "24px", md: "16px" },
                    }}
                    textAlign="center"
                  >
                    {store?.userName}
                  </Typography>
                </MenuItem>
              ) : (
                ""
              )}
              <MenuItem onClick={handleCloseUserMenu}>
                {isLogged ? (
                  <Typography
                    color={"primary"}
                    sx={{
                      fontSize: { xs: "24px", md: "16px" },
                    }}
                    textAlign="center"
                    onClick={logout}
                  >
                    Выйти
                  </Typography>
                ) : (
                  <Typography
                    color={"primary"}
                    sx={{
                      fontSize: { xs: "24px", md: "16px" },
                    }}
                    textAlign="center"
                    onClick={handleOpen}
                  >
                    Войти
                  </Typography>
                )}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
        <ModalForm open={store.modalOpen} onClose={handleClose} />
      </Container>
    </CustomAppBar>
  );
});
