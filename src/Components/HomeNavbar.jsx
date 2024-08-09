import React from 'react';
import { AppBar, Toolbar, Typography, Container, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu'; // Optional: for a responsive menu icon

const HomeNavbar = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography 
            variant="h6"
            component="div"
            sx={{ cursor: 'pointer' }}
            onClick={handleLogoClick}
          >
            Bus Voyage
          </Typography>
        </Container>

        <IconButton 
          size="large" 
          edge="start" 
          color="inherit" 
          aria-label="menu" 
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default HomeNavbar;
