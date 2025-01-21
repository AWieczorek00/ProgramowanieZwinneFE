import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import { type } from "@testing-library/user-event/dist/type";

export default function Register() {

  const [stationary, setStationary] = useState(false)
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [indexNumber, setIndexNumber] = useState("")
  const navigate = useNavigate();

  const handleChange = () => {
    setStationary(!stationary)
  }

  const register = (event) => {
    event.preventDefault()
    AuthService.register(name, surname, email, password, indexNumber, stationary).then(() => {
      navigate("/login")
    }).catch((error) => {
      const errors = error.response.data.errors
      for (const key of Object.keys(errors)){
        alert(key + ": "+ errors[key])
      }
    })
  }

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
        <form style={{ width: "100%" }} onSubmit={(event) => register(event)}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={name}
            margin="normal"
            variant="outlined"
            onChange={(event) => setName(event.target.value.trim())}
          />
          <TextField
            fullWidth
            label="Surname"
            name="surname"
            margin="normal"
            variant="outlined"
            onChange={(event) => setSurname(event.target.value.trim())}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            margin="normal"
            variant="outlined"
            onChange={(event) => setEmail(event.target.value.trim())}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            margin="normal"
            variant="outlined"
            onChange={(event) => setPassword(event.target.value.trim())}
          />
          <TextField
            fullWidth
            label="Index Number"
            name="indexNumber"
            margin="normal"
            variant="outlined"
            onChange={(event) => setIndexNumber(event.target.value.trim())}
          />
          <FormGroup>
            <FormControlLabel control={<Checkbox name="stationary" onChange={handleChange}></Checkbox>} label='Stationary'></FormControlLabel>
          </FormGroup>
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