import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import the useAuth hook
import Alert from '../components/Alert'; // Import the Alert component

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [savePassword, setSavePassword] = useState(false); // New state for saving password
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false); // New state for dark mode
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from context

  // Initial loading to check if any information is saved
  useEffect(() => {
    const savedUsername = localStorage.getItem('savedUsername');
    const savedPassword = localStorage.getItem('savedPassword');
    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setSavePassword(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === 'agent1' && password === 'erg2025@') {
      setSuccessMessage('You are logged in successfully...');
      setErrorMessage('');
      login(); // Call the login function

      if (savePassword) {
        // Save the credentials if the option is checked
        localStorage.setItem('savedUsername', username);
        localStorage.setItem('savedPassword', password);
      } else {
        // Remove the credentials if the option is unchecked
        localStorage.removeItem('savedUsername');
        localStorage.removeItem('savedPassword');
      }

      setTimeout(() => {
        navigate('/service');
      }, 2000); // Redirect after 2 seconds
    } else {
      setErrorMessage('Invalid username or password.');
      setSuccessMessage('');

      // Clear the error message after 5 seconds
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode); // Toggle dark mode
  };

  return (
    <div className={`relative min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className={`relative z-10 p-6 bg-white rounded-lg shadow-lg w-full max-w-md ${isDarkMode ? 'bg-gray-700 text-white' : 'text-black'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-center mb-4">Connexion</h2>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-blue-500 text-white'}`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={`mt-1 block w-full px-4 py-2 border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} rounded-md`}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`mt-1 block w-full px-4 py-2 border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} rounded-md`}
            />
          </div>
          {errorMessage && <Alert type="error" message={errorMessage} />}
          {successMessage && <Alert type="success" message={successMessage} />}
          <button
            type="submit"
            className={`w-full py-2 rounded-md ${isDarkMode ? 'bg-red-500 text-white' : 'bg-red-600 text-white'} hover:${isDarkMode ? 'bg-blue-600' : 'bg-indigo-700'}`}
          >
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
