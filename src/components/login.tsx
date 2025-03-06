import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuthStatus, login } from '../services/login-service';

interface LoginProps {
  onLogin: (status: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate(); // Hook to navigate to other routes

  useEffect(() => {
    // Check if the user is already authenticated
    if (checkAuthStatus()) {
      navigate('/'); // Redirect to home page if already authenticated
    }
  }, [navigate]);

  const handleLogin = async () => {
    // Simulate login check (replace with real validation)
    const loginAttempt = await login({
      username,
      password,
    })

    if (!!loginAttempt) {
      onLogin(true);  // Successful login
      navigate('/');   // Redirect to the home page
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
