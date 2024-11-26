// src/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import the useAuth hook
import Alert from '../components/Alert'; // Import the Alert component

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState('');
  const { isLoggedIn, logout } = useAuth(); // Use the auth context
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout(); // Call the logout function
    setLogoutMessage('You have logged out.'); // Set the logout message

    // Change the timeout to 5 seconds
    setTimeout(() => {
      setLogoutMessage(''); // Clear the message after 5 seconds
    }, 5000); // 5000 milliseconds = 5 seconds

    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="bg-gray-200 p-4">
      {/* Display the logout alert at the top */}
      {logoutMessage && <Alert type="warning" message={logoutMessage} />}

      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-gray hover:text-red-700 flex items-center space-x-2">
          <div className="text-gray text-3xl font-bold">Système d'Arregation</div>
        </Link>


        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray hover:text-red-700 flex items-center space-x-2">
            <i className="fas fa-home"></i>
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/service" className="text-gray hover:text-red-700 flex items-center space-x-2">
                <i className="fas fa-cogs"></i>
              </Link>
              <button onClick={handleLogout} className="text-gray hover:text-red-700 flex items-center space-x-2">
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </>
          ) : (
            <Link to="/login" className="text-gray hover:text-gray-300 flex items-center space-x-2">
              <i className="fas fa-sign-in-alt"></i>
            </Link>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="bg-gray-800 text-white p-4 space-y-4">
          <Link to="/" className="flex items-center space-x-2">
            <i className="fas fa-home"></i>
            <span>Home</span>
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/service" className="flex items-center space-x-2">
                <i className="fas fa-cogs"></i>
                <span>Service</span>
              </Link>
              <button onClick={handleLogout} className="flex items-center space-x-2">
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link to="/login" className="flex items-center space-x-2">
              <i className="fas fa-sign-in-alt"></i>
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;