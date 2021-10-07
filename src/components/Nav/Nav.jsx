import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";

// original imports
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";


export default function Nav() {
  const user = useSelector((store) => store.user);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  // const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>
          </>
        )}
      </MenuItem>
      <MenuItem>
        <>
          <Link className="navLink" to="/info">
            Info Page
          </Link>
        </>
      </MenuItem>
      <MenuItem>
        <>
          <Link className="navLink" to="/about">
            About
          </Link>
        </>
      </MenuItem>
      <MenuItem>
        {user.id === 1 && (
          <Link className="navLink" to="/admin">
            Admin
          </Link>
        )}
      </MenuItem>

      <MenuItem>
        {user.id && (
          <>
            <LogOutButton className="navLink" />
          </>
        )}
      </MenuItem>

      <MenuItem>
        {!user.id && (
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/home">
            <Typography
              className="nav-title"
              position="flex"
              component="div"
              sx={{ flexGrow: 0.8 }}
            >
              Q-ware
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {/* If a user is logged in, show these links */}
            <IconButton size="large" color="secondary">
              {user.id && (
                <Link className="navLink" to="/user">
                  Home
                </Link>
              )}
            </IconButton>

            <IconButton size="large" color="secondary">
              {user.id && (
                <Link className="navLink" to="/info">
                  Info Page
                </Link>
              )}
            </IconButton>

            <IconButton size="large" color="secondary">
              {user.id && (
                <Link className="navLink" to="/about">
                  About
                </Link>
              )}
            </IconButton>
            <IconButton size="large" color="secondary">
              {user.id === 1 && (
                <Link className="navLink" to="/admin">
                  Admin
                </Link>
              )}
            </IconButton>

            <IconButton size="large" color="secondary">
              {user.id && <LogOutButton className="navLink" />}
            </IconButton>
          </Box>

          {user.id && (
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}