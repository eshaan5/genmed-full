import * as React from "react";
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem } from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";

import logo from "../assets/logo.png";

const ResponsiveAppBar = ({ login, user, logout, handleOrders }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar style={{ backgroundColor: "#fff", position: "sticky" }}>
      {/* position="static" */}
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box component="img" src={logo} sx={{ display: { xs: "none", md: "flex" }, mr: 1, marginLeft: "5vw", width: "10vw", borderRadius: "20px" }} />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon sx={{ color: "#0a8508" }} />
            </IconButton>
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
              {!user && (
                <MenuItem onClick={login}>
                  <Typography textAlign="center">Login/Signup</Typography>
                </MenuItem>
              )}
              {user && (
                <MenuItem onClick={logout}>
                  <Typography textAlign="center">{`Hi, ${user.displayName} (Logout)`}</Typography>
                </MenuItem>
              )}
              <MenuItem onClick={handleOrders}>
                <Typography textAlign="center">Orders</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Box component="img" src={logo} sx={{ display: { xs: "flex", md: "none" }, mr: 1, width: "20vw", marginRight: "27vw", borderRadius: "20px" }} />

          <Box sx={{ display: { xs: "none", md: "flex" }, marginLeft: "50vw" }}>
            <Button onClick={handleOrders} sx={{ my: 2, color: "#2a7632", display: "block" }}>
              Orders
            </Button>
            {!user && (
              <Button onClick={login} sx={{ my: 2, color: "#2a7632", display: "block" }}>
                Login / Signup
              </Button>
            )}
            {user && (
              <Button onClick={logout} sx={{ my: 2, color: "#2a7632", display: "block" }}>
                {`Hi, ${user.displayName} (Logout)`}
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
