import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const ProtectedRoute = ({ children }) => {
  const { user, isLoaded } = useUser();
  
  if (!isLoaded) {
    // Still loading, show nothing or a loading spinner
    return <div className="loading">Loading...</div>;
  }
  
  // Not logged in or no user
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  // Check for iitpkd.ac.in email domain
  const email = user?.primaryEmailAddress?.emailAddress || '';
  if (!email.endsWith('iitpkd.ac.in')) {
    return <Navigate to="/" replace />;
  }
  
  // User is logged in with correct email domain
  return children;
};

export default ProtectedRoute;
