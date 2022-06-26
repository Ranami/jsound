import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material";
import { NavLink } from "react-router-dom";

const pages = [
  {
    name: "",
    title: "Главное",
  },
  {
    name: "collection",
    title: "Коллекция",
  },
  {
    name: "newRelease",
    title: "Новые релизы",
  },
];

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            <img src={require("../assets/logo.png")} alt="Logo" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button key={page.name} onClick={handleCloseNavMenu}>
                <CustomNavLink to={`/${page.name}`}>{page.title}</CustomNavLink>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </CustomAppBar>
  );
};
