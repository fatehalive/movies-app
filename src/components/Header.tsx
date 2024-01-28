import { useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Avatar,
  Button,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ReactComponent as Logo } from "@/assets/logo-blue-short.svg";

const pages = [
  { title: "Movies", id: "movie" },
  { title: "TV Shows", id: "tv" },
  { title: "Peoples", id: "person" },
];
const settings = ["Profile", "Watchlist", "Watched", "About", "Logout"];

export const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleClickOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleClickCloseNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    const el = event.target as HTMLElement;
    const route = el.getAttribute("data-id");
    if (route) navigate(`/${route}`);
    setAnchorElNav(null);
  };
  const handleClickOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleClickCloseUserMenu = (event: MouseEvent<HTMLElement>) => {
    const { innerText } = event.target as HTMLElement;

    switch (innerText) {
      case "Login":
        // Todo
        break;
      case "About":
        navigate("/about");
        break;
      default:
        navigate("/profile", { 
          state: { 
            tab: settings.indexOf(innerText)
          } 
        });
        break;
    }
    setAnchorElUser(null);
  };

  const handleClickLogo = (event: MouseEvent<HTMLElement>) => {
    navigate("/");
  };

  return (
    <AppBar component={"header"} position="static" sx={{ bgcolor: "#032541" }}>
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <Box
            component={"a"}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              letterSpacing: ".3rem",
              cursor: "pointer",
            }}
            onClick={handleClickLogo}
          >
            <Logo
              className="md:flex xs:hidden mr-10 w-28"
              style={{ width: "150px" }}
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClickOpenNavMenu}
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
              onClose={handleClickCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {anchorElNav &&
                pages.map((page) => (
                  <MenuItem key={page.id} onClick={handleClickCloseNavMenu}>
                    <Typography data-id={page.id} textAlign="center">
                      {page.title}
                    </Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          <Box
            component={"a"}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
            }}
            onClick={handleClickLogo}
          >
            TMDB
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                data-id={page.id}
                onClick={handleClickCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleClickOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src="#" />
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
              onClose={handleClickCloseUserMenu}
            >
              {anchorElUser &&
                settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleClickCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
