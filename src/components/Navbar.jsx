




import * as React from "react";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import InsightsIcon from '@mui/icons-material/Insights';
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useAuth } from '../pages/AuthContext';
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useState } from 'react';
const drawerWidth = 250;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  background: "white",
  color: "black",
  boxShadow: "none",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,

        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: "#ADD8E6",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "75%",

  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon

    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));




export default function Demo() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { isLoggedIn, logout } = useAuth();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="static" open={open} sx={{ backgroundColor: "#034f84" }}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                color: "black", // Set the icon color (can be anything you prefer)
                backgroundColor: "white", // White background circle
                borderRadius: "50%", // Circular shape
                padding: "8px", // Padding to make the circle larger
                mr: 2,
                "&:hover": {
                  backgroundColor: "lightgray", // Change background on hover for a nice effect
                },
              },
              open && { display: "none" }, // Conditionally hide when open
            ]}
          >
            <AccountBalanceIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
              FO
            </Link>
          </Typography>
          <Header />
          {/* <Search sx={{ background: "#ADD8E6" }}> */}
          <Search sx={{ background: "white" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for Student…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
          <ListItem key={"Header"} disablePadding>
            <ListItemButton>
              <ListItemText primary={"Finance Office"} />
            </ListItemButton>
          </ListItem>
        </DrawerHeader>
        <Divider />
        <List>
          {["Student Fee", "Bank Due Details"].map((text, index) => (
            <Link
              to={text === "Bank Due Details" ? "/Bank/Due" : "/Student/fee"}
              style={{
                textDecoration: "none",
                color: "black",
                width: "100%",
              }}
            >
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index === 0 ? <PersonIcon /> : <AccountBalanceIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>

        { isLoggedIn &&  (<List>
          {[
            "Add Due Number",
            "Edit Student Details",
            "ExchangeInstallment",
          ].map((text, index) => (
            <Link
              to={
                text === "Add Due Number"
                  ? "/add/due"
                  : text === "Edit Student Details"
                  ? "/edit/student"
                  : "/edit/installment"
              }
              style={{
                textDecoration: "none",
                color: "black",
                width: "100%",
              }}
            >
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index === 0 ? (
                      <ModeEditOutlineIcon />
                    ) : (
                      <ModeEditOutlineIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>)
        }<List>
          {["Insights", "See All Added Dues"].map((text, index) => (
            <Link
              to={text === "Insights" ? "/Insights" : "/see/added/dues"}
              style={{
                textDecoration: "none",
                color: "black",
                width: "100%",
              }}
            >
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index === 0 ? (
                      <InsightsIcon />
                    ) : (
                      <RemoveRedEyeTwoToneIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>

        <Divider />
        <List>
          {["Upload Excel"].map((text, index) => (
            <Link
              to={text === "Upload Excel" ? "/Upload" : "/"}
              style={{
                textDecoration: "none",
                color: "black",
                width: "100%",
              }}
            >
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index === 0 ? <LoginIcon /> : <LogoutIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />

        <List>
          <Link
            to="/Auth/Login" // Redirect to home if signed out, else to login
            style={{
              textDecoration: "none",
              color: "black",
              width: "100%",
            }}
          >
            <ListItem disablePadding>
              <ListItemButton onClick={isLoggedIn ? logout : undefined}>
                <ListItemIcon>
                  {isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
                </ListItemIcon>
                <ListItemText primary={isLoggedIn ? "Sign Out" : "Login"} />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </Box>
  );
};
