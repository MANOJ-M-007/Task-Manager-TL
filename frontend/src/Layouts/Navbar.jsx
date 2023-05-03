import * as React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { userLogout } from "../slices/userLoginSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.userLogin);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutHandler = async (e) => {
    dispatch(userLogout());
    localStorage.removeItem("userInfo");
    navigate("/login");
  };
  // const [userInfo,setUserInfo]=useState('')
  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  //   if(!userInfo){
  //     navigate('/login')
  //   }
  // }, []);
  return (
    <AppBar
      position="fixed"
      style={{ backgroundColor: "#ced4da" }}
      sx={{
        opacity: "0.8",
        borderRadius: "10px",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#000000",
              textDecoration: "none",
            }}
          >
            TASK MANAGER
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
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
                display: { xs: "block", md: "none", opacity: "0.8" },
              }}
            ></Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#CB78B5",
              textDecoration: "none",
            }}
          >
            TASK MANAGER
          </Typography>
          {userInfo ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" />
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
                {/* {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))} */}
                <MenuItem onClick={handleCloseUserMenu}>
                  <Box
                    textAlign="center"
                    // sx={{
                    //   color: "black",
                    //   fontWeight: "bold",
                    //   marginRight: "20px",
                    // }}
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      marginRight: "10px",
                      "& > first-of-type": {
                        marginBottom: "5px",
                        color: "#AA77FF",
                      },
                      "& > :last-child": {
                        cursor: "pointer",
                        textDecoration: "none",
                        color: "#AA77FF",
                      },
                      "& > :last-child:hover": {
                        color: "red",
                      },
                    }}
                  >
                    <Typography
                      sx={{ "&:hover": { transform: "scale(1.1)" }, }}
                      onClick={() => {
                        logoutHandler();
                      }}
                    >
                      Logout
                    </Typography>
                  </Box>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box color="black">
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    color: "#293462",
                    borderRadius: "10px",
                    boxShadow: "none",
                    textTransform: "none",
                    fontWeight: "normal",
                    fontSize: "1rem",
                    letterSpacing: "0.02em",
                    lineHeight: "1.5",
                    bgcolor: "#DAF5FF",
                    "&:hover": {
                      bgcolor: "#B9E9FC",
                      boxShadow: "none",
                    },
                    "&:active": {
                      boxShadow: "none",
                      bgcolor: "#B0DAFF",
                    },
                    "&:focus": {
                      boxShadow: "0 0 0 0.2rem rgb(178, 164, 255)",
                    },
                  }}
                >
                  LogIn{" "}
                </Button>
              </Link>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
