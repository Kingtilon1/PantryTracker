import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, Button, Container, TextField, Typography, Box } from '@mui/material';
import { useUserAuth } from '../../context/UserAuthContext';
import Link from 'next/link'; // Import Next.js Link
import GoogleButton from 'react-google-button'; // Assuming you're using this library

const Login = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const { logIn, googleSignIn } = useUserAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await logIn(email, password);
      router.push('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      router.push('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        height="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          The Pantry Tracker!
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Log In
          </Button>
          <Box textAlign="center" sx={{ mt: 2 }}>
            <GoogleButton
              type="dark"
              onClick={handleGoogleSignIn}
            />
          </Box>
        </Box>

        <Box mt={2} textAlign="center">
          <Typography variant="body2">
          Don&apos;t have an account? <Link href="/users/SignUp">Sign up</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
