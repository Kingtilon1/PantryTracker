"use client";

import { useRouter } from 'next/navigation';
import { useUserAuth } from '../../context/UserAuthContext';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/'); // Redirect to login if not authenticated
    }
  }, [user, router]);

  return user ? children : null;
};

export default ProtectedRoute;
