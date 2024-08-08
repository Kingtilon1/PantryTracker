"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useUserAuth } from '../../../context/UserAuthContext';
import Link from 'next/link';
import { trackEvent } from '../../../utils/analytics'
import { Box, Typography, Container } from '@mui/material';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useUserAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signUp(email, password);
      trackEvent({
        action: 'signup',
        category: 'User Authentication',
        label: 'Signup Successful',
        value: email  // Note: Be cautious with PII data
    });
      router.push('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'linear-gradient(to right, #6a11cb, #2575fc)',
        color: '#fff',
        p: 4,
      }}
    >
      <Container
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 2,
          boxShadow: 5,
          maxWidth: 400,
          width: '100%',
          p: 4,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#333' }}>
        Tilon&apos;s Pantry Signup
        </Typography>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: '10px', marginBottom: '10px' }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '10px', marginBottom: '20px' }}
            />
          </Form.Group>

          <Button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#6a11cb',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
            }}
          >
            Sign up
          </Button>
        </Form>

        <Typography variant="body2" sx={{ mt: 3, color: '#333' }}>
          Already have an account? <Link href="/">Log In</Link>
        </Typography>
      </Container>
    </Box>
  );
}