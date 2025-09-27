import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import LibraryPage from './LibraryPage';
import MyLibraryPage from './MyLibraryPage';
import ReaderPage from './ReaderPage';
import BookDetailPage from './BookDetailPage';
import MainLayout from './MainLayout';

// A helper component to handle routing for logged-in users
const ProtectedRoute = ({ children }) => {
    const { authToken } = useContext(AuthContext);
    // If user is logged in, show the component. Otherwise, redirect to the login page.
    return authToken ? children : <Navigate to="/login" />;
};

// A helper component to handle routing for logged-out users
const PublicRoute = ({ children }) => {
    const { authToken } = useContext(AuthContext);
    // If user is logged in, redirect them away from public pages (like login) to their library.
    return authToken ? <Navigate to="/library" /> : children;
};

function App() {
  return (
    <Routes>
      {/* --- Public-Facing Routes --- */}
      {/* The Landing/Login page is now the root for logged-out users */}
      <Route path="/" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
      
      {/* --- Routes that can be viewed by anyone, but have a consistent navbar --- */}
      <Route path="/book/:bookId" element={<MainLayout><BookDetailPage /></MainLayout>} />

      {/* --- Protected App Routes (Only accessible when logged in) --- */}
      <Route 
        path="/library" 
        element={
          <ProtectedRoute>
            <MainLayout><LibraryPage /></MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/my-library" 
        element={
          <ProtectedRoute>
            <MainLayout><MyLibraryPage /></MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/read/:bookId" 
        element={
          <ProtectedRoute>
            <ReaderPage />
          </ProtectedRoute>
        } 
      />
      
      {/* A fallback to redirect any unknown paths */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;

