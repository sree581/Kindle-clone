import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function Navbar() {
  const { authToken, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-primary text-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-extrabold tracking-wider">
        StoryTime
      </Link>
      <div>
        {authToken ? (
          // --- If user is logged in ---
          <>
            <Link to="/my-library" className="hover:text-secondary mr-6 font-bold">
              My Library
            </Link>
            <button
              onClick={handleLogout}
              className="bg-dark-text hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-lg"
            >
              Logout
            </button>
          </>
        ) : (
          // --- If user is logged out ---
          <>
            <Link to="/login" className="hover:text-secondary mr-4 font-bold">
              Login
            </Link>
            <Link to="/register" className="bg-accent hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-lg">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

