import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box, Card, CircularProgress } from "@mui/material";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext'; 

const LoginForm = () => {
  const { login, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleLogin = async () => {
    if (!id || !password) {
      setError("Both fields are required");
      return;
    }

    setLoading(true);
    setError("");

    

    try {
      const response = await axios.post('http://localhost:3001/api/v1/login', {
        email: id,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        const { token, user } = response.data.data;

        // Store token, name, and email in localStorage

        
        login({'token':token,"name":user.name,"email":user.email});
        
        console.log('Successfully logged in:', response.data);
      } else {
        setError("Login failed. " + response.data.message);
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.");
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleLogout = () => {
    
    logout(); 
  };

  if (isLoggedIn) {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <Card
            elevation={5}
            sx={{
              padding: 4,
              width: "100%",
              maxWidth: 350,
              textAlign: "center",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Welcome, {JSON.parse(localStorage.getItem('user')).name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              You are already logged in with the email: {JSON.parse(localStorage.getItem('user')).email}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Logout
            </Button>
          </Card>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Card
          elevation={5}
          sx={{
            padding: 4,
            width: "100%",
            maxWidth: 350,
            maxHeight: 400,
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            gutterBottom
            align="center"
            sx={{
              marginBottom: 2,
              marginTop: 1,
            }}
          >
            FO Admin Login
          </Typography>

          <TextField
            id="id-field"
            label="User Name"
            variant="outlined"
            margin="dense"
            placeholder="Enter your username"
            fullWidth
            value={id}
            onChange={(e) => setId(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root.Mui-focused': {
                borderColor: 'blue',
                '& fieldset': {
                  borderColor: 'blue',
                },
              },
              marginBottom: 1.5
            }}
          />

          <TextField
            id="password-field"
            label="Password"
            variant="outlined"
            margin="dense"
            placeholder="Enter your password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root.Mui-focused': {
                borderColor: 'blue',
                '& fieldset': {
                  borderColor: 'blue',
                },
              },
            }}
          />

          {error && (
            <Typography color="error" sx={{ marginBottom: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            fullWidth
            sx={{
              marginTop: 3,
              marginBottom: 2,
              paddingY: 1.4,
              fontSize: "1.1rem",
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </Card>
      </Box>
    </Container>
  );
};

export default LoginForm;
