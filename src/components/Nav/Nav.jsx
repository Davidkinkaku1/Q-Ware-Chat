import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";


// original imports

import { Link } from "react-router-dom";
import LogOutButton from '../LogOutButton/LogOutButton';
import "./Nav.css";
import { useSelector } from "react-redux";



const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));



export default function PrimarySearchAppBar() {

  const user = useSelector((store) => store.user);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  // const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  //   handleMobileMenuClose();
  // };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      
      
      {/* <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p >Profile</p>
      </MenuItem> */}
      <MenuItem>
      {user.id && (
              <>
               <Link className="navLink" to="/user">
                Home
               </Link>
             </>
          )}
         
          {user.id && (
              <>
              <Link className="navLink" to="/info">
                Info Page
              </Link>
             </>
          )}
          {user.id && (
              <>
              <LogOutButton className="navLink" />
             </>
          )}
              

      </MenuItem>
      <MenuItem>
      {/* If no user is logged in, show these links */}
       {user.id === null &&
         // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
         </Link>
       }
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <Link to="/home">
            <Typography className="nav-title">Q-ware</Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >

                 {/* If a user is logged in, show these links */}
          {user.id && (
              <>
               <Link className="navLink" to="/user">
                Home
               </Link>

               <Link className="navLink" to="/info">
                Info Page
              </Link>
               <LogOutButton className="navLink" />
             </>
          )}
          <Link className="navLink" to="/about">
              About
           </Link>
            </IconButton>
            <IconButton
              size="large"

              color="secondary"
            >

                <div>
                  {/* If no user is logged in, show these links */}
                  {user.id === null && (
                    // If there's no user, show login/registration links
                    <Link className="navLink" to="/login">
                      Login / Register
                    </Link>
                  )}
                </div>

            </IconButton>
          </Box>

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
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {/* {renderMenu} */}
    </Box>
  );
}

// import React from 'react';
// import { Link } from 'react-router-dom';
// import LogOutButton from '../LogOutButton/LogOutButton';
// import './Nav.css';
// import { useSelector } from 'react-redux';

// function Nav() {
//   const user = useSelector((store) => store.user);

//   return (
//     <div className="nav">

//       <Link to="/home">
//         <h2 className="nav-title">Q-ware</h2>
//       </Link>
//       <div>
//         {/* If no user is logged in, show these links */}
//         {user.id === null &&
//           // If there's no user, show login/registration links
//           <Link className="navLink" to="/login">
//             Login / Register
//           </Link>
//         }

//         {/* If a user is logged in, show these links */}
//         {user.id && (
//           <>
//             <Link className="navLink" to="/user">
//               Home
//             </Link>

//             <Link className="navLink" to="/info">
//               Info Page
//             </Link>

//             <LogOutButton className="navLink" />
//           </>
//         )}

//         <Link className="navLink" to="/about">
//           About
//         </Link>

//       </div>

//     </div>
//   );
// }

// export default Nav;
