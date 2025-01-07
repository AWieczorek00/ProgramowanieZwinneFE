import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import AuthService from "../services/AuthService";

function Navbar() {
  const location = useLocation();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Project manager
          </Link>
        </Typography>

        <Box>
          {location.pathname !== "/" && (
            <Button variant="contained" color="secondary" sx={{ mr: 2 }} component={Link} to="/">
              Back to Main Page
            </Button>
          )}

          <Button variant="contained" color="secondary" sx={{ ml: 2 }} onClick={() => AuthService.logout()}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;