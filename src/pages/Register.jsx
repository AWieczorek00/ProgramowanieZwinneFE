import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function Register() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: "#f5f5f5",
        px: 3,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "white",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Register
        </Typography>
        <form style={{ width: "100%" }}>
          <TextField
            fullWidth
            required
            label="Username"
            name="username"
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            required
            label="Email"
            name="email"
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            required
            label="Password"
            type="password"
            name="password"
            margin="normal"
            variant="outlined"
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }} align="center">
          Already have an account?{" "}
          <Link to="/login" style={{ textDecoration: "none", color: "#1976d2" }}>
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}