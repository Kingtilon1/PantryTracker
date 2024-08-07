import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useUserAuth } from '../context/UserAuthContext';
import Link from 'next/link'; 

export default function Signup(){
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useUserAuth();
  const router = useRouter(); // Use useRouter from Next.js

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signUp(email, password);
      router.push('/'); // Use router.push for navigation
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Firebase/ React Auth Signup</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Sign up
            </Button>
          </div>
        </Form>
      </div>
      <div className="p-4 box mt-3 text-center">
        Already have an account? <Link href="/">Log In</Link> {/* Ensure href is correct */}
      </div>
    </>
  );
};


