import React, { useState } from 'react';
import { Box, Typography, Tab, Tabs, TextField, Button } from '@mui/material';
import { useUserAuth } from '../../Context/UserAuthContext'; // Update the path to your userAuthContext file
import Image from '../../image.jpg'
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const { logIn, signUp, googleSignIn } = useUserAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate();

  const handleToggleForm = (event, newValue) => {
    setIsRegister(newValue === 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      // Call signUp function from userAuthContext
      signUp(email, password)
        .then((userCredential) => {
          // Handle successful sign up
          console.log('Sign up success', userCredential.user);
          Navigate('/dashboard')
        })
        .catch((error) => {
          // Handle sign up error
          console.log('Sign up error', error);
        });
    } else {
      // Call logIn function from userAuthContext
      logIn(email, password)
        .then((userCredential) => {
          // Handle successful login
          console.log('Login success', userCredential.user);
          Navigate('/dashboard')
        })
        .catch((error) => {
          // Handle login error
          console.log('Login error', error);
        });
    }
  };

  return (
    <Box display="flex" height="100vh">
      {/* Left Section */}
      <Box flex="1" position="relative">
      <img src={Image} alt="Left Image" style={{ width: '100%', height: '100%' }} />
      </Box>

      {/* Right Section */}
      <Box
        flex="1"
        bgcolor="white"
        p={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center" // Added center alignment
      >
        <Tabs
          value={isRegister ? 1 : 0}
          onChange={handleToggleForm}
          textColor="primary"
          indicatorColor="primary"
          variant="fullWidth"
          sx={{ marginBottom: '20px', justifyContent:'center' }}
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        <Box width="300px">
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {isRegister ? 'Register' : 'Login'}
            </Button>
          </form>
          <Button variant="outlined" fullWidth onClick={googleSignIn}>
            Sign in with Google
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default WelcomePage;
