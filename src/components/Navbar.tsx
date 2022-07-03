import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Drawer, IconButton, styled } from "@mui/material";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { ModalForm } from "./ModalForm";

const pages = [
  {
    name: "",
    title: "Главное",
  },
  {
    name: "collection",
    title: "Коллекция",
  },
];

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{
                    borderBottom: { xs: "3px solid #ff4810" },
                  }}
                >
                  <NavLink
                    style={{ textDecoration: "none" }}
                    to={`/${page.name}`}
                  >
                    <Typography
                      color={"primary"}
                      sx={{
                        width: "100%",
                        fontSize: { xs: "24px", md: "16px" },
                      }}
                    >
                      {page.title}
                    </Typography>
                  </NavLink>
                </MenuItem>
              ))}
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
            {pages.map((page) => (
              <Button key={page.name} onClick={handleCloseNavMenu}>
                <CustomNavLink to={`/${page.name}`}>{page.title}</CustomNavLink>
              </Button>
            ))}
          </Box>
          <Box>
            <Button
              variant={"contained"}
              sx={{ fontSize: "20px", textTransform: "capitalize" }}
              color="secondary"
              onClick={handleOpen}
            >
              Войти
            </Button>
          </Box>
        </Toolbar>
        <ModalForm open={open} onClose={handleClose} />
      </Container>
    </CustomAppBar>
  );
};
