import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import QuizIcon from '@mui/icons-material/Quiz';
import { Link, useLocation } from "react-router-dom";
import { useTheme, alpha } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const navLinks = [ 
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Create Quiz",
    link: "/create-quiz",
  },
  {
    name: "Attend Quiz",
    link: "/attend-quiz",
  },
];

function NavBar() {
  const { pathname } = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        height: { xs: '60px', md: '70px' },
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        
         pt:'12px'

      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: '100% !important', justifyContent: 'space-between',   }}>
          {/* Logo/Brand */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
          
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
               
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: { xs: '1.1rem', md: '1.5rem' },
                color: 'inherit',
                textDecoration: 'none',
                background: 'linear-gradient(45deg, #fff 30%, #e0e0e0 90%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                '&:hover': {
                  background: 'linear-gradient(45deg, #e0e0e0 30%, #fff 90%)',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }
              }}
            >
             
              QuizMaster
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile ? (
            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              {navLinks.map((item) => (   
                <Link 
                  key={item.name}
                  to={item.link}
                  style={{ textDecoration: "none" }}  
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: 'white',
                      textDecoration: "none",
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      background: pathname === item.link 
                        ? alpha(theme.palette.common.white, 0.2) 
                        : 'transparent',
                      border: pathname === item.link 
                        ? `1px solid ${alpha(theme.palette.common.white, 0.3)}`
                        : '1px solid transparent',
                      '&:hover': {
                        background: alpha(theme.palette.common.white, 0.15),
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <Typography 
                      sx={{ 
                        fontWeight: pathname === item.link ? 600 : 400,
                        fontSize: '0.95rem'
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                </Link>
              ))}
            </Box>
          ) : (
            /* Mobile Navigation */
            <>
              <IconButton
                size="large"
                aria-label="navigation menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
                sx={{
                  background: alpha(theme.palette.common.white, 0.1),
                  '&:hover': {
                    background: alpha(theme.palette.common.white, 0.2),
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleMenuClose}
                sx={{
                  '& .MuiPaper-root': {
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    color: 'white',
                    borderRadius: 2,
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                    minWidth: 180,
                  }
                }}
              >
                {navLinks.map((item) => (
                  <MenuItem 
                    key={item.name}
                    component={Link}
                    to={item.link}
                    onClick={handleMenuClose}
                    selected={pathname === item.link}
                    sx={{
                      '&.Mui-selected': {
                        backgroundColor: alpha(theme.palette.common.white, 0.15),
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.common.white, 0.2),
                        }
                      },
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.common.white, 0.1),
                      }
                    }}
                  >
                    <Typography textAlign="center">{item.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;